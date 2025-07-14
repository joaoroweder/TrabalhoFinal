let res = document.getElementById('res')
let listar = document.getElementById('listar')

listar.addEventListener('click', (e)=>{
    e.preventDefault()

    res.innerHTML = ``
    fetch(`http://localhost:8081/saida`)
    .then(resp => resp.json())
    .then(dados => {
        console.log(dados)  
        dados.forEach(valores => {
            res.innerHTML += ``
            res.innerHTML += `  <div style="border: 3px dotted violet; padding: 10px; border-radius: 20px">
                Código: ${valores.codSaida} <br>
                Data de Solicitação: ${valores.dataSolicitacao} <br>
                Hora de Saída: ${valores.horaSaida} <br>
                Hora de Retorno: ${valores.horaRetorno}<br>
                Local Destino: ${valores.localDestino}<br>
                Motivo: ${valores.motivo}<br>
                Status do pedido: ${valores.status}<br>
                Nome do Aluno: ${valores.nomeAluno}<br>
                Nome do Professor: ${valores.nomeProfessor}<br>
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