// ==================== MAPA DO BRASIL ====================
const canvas = document.getElementById('mapaCanvas');
const ctx = canvas.getContext('2d');
const tooltip = document.getElementById('tooltip');

// TAMANHO AUMENTADO PARA 100px
const TAMANHO_PADRAO = 100;

// COORDENADAS ORIGINAIS (vamos ajustar com margem)
const estadosBase = [
    // NORTE
    { sigla: 'AC', nome: 'Acre', regiao: 'Norte', cor: '#2E7D32', x: 272, y: 718 },
    { sigla: 'AM', nome: 'Amazonas', regiao: 'Norte', cor: '#2E7D32', x: 408, y: 559 },
    { sigla: 'PA', nome: 'Pará', regiao: 'Norte', cor: '#2E7D32', x: 656, y: 426 },
    { sigla: 'RO', nome: 'Rondônia', regiao: 'Norte', cor: '#2E7D32', x: 359, y: 652 },
    { sigla: 'RR', nome: 'Roraima', regiao: 'Norte', cor: '#2E7D32', x: 483, y: 399 },
    { sigla: 'TO', nome: 'Tocantins', regiao: 'Norte', cor: '#2E7D32', x: 582, y: 559 },
    { sigla: 'AP', nome: 'Amapá', regiao: 'Norte', cor: '#2E7D32', x: 781, y: 359 },
    
    // NORDESTE
    { sigla: 'MA', nome: 'Maranhão', regiao: 'Nordeste', cor: '#F57C00', x: 694, y: 479 },
    { sigla: 'PI', nome: 'Piauí', regiao: 'Nordeste', cor: '#F57C00', x: 669, y: 586 },
    { sigla: 'CE', nome: 'Ceará', regiao: 'Nordeste', cor: '#F57C00', x: 831, y: 452 },
    { sigla: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste', cor: '#F57C00', x: 918, y: 492 },
    { sigla: 'PB', nome: 'Paraíba', regiao: 'Nordeste', cor: '#F57C00', x: 918, y: 559 },
    { sigla: 'PE', nome: 'Pernambuco', regiao: 'Nordeste', cor: '#F57C00', x: 868, y: 612 },
    { sigla: 'AL', nome: 'Alagoas', regiao: 'Nordeste', cor: '#F57C00', x: 893, y: 665 },
    { sigla: 'SE', nome: 'Sergipe', regiao: 'Nordeste', cor: '#F57C00', x: 844, y: 718 },
    { sigla: 'BA', nome: 'Bahia', regiao: 'Nordeste', cor: '#F57C00', x: 757, y: 745 },
    
    // CENTRO-OESTE
    { sigla: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste', cor: '#FDD835', x: 483, y: 639 },
    { sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', cor: '#FDD835', x: 459, y: 785 },
    { sigla: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste', cor: '#FDD835', x: 595, y: 718 },
    { sigla: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste', cor: '#FDD835', x: 583, y: 652 },
    
    // SUDESTE
    { sigla: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste', cor: '#1976D2', x: 682, y: 798 },
    { sigla: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste', cor: '#1976D2', x: 781, y: 811 },
    { sigla: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste', cor: '#1976D2', x: 732, y: 891 },
    { sigla: 'SP', nome: 'São Paulo', regiao: 'Sudeste', cor: '#1976D2', x: 633, y: 891 },
    
    // SUL
    { sigla: 'PR', nome: 'Paraná', regiao: 'Sul', cor: '#C2185B', x: 608, y: 984 },
    { sigla: 'SC', nome: 'Santa Catarina', regiao: 'Sul', cor: '#C2185B', x: 657, y: 1064 },
    { sigla: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul', cor: '#C2185B', x: 558, y: 1144 }
];

// ==================== REPOSICIONAMENTO AUTOMÁTICO ====================
function centralizarMapa() {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    
    estadosBase.forEach(e => {
        minX = Math.min(minX, e.x);
        maxX = Math.max(maxX, e.x);
        minY = Math.min(minY, e.y);
        maxY = Math.max(maxY, e.y);
    });
    
    // Calcula centro atual
    const centroAtualX = (minX + maxX) / 2;
    const centroAtualY = (minY + maxY) / 2;
    
    // Centro do canvas
    const centroCanvasX = canvas.width / 2;
    const centroCanvasY = canvas.height / 2;
    
    // Deslocamento necessário
    const deslocX = centroCanvasX - centroAtualX;
    const deslocY = centroCanvasY - centroAtualY;
    
    // Aplica deslocamento com margem extra
    const MARGEM = 50;
    const estados = estadosBase.map(e => ({
        ...e,
        x: Math.round(e.x + deslocX + MARGEM),
        y: Math.round(e.y + deslocY + MARGEM)
    }));
    
    console.log(`✅ Imagens 100x100 centralizadas! Desloc: X=${deslocX}, Y=${deslocY}`);
    return estados;
}

const estados = centralizarMapa();

// ==================== FUNÇÃO PRINCIPAL ====================
function desenharMapa() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fundo azul
    ctx.fillStyle = '#b3e0ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    estados.forEach(estado => {
        const img = new Image();
        img.src = `imagens/mapa/${estado.sigla.toLowerCase()}.png`;
        
        img.onload = () => {
            // Imagens 100x100
            ctx.drawImage(img, estado.x - TAMANHO_PADRAO/2, estado.y - TAMANHO_PADRAO/2, TAMANHO_PADRAO, TAMANHO_PADRAO);
        };
        
        img.onerror = () => {
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
            ctx.font = 'bold 18px Arial';
            ctx.shadowColor = 'black';
            ctx.shadowBlur = 4;
            ctx.fillText(estado.sigla, estado.x-12, estado.y+8);
            
            ctx.shadowBlur = 0;
        };
    });
}

// ==================== RESTO DO CÓDIGO (HISTÓRIAS, CLIQUE ETC) ====================
// ... (mantém igual, só adicionar abaixo)

desenharMapa();
mostrarBoasVindas();
