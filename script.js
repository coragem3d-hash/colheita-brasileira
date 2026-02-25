// ==================== MAPA COM REGIÕES ISOLADAS ====================
console.log('🚀 Iniciando mapa com regiões isoladas');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    
    // Coordenadas ORGANIZADAS POR REGIÃO (com espaçamento entre regiões)
    const regioes = [
        {
            nome: 'NORTE',
            cor: '#2E7D32',
            corLinha: '#2E7D32',
            limites: { minX: 200, maxX: 650, minY: 200, maxY: 550 },
            estados: [
                { sigla: 'AC', x: 240, y: 540, img: 'imagens/mapa/ac.png' },
                { sigla: 'AM', x: 330, y: 420, img: 'imagens/mapa/am.png' },
                { sigla: 'PA', x: 540, y: 340, img: 'imagens/mapa/pa.png' },
                { sigla: 'RO', x: 300, y: 490, img: 'imagens/mapa/ro.png' },
                { sigla: 'RR', x: 380, y: 280, img: 'imagens/mapa/rr.png' },
                { sigla: 'TO', x: 490, y: 440, img: 'imagens/mapa/to.png' },
                { sigla: 'AP', x: 620, y: 250, img: 'imagens/mapa/ap.png' }
            ]
        },
        {
            nome: 'NORDESTE',
            cor: '#F57C00',
            corLinha: '#F57C00',
            limites: { minX: 520, maxX: 750, minY: 330, maxY: 560 },
            estados: [
                { sigla: 'MA', x: 560, y: 380, img: 'imagens/mapa/ma.png' },
                { sigla: 'PI', x: 530, y: 450, img: 'imagens/mapa/pi.png' },
                { sigla: 'CE', x: 650, y: 360, img: 'imagens/mapa/ce.png' },
                { sigla: 'RN', x: 710, y: 390, img: 'imagens/mapa/rn.png' },
                { sigla: 'PB', x: 710, y: 430, img: 'imagens/mapa/pb.png' },
                { sigla: 'PE', x: 670, y: 470, img: 'imagens/mapa/pe.png' },
                { sigla: 'AL', x: 680, y: 500, img: 'imagens/mapa/al.png' },
                { sigla: 'SE', x: 640, y: 530, img: 'imagens/mapa/se.png' },
                { sigla: 'BA', x: 570, y: 550, img: 'imagens/mapa/ba.png' }
            ]
        },
        {
            nome: 'CENTRO-OESTE',
            cor: '#FDD835',
            corLinha: '#FDD835',
            limites: { minX: 350, maxX: 530, minY: 460, maxY: 620 },
            estados: [
                { sigla: 'MT', x: 400, y: 490, img: 'imagens/mapa/mt.png' },
                { sigla: 'MS', x: 390, y: 600, img: 'imagens/mapa/ms.png' },
                { sigla: 'GO', x: 480, y: 540, img: 'imagens/mapa/go.png' },
                { sigla: 'DF', x: 470, y: 510, img: 'imagens/mapa/df.png' }
            ]
        },
        {
            nome: 'SUDESTE',
            cor: '#1976D2',
            corLinha: '#1976D2',
            limites: { minX: 460, maxX: 640, minY: 570, maxY: 680 },
            estados: [
                { sigla: 'MG', x: 530, y: 600, img: 'imagens/mapa/mg.png' },
                { sigla: 'ES', x: 610, y: 610, img: 'imagens/mapa/es.png' },
                { sigla: 'RJ', x: 570, y: 660, img: 'imagens/mapa/rj.png' },
                { sigla: 'SP', x: 490, y: 660, img: 'imagens/mapa/sp.png' }
            ]
        },
        {
            nome: 'SUL',
            cor: '#C2185B',
            corLinha: '#C2185B',
            limites: { minX: 420, maxX: 560, minY: 700, maxY: 830 },
            estados: [
                { sigla: 'PR', x: 480, y: 720, img: 'imagens/mapa/pr.png' },
                { sigla: 'SC', x: 520, y: 760, img: 'imagens/mapa/sc.png' },
                { sigla: 'RS', x: 450, y: 810, img: 'imagens/mapa/rs.png' }
            ]
        }
    ];
    
    function desenharContornoRegiao(regiao) {
        const l = regiao.limites;
        const padding = 40;
        
        // Desenha um retângulo arredondado contornando a região
        ctx.strokeStyle = regiao.corLinha;
        ctx.lineWidth = 4;
        ctx.setLineDash([15, 10]); // Linha pontilhada mais visível
        
        // Retângulo arredondado
        const x = l.minX - padding;
        const y = l.minY - padding;
        const w = (l.maxX - l.minX) + padding * 2;
        const h = (l.maxY - l.minY) + padding * 2;
        const radius = 20;
        
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
        ctx.lineTo(x + w, y + h - radius);
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        ctx.lineTo(x + radius, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.stroke();
        
        // Nome da região no topo do retângulo
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = regiao.corLinha;
        ctx.shadowColor = 'black';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillText(regiao.nome, x + 10, y + 25);
        
        // Reset
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.setLineDash([]);
    }
    
    function desenharMapa() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Fundo
        ctx.fillStyle = '#b3e0ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Primeiro, desenha os contornos das regiões
        regioes.forEach(regiao => {
            desenharContornoRegiao(regiao);
        });
        
        // Depois, desenha os estados por cima
        regioes.forEach(regiao => {
            regiao.estados.forEach(estado => {
                const img = new Image();
                img.src = estado.img;
                
                img.onload = () => {
                    ctx.drawImage(img, estado.x-30, estado.y-30, 60, 60);
                };
                
                img.onerror = () => {
                    // Fallback: círculo colorido
                    ctx.fillStyle = regiao.cor;
                    ctx.shadowColor = 'rgba(0,0,0,0.3)';
                    ctx.shadowBlur = 8;
                    ctx.shadowOffsetY = 3;
                    ctx.beginPath();
                    ctx.arc(estado.x, estado.y, 25, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.shadowBlur = 0;
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    
                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 14px Arial';
                    ctx.shadowColor = 'black';
                    ctx.shadowBlur = 4;
                    ctx.shadowOffsetX = 1;
                    ctx.shadowOffsetY = 1;
                    ctx.fillText(estado.sigla, estado.x-10, estado.y+5);
                    
                    ctx.shadowBlur = 0;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                };
            });
        });
    }
    
    desenharMapa();
}
