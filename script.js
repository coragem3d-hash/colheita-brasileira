// ==================== MAPA COM COORDENADAS REAIS ====================
console.log('🚀 Iniciando mapa com coordenadas precisas');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    
    // Coordenadas baseadas em dados geográficos reais
    const estados = [
        { sigla: 'AC', cor: '#2E7D32', x: 320, y: 550, img: 'imagens/mapa/ac.png' },  // Acre
        { sigla: 'AM', cor: '#2E7D32', x: 380, y: 410, img: 'imagens/mapa/am.png' },  // Amazonas
        { sigla: 'PA', cor: '#2E7D32', x: 580, y: 330, img: 'imagens/mapa/pa.png' },  // Pará
        { sigla: 'RO', cor: '#2E7D32', x: 350, y: 480, img: 'imagens/mapa/ro.png' },  // Rondônia
        { sigla: 'RR', cor: '#2E7D32', x: 420, y: 270, img: 'imagens/mapa/rr.png' },  // Roraima
        { sigla: 'TO', cor: '#2E7D32', x: 530, y: 420, img: 'imagens/mapa/to.png' },  // Tocantins
        { sigla: 'AP', cor: '#2E7D32', x: 670, y: 240, img: 'imagens/mapa/ap.png' },  // Amapá
        { sigla: 'MA', cor: '#F57C00', x: 610, y: 370, img: 'imagens/mapa/ma.png' },  // Maranhão
        { sigla: 'PI', cor: '#F57C00', x: 580, y: 440, img: 'imagens/mapa/pi.png' },  // Piauí
        { sigla: 'CE', cor: '#F57C00', x: 700, y: 350, img: 'imagens/mapa/ce.png' },  // Ceará
        { sigla: 'RN', cor: '#F57C00', x: 760, y: 380, img: 'imagens/mapa/rn.png' },  // Rio Grande do Norte
        { sigla: 'PB', cor: '#F57C00', x: 760, y: 420, img: 'imagens/mapa/pb.png' },  // Paraíba
        { sigla: 'PE', cor: '#F57C00', x: 720, y: 460, img: 'imagens/mapa/pe.png' },  // Pernambuco
        { sigla: 'AL', cor: '#F57C00', x: 730, y: 490, img: 'imagens/mapa/al.png' },  // Alagoas
        { sigla: 'SE', cor: '#F57C00', x: 690, y: 520, img: 'imagens/mapa/se.png' },  // Sergipe
        { sigla: 'BA', cor: '#F57C00', x: 620, y: 540, img: 'imagens/mapa/ba.png' },  // Bahia
        { sigla: 'MT', cor: '#FDD835', x: 440, y: 480, img: 'imagens/mapa/mt.png' },  // Mato Grosso
        { sigla: 'MS', cor: '#FDD835', x: 430, y: 590, img: 'imagens/mapa/ms.png' },  // Mato Grosso do Sul
        { sigla: 'GO', cor: '#FDD835', x: 520, y: 530, img: 'imagens/mapa/go.png' },  // Goiás
        { sigla: 'DF', cor: '#FDD835', x: 510, y: 500, img: 'imagens/mapa/df.png' },  // Distrito Federal
        { sigla: 'MG', cor: '#1976D2', x: 570, y: 590, img: 'imagens/mapa/mg.png' },  // Minas Gerais
        { sigla: 'ES', cor: '#1976D2', x: 640, y: 600, img: 'imagens/mapa/es.png' },  // Espírito Santo
        { sigla: 'RJ', cor: '#1976D2', x: 610, y: 650, img: 'imagens/mapa/rj.png' },  // Rio de Janeiro
        { sigla: 'SP', cor: '#1976D2', x: 530, y: 650, img: 'imagens/mapa/sp.png' },  // São Paulo
        { sigla: 'PR', cor: '#C2185B', x: 520, y: 710, img: 'imagens/mapa/pr.png' },  // Paraná
        { sigla: 'SC', cor: '#C2185B', x: 560, y: 750, img: 'imagens/mapa/sc.png' },  // Santa Catarina
        { sigla: 'RS', cor: '#C2185B', x: 490, y: 800, img: 'imagens/mapa/rs.png' }   // Rio Grande do Sul
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
                // Imagem 80x80 (tamanho bom sem sobrepor)
                ctx.drawImage(img, estado.x-40, estado.y-40, 80, 80);
            };
            
            img.onerror = () => {
                // Fallback: círculo colorido
                ctx.fillStyle = estado.cor;
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowBlur = 8;
                ctx.shadowOffsetY = 2;
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
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                ctx.fillText(estado.sigla, estado.x-13, estado.y+6);
                
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            };
        });
    }
    
    desenharMapa();
}
