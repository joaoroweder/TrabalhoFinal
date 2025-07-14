let res = document.getElementById('res')
let consultar = document.getElementById('consultar')

consultar.addEventListener('click', (e)=>{
    e.preventDefault()

    let cod = document.getElementById('cod').value

    fetch(`http://localhost:8081/aluno/${cod}`, {
        method: "GET"
    })
    .then(resp => {
        if(!resp.ok) throw new Error(`Erro ${resp.status} - ID Não Encontrado !!`);
        return resp.json();
    })
    .then(dados => {
        console.log(dados)

        res.innerHTML = `  `
        res.innerHTML = ` <div style="border: 3px dotted violet; padding: 10px; border-radius: 20px;">
            Código: ${dados.codAluno} <br>
            Nome: ${dados.nome} <br>
            Sobrenome: ${dados.sobrenome} <br>
            Mátricula: ${dados.matricula}<br>
            Telefone: ${dados.telefone}<br>
            Email: ${dados.email}<br>
        </div> `
        res.style.fontSize = '26px'
    })
    .catch(err =>{
        console.log('Erro ao Consultar Aluno !!')
        console.log(err)
        // alert("Erro: "+ err.message)
    })
})