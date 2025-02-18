 async function addLobo(event) {
    event.preventDefault();

    let nome = document.getElementById("nomelobo").value.trim();
    let idade = document.getElementById("idadelobo").value.trim();
    let foto = document.getElementById("fotolobo").value.trim();
    let descricao = document.getElementById("desclobo").value.trim();

    
    let lobos ; 
    
    try{
        const response =  await fetch("http://localhost:3000/lobos/", {
            method: "GET"
        })
        if ( !response.ok  ){
            throw new Error("error") ; 
        }
        lobos = await response.json() ;
    }catch(error ) {
        
        console.log(error)

    }
    
    

    let proximoId = lobos.length > 0 ? Math.max(...lobos.map(lobo => lobo.id)) + 1 : 1;

    let novoLobo = {
        id: proximoId,
        nome: nome,
        idade: Number(idade), 
        descricao: descricao,
        imagem: foto,
        adotado: false,
        nomeDono: null,
        idadeDono: null,
        emailDono: null
    };

    
    let response = await fetch("http://localhost:3000/lobos/" , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( novoLobo )  
    })
    


    alert("Lobinho cadastrado com sucesso!");
    document.querySelector("form").reset();
}

document.addEventListener("DOMContentLoaded",  function() {
    document.getElementById("formButton").addEventListener("click", addLobo);
});
