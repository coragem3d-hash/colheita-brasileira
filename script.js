// ==================== MAPA COM ESPAÇAMENTO CORRIGIDO ====================
console.log('🚀 Reorganizando Centro-Oeste e Nordeste');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    const tooltip = document.getElementById('tooltip');
    
    const TAMANHO_PADRAO = 70;
    
    // Coordenadas REORGANIZADAS com mais espaço
    const estados = [
        // NORTE (verde) - mantido
        { sigla: 'AC', nome: 'Acre', regiao: 'Norte', cor: '#2E7D32', x: 220, y: 540 },
        { sigla: 'AM', nome: 'Amazonas', regiao: 'Norte', cor: '#2E7D32', x: 320, y: 430 },
        { sigla: 'PA', nome: 'Pará', regiao: 'Norte', cor: '#2E7D32', x: 520, y: 330 },
        { sigla: 'RO', nome: 'Rondônia', regiao: 'Norte', cor: '#2E7D32', x: 280, y: 490 },
        { sigla: 'RR', nome: 'Roraima', regiao: 'Norte', cor: '#2E7D32', x: 380, y: 270 },
        { sigla: 'TO', nome: 'Tocantins', regiao: 'Norte', cor: '#2E7D32', x: 480, y: 430 },
        { sigla: 'AP', nome: 'Amapá', regiao: 'Norte', cor: '#2E7D32', x: 620, y: 240 },
        
        // NORDESTE (laranja) - REORGANIZADO em 2 linhas
        { sigla: 'MA', nome: 'Maranhão', regiao: 'Nordeste', cor: '#F57C00', x: 550, y: 360 },
        { sigla: 'PI', nome: 'Piauí', regiao: 'Nordeste', cor: '#F57C00', x: 530, y: 440 },
        { sigla: 'CE', nome: 'Ceará', regiao: 'Nordeste', cor: '#F57C00', x: 660, y: 340 },
        { sigla: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste', cor: '#F57C00', x: 730, y: 370 },
        { sigla: 'PB', nome: 'Paraíba', regiao: 'Nordeste', cor: '#F57C00', x: 730, y: 420 },
        { sigla: 'PE', nome: 'Pernambuco', regiao: 'Nordeste', cor: '#F57C00', x: 690, y: 460 },
        { sigla: 'AL', nome: 'Alagoas', regiao: 'Nordeste', cor: '#F57C00', x: 700, y: 500 },
        { sigla: 'SE', nome: 'Sergipe', regiao: 'Nordeste', cor: '#F57C00', x: 660, y: 540 },
        { sigla: 'BA', nome: 'Bahia', regiao: 'Nordeste', cor: '#F57C00', x: 590, y: 560 },
        
        // CENTRO-OESTE (amarelo) - REORGANIZADO com +30px entre eles
        { sigla: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste', cor: '#FDD835', x: 380, y: 480 },
        { sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', cor: '#FDD835', x: 350, y: 610 }, // +30px y
        { sigla: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste', cor: '#FDD835', x: 470, y: 540 },
        { sigla: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste', cor: '#FDD835', x: 460, y: 490 },
        
        // SUDESTE (azul) - mantido
        { sigla: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste', cor: '#1976D2', x: 540, y: 600 },
        { sigla: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste', cor: '#1976D2', x: 620, y: 610 },
        { sigla: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste', cor: '#1976D2', x: 580, y: 670 },
        { sigla: 'SP', nome: 'São Paulo', regiao: 'Sudeste', cor: '#1976D2', x: 500, y: 670 },
        
        // SUL (vinho) - mantido
        { sigla: 'PR', nome: 'Paraná', regiao: 'Sul', cor: '#C2185B', x: 480, y: 740 },
        { sigla: 'SC', nome: 'Santa Catarina', regiao: 'Sul', cor: '#C2185B', x: 520, y: 800 },
        { sigla: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul', cor: '#C2185B', x: 440, y: 860 }
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
                ctx.font = 'bold 16px Arial';
                ctx.shadowColor = 'black';
                ctx.shadowBlur = 4;
                ctx.fillText(estado.sigla, estado.x-12, estado.y+6);
                
                ctx.shadowBlur = 0;
            };
        });
    }
    
    desenharMapa();
}
