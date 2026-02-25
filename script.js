// ==================== MAPA COM FRONTEIRAS REGIONAIS ====================
console.log('🚀 Iniciando mapa com divisões regionais');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    
    // Coordenadas refinadas para melhor espaçamento
    const estados = [
        // NORTE (verde) - mais espaçados
        { sigla: 'AC', regiao: 'Norte', cor: '#2E7D32', x: 240, y: 540, img: 'imagens/mapa/ac.png' },
        { sigla: 'AM', regiao: 'Norte', cor: '#2E7D32', x: 330, y: 420, img: 'imagens/mapa/am.png' },
        { sigla: 'PA', regiao: 'Norte', cor: '#2E7D32', x: 540, y: 340, img: 'imagens/mapa/pa.png' },
        { sigla: 'RO', regiao: 'Norte', cor: '#2E7D32', x: 300, y: 490, img: 'imagens/mapa/ro.png' },
        { sigla: 'RR', regiao: 'Norte', cor: '#2E7D32', x: 380, y: 280, img: 'imagens/mapa/rr.png' },
        { sigla: 'TO', regiao: 'Norte', cor: '#2E7D32', x: 490, y: 440, img: 'imagens/mapa/to.png' },
        { sigla: 'AP', regiao: 'Norte', cor: '#2E7D32', x: 620, y: 250, img: 'imagens/mapa/ap.png' },
        
        // NORDESTE (laranja)
        { sigla: 'MA', regiao: 'Nordeste', cor: '#F57C00', x: 560, y: 380, img: 'imagens/mapa/ma.png' },
        { sigla: 'PI', regiao: 'Nordeste', cor: '#F57C00', x: 530, y: 450, img: 'imagens/mapa/pi.png' },
        { sigla: 'CE', regiao: 'Nordeste', cor: '#F57C00', x: 650, y: 360, img: 'imagens/mapa/ce.png' },
        { sigla: 'RN', regiao: 'Nordeste', cor: '#F57C00', x: 710, y: 390, img: 'imagens/mapa/rn.png' },
        { sigla: 'PB', regiao: 'Nordeste', cor: '#F57C00', x: 710, y: 430, img: 'imagens/mapa/pb.png' },
        { sigla: 'PE', regiao: 'Nordeste', cor: '#F57C00', x: 670, y: 470, img: 'imagens/mapa/pe.png' },
        { sigla: 'AL', regiao: 'Nordeste', cor: '#F57C00', x: 680, y: 500, img: 'imagens/mapa/al.png' },
        { sigla: 'SE', regiao: 'Nordeste', cor: '#F57C00', x: 640, y: 530, img: 'imagens/mapa/se.png' },
        { sigla: 'BA', regiao: 'Nordeste', cor: '#F57C00', x: 570, y: 550, img: 'imagens/mapa/ba.png' },
        
        // CENTRO-OESTE (amarelo)
        { sigla: 'MT', regiao: 'Centro-Oeste', cor: '#FDD835', x: 400, y: 490, img: 'imagens/mapa/mt.png' },
        { sigla: 'MS', regiao: 'Centro-Oeste', cor: '#FDD835', x: 390, y: 600, img: 'imagens/mapa/ms.png' },
        { sigla: 'GO', regiao: 'Centro-Oeste', cor: '#FDD835', x: 480, y: 540, img: 'imagens/mapa/go.png' },
        { sigla: 'DF', regiao: 'Centro-Oeste', cor: '#FDD835', x: 470, y: 510, img: 'imagens/mapa/df.png' },
        
        // SUDESTE (azul)
        { sigla: 'MG', regiao: 'Sudeste', cor: '#1976D2', x: 530, y: 600, img: 'imagens/mapa/mg.png' },
        { sigla: 'ES', regiao: 'Sudeste', cor: '#1976D2', x: 610, y: 610, img: 'imagens/mapa/es.png' },
        { sigla: 'RJ', regiao: 'Sudeste', cor: '#1976D2', x: 570, y: 660, img: 'imagens/mapa/rj.png' },
        { sigla: 'SP', regiao: 'Sudeste', cor: '#1976D2', x: 490, y: 660, img: 'imagens/mapa/sp.png' },
        
        // SUL (vinho)
        { sigla: 'PR', regiao: 'Sul', cor: '#C2185B', x: 480, y: 720, img: 'imagens/mapa/pr.png' },
        { sigla: 'SC', regiao: 'Sul', cor: '#C2185B', x: 520, y: 760, img: 'imagens/mapa/sc.png' },
        { sigla: 'RS', regiao: 'Sul', cor: '#C2185B', x: 450, y: 810, img: 'imagens/mapa/rs.png' }
    ];
    
    function desenharFronteirasRegionais() {
        // Desenha linhas de separação entre as regiões
        // Usando paths (caminhos) para desenhar linhas curvas [citation:1]
        
        ctx.lineWidth = 4;
        ctx.setLineDash([12, 8]); // Linha tracejada estilosa
        
        // Fronteira Norte/Nordeste (traço verde)
        ctx.beginPath();
        ctx.moveTo(500, 300);
        ctx.lineTo(580, 380);
        ctx.strokeStyle = '#2E7D32';
        ctx.stroke();
        
        // Fronteira Nordeste/Centro-Oeste (traço laranja)
        ctx.beginPath();
        ctx.moveTo(560, 420);
        ctx.lineTo(520, 480);
        ctx.strokeStyle = '#F57C00';
        ctx.stroke();
        
        // Fronteira Centro-Oeste/Sudeste (traço amarelo)
        ctx.beginPath();
        ctx.moveTo(460, 560);
        ctx.lineTo(500, 590);
        ctx.strokeStyle = '#FDD835';
        ctx.stroke();
        
        // Fronteira Sudeste/Sul (traço azul)
        ctx.beginPath();
        ctx.moveTo(520, 680);
        ctx.lineTo(500, 710);
        ctx.strokeStyle = '#1976D2';
        ctx.stroke();
        
        // Reset das configurações de linha
        ctx.setLineDash([]);
    }
    
    function desenharMapa() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Fundo com gradiente [citation:1]
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#b3e0ff');
        grad.addColorStop(1, '#87CEEB');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Desenha as fronteiras entre regiões
        desenharFronteirasRegionais();
        
        // Desenha cada estado
        estados.forEach(estado => {
            const img = new Image();
            img.src = estado.img;
            
            img.onload = () => {
                // Imagem 70x70 (tamanho reduzido para dar mais espaço)
                ctx.drawImage(img, estado.x-35, estado.y-35, 70, 70);
            };
            
            img.onerror = () => {
                // Fallback: círculo colorido
                ctx.fillStyle = estado.cor;
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowBlur = 8;
                ctx.shadowOffsetY = 3;
                ctx.beginPath();
                ctx.arc(estado.x, estado.y, 30, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.shadowBlur = 0;
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 3;
                ctx.stroke();
                
                ctx.fillStyle = 'white';
                ctx.font = 'bold 16px Arial';
                ctx.shadowColor = 'black';
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                ctx.fillText(estado.sigla, estado.x-12, estado.y+6);
                
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            };
        });
    }
    
    desenharMapa();
}
// versão 2.0
