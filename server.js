const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require("path");
const db = require("./db");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

//Rota de registro de usuario
app.post("/regUsuario", (req, res) => {
    const { nome, sobrenome, email, endereco, senha } = req.body;

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        const sql_insert = `INSERT INTO usuarios (nome, sobrenome, email, endereco, senha) VALUES (?, ?, ?, ?, ?)`;
        db.run(sql_insert, [nome, sobrenome, email, endereco, hash], (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            } else {
                return res.status(201).json({ message: 'Usuário Cadastrado! ' });
            }

        });
    });
});

app.post("/login", (req, res) => {
    const { email, senha, opt } = req.body;

    const sql_select = `SELECT * FROM usuarios WHERE email = ?`;

    db.get(sql_select, [email], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado!' });
        }

        bcrypt.compare(senha, row.senha, (err, result) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            if (result) {
                req.session.loginUsua = (opt === "cliente");
                req.session.email = email;

                let redirectPath = "/AreaUsuario";

                res.json({ success: true, redirect: redirectPath });
            } else {
                res.json({ success: false, message: 'Senha incorreta' });
            }
        });
    });
});

app.get('/AreaUsuario', (req, res) => {
    if (req.session.loginUsua) {
        const filePath = path.join(__dirname, 'public','AreaUsuario.html');
        res.sendFile(filePath);
    } else {
        res.send('<h1>Faça login para visualizar esta página! <a href="Login.html">Login</a></h1>');
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erro ao destruir a sessão');
        }
        res.status(200).send('Sessão destruída');
    });
});

//Porta
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
