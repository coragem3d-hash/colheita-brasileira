// ==================== MAPA COM IMAGENS GRANDES (100x100) ====================
console.log('🚀 Iniciando mapa com imagens GRANDES');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    
    // Coordenadas ajustadas para canvas 1200x900 (multiplicadas por 1.3)
    const estados = [
        { sigla: 'AC', cor: '#2E7D32', x: 260, y: 494, img: 'imagens/mapa/ac.png' },
        { sigla: 'AM', cor: '#2E7D32', x: 364, y: 351, img: 'imagens/mapa/am.png' },
        { sigla: 'PA', cor: '#2E7D32', x: 572, y: 273, img: 'imagens/mapa/pa.png' },
        { sigla: 'RO', cor: '#2E7D32', x: 312, y: 429, img: 'imagens/mapa/ro.png' },
        { sigla: 'RR', cor: '#2E7D32', x: 429, y: 234, img: 'imagens/mapa/rr.png' },
        { sigla: 'TO', cor: '#2E7D32', x: 507, y: 403, img: 'imagens/mapa/to.png' },
        { sigla: 'AP', cor: '#2E7D32', x: 650, y: 182, img: 'imagens/mapa/ap.png' },
        { sigla: 'MA', cor: '#F57C00', x: 598, y: 351, img: 'imagens/mapa/ma.png' },
        { sigla: 'PI', cor: '#F57C00', x: 572, y: 442, img: 'imagens/mapa/pi.png' },
        { sigla: 'CE', cor: '#F57C00', x: 702, y: 312, img: 'imagens/mapa/ce.png' },
        { sigla: 'RN', cor: '#F57C00', x: 767, y: 351, img: 'imagens/mapa/rn.png' },
        { sigla: 'PB', cor: '#F57C00', x: 767, y: 403, img: 'imagens/mapa/pb.png' },
        { sigla: 'PE', cor: '#F57C00', x: 728, y: 455, img: 'imagens/mapa/pe.png' },
        { sigla: 'AL', cor: '#F57C00', x: 741, y: 494, img: 'imagens/mapa/al.png' },
        { sigla: 'SE', cor: '#F57C00', x: 702, y: 520, img: 'imagens/mapa/se.png' },
        { sigla: 'BA', cor: '#F57C00', x: 624, y: 559, img: 'imagens/mapa/ba.png' },
        { sigla: 'MT', cor: '#FDD835', x: 416, y: 520, img: 'imagens/mapa/mt.png' },
        { sigla: 'MS', cor: '#FDD835', x: 429, y: 637, img: 'imagens/mapa/ms.png' },
        { sigla: 'GO', cor: '#FDD835', x: 507, y: 546, img: 'imagens/mapa/go.png' },
        { sigla: 'DF', cor: '#FDD835', x: 494, y: 494, img: 'imagens/mapa/df.png' },
        { sigla: 'MG', cor: '#1976D2', x: 559, y: 624, img: 'imagens/mapa/mg.png' },
        { sigla: 'ES', cor: '#1976D2', x: 650, y: 611, img: 'imagens/mapa/es.png' },
        { sigla: 'RJ', cor: '#1976D2', x: 624, y: 689, img: 'imagens/mapa/rj.png' },
        { sigla: 'SP', cor: '#1976D2', x: 520, y: 702, img: 'imagens/mapa/sp.png' },
        { sigla: 'PR', cor: '#C2185B', x: 494, y: 767, img: 'imagens/mapa/pr.png' },
        { sigla: 'SC', cor: '#C2185B', x: 546, y: 819, img: 'imagens/mapa/sc.png' },
        { sigla: 'RS', cor: '#C2185B', x: 455, y: 871, img: 'imagens/mapa/rs.png' }
    ];
    
    function desenharMapa() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Fundo com gradiente
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#b3e0ff');
        grad.addColorStop(1, '#87CEEB');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        estados.forEach(estado => {
            const img = new Image();
            img.src = estado.img;
            
            img.onload = () => {
                // Imagem 100x100 (BEM GRANDE!)
                ctx.drawImage(img, estado.x-50, estado.y-50, 100, 100);
                
                // Sombra suave
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetY = 3;
            };
            
            img.onerror = () => {
                // Fallback: círculo colorido GRANDE
                ctx.fillStyle = estado.cor;
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetY = 3;
                ctx.beginPath();
                ctx.arc(estado.x, estado.y, 35, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.shadowBlur = 0;
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 4;
                ctx.stroke();
                
                ctx.fillStyle = 'white';
                ctx.font = 'bold 18px Arial';
                ctx.shadowColor = 'black';
                ctx.shadowBlur = 6;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.fillText(estado.sigla, estado.x-15, estado.y+7);
                
                // Reset sombra
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            };
        });
    }
    
    desenharMapa();
}
