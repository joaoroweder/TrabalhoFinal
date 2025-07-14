let res = document.getElementById('res')
let buscar = document.getElementById('buscar')
let apagar = document.getElementById('apagar')

buscar.addEventListener('click', (e)=> {
    e.preventDefault()

    const cod = document.getElementById('cod').value;
    
  fetch(`http://localhost:8081/saida/${cod}`)
  .then(resp =>{
    if (!resp.ok) throw new Error('Erro na requisição');
      return resp.json();
  })
  .then(dados => {
      document.getElementById('data').value = dados.dataSolicitacao || '';
      document.getElementById('horaSaida').value = dados.horaSaida || '';
      document.getElementById('horaVolta').value = dados.horaRetorno || '';
      document.getElementById('motivo').value = dados.motivo || '';
      document.getElementById('local').value = dados.localDestino || '';
      document.getElementById('status').value = dados.status || '';
      document.getElementById('nomeAluno').value = dados.nomeAluno || '';
      document.getElementById('nomeProfessor').value = dados.nomeProfessor || '';
      document.getElementById('codProfessor').value = dados.professor_cod || '';
      document.getElementById('codAluno').value = dados.aluno_cod || '';

      document.getElementById('data').disabled = false;
      document.getElementById('horaSaida').disabled = false;
      document.getElementById('horaVolta').disabled = false;
      document.getElementById('motivo').disabled = false;
      document.getElementById('local').disabled = false;
      document.getElementById('status').disabled = false;
      document.getElementById('nomeAluno').disabled = false;
      document.getElementById('nomeProfessor').disabled = false;
      document.getElementById('codProfessor').disabled = false;
      document.getElementById('codAluno').disabled = false;
    })
    .catch(err => {
        console.log(err)
    })
})


apagar.addEventListener('click', (e) => {
    e.preventDefault()
    let cod = document.getElementById('cod').value

    res.innerHTML = ` `

    fetch(`http://localhost:8081/saida/${cod}`, {
      method: 'DELETE'
    })
    .then(resposta => {
      if(resposta.ok) {
        res.innerHTML += `<h2 style="color: green;"> Saída Deletada com Sucesso !! </h2>`
        res.style.fontSize = '32px'
      }else{
        res.innerHTML += `<h2 style="color: red;"> Não foi possível deletar essa Saída</h2>`
        res.style.fontSize = '32px'
      }
    })
    .catch(err => {
      console.log(err)
    })
})



// document.getElementById('data').value = dados.dataSolicitacao || '';
// document.getElementById('horaSaida').value = dados.horaSaida || '';
// document.getElementById('horaVolta').value = dados.horaRetorno || '';
// document.getElementById('motivo').value = dados.motivo || '';
// document.getElementById('local').value = dados.localDestino || '';
// document.getElementById('status').value = dados.status || '';
// document.getElementById('nomeAluno').value = dados.nomeAluno || '';
// document.getElementById('nomeProfessor').value = dados.nomeProfessor || '';
// document.getElementById('codProfessor').value = dados.professor_cod || '';
// document.getElementById('codAluno').value = dados.aluno_cod || '';

// document.getElementById('data').disabled = false;
// document.getElementById('horaSaida').disabled = false;
// document.getElementById('horaVolta').disabled = false;
// document.getElementById('motivo').disabled = false;
// document.getElementById('local').disabled = false;
// document.getElementById('status').disabled = false;
// document.getElementById('nomeAluno').disabled = false;
// document.getElementById('nomeProfessor').disabled = false;
// document.getElementById('codProfessor').disabled = false;
// document.getElementById('codAluno').disabled = false;