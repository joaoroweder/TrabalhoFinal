let res = document.getElementById('res')
let consultar = document.getElementById('consultar')

consultar.addEventListener('click', (e)=>{
    e.preventDefault()

    let cod = document.getElementById('cod').value

    fetch(`http://localhost:8081/saida/${cod}`, {
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
                Código: ${dados.codSaida} <br>
                Data de Solicitação: ${dados.dataSolicitacao} <br>
                Hora de Saída: ${dados.horaSaida} <br>
                Hora de Retorno: ${dados.horaRetorno}<br>
                Local Destino: ${dados.localDestino}<br>
                Motivo: ${dados.motivo}<br>
                Status do pedido: ${dados.status}<br>
                Nome do Aluno: ${dados.nomeAluno}<br>
                Nome do Professor: ${dados.nomeProfessor}<br>
        </div> `
        res.style.fontSize = '26px'
    })
    .catch(err =>{
        console.log('Erro ao Consultar Aluno !!')
        console.log(err)
    })
})