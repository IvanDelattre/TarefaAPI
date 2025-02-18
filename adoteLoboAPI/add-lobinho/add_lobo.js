function addLobo(event) {
    event.preventDefault();

    let nome = document.getElementById("nomelobo").value.trim();
    let idade = document.getElementById("idadelobo").value.trim();
    let foto = document.getElementById("fotolobo").value.trim();
    let descricao = document.getElementById("desclobo").value.trim();

    let lobos = JSON.parse(localStorage.getItem("lobos"));
    let proximoId = lobos.length > 0 ? Math.max(...lobos.map(lobo => lobo.id)) + 1 : 1;

    let novoLobo = {
        id: proximoId,
        nome: nome,
        idade: Number(idade), // Converte idade para número
        descricao: descricao,
        imagem: foto,
        adotado: false,
        nomeDono: null,
        idadeDono: null,
        emailDono: null
    };

    lobos.push(novoLobo);

    localStorage.setItem("lobos", JSON.stringify(lobos));

    alert("Lobinho cadastrado com sucesso!");
    document.querySelector("form").reset();
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formButton").addEventListener("click", addLobo);
});
