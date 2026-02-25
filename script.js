// ==================== MAPA DO BRASIL - VERSÃO REFINADA ====================
console.log('🚀 Iniciando mapa versão refinada');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    const tooltip = document.getElementById('tooltip');
    
    // Coordenadas baseadas no centroide de cada estado (IBGE) com MAIS ESPAÇAMENTO
    const estados = [
        // NORTE (verde)
        { sigla: 'AC', nome: 'Acre', regiao: 'Norte', cor: '#2E7D32', x: 200, y: 550, img: 'imagens/mapa/ac.png' },
        { sigla: 'AM', nome: 'Amazonas', regiao: 'Norte', cor: '#2E7D32', x: 300, y: 400, img: 'imagens/mapa/am.png' },
        { sigla: 'PA', nome: 'Pará', regiao: 'Norte', cor: '#2E7D32', x: 520, y: 300, img: 'imagens/mapa/pa.png' },
        { sigla: 'RO', nome: 'Rondônia', regiao: 'Norte', cor: '#2E7D32', x: 260, y: 470, img: 'imagens/mapa/ro.png' },
        { sigla: 'RR', nome: 'Roraima', regiao: 'Norte', cor: '#2E7D32', x: 360, y: 230, img: 'imagens/mapa/rr.png' },
        { sigla: 'TO', nome: 'Tocantins', regiao: 'Norte', cor: '#2E7D32', x: 460, y: 400, img: 'imagens/mapa/to.png' },
        { sigla: 'AP', nome: 'Amapá', regiao: 'Norte', cor: '#2E7D32', x: 600, y: 200, img: 'imagens/mapa/ap.png' },
        
        // NORDESTE (laranja)
        { sigla: 'MA', nome: 'Maranhão', regiao: 'Nordeste', cor: '#F57C00', x: 540, y: 340, img: 'imagens/mapa/ma.png' },
        { sigla: 'PI', nome: 'Piauí', regiao: 'Nordeste', cor: '#F57C00', x: 500, y: 420, img: 'imagens/mapa/pi.png' },
        { sigla: 'CE', nome: 'Ceará', regiao: 'Nordeste', cor: '#F57C00', x: 640, y: 320, img: 'imagens/mapa/ce.png' },
        { sigla: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste', cor: '#F57C00', x: 700, y: 350, img: 'imagens/mapa/rn.png' },
        { sigla: 'PB', nome: 'Paraíba', regiao: 'Nordeste', cor: '#F57C00', x: 700, y: 390, img: 'imagens/mapa/pb.png' },
        { sigla: 'PE', nome: 'Pernambuco', regiao: 'Nordeste', cor: '#F57C00', x: 660, y: 430, img: 'imagens/mapa/pe.png' },
        { sigla: 'AL', nome: 'Alagoas', regiao: 'Nordeste', cor: '#F57C00', x: 670, y: 470, img: 'imagens/mapa/al.png' },
        { sigla: 'SE', nome: 'Sergipe', regiao: 'Nordeste', cor: '#F57C00', x: 630, y: 500, img: 'imagens/mapa/se.png' },
        { sigla: 'BA', nome: 'Bahia', regiao: 'Nordeste', cor: '#F57C00', x: 560, y: 520, img: 'imagens/mapa/ba.png' },
        
        // CENTRO-OESTE (amarelo)
        { sigla: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste', cor: '#FDD835', x: 380, y: 460, img: 'imagens/mapa/mt.png' },
        { sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', cor: '#FDD835', x: 360, y: 580, img: 'imagens/mapa/ms.png' },
        { sigla: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste', cor: '#FDD835', x: 460, y: 520, img: 'imagens/mapa/go.png' },
        { sigla: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste', cor: '#FDD835', x: 450, y: 480, img: 'imagens/mapa/df.png' },
        
        // SUDESTE (azul)
        { sigla: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste', cor: '#1976D2', x: 520, y: 580, img: 'imagens/mapa/mg.png' },
        { sigla: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste', cor: '#1976D2', x: 600, y: 590, img: 'imagens/mapa/es.png' },
        { sigla: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste', cor: '#1976D2', x: 560, y: 650, img: 'imagens/mapa/rj.png' },
        { sigla: 'SP', nome: 'São Paulo', regiao: 'Sudeste', cor: '#1976D2', x: 480, y: 650, img: 'imagens/mapa/sp.png' },
        
        // SUL (vinho)
        { sigla: 'PR', nome: 'Paraná', regiao: 'Sul', cor: '#C2185B', x: 460, y: 720, img: 'imagens/mapa/pr.png' },
        { sigla: 'SC', nome: 'Santa Catarina', regiao: 'Sul', cor: '#C2185B', x: 500, y: 780, img: 'imagens/mapa/sc.png' },
        { sigla: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul', cor: '#C2185B', x: 420, y: 840, img: 'imagens/mapa/rs.png' }
    ];
    
    // Variável para controlar o estado clicado
    let estadoClicado = null;
    
    function desenharMapa() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Fundo com gradiente suave
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#b3e0ff');
        grad.addColorStop(1, '#87CEEB');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Desenha cada estado
        estados.forEach(estado => {
            const img = new Image();
            img.src = estado.img;
            
            img.onload = () => {
                // Define o tamanho base (80x80)
                let tamanho = 80;
                let x = estado.x;
                let y = estado.y;
                
                // Se este estado foi clicado, aumenta um pouco
                if (estadoClicado === estado.sigla) {
                    tamanho = 95;
                    
                    // Volta ao normal depois de 200ms
                    setTimeout(() => {
                        estadoClicado = null;
                        desenharMapa();
                    }, 200);
                }
                
                // Desenha a imagem
                ctx.drawImage(img, x - tamanho/2, y - tamanho/2, tamanho, tamanho);
                
                // Adiciona uma sombra suave
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowBlur = 8;
                ctx.shadowOffsetY = 3;
            };
            
            img.onerror = () => {
                // Fallback: círculo colorido
                let tamanho = 70;
                let x = estado.x;
                let y = estado.y;
                
                if (estadoClicado === estado.sigla) {
                    tamanho = 85;
                    setTimeout(() => {
                        estadoClicado = null;
                        desenharMapa();
                    }, 200);
                }
                
                ctx.fillStyle = estado.cor;
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowBlur = 8;
                ctx.shadowOffsetY = 3;
                ctx.beginPath();
                ctx.arc(x, y, tamanho/2, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.shadowBlur = 0;
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 3;
                ctx.stroke();
                
                ctx.fillStyle = 'white';
                ctx.font = 'bold 18px Arial';
                ctx.shadowColor = 'black';
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                ctx.fillText(estado.sigla, x-12, y+7);
                
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            };
        });
    }
    
    // Função para detectar clique em um estado
    function getEstadoNaPosicao(mouseX, mouseY) {
        for (let i = 0; i < estados.length; i++) {
            const estado = estados[i];
            const dist = Math.hypot(mouseX - estado.x, mouseY - estado.y);
            if (dist < 50) { // Raio de detecção
                return estado;
            }
        }
        return null;
    }
    
    // Evento de clique no canvas
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const mouseX = (e.clientX - rect.left) * scaleX;
        const mouseY = (e.clientY - rect.top) * scaleY;
        
        const estado = getEstadoNaPosicao(mouseX, mouseY);
        if (estado) {
            estadoClicado = estado.sigla;
            desenharMapa();
            
            tooltip.style.display = 'block';
            tooltip.style.left = e.clientX + 20 + 'px';
            tooltip.style.top = e.clientY - 40 + 'px';
            tooltip.innerHTML = `<span style="color: ${estado.cor};">●</span> ${estado.nome} - ${estado.regiao}`;
            
            setTimeout(() => {
                tooltip.style.display = 'none';
            }, 2000);
        }
    });
    
    // Evento de toque no celular
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const touchX = (touch.clientX - rect.left) * scaleX;
        const touchY = (touch.clientY - rect.top) * scaleY;
        
        const estado = getEstadoNaPosicao(touchX, touchY);
        if (estado) {
            estadoClicado = estado.sigla;
            desenharMapa();
            
            tooltip.style.display = 'block';
            tooltip.style.left = touch.clientX + 20 + 'px';
            tooltip.style.top = touch.clientY - 40 + 'px';
            tooltip.innerHTML = `<span style="color: ${estado.cor};">●</span> ${estado.nome} - ${estado.regiao}`;
            
            setTimeout(() => {
                tooltip.style.display = 'none';
            }, 2000);
        }
    });
    
    desenharMapa();
}
