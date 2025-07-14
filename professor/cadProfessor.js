let res = document.getElementById('res')
let cadastrar = document.getElementById('cadastrar')

cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let sobrenome = document.getElementById('sobrenome').value
    let matricula = document.getElementById('matricula').value
    let telefone = document.getElementById('telefone').value
    let email = document.getElementById('email').value

    const valores ={
        nome: nome,
        sobrenome: sobrenome,
        matricula: Number(matricula),
        telefone: telefone,
        email: email
    }

    console.log(valores)

    res.innerHTML = ` `
    fetch(`http://localhost:8081/professor`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(valores)
    })
    .then(data => {
      console.log(data)
      res.innerHTML += `<h2 style="color: green;"> PROFESSOR CADASTRADO COM SUCESSO !!!  </h2>`
      res.style.fontSize = '33px'
      res.style.fontWeight = 'bold'
    })
    .then(resp => {
      if (!resp.ok) throw new Error('Erro na requisição');
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });

})