let res = document.getElementById('res')
let atualizar = document.getElementById('atualizar')
let buscar = document.getElementById('buscar')

buscar.addEventListener('click', () => {
    fetch('http://localhost:8081/saida')
      .then(res => {
        if (!res.ok) throw new Error('Erro na requisição');
        return res.json();
      })
      .then(data => {
        input.disabled = false; // Habilita o input se tudo deu certo
      })
      .catch(error => {
        console.error(error);
        alert('Erro ao executar ação.');
      });
  });