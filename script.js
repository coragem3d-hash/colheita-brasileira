// TESTE MÍNIMO - APAGA TUDO E COLA ISSO
const canvas = document.getElementById('mapaCanvas');
const ctx = canvas.getContext('2d');

// Desenha um círculo vermelho gigante
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(400, 300, 100, 0, Math.PI * 2);
ctx.fill();
ctx.fillStyle = 'white';
ctx.font = 'bold 40px Arial';
ctx.fillText('TESTE', 300, 320);

alert('JavaScript está rodando!');
