// ==================== MAPA DO BRASIL CENTRALIZADO ====================
const canvas = document.getElementById('mapaCanvas');
const ctx = canvas.getContext('2d');
const tooltip = document.getElementById('tooltip');

const TAMANHO_PADRAO = 90;

// COORDENADAS CENTRALIZADAS (subtraído ~200px de Y)
const estados = [
    // NORTE
    { sigla: 'AC', nome: 'Acre', regiao: 'Norte', cor: '#2E7D32', x: 272, y: 518 }, // antes 718
    { sigla: 'AM', nome: 'Amazonas', regiao: 'Norte', cor: '#2E7D32', x: 408, y: 359 }, // antes 559
    { sigla: 'PA', nome: 'Pará', regiao: 'Norte', cor: '#2E7D32', x: 656, y: 226 }, // antes 426
    { sigla: 'RO', nome: 'Rondônia', regiao: 'Norte', cor: '#2E7D32', x: 359, y: 452 }, // antes 652
    { sigla: 'RR', nome: 'Roraima', regiao: 'Norte', cor: '#2E7D32', x: 483, y: 199 }, // antes 399
    { sigla: 'TO', nome: 'Tocantins', regiao: 'Norte', cor: '#2E7D32', x: 582, y: 359 }, // antes 559
    { sigla: 'AP', nome: 'Amapá', regiao: 'Norte', cor: '#2E7D32', x: 781, y: 159 }, // antes 359
    
    // NORDESTE
    { sigla: 'MA', nome: 'Maranhão', regiao: 'Nordeste', cor: '#F57C00', x: 694, y: 279 }, // antes 479
    { sigla: 'PI', nome: 'Piauí', regiao: 'Nordeste', cor: '#F57C00', x: 669, y: 386 }, // antes 586
    { sigla: 'CE', nome: 'Ceará', regiao: 'Nordeste', cor: '#F57C00', x: 831, y: 252 }, // antes 452
    { sigla: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste', cor: '#F57C00', x: 918, y: 292 }, // antes 492
    { sigla: 'PB', nome: 'Paraíba', regiao: 'Nordeste', cor: '#F57C00', x: 918, y: 359 }, // antes 559
    { sigla: 'PE', nome: 'Pernambuco', regiao: 'Nordeste', cor: '#F57C00', x: 868, y: 412 }, // antes 612
    { sigla: 'AL', nome: 'Alagoas', regiao: 'Nordeste', cor: '#F57C00', x: 893, y: 465 }, // antes 665
    { sigla: 'SE', nome: 'Sergipe', regiao: 'Nordeste', cor: '#F57C00', x: 844, y: 518 }, // antes 718
    { sigla: 'BA', nome: 'Bahia', regiao: 'Nordeste', cor: '#F57C00', x: 757, y: 545 }, // antes 745
    
    // CENTRO-OESTE
    { sigla: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste', cor: '#FDD835', x: 483, y: 439 }, // antes 639
    { sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', cor: '#FDD835', x: 459, y: 585 }, // antes 785
    { sigla: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste', cor: '#FDD835', x: 595, y: 518 }, // antes 718
    { sigla: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste', cor: '#FDD835', x: 583, y: 452 }, // antes 652
    
    // SUDESTE
    { sigla: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste', cor: '#1976D2', x: 682, y: 598 }, // antes 798
    { sigla: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste', cor: '#1976D2', x: 781, y: 611 }, // antes 811
    { sigla: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste', cor: '#1976D2', x: 732, y: 691 }, // antes 891
    { sigla: 'SP', nome: 'São Paulo', regiao: 'Sudeste', cor: '#1976D2', x: 633, y: 691 }, // antes 891
    
    // SUL
    { sigla: 'PR', nome: 'Paraná', regiao: 'Sul', cor: '#C2185B', x: 608, y: 784 }, // antes 984
    { sigla: 'SC', nome: 'Santa Catarina', regiao: 'Sul', cor: '#C2185B', x: 657, y: 864 }, // antes 1064
    { sigla: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul', cor: '#C2185B', x: 558, y: 944 } // antes 1144
];

// ==================== FUNÇÕES DO MAPA ====================
function desenharMapa() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#b3e0ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar eixos para referência (opcional, pode remover depois)
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    // Linha horizontal no centro Y
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
    
    // Linha vertical no centro X
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    estados.forEach(estado => {
        const img = new Image();
        img.src = `imagens/mapa/${estado.sigla.toLowerCase()}.png`;
        
        img.onload = () => {
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
            ctx.font = 'bold 16px Arial';
            ctx.shadowColor = 'black';
            ctx.shadowBlur = 4;
            ctx.fillText(estado.sigla, estado.x-12, estado.y+6);
            
            ctx.shadowBlur = 0;
        };
    });
}

// ... (resto do código: historias, getEstadoNaPosicao, clique, etc)
