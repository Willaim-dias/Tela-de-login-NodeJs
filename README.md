# Tela de login Com nodeJS

## Descrição
Este código é um exemplo simplificado de uma tela de login usando Node.js.
O código pode ser melhorado em várias áreas,
como a criptografia da senha antes de enviar para o servidor, a verificação se já existe um usuário com o mesmo nome ou e-mail e uma verificação de duas etapas.

## Bibliotecas Utilizadas
express: Framework web rápido e minimalista para Node.js.

express-session: Middleware para gerenciar sessões de usuários no Express.

body-parser: Middleware para analisar corpos de requisições HTTP em JSON, buffer, string ou URL.

bcryptjs: Biblioteca para criptografia de senhas.

path: Módulo nativo do Node.js para manipulação de caminhos de arquivos e diretórios.

sqlite3: Biblioteca para interagir com bancos de dados SQLite.

## Instalação
npm install express express-session body-parser bcryptjs path sqlite3

## Uso
1. Clone o repositório para a sua máquina local.

2. Navegue até o diretório do projeto.

3. Instale as bibliotecas necessárias com o comando fornecido acima.

4. Execute o servidor com o comando: node server.js

5. Abra o navegador e, na barra de pesquisa, digite o endereço local e a porta onde o servidor está escutando. Neste caso, use: localhost:3000
