document.addEventListener("DOMContentLoaded", async function() {
    
    
    //let loboSelecionado = JSON.parse(localStorage.getItem("loboSelecionado"));
    //buscar no lobo selecionado
    let loboSelecionado_list ; 

    try{
        const response =  await fetch("http://localhost:3000/loboSelecionado/", {
            method: "GET"
        })
        if ( !response.ok  ){
            throw new Error("error") ; 
        }
        loboSelecionado_list = await response.json() ;
    }catch(error ) {
        
        console.log(error)

    }
    
    let num = loboSelecionado_list.length - 1 ; 
    let loboSelecionado = loboSelecionado_list[num] ; 
    //console.log( loboSelecionado ) ; 

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
        botaoAdotar.addEventListener("click", async function() {
            //loboSelecionado.adotado = true;
            //localStorage.setItem("loboSelecionado", JSON.stringify(loboSelecionado));
            let auxFox = {
                adotado : true,
            }

            let exclude = "http://localhost:3000/lobos/"
            exclude += loboSelecionado.id ;
            
            await fetch(exclude ,{
                method : 'PATCH',
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify( auxFox ) 
            })
            
            
            
            //let lobos = JSON.parse(localStorage.getItem("lobos")) || [];
            //loboSelecionado_list = loboSelecionado_list.map(lobo => lobo.nome === loboSelecionado.nome ? loboSelecionado : lobo);
            //localStorage.setItem("lobos", JSON.stringify(lobos));

            

            exclude = "http://localhost:3000/loboSelecionado/"
            exclude += loboSelecionado.id ;
            
            await fetch(exclude ,{
                method : 'PATCH',
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify( auxFox ) 
            })





            botaoAdotar.innerText = "Adotado";
            botaoAdotar.style.backgroundColor = "green";
            botaoAdotar.disabled = true;

            window.location.href = "../adotar-lobinho/adotar-lobo.html" ; 

        });
    }

    // **Funcionalidade do botão "Excluir"**
    let botaoExcluir = document.getElementById("excluir");
    botaoExcluir.addEventListener("click", async function() {
        // Confirmação antes de excluir
        let confirmacao = confirm(`Tem certeza que deseja excluir o lobo ${loboSelecionado.nome}?`);
        if (!confirmacao) return;

        // Remove o lobo da lista geral

        //let lobos = JSON.parse(localStorage.getItem("lobos")) || [];
        //lobos = lobos.filter(lobo => lobo.nome !== loboSelecionado.nome);
        //localStorage.setItem("lobos", JSON.stringify(lobos));

        // Remove o lobo selecionado do localStorage
        //localStorage.removeItem("loboSelecionado");

        //excluir do json ; 
        let exclude = "http://localhost:3000/lobos/" ; 
        exclude += loboSelecionado.id ; 

        await fetch(exclude, {
            method: 'DELETE' , 
        })
        
        

        // Redireciona para a lista de lobos
        window.location.href = "../lista-de-lobinhos/lista-de-lobinhos.html";
    });
});
