document.addEventListener("DOMContentLoaded", function() {
    let loboSelecionado = JSON.parse(localStorage.getItem("loboSelecionado"));

    if (!loboSelecionado) {
        document.body.innerHTML = "<h1>Lobo não encontrado!</h1>";
        return;
    }

    document.getElementById("nomeLobo").innerText = loboSelecionado.nome;
    document.getElementById("wolfImg").src = loboSelecionado.imagem;
    document.getElementById("idadeLobo").innerText = `Idade: ${loboSelecionado.idade} anos`;
    document.getElementById("description").innerText = loboSelecionado.descricao;

    let botaoAdotar = document.getElementById("adotar");
    if (loboSelecionado.adotado) {
        botaoAdotar.innerText = "Adotado";
        botaoAdotar.style.backgroundColor = "green";
        botaoAdotar.disabled = true;
    } else {
        botaoAdotar.addEventListener("click", function() {
            loboSelecionado.adotado = true;
            localStorage.setItem("loboSelecionado", JSON.stringify(loboSelecionado));

            let lobos = JSON.parse(localStorage.getItem("lobos")) || [];
            lobos = lobos.map(lobo => lobo.nome === loboSelecionado.nome ? loboSelecionado : lobo);
            localStorage.setItem("lobos", JSON.stringify(lobos));

            botaoAdotar.innerText = "Adotado";
            botaoAdotar.style.backgroundColor = "green";
            botaoAdotar.disabled = true;
        });
    }

    // **Funcionalidade do botão "Excluir"**
    let botaoExcluir = document.getElementById("excluir");
    botaoExcluir.addEventListener("click", function() {
        // Confirmação antes de excluir
        let confirmacao = confirm(`Tem certeza que deseja excluir o lobo ${loboSelecionado.nome}?`);
        if (!confirmacao) return;

        // Remove o lobo da lista geral
        let lobos = JSON.parse(localStorage.getItem("lobos")) || [];
        lobos = lobos.filter(lobo => lobo.nome !== loboSelecionado.nome);
        localStorage.setItem("lobos", JSON.stringify(lobos));

        // Remove o lobo selecionado do localStorage
        localStorage.removeItem("loboSelecionado");

        // Redireciona para a lista de lobos
        window.location.href = "../lista-de-lobinhos/lista-de-lobinhos.html";
    });
});
