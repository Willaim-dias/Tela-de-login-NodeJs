// Importa a biblioteca sqlite3 e ativa o modo verbose para obter mensagens de log detalhadas
const sqlite = require("sqlite3").verbose();

// Cria ou abre um banco de dados SQLite
const db = new sqlite.Database('./BancoDeDados.sqlite', (err) => {
    // Se ocorrer um erro ao abrir ou criar o banco de dados, exibe a mensagem de erro no console
    if (err) {
        console.error(err.message);
    } else {
        // Se o banco de dados for aberto ou criado com sucesso, exibe uma mensagem de sucesso no console
        console.log("Criação bem-sucedida do banco de dados");
    }
});

// Exporta a conexão com o banco de dados para que possa ser utilizada em outros arquivos do projeto
module.exports = db;