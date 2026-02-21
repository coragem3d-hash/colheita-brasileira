// ==================== MAPA COM CÍRCULOS (FUNCIONA 100%) ====================
const canvas = document.getElementById('mapaCanvas');
const ctx = canvas.getContext('2d');
const tooltip = document.getElementById('tooltip');

// Estados com coordenadas e cores
const estados = [
    { nome: 'AC', sigla: 'AC', regiao: 'Norte', cor: '#2E7D32', x: 200, y: 380 },
    { nome: 'AM', sigla: 'AM', regiao: 'Norte', cor: '#2E7D32', x: 280, y: 270 },
    { nome: 'PA', sigla: 'PA', regiao: 'Norte', cor: '#2E7D32', x: 440, y: 210 },
    { nome: 'RO', sigla: 'RO', regiao: 'Norte', cor: '#2E7D32', x: 240, y: 330 },
    { nome: 'RR', sigla: 'RR', regiao: 'Norte', cor: '#2E7D32', x: 330, y: 180 },
    { nome: 'TO', sigla: 'TO', regiao: 'Norte', cor: '#2E7D32', x: 390, y: 310 },
    { nome: 'AP', sigla: 'AP', regiao: 'Norte', cor: '#2E7D32', x: 500, y: 140 },
    { nome: 'MA', sigla: 'MA', regiao: 'Nordeste', cor: '#F57C00', x: 460, y: 270 },
    { nome: 'PI', sigla: 'PI', regiao: 'Nordeste', cor: '#F57C00', x: 440, y: 340 },
    { nome: 'CE', sigla: 'CE', regiao: 'Nordeste', cor: '#F57C00', x: 540, y: 240 },
    { nome: 'RN', sigla: 'RN', regiao: 'Nordeste', cor: '#F57C00', x: 590, y: 270 },
    { nome: 'PB', sigla: 'PB', regiao: 'Nordeste', cor: '#F57C00', x: 590, y: 310 },
    { nome: 'PE', sigla: 'PE', regiao: 'Nordeste', cor: '#F57C00', x: 560, y: 350 },
    { nome: 'AL', sigla: 'AL', regiao: 'Nordeste', cor: '#F57C00', x: 570, y: 380 },
    { nome: 'SE', sigla: 'SE', regiao: 'Nordeste', cor: '#F57C00', x: 540, y: 400 },
    { nome: 'BA', sigla: 'BA', regiao: 'Nordeste', cor: '#F57C00', x: 480, y: 430 },
    { nome: 'MT', sigla: 'MT', regiao: 'Centro-Oeste', cor: '#FDD835', x: 320, y: 400 },
    { nome: 'MS', sigla: 'MS', regiao: 'Centro-Oeste', cor: '#FDD835', x: 330, y: 490 },
    { nome: 'GO', sigla: 'GO', regiao: 'Centro-Oeste', cor: '#FDD835', x: 390, y: 420 },
    { nome: 'DF', sigla: 'DF', regiao: 'Centro-Oeste', cor: '#FDD835', x: 380, y: 380 },
    { nome: 'MG', sigla: 'MG', regiao: 'Sudeste', cor: '#1976D2', x: 430, y: 480 },
    { nome: 'ES', sigla: 'ES', regiao: 'Sudeste', cor: '#1976D2', x: 500, y: 470 },
    { nome: 'RJ', sigla: 'RJ', regiao: 'Sudeste', cor: '#1976D2', x: 480, y: 530 },
    { nome: 'SP', sigla: 'SP', regiao: 'Sudeste', cor: '#1976D2', x: 400, y: 540 },
    { nome: 'PR', sigla: 'PR', regiao: 'Sul', cor: '#C2185B', x: 380, y: 590 },
    { nome: 'SC', sigla: 'SC', regiao: 'Sul', cor: '#C2185B', x: 420, y: 630 },
    { nome: 'RS', sigla: 'RS', regiao: 'Sul', cor: '#C2185B', x: 350, y: 670 }
];

function desenharMapa() {
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fundo do mapa
    ctx.fillStyle = '#b3e0ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Desenha cada estado como círculo
    estados.forEach(estado => {
        // Círculo colorido
        ctx.fillStyle = estado.cor;
        ctx.beginPath();
        ctx.arc(estado.x, estado.y, 22, 0, Math.PI * 2);
        ctx.fill();
        
        // Borda branca
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Sigla do estado
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.shadowColor = 'black';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.fillText(estado.sigla, estado.x - 12, estado.y + 5);
        
        // Reset sombra
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    });
    
    console.log('Mapa desenhado com sucesso!');
}

// Inicializa quando a página carregar
window.onload = function() {
    desenharMapa();
};
