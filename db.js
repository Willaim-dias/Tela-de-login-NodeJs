const sqlite = require("sqlite3").verbose();

// Cria o banco de dados se nao existir
const db = new sqlite.Database('./BancoDeDados.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Criação bem-sucedida do banco de dodas");
    }
});

// Exporta a conexão com o banco
module.exports = db;