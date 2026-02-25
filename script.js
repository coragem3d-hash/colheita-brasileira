// ==================== MAPA COM IMAGENS GRANDES E ESPAÇADAS ====================
console.log('🚀 Mapa com imagens 110x110 e muito espaço');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    const tooltip = document.getElementById('tooltip');
    
    // TAMANHO GRANDE (110x110)
    const TAMANHO_PADRAO = 110;
    
    // Coordenadas com ESPAÇAMENTO EXTRA (fator 1.3)
    const FATOR = 1.3;
    
    const estados = [
        // NORTE (verde)
        { sigla: 'AC', nome: 'Acre', regiao: 'Norte', cor: '#2E7D32', x: Math.round(220 * FATOR), y: Math.round(540 * FATOR) },
        { sigla: 'AM', nome: 'Amazonas', regiao: 'Norte', cor: '#2E7D32', x: Math.round(330 * FATOR), y: Math.round(420 * FATOR) },
        { sigla: 'PA', nome: 'Pará', regiao: 'Norte', cor: '#2E7D32', x: Math.round(530 * FATOR), y: Math.round(320 * FATOR) },
        { sigla: 'RO', nome: 'Rondônia', regiao: 'Norte', cor: '#2E7D32', x: Math.round(290 * FATOR), y: Math.round(490 * FATOR) },
        { sigla: 'RR', nome: 'Roraima', regiao: 'Norte', cor: '#2E7D32', x: Math.round(390 * FATOR), y: Math.round(300 * FATOR) },
        { sigla: 'TO', nome: 'Tocantins', regiao: 'Norte', cor: '#2E7D32', x: Math.round(470 * FATOR), y: Math.round(420 * FATOR) },
        { sigla: 'AP', nome: 'Amapá', regiao: 'Norte', cor: '#2E7D32', x: Math.round(630 * FATOR), y: Math.round(270 * FATOR) },
        
        // NORDESTE (laranja)
        { sigla: 'MA', nome: 'Maranhão', regiao: 'Nordeste', cor: '#F57C00', x: Math.round(560 * FATOR), y: Math.round(360 * FATOR) },
        { sigla: 'PI', nome: 'Piauí', regiao: 'Nordeste', cor: '#F57C00', x: Math.round(540 * FATOR), y: Math.round(440 * FATOR) },
        { sigla: 'CE', nome: 'Ceará', regiao: 'Nordeste', cor: '#F57C00', x: Math.round(670 * FATOR), y: Math.round(340 * FATOR) },
        { sigla: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste', cor: '#F57C00', x: Math.round(740 * FATOR), y: Math.round(370 * FATOR) },
        { sigla: 'PB', nome: 'Paraíba', regiao: 'Nordeste', cor: '#F57C00', x: Math.round(740 * FATOR), y: Math.round(420 * FATOR) },
        { sigla: 'PE', nome: 'Pernambuco', regiao: 'Nordeste', cor: '#F57C00', x: Math.round(700 * FATOR), y: Math.round(460 * FATOR) },
        { sigla: 'AL', nome: 'Alagoas', regiao: 'Nordeste', cor: '#F57C00', x: Math.round(720 * FATOR), y: Math.round(500 * FATOR) },
        { sigla: 'SE', nome: 'Sergipe', regiao: 'Nordeste', cor: '#F57C00', x: Math.round(680 * FATOR), y: Math.round(540 * FATOR) },
        { sigla: 'BA', nome: 'Bahia', regiao: 'Nordeste', cor: '#F57C00', x: Math.round(610 * FATOR), y: Math.round(560 * FATOR) },
        
        // CENTRO-OESTE (amarelo)
        { sigla: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste', cor: '#FDD835', x: Math.round(390 * FATOR), y: Math.round(480 * FATOR) },
        { sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', cor: '#FDD835', x: Math.round(370 * FATOR), y: Math.round(590 * FATOR) },
        { sigla: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste', cor: '#FDD835', x: Math.round(480 * FATOR), y: Math.round(540 * FATOR) },
        { sigla: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste', cor: '#FDD835', x: Math.round(470 * FATOR), y: Math.round(490 * FATOR) },
        
        // SUDESTE (azul)
        { sigla: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste', cor: '#1976D2', x: Math.round(550 * FATOR), y: Math.round(600 * FATOR) },
        { sigla: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste', cor: '#1976D2', x: Math.round(630 * FATOR), y: Math.round(610 * FATOR) },
        { sigla: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste', cor: '#1976D2', x: Math.round(590 * FATOR), y: Math.round(670 * FATOR) },
        { sigla: 'SP', nome: 'São Paulo', regiao: 'Sudeste', cor: '#1976D2', x: Math.round(510 * FATOR), y: Math.round(670 * FATOR) },
        
        // SUL (vinho)
        { sigla: 'PR', nome: 'Paraná', regiao: 'Sul', cor: '#C2185B', x: Math.round(490 * FATOR), y: Math.round(740 * FATOR) },
        { sigla: 'SC', nome: 'Santa Catarina', regiao: 'Sul', cor: '#C2185B', x: Math.round(530 * FATOR), y: Math.round(800 * FATOR) },
        { sigla: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul', cor: '#C2185B', x: Math.round(450 * FATOR), y: Math.round(860 * FATOR) }
    ];
    
    function desenharMapa() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Fundo
        ctx.fillStyle = '#b3e0ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        estados.forEach(estado => {
            const img = new Image();
            img.src = `imagens/mapa/${estado.sigla.toLowerCase()}.png`;
            
            img.onload = () => {
                // Imagem GRANDE 110x110
                ctx.drawImage(img, estado.x - TAMANHO_PADRAO/2, estado.y - TAMANHO_PADRAO/2, TAMANHO_PADRAO, TAMANHO_PADRAO);
            };
            
            img.onerror = () => {
                // Fallback
                ctx.fillStyle = estado.cor;
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowBlur = 8;
                ctx.shadowOffsetY = 3;
                ctx.beginPath();
                ctx.arc(estado.x, estado.y, TAMANHO_PADRAO/2, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.shadowBlur = 0;
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 3;
                ctx.stroke();
                
                ctx.fillStyle = 'white';
                ctx.font = 'bold 20px Arial';
                ctx.shadowColor = 'black';
                ctx.shadowBlur = 4;
                ctx.fillText(estado.sigla, estado.x-18, estado.y+8);
                
                ctx.shadowBlur = 0;
            };
        });
    }
    
    desenharMapa();
}
