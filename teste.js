const pedidosMap = {};

document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaPedidos");

  fetch("http://localhost:8081/saida")
    .then(resp => {
      if (!resp.ok) throw new Error("Erro ao buscar pedidos");
      return resp.json();
    })
    .then(saidas => {
      lista.innerHTML = "";

      saidas.forEach(async pedido => {
        const codAluno = pedido.aluno_cod;
        const codProfessor = pedido.professor_cod;

        // Só faz o fetch se os códigos existirem
        if (!codAluno || !codProfessor) {
          console.warn("Pedido sem aluno/professor:", pedido);
          return;
        }

        // Buscar aluno e professor
        const alunoResp = await fetch(`http://localhost:8081/aluno/${codAluno}`);
        const professorResp = await fetch(`http://localhost:8081/professor/${codProfessor}`);

        const aluno = await alunoResp.json();
        const professor = await professorResp.json();

        // Atualiza o pedido
        pedido.aluno = aluno;
        pedido.professor = professor;

        // Salva no mapa
        pedidosMap[pedido.codSaida] = pedido;

        const idAceito = `btnAceitar-${pedido.codSaida}`;
        const idRecusado = `btnRecusar-${pedido.codSaida}`;

        const div = document.createElement("div");
        div.classList.add("pedido");

        div.innerHTML = `
          <div style="border: 4px dotted violet; padding: 20px; border-radius: 20px; width: 600px; margin: 20px auto;">
            <strong>Código do Pedido:</strong> ${pedido.codSaida}<br>
            <strong>Aluno:</strong> ${aluno.nome}<br>
            <strong>Motivo:</strong> ${pedido.motivo}<br>
            <strong>Status:</strong> <span id="status-${pedido.codSaida}">${pedido.status}</span><br>
            <button id="${idAceito}" style="width: 150px; height: 30px; background-color:rgb(231, 231, 231); font-weight: 
              bold; border-radius: 10px; font-size: 16px;">✅ Aceitar</button>
            <button id="${idRecusado}" style="width: 150px; height: 30px; background-color:rgb(231, 231, 231); font-weight: 
              bold; border-radius: 10px; font-size: 16px; margin-top: 10px">❌ Recusar</button>  
          </div>
        `;

        div.style = `color: black; font-size: 23px;`;
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

  if (!saida || !saida.aluno || !saida.professor) {
    alert("Erro: dados do aluno ou professor não encontrados.");
    return;
  }

  const saidaAtualizada = {
    dataSolicitacao: saida.dataSolicitacao,
    horaSaida: saida.horaSaida,
    horaRetorno: saida.horaRetorno,
    motivo: saida.motivo,
    localDestino: saida.localDestino,
    status: novoStatus,
    codAluno: saida.aluno.codAluno,
    codProfessor: saida.professor.codProfessor
  };

  console.log(saidaAtualizada);

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
    })
    .catch(err => {
      alert("Erro ao atualizar status: " + err.message);
    });
}
