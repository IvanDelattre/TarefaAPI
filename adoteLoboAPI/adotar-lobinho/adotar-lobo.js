document.addEventListener("DOMContentLoaded", function () {
    let loboSelecionado = JSON.parse(localStorage.getItem("loboSelecionado"));
    if (!loboSelecionado) {
        document.body.innerHTML = "<h1>Lobo não encontrado!</h1>";
        return;
    }

    // Atualiza os elementos da página com os dados do lobo
    document.querySelector("#nomeLobo").innerText = `Adote o(a) ${loboSelecionado.nome}`;
    document.querySelector("#idLobo").innerText = `ID: ${loboSelecionado.id}`;
    document.querySelector("#wolfImg").src = loboSelecionado.imagem;

    // Captura o botão de adoção
    let botaoAdotar = document.querySelector("#button");
    botaoAdotar.addEventListener("click", function (event) {
        event.preventDefault();
        
        let nomeDono = document.querySelector("#donoNome").value.trim();
        let idadeDono = document.querySelector("#donoIdade").value.trim();
        let emailDono = document.querySelector("#donoEmail").value.trim();

        if (!nomeDono || !idadeDono || !emailDono) {
            alert("Por favor, preencha todos os campos antes de adotar.");
            return;
        }

        // Atualiza os dados do lobo
        loboSelecionado.adotado = true;
        loboSelecionado.nomeDono = nomeDono;
        loboSelecionado.idadeDono = idadeDono;
        loboSelecionado.emailDono = emailDono;

        // Atualiza o localStorage
        localStorage.setItem("loboSelecionado", JSON.stringify(loboSelecionado));
        
        let lobos = JSON.parse(localStorage.getItem("lobos")) || [];
        lobos = lobos.map(lobo => (lobo.id === loboSelecionado.id ? loboSelecionado : lobo));
        localStorage.setItem("lobos", JSON.stringify(lobos));

        alert("Adoção concluída com sucesso!");
        window.location.href = "../lista-de-lobinhos/lista-de-lobinhos.html";
    });
});
