// Adiciona um ouvinte de evento para o formulário com o ID 'loginForm' que será ativado quando o formulário for submetido
document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Evita que o comportamento padrão do formulário seja executado, que é recarregar a página
    event.preventDefault();

    // Atribui os valores dos campos de entrada 'email' e 'senha' às variáveis correspondentes
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const opt = 'cliente';

    // Verifica se ambos os campos foram preenchidos. Se não, exibe um alerta e interrompe a execução
    if (!email || !senha) {
        alert("Por favor, preencha todos os campos");
        return;
    }

    // Faz uma solicitação HTTP POST para o endpoint '/login' com o corpo da requisição contendo os dados do formulário em formato JSON
    fetch("/login", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            senha: senha,
            opt: opt
        }),
        headers: {
            "Content-Type": "application/json",
        },
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
        if (data.success) {
            window.location.href = data.redirect; // Redireciona o usuário para a URL especificada no campo 'redirect'
        } else {
            alert(data.message); // Exibe uma mensagem de erro caso o login não tenha sido bem-sucedido
        }
    })
    // Captura e trata qualquer erro que tenha ocorrido durante a solicitação ou processamento da resposta
    .catch(error => {
        console.error('Erro:', error); // Loga o erro no console
        alert("Erro na comunicação com o servidor"); // Exibe um alerta de erro para o usuário
    });
});
