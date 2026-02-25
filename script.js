// ==================== MAPA - IMAGENS 100x100 E MAIS ESPAÇO ====================
console.log('🚀 Aumentando imagens para 100x100 e mais espaço');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    const tooltip = document.getElementById('tooltip');
    
    // TAMANHO GRANDE (100x100)
    const TAMANHO_PADRAO = 100;
    
    const estados = [
        // NORTE (verde) - mais espaçado
        { sigla: 'AC', nome: 'Acre', regiao: 'Norte', cor: '#2E7D32', x: 220, y: 540 },
        { sigla: 'AM', nome: 'Amazonas', regiao: 'Norte', cor: '#2E7D32', x: 330, y: 420 }, // +10
        { sigla: 'PA', nome: 'Pará', regiao: 'Norte', cor: '#2E7D32', x: 530, y: 320 }, // +10
        { sigla: 'RO', nome: 'Rondônia', regiao: 'Norte', cor: '#2E7D32', x: 290, y: 490 }, // +10
        { sigla: 'RR', nome: 'Roraima', regiao: 'Norte', cor: '#2E7D32', x: 390, y: 300 }, // +10
        { sigla: 'TO', nome: 'Tocantins', regiao: 'Norte', cor: '#2E7D32', x: 470, y: 420 }, // mantido
        { sigla: 'AP', nome: 'Amapá', regiao: 'Norte', cor: '#2E7D32', x: 630, y: 270 }, // +10
        
        // NORDESTE (laranja) - MAIS ESPAÇADO
        { sigla: 'MA', nome: 'Maranhão', regiao: 'Nordeste', cor: '#F57C00', x: 560, y: 360 }, // +10
        { sigla: 'PI', nome: 'Piauí', regiao: 'Nordeste', cor: '#F57C00', x: 540, y: 440 }, // +10
        { sigla: 'CE', nome: 'Ceará', regiao: 'Nordeste', cor: '#F57C00', x: 670, y: 340 }, // +10
        { sigla: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste', cor: '#F57C00', x: 740, y: 370 }, // +10
        { sigla: 'PB', nome: 'Paraíba', regiao: 'Nordeste', cor: '#F57C00', x: 740, y: 420 }, // +10
        { sigla: 'PE', nome: 'Pernambuco', regiao: 'Nordeste', cor: '#F57C00', x: 700, y: 460 }, // +10
        { sigla: 'AL', nome: 'Alagoas', regiao: 'Nordeste', cor: '#F57C00', x: 720, y: 500 }, // +10
        { sigla: 'SE', nome: 'Sergipe', regiao: 'Nordeste', cor: '#F57C00', x: 680, y: 540 }, // +10
        { sigla: 'BA', nome: 'Bahia', regiao: 'Nordeste', cor: '#F57C00', x: 610, y: 560 }, // +10
        
        // CENTRO-OESTE (amarelo) - MS mais centralizado
        { sigla: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste', cor: '#FDD835', x: 390, y: 480 }, // +10
        { sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', cor: '#FDD835', x: 370, y: 590 }, // +10 (antes 360)
        { sigla: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste', cor: '#FDD835', x: 480, y: 540 }, // +10
        { sigla: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste', cor: '#FDD835', x: 470, y: 490 }, // +10
        
        // SUDESTE (azul) - mantido com +espaço
        { sigla: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste', cor: '#1976D2', x: 550, y: 600 }, // +10
        { sigla: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste', cor: '#1976D2', x: 630, y: 610 }, // +10
        { sigla: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste', cor: '#1976D2', x: 590, y: 670 }, // +10
        { sigla: 'SP', nome: 'São Paulo', regiao: 'Sudeste', cor: '#1976D2', x: 510, y: 670 }, // +10
        
        // SUL (vinho) - mantido com +espaço
        { sigla: 'PR', nome: 'Paraná', regiao: 'Sul', cor: '#C2185B', x: 490, y: 740 }, // +10
        { sigla: 'SC', nome: 'Santa Catarina', regiao: 'Sul', cor: '#C2185B', x: 530, y: 800 }, // +10
        { sigla: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul', cor: '#C2185B', x: 450, y: 860 } // +10
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
                // Imagens GRANDES 100x100
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
