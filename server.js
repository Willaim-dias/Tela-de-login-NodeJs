// Importa a biblioteca Express para criar o servidor web
const express = require("express");
// Importa a biblioteca express-session para gerenciar sessões
const session = require('express-session');
// Importa a biblioteca body-parser para processar corpos de requisição
const bodyParser = require('body-parser');
// Importa a biblioteca bcryptjs para criptografar senhas
const bcrypt = require('bcryptjs');
// Importa a biblioteca path para manipular caminhos de arquivos
const path = require("path");
// Importa o módulo de banco de dados
const db = require("./db");

// Cria uma aplicação Express
const app = express();

// Configura o body-parser para lidar com formulários e JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configura o Express para servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Configura a sessão com um segredo, e define resave e saveUninitialized como false e true, respectivamente
app.use(session({
    secret: 'secret-key', // Chave secreta usada para assinar a sessão
    resave: false, // Não salva a sessão novamente se ela não foi modificada
    saveUninitialized: true // Salva uma nova sessão mesmo que ela não tenha sido modificada
}));

// Rota para registro de usuário
app.post("/regUsuario", (req, res) => {
    const { nome, sobrenome, email, endereco, senha } = req.body;

    // Criptografa a senha
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        // Insere o usuário no banco de dados com a senha criptografada
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

// Rota para login
app.post("/login", (req, res) => {
    const { email, senha, opt } = req.body;

    // Seleciona o usuário pelo email
    const sql_select = `SELECT * FROM usuarios WHERE email = ?`;
    db.get(sql_select, [email], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado!' });
        }

        // Compara a senha fornecida com a senha armazenada no banco de dados
        bcrypt.compare(senha, row.senha, (err, result) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            if (result) {
                // Configura a sessão do usuário
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

// Rota para área do usuário
app.get('/AreaUsuario', (req, res) => {
    if (req.session.loginUsua) {
        // Envia o arquivo HTML da área do usuário
        const filePath = path.join(__dirname, 'public','AreaUsuario.html');
        res.sendFile(filePath);
    } else {
        // Exibe uma mensagem solicitando login
        res.send('<h1>Faça login para visualizar esta página! <a href="Login.html">Login</a></h1>');
    }
});

// Rota para logout
app.post('/logout', (req, res) => {
    // Destroi a sessão
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erro ao destruir a sessão');
        }
        res.status(200).send('Sessão destruída');
    });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});