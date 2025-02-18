async function exemplo() {
    const resposta = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'eve.holt@reqres.in',
            password: 'cityslicka',
        }),
    });
    const dados = await resposta.json();

    const resposta2 = await fetch('https://reqres.in/api/users/2', {
        method: 'GET',
        headers: {
            'Authorization': dados.token
        },
    });
    const dados2 = await resposta2.json();
    console.log(dados);
    console.log(dados2);
}


exemplo()
