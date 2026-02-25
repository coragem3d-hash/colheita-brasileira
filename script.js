// ==================== MAPA DO BRASIL ====================
const canvas = document.getElementById('mapaCanvas');
const ctx = canvas.getContext('2d');
const tooltip = document.getElementById('tooltip');

const TAMANHO_PADRAO = 90;

const estados = [
    { sigla: 'AC', x: 272, y: 718 },
    { sigla: 'AM', x: 408, y: 559 },
    { sigla: 'PA', x: 656, y: 426 },
    { sigla: 'RO', x: 359, y: 652 },
    { sigla: 'RR', x: 483, y: 399 },
    { sigla: 'TO', x: 582, y: 559 },
    { sigla: 'AP', x: 781, y: 359 },
    { sigla: 'MA', x: 694, y: 479 },
    { sigla: 'PI', x: 669, y: 586 },
    { sigla: 'CE', x: 831, y: 452 },
    { sigla: 'RN', x: 918, y: 492 },
    { sigla: 'PB', x: 918, y: 559 },
    { sigla: 'PE', x: 868, y: 612 },
    { sigla: 'AL', x: 893, y: 665 },
    { sigla: 'SE', x: 844, y: 718 },
    { sigla: 'BA', x: 757, y: 745 },
    { sigla: 'MT', x: 483, y: 639 },
    { sigla: 'MS', x: 459, y: 785 },
    { sigla: 'GO', x: 595, y: 718 },
    { sigla: 'DF', x: 583, y: 652 },
    { sigla: 'MG', x: 682, y: 798 },
    { sigla: 'ES', x: 781, y: 811 },
    { sigla: 'RJ', x: 732, y: 891 },
    { sigla: 'SP', x: 633, y: 891 },
    { sigla: 'PR', x: 608, y: 984 },
    { sigla: 'SC', x: 657, y: 1064 },
    { sigla: 'RS', x: 558, y: 1144 }
];

function desenharMapa() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#b3e0ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    estados.forEach(estado => {
        const img = new Image();
        img.src = `imagens/mapa/${estado.sigla.toLowerCase()}.png`;
        
        img.onload = () => {
            ctx.drawImage(img, estado.x - TAMANHO_PADRAO/2, estado.y - TAMANHO_PADRAO/2, TAMANHO_PADRAO, TAMANHO_PADRAO);
        };
        
        img.onerror = () => {
            ctx.fillStyle = '#2E7D32';
            ctx.beginPath();
            ctx.arc(estado.x, estado.y, TAMANHO_PADRAO/2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px Arial';
            ctx.fillText(estado.sigla, estado.x-12, estado.y+6);
        };
    });
}

function getEstadoNaPosicao(mouseX, mouseY) {
    for (let i = 0; i < estados.length; i++) {
        const estado = estados[i];
        const dist = Math.hypot(mouseX - estado.x, mouseY - estado.y);
        if (dist < 50) {
            return estado;
        }
    }
    return null;
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    
    const estado = getEstadoNaPosicao(mouseX, mouseY);
    if (estado) {
        // Quando clicar, chama a função entrarNoEstado
        window.entrarNoEstado(estado);
    }
});

desenharMapa();
