// ==================== MAPA COM ESPAÇAMENTO UNIFORME ====================
console.log('🚀 Reorganizando com espaçamento uniforme');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    const tooltip = document.getElementById('tooltip');
    
    // Tamanho das imagens (um pouco menor para evitar colisão)
    const TAMANHO_PADRAO = 90;
    
    // Coordenadas base (que estavam funcionando)
    const estadosBase = [
        // NORTE
        { sigla: 'AC', nome: 'Acre', regiao: 'Norte', cor: '#2E7D32', x: 220, y: 540 },
        { sigla: 'AM', nome: 'Amazonas', regiao: 'Norte', cor: '#2E7D32', x: 330, y: 420 },
        { sigla: 'PA', nome: 'Pará', regiao: 'Norte', cor: '#2E7D32', x: 530, y: 320 },
        { sigla: 'RO', nome: 'Rondônia', regiao: 'Norte', cor: '#2E7D32', x: 290, y: 490 },
        { sigla: 'RR', nome: 'Roraima', regiao: 'Norte', cor: '#2E7D32', x: 390, y: 300 },
        { sigla: 'TO', nome: 'Tocantins', regiao: 'Norte', cor: '#2E7D32', x: 470, y: 420 },
        { sigla: 'AP', nome: 'Amapá', regiao: 'Norte', cor: '#2E7D32', x: 630, y: 270 },
        
        // NORDESTE
        { sigla: 'MA', nome: 'Maranhão', regiao: 'Nordeste', cor: '#F57C00', x: 560, y: 360 },
        { sigla: 'PI', nome: 'Piauí', regiao: 'Nordeste', cor: '#F57C00', x: 540, y: 440 },
        { sigla: 'CE', nome: 'Ceará', regiao: 'Nordeste', cor: '#F57C00', x: 670, y: 340 },
        { sigla: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste', cor: '#F57C00', x: 740, y: 370 },
        { sigla: 'PB', nome: 'Paraíba', regiao: 'Nordeste', cor: '#F57C00', x: 740, y: 420 },
        { sigla: 'PE', nome: 'Pernambuco', regiao: 'Nordeste', cor: '#F57C00', x: 700, y: 460 },
        { sigla: 'AL', nome: 'Alagoas', regiao: 'Nordeste', cor: '#F57C00', x: 720, y: 500 },
        { sigla: 'SE', nome: 'Sergipe', regiao: 'Nordeste', cor: '#F57C00', x: 680, y: 540 },
        { sigla: 'BA', nome: 'Bahia', regiao: 'Nordeste', cor: '#F57C00', x: 610, y: 560 },
        
        // CENTRO-OESTE
        { sigla: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste', cor: '#FDD835', x: 390, y: 480 },
        { sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', cor: '#FDD835', x: 370, y: 590 },
        { sigla: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste', cor: '#FDD835', x: 480, y: 540 },
        { sigla: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste', cor: '#FDD835', x: 470, y: 490 },
        
        // SUDESTE
        { sigla: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste', cor: '#1976D2', x: 550, y: 600 },
        { sigla: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste', cor: '#1976D2', x: 630, y: 610 },
        { sigla: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste', cor: '#1976D2', x: 590, y: 670 },
        { sigla: 'SP', nome: 'São Paulo', regiao: 'Sudeste', cor: '#1976D2', x: 510, y: 670 },
        
        // SUL
        { sigla: 'PR', nome: 'Paraná', regiao: 'Sul', cor: '#C2185B', x: 490, y: 740 },
        { sigla: 'SC', nome: 'Santa Catarina', regiao: 'Sul', cor: '#C2185B', x: 530, y: 800 },
        { sigla: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul', cor: '#C2185B', x: 450, y: 860 }
    ];
    
    // 1. Calcular o centro do mapa
    let somaX = 0, somaY = 0;
    estadosBase.forEach(e => { somaX += e.x; somaY += e.y; });
    const centroX = somaX / estadosBase.length;
    const centroY = somaY / estadosBase.length;
    
    // 2. Calcular a distância média dos estados ao centro
    let somaDistancias = 0;
    estadosBase.forEach(e => {
        const dx = e.x - centroX;
        const dy = e.y - centroY;
        somaDistancias += Math.sqrt(dx*dx + dy*dy);
    });
    const distanciaMedia = somaDistancias / estadosBase.length;
    
    console.log(`Centro: (${centroX.toFixed(0)}, ${centroY.toFixed(0)})`);
    console.log(`Distância média: ${distanciaMedia.toFixed(0)}px`);
    
    // 3. Fator de espaçamento (aumentar em 40%)
    const FATOR_ESPACAMENTO = 1.4;
    
    // 4. Aplicar espaçamento proporcional à distância do centro
    const estados = estadosBase.map(estado => {
        const dx = estado.x - centroX;
        const dy = estado.y - centroY;
        
        // Estados mais longe do centro se movem mais
        const distancia = Math.sqrt(dx*dx + dy*dy);
        const fator = 1 + (distancia / distanciaMedia) * 0.3; // Ajuste fino
        
        const novoX = centroX + dx * FATOR_ESPACAMENTO * fator;
        const novoY = centroY + dy * FATOR_ESPACAMENTO * fator;
        
        return {
            ...estado,
            x: Math.round(novoX),
            y: Math.round(novoY)
        };
    });
    
    // 5. Verificar distâncias mínimas e ajustar se necessário
    function verificarColisoes() {
        let ajustes = 0;
        for (let i = 0; i < estados.length; i++) {
            for (let j = i+1; j < estados.length; j++) {
                const dx = estados[i].x - estados[j].x;
                const dy = estados[i].y - estados[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                // Distância mínima recomendada: tamanho do sprite + margem
                const DIST_MIN = TAMANHO_PADRAO + 20;
                
                if (dist < DIST_MIN) {
                    // Afastar os dois
                    const angulo = Math.atan2(dy, dx);
                    const deslocamento = (DIST_MIN - dist) / 2;
                    
                    estados[i].x += Math.round(Math.cos(angulo) * deslocamento);
                    estados[i].y += Math.round(Math.sin(angulo) * deslocamento);
                    estados[j].x -= Math.round(Math.cos(angulo) * deslocamento);
                    estados[j].y -= Math.round(Math.sin(angulo) * deslocamento);
                    
                    ajustes++;
                }
            }
        }
        if (ajustes > 0) {
            console.log(`🔧 Ajustes manuais realizados: ${ajustes}`);
        }
    }
    
    // Executar verificação algumas vezes
    for (let tentativa = 0; tentativa < 3; tentativa++) {
        verificarColisoes();
    }
    
    function desenharMapa() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Fundo
        ctx.fillStyle = '#b3e0ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
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
    
    desenharMapa();
}
