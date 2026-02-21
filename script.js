// ==================== CONFIGURAÇÃO DO MAPA ====================
const canvas = document.getElementById('mapaCanvas');
const ctx = canvas.getContext('2d');
const tooltip = document.getElementById('tooltip');

// Estados com coordenadas e imagens
const estados = [
    { nome: 'AC', sigla: 'AC', regiao: 'Norte', cor: '#2E7D32', x: 200, y: 380, img: 'imagens/mapa/ac.png' },
    { nome: 'AM', sigla: 'AM', regiao: 'Norte', cor: '#2E7D32', x: 280, y: 270, img: 'imagens/mapa/am.png' },
    { nome: 'PA', sigla: 'PA', regiao: 'Norte', cor: '#2E7D32', x: 440, y: 210, img: 'imagens/mapa/pa.png' },
    { nome: 'RO', sigla: 'RO', regiao: 'Norte', cor: '#2E7D32', x: 240, y: 330, img: 'imagens/mapa/ro.png' },
    { nome: 'RR', sigla: 'RR', regiao: 'Norte', cor: '#2E7D32', x: 330, y: 180, img: 'imagens/mapa/rr.png' },
    { nome: 'TO', sigla: 'TO', regiao: 'Norte', cor: '#2E7D32', x: 390, y: 310, img: 'imagens/mapa/to.png' },
    { nome: 'AP', sigla: 'AP', regiao: 'Norte', cor: '#2E7D32', x: 500, y: 140, img: 'imagens/mapa/ap.png' },
    { nome: 'MA', sigla: 'MA', regiao: 'Nordeste', cor: '#F57C00', x: 460, y: 270, img: 'imagens/mapa/ma.png' },
    { nome: 'PI', sigla: 'PI', regiao: 'Nordeste', cor: '#F57C00', x: 440, y: 340, img: 'imagens/mapa/pi.png' },
    { nome: 'CE', sigla: 'CE', regiao: 'Nordeste', cor: '#F57C00', x: 540, y: 240, img: 'imagens/mapa/ce.png' },
    { nome: 'RN', sigla: 'RN', regiao: 'Nordeste', cor: '#F57C00', x: 590, y: 270, img: 'imagens/mapa/rn.png' },
    { nome: 'PB', sigla: 'PB', regiao: 'Nordeste', cor: '#F57C00', x: 590, y: 310, img: 'imagens/mapa/pb.png' },
    { nome: 'PE', sigla: 'PE', regiao: 'Nordeste', cor: '#F57C00', x: 560, y: 350, img: 'imagens/mapa/pe.png' },
    { nome: 'AL', sigla: 'AL', regiao: 'Nordeste', cor: '#F57C00', x: 570, y: 380, img: 'imagens/mapa/al.png' },
    { nome: 'SE', sigla: 'SE', regiao: 'Nordeste', cor: '#F57C00', x: 540, y: 400, img: 'imagens/mapa/se.png' },
    { nome: 'BA', sigla: 'BA', regiao: 'Nordeste', cor: '#F57C00', x: 480, y: 430, img: 'imagens/mapa/ba.png' },
    { nome: 'MT', sigla: 'MT', regiao: 'Centro-Oeste', cor: '#FDD835', x: 320, y: 400, img: 'imagens/mapa/mt.png' },
    { nome: 'MS', sigla: 'MS', regiao: 'Centro-Oeste', cor: '#FDD835', x: 330, y: 490, img: 'imagens/mapa/ms.png' },
    { nome: 'GO', sigla: 'GO', regiao: 'Centro-Oeste', cor: '#FDD835', x: 390, y: 420, img: 'imagens/mapa/go.png' },
    { nome: 'DF', sigla: 'DF', regiao: 'Centro-Oeste', cor: '#FDD835', x: 380, y: 380, img: 'imagens/mapa/df.png' },
    { nome: 'MG', sigla: 'MG', regiao: 'Sudeste', cor: '#1976D2', x: 430, y: 480, img: 'imagens/mapa/mg.png' },
    { nome: 'ES', sigla: 'ES', regiao: 'Sudeste', cor: '#1976D2', x: 500, y: 470, img: 'imagens/mapa/es.png' },
    { nome: 'RJ', sigla: 'RJ', regiao: 'Sudeste', cor: '#1976D2', x: 480, y: 530, img: 'imagens/mapa/rj.png' },
    { nome: 'SP', sigla: 'SP', regiao: 'Sudeste', cor: '#1976D2', x: 400, y: 540, img: 'imagens/mapa/sp.png' },
    { nome: 'PR', sigla: 'PR', regiao: 'Sul', cor: '#C2185B', x: 380, y: 590, img: 'imagens/mapa/pr.png' },
    { nome: 'SC', sigla: 'SC', regiao: 'Sul', cor: '#C2185B', x: 420, y: 630, img: 'imagens/mapa/sc.png' },
    { nome: 'RS', sigla: 'RS', regiao: 'Sul', cor: '#C2185B', x: 350, y: 670, img: 'imagens/mapa/rs.png' }
];

// Função para desenhar o mapa
function desenharMapa() {
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenha o fundo
    ctx.fillStyle = '#a4d3ee';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Desenha cada estado
    estados.forEach(estado => {
        // Tenta carregar a imagem
        const img = new Image();
        img.src = estado.img;
        
        img.onload = () => {
            // Se a imagem carregar, desenha ela
            ctx.drawImage(img, estado.x-25, estado.y-25, 50, 50);
        };
        
        img.onerror = () => {
            // Se a imagem não carregar, desenha um círculo colorido
            ctx.fillStyle = estado.cor;
            ctx.beginPath();
            ctx.arc(estado.x, estado.y, 25, 0, Math.PI*2);
            ctx.fill();
            
            // Borda branca
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Nome do estado
            ctx.fillStyle = 'white';
            ctx.font = 'bold 14px Arial';
            ctx.shadowColor = 'black';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillText(estado.sigla, estado.x-12, estado.y+5);
            
            // Reset da sombra
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        };
    });
}

// Inicializa o mapa quando a página carregar
window.onload = function() {
    console.log('Página carregada, desenhando mapa...');
    desenharMapa();
};
