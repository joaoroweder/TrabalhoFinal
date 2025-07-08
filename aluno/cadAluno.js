let res = document.getElementById('res')
let cadastrar = document.getElementById('cadastrar')

cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    let nome = document.getElementById('nome')
    let sobrenome = document.getElementById('sobrenome')
    let matricula = document.getElementById('matricula')
    let telefone = document.getElementById('telefone')
    let email = document.getElementById('email')

    const valores ={
        nome: nome,
        sobrenome: sobrenome,
        matricula: matricula,
        telefone: telefone,
        email: email
    }

    console.log(valores)

    fetch('http://localhost:8081/aluno')
    .then(res => {
        if (!res.ok) throw new Error('Erro na requisição');
        return res.json();
      })
      .then(data => {
        input.disabled = false;
        
        res.innerHTML = `<h2 style=" color: green;">  ALUNO CADASTRADO COM SUCESSO !!!  </h2>`
        res.style.fontSize = '27px'
      })
      .catch(err => {
        console.log(err);
        alert('Erro ao Cadastrar.');
      });
})