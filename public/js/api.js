const addUserBtn = document.getElementById("submitUser");

// Adiciona um ouvinte de evento ao botão com o ID 'submitUser' que será ativado quando o botão for clicado
addUserBtn.addEventListener("click", () => {

    // Atribui os valores dos campos de entrada às variáveis correspondentes
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const userEmail = document.getElementById("email").value;
    const userEndereco = document.getElementById("endereco").value;
    const userSenha = document.getElementById("senha").value;
    const userSenhaConf = document.getElementById("senhaConf").value;

    // Verifica se todos os campos foram preenchidos. Se não, exibe um alerta e interrompe a execução
    if (!nome || !sobrenome || !userEmail || !userEndereco || !userSenha || !userSenhaConf) {
        alert("Por favor, preencha todos os campos");
        return;
    }
    
    // Verifica se as senhas são iguais
    if (userSenha !== userSenhaConf) {
        alert("As senhas digitadas não são iguais!");
        return;
    }

    // Faz uma solicitação HTTP POST para o endpoint '/regUsuario' com o corpo da requisição contendo os dados do formulário em formato JSON
    fetch("/regUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: nome,
            sobrenome: sobrenome,
            email: userEmail,
            endereco: userEndereco,
            senha: userSenha
        })
    })
    // Verifica se a resposta da solicitação foi bem-sucedida (código de status 200-299)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status}`);
        }
        return response.json(); // Converte a resposta em JSON
    })
    // Processa os dados recebidos da resposta
    .then(data => {
        alert(data.message); // Exibe a mensagem recebida do servidor
    })
    // Captura e trata qualquer erro que tenha ocorrido durante a solicitação ou processamento da resposta
    .catch((error) => {
        console.error('Erro:', error); // Loga o erro no console
    });
});
