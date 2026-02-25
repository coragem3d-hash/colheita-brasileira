// ==================== MAPA COM COORDENADAS GEOGRÁFICAS REAIS ====================
console.log('🚀 Iniciando mapa com geolocalização precisa');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    
    // Coordenadas baseadas no centroide de cada estado (IBGE)
    const estados = [
        // NORTE (verde)
        { sigla: 'AC', nome: 'Acre', regiao: 'Norte', cor: '#2E7D32', x: 260, y: 520, img: 'imagens/mapa/ac.png' },
        { sigla: 'AM', nome: 'Amazonas', regiao: 'Norte', cor: '#2E7D32', x: 350, y: 400, img: 'imagens/mapa/am.png' },
        { sigla: 'PA', nome: 'Pará', regiao: 'Norte', cor: '#2E7D32', x: 550, y: 320, img: 'imagens/mapa/pa.png' },
        { sigla: 'RO', nome: 'Rondônia', regiao: 'Norte', cor: '#2E7D32', x: 320, y: 470, img: 'imagens/mapa/ro.png' },
        { sigla: 'RR', nome: 'Roraima', regiao: 'Norte', cor: '#2E7D32', x: 400, y: 260, img: 'imagens/mapa/rr.png' },
        { sigla: 'TO', nome: 'Tocantins', regiao: 'Norte', cor: '#2E7D32', x: 500, y: 410, img: 'imagens/mapa/to.png' },
        { sigla: 'AP', nome: 'Amapá', regiao: 'Norte', cor: '#2E7D32', x: 640, y: 230, img: 'imagens/mapa/ap.png' },
        
        // NORDESTE (laranja)
        { sigla: 'MA', nome: 'Maranhão', regiao: 'Nordeste', cor: '#F57C00', x: 580, y: 360, img: 'imagens/mapa/ma.png' },
        { sigla: 'PI', nome: 'Piauí', regiao: 'Nordeste', cor: '#F57C00', x: 550, y: 430, img: 'imagens/mapa/pi.png' },
        { sigla: 'CE', nome: 'Ceará', regiao: 'Nordeste', cor: '#F57C00', x: 670, y: 340, img: 'imagens/mapa/ce.png' },
        { sigla: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste', cor: '#F57C00', x: 730, y: 370, img: 'imagens/mapa/rn.png' },
        { sigla: 'PB', nome: 'Paraíba', regiao: 'Nordeste', cor: '#F57C00', x: 730, y: 410, img: 'imagens/mapa/pb.png' },
        { sigla: 'PE', nome: 'Pernambuco', regiao: 'Nordeste', cor: '#F57C00', x: 690, y: 450, img: 'imagens/mapa/pe.png' },
        { sigla: 'AL', nome: 'Alagoas', regiao: 'Nordeste', cor: '#F57C00', x: 700, y: 480, img: 'imagens/mapa/al.png' },
        { sigla: 'SE', nome: 'Sergipe', regiao: 'Nordeste', cor: '#F57C00', x: 660, y: 510, img: 'imagens/mapa/se.png' },
        { sigla: 'BA', nome: 'Bahia', regiao: 'Nordeste', cor: '#F57C00', x: 590, y: 530, img: 'imagens/mapa/ba.png' },
        
        // CENTRO-OESTE (amarelo)
        { sigla: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste', cor: '#FDD835', x: 420, y: 470, img: 'imagens/mapa/mt.png' },
        { sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', cor: '#FDD835', x: 410, y: 580, img: 'imagens/mapa/ms.png' },
        { sigla: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste', cor: '#FDD835', x: 500, y: 520, img: 'imagens/mapa/go.png' },
        { sigla: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste', cor: '#FDD835', x: 490, y: 490, img: 'imagens/mapa/df.png' },
        
        // SUDESTE (azul)
        { sigla: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste', cor: '#1976D2', x: 550, y: 580, img: 'imagens/mapa/mg.png' },
        { sigla: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste', cor: '#1976D2', x: 620, y: 590, img: 'imagens/mapa/es.png' },
        { sigla: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste', cor: '#1976D2', x: 590, y: 640, img: 'imagens/mapa/rj.png' },
        { sigla: 'SP', nome: 'São Paulo', regiao: 'Sudeste', cor: '#1976D2', x: 510, y: 640, img: 'imagens/mapa/sp.png' },
        
        // SUL (vinho)
        { sigla: 'PR', nome: 'Paraná', regiao: 'Sul', cor: '#C2185B', x: 500, y: 700, img: 'imagens/mapa/pr.png' },
        { sigla: 'SC', nome: 'Santa Catarina', regiao: 'Sul', cor: '#C2185B', x: 540, y: 740, img: 'imagens/mapa/sc.png' },
        { sigla: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul', cor: '#C2185B', x: 470, y: 790, img: 'imagens/mapa/rs.png' }
    ];
    
    function desenharMapa() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Fundo com gradiente (água)
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#b3e0ff');
        grad.addColorStop(1, '#87CEEB');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Desenhar linhas de fronteira (opcional)
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3;
        // Aqui poderíamos desenhar as fronteiras dos estados
        ctx.globalAlpha = 1.0;

        // Desenhar cada estado
        estados.forEach(estado => {
            const img = new Image();
            img.src = estado.img;
            
            img.onload = () => {
                // Desenha imagem com tamanho 80x80
                ctx.drawImage(img, estado.x-40, estado.y-40, 80, 80);
                
                // Opcional: desenhar nome do estado (tooltip será implementado depois)
            };
            
            img.onerror = () => {
                // Fallback: círculo colorido
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
                ctx.font = 'bold 20px Arial';
                ctx.shadowColor = 'black';
                ctx.shadowBlur = 6;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.fillText(estado.sigla, estado.x-15, estado.y+8);
                
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            };
        });
    }
    
    desenharMapa();
}
