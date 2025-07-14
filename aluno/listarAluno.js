let res = document.getElementById('res')
let listar = document.getElementById('listar')

listar.addEventListener('click', (e)=>{
    e.preventDefault()

    res.innerHTML = ``
    fetch(`http://localhost:8081/aluno`)
    .then(resp => resp.json())
    .then(dados => {
        console.log(dados)  
        dados.forEach(valores => {
            res.innerHTML += ``
            res.innerHTML += `  <div style="border: 3px dotted violet; padding: 10px; border-radius: 20px">
                Código: ${valores.codAluno} <br>
                Nome: ${valores.nome} <br>
                Sobrenome: ${valores.sobrenome} <br>
                Mátricula: ${valores.matricula}<br>
                Telefone: ${valores.telefone}<br>
                Email: ${valores.email}<br>
            </div>`
            res.innerHTML += `<br><br>`

            res.style.fontSize = '23px'
            res.style.fontWeight = ''
        })
    })
    .catch((err)=>{
        console.error(`<p style='color: red;'> Erro ao listar os dados!',${err}`)
    })

})