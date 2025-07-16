const pedidosMap = {};

let res = document.getElementById('res')
document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaPedidos");

  fetch("http://localhost:8081/saida")
    .then(resp => {
      if (!resp.ok) throw new Error("Erro ao buscar pedidos");
      return resp.json();
    })
    .then(saidas => {
      lista.innerHTML = "";

      saidas.forEach(pedido => {
        // GUARDE aluno_cod e professor_cod no mapa!
        pedidosMap[pedido.codSaida] = pedido;

        const div = document.createElement("div");
        div.classList.add("pedido");

        const idAceito = `btnAceitar-${pedido.codSaida}`;
        const idRecusado = `btnRecusar-${pedido.codSaida}`;

        fetch(`http://localhost:8081/aluno/${pedido.aluno_cod}`)
        fetch(`http://localhost:8081/professor/${pedido.professor_cod}`)

        div.innerHTML = `
          <div style="border: 4px dotted violet; padding: 20px; border-radius: 20px; width: 600px; margin: 20px auto;">
  
          <strong>Código do Pedido:</strong> ${pedido.codSaida}<br>
          <strong>Aluno:</strong> ${pedido.nomeAluno}<br>
          <strong>Professor:</strong> ${pedido.nomeProfessor}<br>
          <strong>Motivo:</strong> ${pedido.motivo}<br>
          <strong>Destino:</strong> ${pedido.localDestino}<br>
          

          <button id="${idAceito}" style="width: 150px; height: 30px; background-color:rgb(231, 231, 231); font-weight: 
            bold; border-radius: 10px; padding-bottom: 5px; padding-top: 1x; font-size: 16px;">

          ✅ Aceitar</button>

          <button id="${idRecusado}" style="width: 150px; height: 30px; background-color:rgb(231, 231, 231); font-weight: 
            bold; border-radius: 10px; padding-bottom: 5px; padding-top: 1px; font-size: 16px; margin-top: 10px" >

          ❌ Recusar</button>  
          </div>
        `;
        div.style = `color: black; font-size: 23px;`
        // <strong>Status:</strong> <span id="status-${pedido.codSaida}">${pedido.status}</span><br>       

        lista.appendChild(div);

        document.getElementById(idAceito).addEventListener("click", () => {
          atualizarStatus(pedido.codSaida, "Aceito");
        });

        document.getElementById(idRecusado).addEventListener("click", () => {
          atualizarStatus(pedido.codSaida, "Recusado");
        });
      });
    })
    .catch(err => {
      lista.innerHTML = "Erro ao carregar pedidos.";
      console.error(err);
    });
});

function atualizarStatus(codSaida, novoStatus) {
  const saida = pedidosMap[codSaida];

  if (!saida) {
    alert("Erro: dados do pedido não encontrados.");
    return;
  }

  let codAluno = Number(document.getElementById('codAluno').value)
  let codProfessor = Number(document.getElementById('codProfessor').value)

  const saidaAtualizada = {
    dataSolicitacao: saida.dataSolicitacao,
    horaSaida: saida.horaSaida,
    horaRetorno: saida.horaRetorno,
    motivo: saida.motivo,
    localDestino: saida.localDestino,
    status: novoStatus,
    nomeAluno: saida.nomeAluno,
    nomeProfessor: saida.nomeProfessor,
    aluno_cod: codAluno,
    professor_cod: codProfessor,
  };

  console.log("Dados:",saidaAtualizada);

  fetch(`http://localhost:8081/saida/${codSaida}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },  
    body: JSON.stringify(saidaAtualizada)
  })
  .then(resp => {
    if (!resp.ok) throw new Error("Erro ao atualizar status");
    document.getElementById(`status-${codSaida}`).textContent = novoStatus;
    alert(`Pedido ${codSaida} atualizado para "${novoStatus}"`);
    console.log(resp)

  })
  .catch(err => {
    console.log(err)
    // alert("Erro ao atualizar status: " + err.message);
  });
}