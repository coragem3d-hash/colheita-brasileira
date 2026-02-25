// ==================== MAPA COM IMAGENS 80x80 ====================
console.log('🚀 Iniciando mapa com imagens em tamanho GRANDE');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    
    const estados = [
        { sigla: 'AC', cor: '#2E7D32', x: 200, y: 380, img: 'imagens/mapa/ac.png' },
        { sigla: 'AM', cor: '#2E7D32', x: 280, y: 270, img: 'imagens/mapa/am.png' },
        { sigla: 'PA', cor: '#2E7D32', x: 440, y: 210, img: 'imagens/mapa/pa.png' },
        { sigla: 'RO', cor: '#2E7D32', x: 240, y: 330, img: 'imagens/mapa/ro.png' },
        { sigla: 'RR', cor: '#2E7D32', x: 330, y: 180, img: 'imagens/mapa/rr.png' },
        { sigla: 'TO', cor: '#2E7D32', x: 390, y: 310, img: 'imagens/mapa/to.png' },
        { sigla: 'AP', cor: '#2E7D32', x: 500, y: 140, img: 'imagens/mapa/ap.png' },
        { sigla: 'MA', cor: '#F57C00', x: 460, y: 270, img: 'imagens/mapa/ma.png' },
        { sigla: 'PI', cor: '#F57C00', x: 440, y: 340, img: 'imagens/mapa/pi.png' },
        { sigla: 'CE', cor: '#F57C00', x: 540, y: 240, img: 'imagens/mapa/ce.png' },
        { sigla: 'RN', cor: '#F57C00', x: 590, y: 270, img: 'imagens/mapa/rn.png' },
        { sigla: 'PB', cor: '#F57C00', x: 590, y: 310, img: 'imagens/mapa/pb.png' },
        { sigla: 'PE', cor: '#F57C00', x: 560, y: 350, img: 'imagens/mapa/pe.png' },
        { sigla: 'AL', cor: '#F57C00', x: 570, y: 380, img: 'imagens/mapa/al.png' },
        { sigla: 'SE', cor: '#F57C00', x: 540, y: 400, img: 'imagens/mapa/se.png' },
        { sigla: 'BA', cor: '#F57C00', x: 480, y: 430, img: 'imagens/mapa/ba.png' },
        { sigla: 'MT', cor: '#FDD835', x: 320, y: 400, img: 'imagens/mapa/mt.png' },
        { sigla: 'MS', cor: '#FDD835', x: 330, y: 490, img: 'imagens/mapa/ms.png' },
        { sigla: 'GO', cor: '#FDD835', x: 390, y: 420, img: 'imagens/mapa/go.png' },
        { sigla: 'DF', cor: '#FDD835', x: 380, y: 380, img: 'imagens/mapa/df.png' },
        { sigla: 'MG', cor: '#1976D2', x: 430, y: 480, img: 'imagens/mapa/mg.png' },
        { sigla: 'ES', cor: '#1976D2', x: 500, y: 470, img: 'imagens/mapa/es.png' },
        { sigla: 'RJ', cor: '#1976D2', x: 480, y: 530, img: 'imagens/mapa/rj.png' },
        { sigla: 'SP', cor: '#1976D2', x: 400, y: 540, img: 'imagens/mapa/sp.png' },
        { sigla: 'PR', cor: '#C2185B', x: 380, y: 590, img: 'imagens/mapa/pr.png' },
        { sigla: 'SC', cor: '#C2185B', x: 420, y: 630, img: 'imagens/mapa/sc.png' },
        { sigla: 'RS', cor: '#C2185B', x: 350, y: 670, img: 'imagens/mapa/rs.png' }
    ];
    
    function desenharMapa() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#b3e0ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        estados.forEach(estado => {
            const img = new Image();
            img.src = estado.img;
            
            img.onload = () => {
                // Imagem 80x80 (TAMANHO ORIGINAL)
                ctx.drawImage(img, estado.x-70, estado.y-70, 100, 100);
            };
            
            img.onerror = () => {
                // Fallback: círculo colorido (também maior)
                ctx.fillStyle = estado.cor;
                ctx.beginPath();
                ctx.arc(estado.x, estado.y, 25, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 3;
                ctx.stroke();
                
                ctx.fillStyle = 'white';
                ctx.font = 'bold 14px Arial';
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
