// ==================== PARTE 1 - MAPA DO BRASIL ====================
// ✅ FINALIZADO - NÃO MEXER

console.log('🚀 Iniciando Colheita Brasileira');

const canvas = document.getElementById('mapaCanvas');
if (!canvas) {
    document.body.innerHTML += '<h2 style="color:red">❌ Canvas não encontrado!</h2>';
} else {
    const ctx = canvas.getContext('2d');
    const tooltip = document.getElementById('tooltip');
    
    const TAMANHO_PADRAO = 90;
    
    // ESTADOS - COORDENADAS FIXAS (NÃO MEXER)
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
    
    // ==================== PARTE 2 - HISTÓRIAS DOS ESTADOS ====================
    
    const historias = {
        'AC': {
            texto: 'O Acre foi incorporado ao Brasil em 1903 pelo Tratado de Petrópolis. Antes pertencia à Bolívia. A economia baseou-se na extração da borracha, que atraiu migrantes nordestinos no ciclo da borracha.',
            fundacao: '1903 (oficialmente brasileiro)',
            curiosidade: 'Faz fronteira com Peru e Bolívia. Rio Branco é a capital.'
        },
        'AM': {
            texto: 'Coração da Floresta Amazônica. Manaus foi centro do Ciclo da Borracha no século XIX e hoje abriga a Zona Franca, polo industrial no meio da selva.',
            fundacao: '1850 (província)',
            curiosidade: 'Maior estado do Brasil em extensão territorial. O Rio Amazonas é o maior do mundo em volume de água.'
        },
        'PA': {
            texto: 'O Pará é o maior produtor de açaí do mundo. Belém é uma das cidades mais antigas da Amazônia, fundada em 1616. Foi palco da Cabanagem, uma das revoltas mais sangrentas do Brasil.',
            fundacao: '1616 (Belém)',
            curiosidade: 'A Ilha de Marajó é famosa pela criação de búfalos e pelas cerâmicas marajoaras.'
        },
        'RO': {
            texto: 'Criado em 1981, Rondônia recebeu muitos migrantes do Sul e Sudeste. Sua economia é baseada na agropecuária e na mineração.',
            fundacao: '1981 (estado)',
            curiosidade: 'Tem a maior população indígena da região Norte, com destaque para os suruís.'
        },
        'RR': {
            texto: 'Último estado a ser criado (1988). O Monte Roraima, na tríplice fronteira (Brasil, Venezuela, Guiana), é sua maior atração natural.',
            fundacao: '1988',
            curiosidade: 'É o estado menos populoso do Brasil. Boa Vista é a única capital brasileira totalmente no hemisfério norte.'
        },
        'TO': {
            texto: 'Criado em 1988 com o desmembramento de Goiás. Palmas é uma cidade planejada. A Ilha do Bananal é a maior ilha fluvial do mundo.',
            fundacao: '1988',
            curiosidade: 'O Jalapão é um dos destinos de ecoturismo mais procurados do país.'
        },
        'AP': {
            texto: 'Amapá foi território federal até 1988. Sua economia baseia-se na extração de minerais e madeira. O Forte de São José de Macapá foi construído no século XVIII.',
            fundacao: '1988',
            curiosidade: 'A foz do Rio Amazonas fica no Amapá. Macapá é cortada pela linha do equador.'
        },
        'MA': {
            texto: 'O Maranhão tem forte influência africana e indígena. São Luís é Patrimônio Cultural da Humanidade. Os Lençóis Maranhenses são um fenômeno único de dunas com lagoas.',
            fundacao: '1612 (São Luís)',
            curiosidade: 'O reggae é uma paixão local. São Luís é chamada de "Jamaica Brasileira".'
        },
        'PI': {
            texto: 'O Piauí tem o mais antigo sítio arqueológico das Américas: a Serra da Capivara, com pinturas rupestres de milhares de anos.',
            fundacao: '1718 (PI)',
            curiosidade: 'Tem o menor litoral do Brasil (66 km). O Delta do Parnaíba é um dos três únicos deltas em mar aberto do mundo.'
        },
        'CE': {
            texto: 'O Ceará foi palco da luta contra os holandeses no século XVII. Fortaleza é um dos principais destinos turísticos. A jangada é um símbolo da cultura cearense.',
            fundacao: '1637 (Fortaleza)',
            curiosidade: 'O Ceará foi a primeira província a abolir a escravidão, em 1884.'
        },
        'RN': {
            texto: 'O Rio Grande do Norte é o maior produtor de sal do país. Natal foi um importante ponto estratégico na Segunda Guerra, com base em Parnamirim.',
            fundacao: '1599 (Natal)',
            curiosidade: 'O Cabo de São Roque é o ponto mais próximo da África no Brasil.'
        },
        'PB': {
            texto: 'A Paraíba tem o ponto mais oriental das Américas: a Ponta do Seixas. João Pessoa é uma das cidades mais verdes do Brasil.',
            fundacao: '1585 (João Pessoa)',
            curiosidade: 'O Festival de Inverno de Campina Grande é famoso no país.'
        },
        'PE': {
            texto: 'Pernambuco foi um dos centros da colonização portuguesa. O Frevo e o Maracatu são Patrimônios da Humanidade. Recife é chamada de "Veneza Brasileira".',
            fundacao: '1537 (Recife)',
            curiosidade: 'Olinda é uma das cidades mais preservadas do período colonial.'
        },
        'AL': {
            texto: 'Alagoas tem as mais belas praias do Brasil. Maceió é um dos destinos mais procurados. O Rio São Francisco divide Alagoas de Sergipe.',
            fundacao: '1817 (AL)',
            curiosidade: 'O sururu é um prato típico à base de moluscos.'
        },
        'SE': {
            texto: 'Sergipe é o menor estado do Nordeste. Aracaju foi a primeira capital planejada do Brasil. O Cânion do Xingó é um dos maiores do mundo.',
            fundacao: '1820 (SE)',
            curiosidade: 'O caranguejo é um dos símbolos da culinária local.'
        },
        'BA': {
            texto: 'A Bahia foi o primeiro centro econômico do Brasil colonial. Salvador foi a primeira capital do país. O Pelourinho é Patrimônio Cultural da Humanidade.',
            fundacao: '1549 (Salvador)',
            curiosidade: 'O acarajé é um dos símbolos da culinária baiana, de origem africana.'
        },
        'MT': {
            texto: 'Mato Grosso é o terceiro maior estado do Brasil. Cuiabá foi um importante ponto de parada das bandeiras. O Pantanal é a maior planície alagável do mundo.',
            fundacao: '1748 (MT)',
            curiosidade: 'A Chapada dos Guimarães tem formações rochosas impressionantes.'
        },
        'MS': {
            texto: 'Criado em 1977, Mato Grosso do Sul tem forte influência da cultura paraguaia. Bonito é famoso por suas águas cristalinas.',
            fundacao: '1977',
            curiosidade: 'Faz fronteira com Paraguai e Bolívia. O tereré é consumido no lugar do chimarrão.'
        },
        'GO': {
            texto: 'Goiás foi desbravado pelos bandeirantes no século XVIII. Goiânia é uma cidade planejada. A cidade de Goiás (antiga capital) é Patrimônio Mundial.',
            fundacao: '1727 (Goiás)',
            curiosidade: 'O pequi é um fruto típico do cerrado, muito usado na culinária local.'
        },
        'DF': {
            texto: 'Brasília foi inaugurada em 1960 como a nova capital do Brasil. É a única cidade moderna considerada Patrimônio Mundial pela UNESCO.',
            fundacao: '1960',
            curiosidade: 'O Plano Piloto tem o formato de um avião. A cidade foi planejada por Lúcio Costa e Oscar Niemeyer.'
        },
        'MG': {
            texto: 'Minas Gerais foi o centro do Ciclo do Ouro no século XVIII. A Estrada Real ligava as minas ao Rio de Janeiro. O pão de queijo é uma das iguarias mais famosas.',
            fundacao: '1720 (MG)',
            curiosidade: 'Tiradentes, herói da Inconfidência Mineira, é natural de Minas.'
        },
        'ES': {
            texto: 'O Espírito Santo tem forte influência da cultura italiana e alemã. Vitória é uma das capitais com melhor qualidade de vida.',
            fundacao: '1535 (ES)',
            curiosidade: 'O Convento da Penha é um dos mais antigos do Brasil.'
        },
        'RJ': {
            texto: 'O Rio de Janeiro foi capital do Brasil por quase 200 anos. O Cristo Redentor é uma das 7 maravilhas do mundo moderno.',
            fundacao: '1565 (Rio de Janeiro)',
            curiosidade: 'O Pão de Açúcar é um dos cartões-postais mais famosos.'
        },
        'SP': {
            texto: 'São Paulo é o coração econômico do Brasil. O ciclo do café e a imigração europeia moldaram sua história.',
            fundacao: '1554 (São Paulo)',
            curiosidade: 'A cidade de São Paulo é a maior metrópole da América do Sul.'
        },
        'PR': {
            texto: 'O Paraná tem forte influência da imigração europeia. Curitiba é referência em planejamento urbano.',
            fundacao: '1648 (PR)',
            curiosidade: 'As Cataratas do Iguaçu são uma das maiores quedas d\'água do mundo.'
        },
        'SC': {
            texto: 'Santa Catarina é conhecida por suas praias e pela imigração alemã e italiana. Florianópolis é um dos principais destinos turísticos.',
            fundacao: '1738 (SC)',
            curiosidade: 'A Ponte Hercílio Luz é um dos símbolos do estado.'
        },
        'RS': {
            texto: 'O Rio Grande do Sul tem forte tradição gaúcha. O chimarrão e o churrasco são marcas da cultura local.',
            fundacao: '1737 (RS)',
            curiosidade: 'A Revolução Farroupilha foi a mais longa guerra civil do Brasil.'
        }
    };
    
    // ==================== SISTEMA DE ESTADO DE ORIGEM ====================
    
    let estadoSelecionado = null;
    let estadoOrigem = localStorage.getItem('estadoOrigem');
    
    function mostrarBalaoInicial() {
        if (!estadoOrigem) {
            setTimeout(() => {
                alert('🌱 Bem-vindo à Colheita Brasileira!\n\nClique em um estado para escolher seu local de origem!');
            }, 500);
        }
    }
    
    // ==================== FUNÇÕES DO MAPA ====================
    
    function desenharMapa() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#b3e0ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        estados.forEach(estado => {
            const img = new Image();
            img.src = `imagens/mapa/${estado.sigla.toLowerCase()}.png`;
            
            img.onload = () => {
                ctx.drawImage(img, estado.x - TAMANHO_PADRAO/2, estado.y - TAMANHO_PADRAO/2, TAMANHO_PADRAO, TAMANHO_PADRAO);
                
                // Destacar se for o estado de origem
                if (estadoOrigem === estado.sigla) {
                    ctx.strokeStyle = '#FFD700';
                    ctx.lineWidth = 4;
                    ctx.setLineDash([5, 3]);
                    ctx.strokeRect(estado.x - TAMANHO_PADRAO/2 - 5, estado.y - TAMANHO_PADRAO/2 - 5, TAMANHO_PADRAO + 10, TAMANHO_PADRAO + 10);
                    ctx.setLineDash([]);
                }
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
        for (let i = 0; i < estados.length; i++) {
            const estado = estados[i];
            const dist = Math.hypot(mouseX - estado.x, mouseY - estado.y);
            if (dist < 50) {
                return estado;
            }
        }
        return null;
    }
    
    // ==================== EVENTO DE CLIQUE ====================
    
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const mouseX = (e.clientX - rect.left) * scaleX;
        const mouseY = (e.clientY - rect.top) * scaleY;
        
        const estado = getEstadoNaPosicao(mouseX, mouseY);
        if (estado) {
            if (!estadoOrigem) {
                // Primeiro estado escolhido = estado de origem
                estadoOrigem = estado.sigla;
                localStorage.setItem('estadoOrigem', estado.sigla);
                
                const historia = historias[estado.sigla];
                
                alert(
                    `🌍 ESTADO DE ORIGEM ESCOLHIDO: ${estado.nome} - ${estado.regiao}\n\n` +
                    `📜 HISTÓRIA:\n${historia.texto}\n\n` +
                    `🏛️ FUNDAÇÃO: ${historia.fundacao}\n\n` +
                    `📍 CURIOSIDADE: ${historia.curiosidade}\n\n` +
                    `✅ Agora você será levado ao seu sítio em ${estado.nome}!`
                );
                
                // Aqui depois vamos redirecionar para a tela do sítio
                // Por enquanto só mostra o destaque
                
            } else {
                // Se já tem origem, só mostra a história
                const historia = historias[estado.sigla];
                
                alert(
                    `🌍 ${estado.nome} - ${estado.regiao}\n\n` +
                    `📜 HISTÓRIA:\n${historia.texto}\n\n` +
                    `🏛️ FUNDAÇÃO: ${historia.fundacao}\n\n` +
                    `📍 CURIOSIDADE: ${historia.curiosidade}`
                );
            }
            
            desenharMapa();
        }
    });
    
    // ==================== INICIALIZAÇÃO ====================
    
    desenharMapa();
    mostrarBalaoInicial();
}
