// ==================== MAPA COM PADRÃO DE ESPAÇAMENTO ====================
console.log('🚀 Iniciando mapa com espaçamento padronizado');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    const tooltip = document.getElementById('tooltip');
    
    // Coordenadas com espaçamento padronizado (distância mínima de 90px entre centros)
    const estados = [
        // NORTE (verde)
        { sigla: 'AC', nome: 'Acre', regiao: 'Norte', cor: '#2E7D32', x: 220, y: 540, img: 'imagens/mapa/ac.png' },
        { sigla: 'AM', nome: 'Amazonas', regiao: 'Norte', cor: '#2E7D32', x: 320, y: 430, img: 'imagens/mapa/am.png' },
        { sigla: 'PA', nome: 'Pará', regiao: 'Norte', cor: '#2E7D32', x: 520, y: 330, img: 'imagens/mapa/pa.png' },
        { sigla: 'RO', nome: 'Rondônia', regiao: 'Norte', cor: '#2E7D32', x: 280, y: 490, img: 'imagens/mapa/ro.png' },
        { sigla: 'RR', nome: 'Roraima', regiao: 'Norte', cor: '#2E7D32', x: 380, y: 270, img: 'imagens/mapa/rr.png' },
        { sigla: 'TO', nome: 'Tocantins', regiao: 'Norte', cor: '#2E7D32', x: 480, y: 430, img: 'imagens/mapa/to.png' },
        { sigla: 'AP', nome: 'Amapá', regiao: 'Norte', cor: '#2E7D32', x: 620, y: 240, img: 'imagens/mapa/ap.png' },
        
        // NORDESTE (laranja) - separado por 120px do Norte
        { sigla: 'MA', nome: 'Maranhão', regiao: 'Nordeste', cor: '#F57C00', x: 560, y: 360, img: 'imagens/mapa/ma.png' },
        { sigla: 'PI', nome: 'Piauí', regiao: 'Nordeste', cor: '#F57C00', x: 520, y: 440, img: 'imagens/mapa/pi.png' },
        { sigla: 'CE', nome: 'Ceará', regiao: 'Nordeste', cor: '#F57C00', x: 660, y: 340, img: 'imagens/mapa/ce.png' },
        { sigla: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste', cor: '#F57C00', x: 720, y: 370, img: 'imagens/mapa/rn.png' },
        { sigla: 'PB', nome: 'Paraíba', regiao: 'Nordeste', cor: '#F57C00', x: 720, y: 410, img: 'imagens/mapa/pb.png' },
        { sigla: 'PE', nome: 'Pernambuco', regiao: 'Nordeste', cor: '#F57C00', x: 680, y: 450, img: 'imagens/mapa/pe.png' },
        { sigla: 'AL', nome: 'Alagoas', regiao: 'Nordeste', cor: '#F57C00', x: 690, y: 490, img: 'imagens/mapa/al.png' },
        { sigla: 'SE', nome: 'Sergipe', regiao: 'Nordeste', cor: '#F57C00', x: 650, y: 520, img: 'imagens/mapa/se.png' },
        { sigla: 'BA', nome: 'Bahia', regiao: 'Nordeste', cor: '#F57C00', x: 580, y: 540, img: 'imagens/mapa/ba.png' },
        
        // CENTRO-OESTE (amarelo) - bloco compacto
        { sigla: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste', cor: '#FDD835', x: 400, y: 480, img: 'imagens/mapa/mt.png' },
        { sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', cor: '#FDD835', x: 380, y: 600, img: 'imagens/mapa/ms.png' },
        { sigla: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste', cor: '#FDD835', x: 480, y: 540, img: 'imagens/mapa/go.png' },
        { sigla: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste', cor: '#FDD835', x: 470, y: 500, img: 'imagens/mapa/df.png' },
        
        // SUDESTE (azul) - bloco compacto
        { sigla: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste', cor: '#1976D2', x: 540, y: 600, img: 'imagens/mapa/mg.png' },
        { sigla: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste', cor: '#1976D2', x: 620, y: 610, img: 'imagens/mapa/es.png' },
        { sigla: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste', cor: '#1976D2', x: 580, y: 670, img: 'imagens/mapa/rj.png' },
        { sigla: 'SP', nome: 'São Paulo', regiao: 'Sudeste', cor: '#1976D2', x: 500, y: 670, img: 'imagens/mapa/sp.png' },
        
        // SUL (vinho) - bloco compacto
        { sigla: 'PR', nome: 'Paraná', regiao: 'Sul', cor: '#C2185B', x: 480, y: 740, img: 'imagens/mapa/pr.png' },
        { sigla: 'SC', nome: 'Santa Catarina', regiao: 'Sul', cor: '#C2185B', x: 520, y: 800, img: 'imagens/mapa/sc.png' },
        { sigla: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul', cor: '#C2185B', x: 440, y: 860, img: 'imagens/mapa/rs.png' }
    ];
    
    // Tamanho padrão das imagens
    const TAMANHO_PADRAO = 70;
    
    function desenharMapa() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Fundo
        ctx.fillStyle = '#b3e0ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        estados.forEach(estado => {
            const img = new Image();
            img.src = estado.img;
            
            img.onload = () => {
                // TODAS as imagens com o MESMO tamanho
                ctx.drawImage(img, estado.x - TAMANHO_PADRAO/2, estado.y - TAMANHO_PADRAO/2, TAMANHO_PADRAO, TAMANHO_PADRAO);
            };
            
            img.onerror = () => {
                // Fallback uniforme
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
