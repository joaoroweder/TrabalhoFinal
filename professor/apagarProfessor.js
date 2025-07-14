let res = document.getElementById('res')
let buscar = document.getElementById('buscar')
let atualizar = document.getElementById('atualizar')

buscar.addEventListener('click', (e)=> {
    e.preventDefault()

    const cod = document.getElementById('cod').value;
    
  fetch(`http://localhost:8081/professor/${cod}`)
  .then(resp =>{
    if (!resp.ok) throw new Error('Erro na requisição');
      return resp.json();
  })
  .then(dados => {
      document.getElementById('nome').value = dados.nome || '';
      document.getElementById('sobrenome').value = dados.sobrenome || '';
      document.getElementById('matricula').value = dados.matricula || '';
      document.getElementById('telefone').value = dados.telefone || '';
      document.getElementById('email').value = dados.email || '';

      document.getElementById('nome').disabled = false;
document.getElementById('sobrenome').disabled = false;
document.getElementById('matricula').disabled = false;
document.getElementById('telefone').disabled = false;
document.getElementById('email').disabled = false;
    })
    .catch(err => {
        console.log(err)
    })
})

apagar.addEventListener('click', (e) => {
    e.preventDefault()
    let cod = document.getElementById('cod').value

    res.innerHTML = ` `

    fetch(`http://localhost:8081/professor/${cod}`, {
      method: 'DELETE'
    })
    .then(resposta => {
      if(resposta.ok) {
        res.innerHTML += `<h2 style="color: green;"> Professor Deletado com Sucesso !! </h2>`
        res.style.fontSize = '32px'
      }else{
        res.innerHTML += `<h2 style="color: red;"> Não foi possível deletar esse Professor</h2>`
        res.style.fontSize = '32px'
      }
    })
    .catch(err => {
      console.log(err)
    })
})