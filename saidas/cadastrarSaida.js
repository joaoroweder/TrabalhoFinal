let res = document.getElementById('res')
let cadastrar = document.getElementById('cadastrar')

cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    
    let data = new Date().toISOString().slice(0,10)
    // let data  = document.getElementById('data')
    let horaSaida = document.getElementById('horaSaida').value
    let horaVolta = document.getElementById('horaVolta').value
    let motivo = document.getElementById('motivo').value
    let local = document.getElementById('local').value
    let status = document.getElementById('status').value
    let nomeAluno = document.getElementById('nomeAluno').value
    let nomeProfessor = document.getElementById('nomeProfessor').value
    let codProfessor = Number(document.getElementById('codProfessor').value)
    let codAluno = Number(document.getElementById('codAluno').value)


    const valores = {
      dataSolicitacao: data,
      horaSaida: horaSaida,
      horaRetorno: horaVolta,
      motivo: motivo,
      localDestino: local,
      status: status,
      nomeAluno: nomeAluno,
      nomeProfessor: nomeProfessor,
      aluno_cod: codAluno,
      professor_cod: codProfessor
  }
  

    console.log(valores)

    res.innerHTML = ` `

    fetch(`http://localhost:8081/saida`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(valores)
    })
        .then(resp => {
            if (!resp.ok) throw new Error('Erro na requisição');
            return resp.json();
        })
        .then(dados => {
            console.log(dados)
            res.innerHTML = `<h2 style="color: green;">SAÍDA CADASTRADA COM SUCESSO !!!</h2>`
            res.style.fontSize = '33px'
            res.style.fontWeight = 'bold'
        })
        .catch(err => {
            res.innerHTML = `<h2 style="color: red;">ERRO AO CADASTRAR SAÍDA</h2>`
        })
})
