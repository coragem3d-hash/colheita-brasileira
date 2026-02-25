// ==================== PARTE 1 - MAPA DO BRASIL (FINAL) ====================
// Status: ✅ Coordenadas fixas, imagens 90x90, centralizado

console.log('🚀 Mapa do Brasil - Versão Final (Coordenadas Fixas)');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    const tooltip = document.getElementById('tooltip');
    
    // TAMANHO FIXO - NÃO MEXER!
    const TAMANHO_PADRAO = 90;
    
    // COORDENADAS FINAIS - NÃO MEXER! (valores após ajustes)
    const estados = [
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
    
    // ==================== PARTE 2 - ADICIONAR HISTÓRIA ====================
    // APENAS ADICIONANDO DADOS - NÃO MEXER NAS COORDENADAS
    
    const historias = {
        'AC': { 
            historia: 'Acre foi incorporado ao Brasil em 1903 pelo Tratado de Petrópolis. Sua economia baseou-se na extração da borracha.',
            produtos: ['Borracha', 'Castanha', 'Madeira'],
            curiosidade: 'Faz fronteira com Peru e Bolívia.'
        },
        'AM': { 
            historia: 'Coração da Floresta Amazônica. Manaus foi centro do Ciclo da Borracha e hoje abriga a Zona Franca.',
            produtos: ['Guaraná', 'Cupuaçu', 'Pirarucu'],
            curiosidade: 'Maior estado do Brasil em extensão territorial.'
        },
        'PA': { 
            historia: 'O Pará é o maior produtor de açaí do mundo. Belém é uma das cidades mais antigas da Amazônia.',
            produtos: ['Açaí', 'Cacau', 'Castanha'],
            curiosidade: 'A Ilha de Marajó é famosa pela criação de búfalos.'
        },
        'RO': { 
            historia: 'Criado em 1981, Rondônia recebeu muitos migrantes do Sul e Sudeste. Sua economia é baseada na agropecuária.',
            produtos: ['Café', 'Cacau', 'Madeira'],
            curiosidade: 'Tem a maior população indígena da região Norte.'
        },
        'RR': { 
            historia: 'Último estado a ser criado (1988). O Monte Roraima, na tríplice fronteira, é sua maior atração.',
            produtos: ['Banana', 'Milho', 'Peixe'],
            curiosidade: 'Faz fronteira com Venezuela e Guiana.'
        },
        'TO': { 
            historia: 'Criado em 1988 com o desmembramento de Goiás. Palmas é uma cidade planejada.',
            produtos: ['Arroz', 'Gado', 'Soja'],
            curiosidade: 'O Jalapão é um dos destinos de ecoturismo mais procurados.'
        },
        'AP': { 
            historia: 'Amapá foi território federal até 1988. Sua economia baseia-se na extração de minerais e madeira.',
            produtos: ['Açaí', 'Peixe', 'Manganês'],
            curiosidade: 'O Forte de São José de Macapá foi construído no século XVIII.'
        },
        'MA': { 
            historia: 'O Maranhão tem forte influência africana e indígena. São Luís é Patrimônio Cultural da Humanidade.',
            produtos: ['Babaçu', 'Arroz', 'Soja'],
            curiosidade: 'Os Lençóis Maranhenses são um fenômeno único de dunas com lagoas.'
        },
        'PI': { 
            historia: 'O Piauí tem o mais antigo sítio arqueológico das Américas: a Serra da Capivara.',
            produtos: ['Cera de Carnaúba', 'Mel', 'Algodão'],
            curiosidade: 'Tem o menor litoral do Brasil (66 km).'
        },
        'CE': { 
            historia: 'O Ceará foi palco da luta contra os holandeses no século XVII. Fortaleza é um dos principais destinos turísticos.',
            produtos: ['Caju', 'Camarão', 'Algodão'],
            curiosidade: 'A jangada é um símbolo da cultura cearense.'
        },
        'RN': { 
            historia: 'O Rio Grande do Norte é o maior produtor de sal do país. Natal foi um importante ponto estratégico na Segunda Guerra.',
            produtos: ['Sal', 'Camarão', 'Caju'],
            curiosidade: 'O Cabo de São Roque é o ponto mais próximo da África.'
        },
        'PB': { 
            historia: 'A Paraíba tem o ponto mais oriental das Américas: a Ponta do Seixas. João Pessoa é uma das cidades mais verdes do Brasil.',
            produtos: ['Abacaxi', 'Mandioca', 'Cana'],
            curiosidade: 'O Festival de Inverno de Campina Grande é famoso no país.'
        },
        'PE': { 
            historia: 'Pernambuco foi um dos centros da colonização portuguesa. O Frevo e o Maracatu são Patrimônios da Humanidade.',
            produtos: ['Cana-de-açúcar', 'Caju', 'Mandioca'],
            curiosidade: 'Recife é chamada de "Veneza Brasileira" por seus rios e pontes.'
        },
        'AL': { 
            historia: 'Alagoas tem as mais belas praias do Brasil. Maceió é um dos destinos mais procurados.',
            produtos: ['Cana', 'Coco', 'Fumo'],
            curiosidade: 'O Rio São Francisco divide Alagoas de Sergipe.'
        },
        'SE': { 
            historia: 'Sergipe é o menor estado do Nordeste. Aracaju foi a primeira capital planejada do Brasil.',
            produtos: ['Laranja', 'Mandioca', 'Coco'],
            curiosidade: 'O Cânion do Xingó é um dos maiores do mundo.'
        },
        'BA': { 
            historia: 'A Bahia foi o primeiro centro econômico do Brasil colonial. Salvador foi a primeira capital do país.',
            produtos: ['Cacau', 'Dendê', 'Manga'],
            curiosidade: 'O Pelourinho é Patrimônio Cultural da Humanidade.'
        },
        'MT': { 
            historia: 'Mato Grosso é o terceiro maior estado do Brasil. Cuiabá foi um importante ponto de parada das bandeiras.',
            produtos: ['Soja', 'Milho', 'Algodão'],
            curiosidade: 'O Pantanal mato-grossense é a maior planície alagável do mundo.'
        },
        'MS': { 
            historia: 'Criado em 1977, Mato Grosso do Sul tem forte influência da cultura paraguaia. Bonito é famoso por suas águas cristalinas.',
            produtos: ['Erva-mate', 'Gado', 'Soja'],
            curiosidade: 'Faz fronteira com Paraguai e Bolívia.'
        },
        'GO': { 
            historia: 'Goiás foi desbravado pelos bandeirantes no século XVIII. Goiânia é uma cidade planejada.',
            produtos: ['Soja', 'Milho', 'Tomate'],
            curiosidade: 'A cidade de Goiás (antiga capital) é Patrimônio Mundial.'
        },
        'DF': { 
            historia: 'Brasília foi inaugurada em 1960 como a nova capital do Brasil. É a única cidade moderna considerada Patrimônio Mundial pela UNESCO.',
            produtos: ['Tecnologia', 'Serviços', 'Cultura'],
            curiosidade: 'O Plano Piloto tem o formato de um avião.'
        },
        'MG': { 
            historia: 'Minas Gerais foi o centro do Ciclo do Ouro no século XVIII. A Estrada Real ligava as minas ao Rio de Janeiro.',
            produtos: ['Café', 'Leite', 'Queijo'],
            curiosidade: 'O pão de queijo é uma das iguarias mais famosas do estado.'
        },
        'ES': { 
            historia: 'O Espírito Santo tem forte influência da cultura italiana e alemã. Vitória é uma das capitais com melhor qualidade de vida.',
            produtos: ['Café', 'Cacau', 'Granito'],
            curiosidade: 'O Convento da Penha é um dos mais antigos do Brasil.'
        },
        'RJ': { 
            historia: 'O Rio de Janeiro foi capital do Brasil por quase 200 anos. O Cristo Redentor é uma das 7 maravilhas do mundo moderno.',
            produtos: ['Sal', 'Peixe', 'Banana'],
            curiosidade: 'O Pão de Açúcar é um dos cartões-postais mais famosos.'
        },
        'SP': { 
            historia: 'São Paulo é o coração econômico do Brasil. O ciclo do café e a imigração europeia moldaram sua história.',
            produtos: ['Café', 'Cana', 'Laranja'],
            curiosidade: 'A cidade de São Paulo é a maior metrópole da América do Sul.'
        },
        'PR': { 
            historia: 'O Paraná tem forte influência da imigração europeia. Curitiba é referência em planejamento urbano.',
            produtos: ['Soja', 'Milho', 'Trigo'],
            curiosidade: 'As Cataratas do Iguaçu são uma das maiores quedas d\'água do mundo.'
        },
        'SC': { 
            historia: 'Santa Catarina é conhecida por suas praias e pela imigração alemã e italiana. Florianópolis é um dos principais destinos turísticos.',
            produtos: ['Maçã', 'Mel', 'Cebola'],
            curiosidade: 'A Ponte Hercílio Luz é um dos símbolos do estado.'
        },
        'RS': { 
            historia: 'O Rio Grande do Sul tem forte tradição gaúcha. O chimarrão e o churrasco são marcas da cultura local.',
            produtos: ['Erva-mate', 'Trigo', 'Arroz'],
            curiosidade: 'A Revolução Farroupilha foi a mais longa guerra civil do Brasil.'
        }
    };
    
    // Mesclar estados com histórias (SÓ ADICIONAR, NÃO MEXER NAS COORDENADAS)
    const estadosCompletos = estados.map(estado => ({
        ...estado,
        ...historias[estado.sigla]
    }));
    
    function desenharMapa() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#b3e0ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        estadosCompletos.forEach(estado => {
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
    
    function getEstadoNaPosicao(mouseX, mouseY) {
        for (let i = 0; i < estadosCompletos.length; i++) {
            const estado = estadosCompletos[i];
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
            // Mostrar janela com história
            alert(
                `${estado.nome} - ${estado.regiao}\n\n` +
                `📜 História:\n${estado.historia}\n\n` +
                `🌾 Produtos:\n${estado.produtos.join(', ')}\n\n` +
                `📍 Curiosidade:\n${estado.curiosidade}`
            );
            
            tooltip.style.display = 'block';
            tooltip.style.left = e.clientX + 20 + 'px';
            tooltip.style.top = e.clientY - 40 + 'px';
            tooltip.innerHTML = `<span style="color: ${estado.cor};">●</span> ${estado.nome} - ${estado.regiao}`;
            
            setTimeout(() => {
                tooltip.style.display = 'none';
            }, 2000);
        }
    });
    
    desenharMapa();
}
