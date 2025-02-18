document.addEventListener("DOMContentLoaded", async function() {
    
    
    //buscar no lobo selecionado

    //fazer o post para loboSelecionado
    
    //deletar rudo no banco de dados
    
    let resposta = await fetch("http://localhost:3000/loboSelecionado/") ; 
    lista = await resposta.json();
    if(lista.length > 1 ){
        loboExcluido = lista[0] ;
        console.log(loboExcluido) ; 
        let dateURL = `http://localhost:3000/loboSelecionado/${loboExcluido.id}` ; 
        await fetch(dateURL,{
            method : 'DELETE'
        })

    }
        





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
    
    console.log( loboSelecionado_list  ) ; 

    let num = loboSelecionado_list.length - 1 ; 
    let loboSelecionado = loboSelecionado_list[num] ; 
    

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
            
            
            let auxFox = {
                adotado : false,
            }

            let exclude = "http://localhost:3000/lobos/"
            exclude += loboSelecionado.id ;
            
            await fetch(exclude ,{
                method : 'PATCH',
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify( auxFox ) 
            })
            
            
            

            

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

    
    let botaoExcluir = document.getElementById("excluir");
    botaoExcluir.addEventListener("click", async function() {
        
        let confirmacao = confirm(`Tem certeza que deseja excluir o lobo ${loboSelecionado.nome}?`);
        if (!confirmacao) return;

        
        let exclude = "http://localhost:3000/lobos/" ; 
        exclude += loboSelecionado.id ; 

        await fetch(exclude, {
            method: 'DELETE' , 
        })
        
        

    
        window.location.href = "../lista-de-lobinhos/lista-de-lobinhos.html";
    });
});
