// ==================== MAPA DO BRASIL ====================
const canvas = document.getElementById('mapaCanvas');
const ctx = canvas.getContext('2d');
const tooltip = document.getElementById('tooltip');

const TAMANHO_PADRAO = 90;

// COORDENADAS CORRETAS - NÃO MEXER
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

// ==================== VERIFICAÇÃO DE PRIMEIRO ACESSO ====================
let estadoOrigem = localStorage.getItem('estadoOrigem');

function mostrarBoasVindas() {
    if (!estadoOrigem) {
        // Cria um balão customizado (melhor que alert)
        const balao = document.createElement('div');
        balao.style.position = 'fixed';
        balao.style.top = '50%';
        balao.style.left = '50%';
        balao.style.transform = 'translate(-50%, -50%)';
        balao.style.background = 'white';
        balao.style.padding = '30px';
        balao.style.borderRadius = '30px';
        balao.style.boxShadow = '0 15px 0 #aaa, 0 20px 30px rgba(0,0,0,0.3)';
        balao.style.zIndex = '3000';
        balao.style.border = '5px solid #20C3AF';
        balao.style.maxWidth = '400px';
        balao.style.textAlign = 'center';
        
        balao.innerHTML = `
            <h2 style="color: #2C3E50; margin-bottom: 20px;">🌱 BEM-VINDO À COLHEITA BRASILEIRA!</h2>
            <p style="color: #555; margin-bottom: 20px; font-size: 18px;">
                Clique em um estado para escolher seu local de origem e começar sua jornada!
            </p>
            <button onclick="this.parentElement.remove()" style="
                background: #20C3AF;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 60px;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 5px 0 #1a8f7c;
            ">Entendi!</button>
        `;
        
        document.body.appendChild(balao);
    }
}

// ==================== HISTÓRIAS DOS ESTADOS ====================
const historias = {
    'AC': { texto: 'O Acre foi incorporado ao Brasil em 1903 pelo Tratado de Petrópolis.', fundacao: '1903', curiosidade: 'Faz fronteira com Peru e Bolívia.' },
    'AM': { texto: 'Coração da Floresta Amazônica. Manaus foi centro do Ciclo da Borracha.', fundacao: '1850', curiosidade: 'Maior estado do Brasil.' },
    'PA': { texto: 'Maior produtor de açaí do mundo. Belém foi fundada em 1616.', fundacao: '1616', curiosidade: 'Ilha de Marajó é famosa pela criação de búfalos.' },
    'RO': { texto: 'Criado em 1981, recebeu muitos migrantes do Sul e Sudeste.', fundacao: '1981', curiosidade: 'Maior população indígena da região Norte.' },
    'RR': { texto: 'Último estado a ser criado (1988). Monte Roraima é sua maior atração.', fundacao: '1988', curiosidade: 'Único estado no hemisfério norte.' },
    'TO': { texto: 'Criado em 1988 com o desmembramento de Goiás. Palmas é cidade planejada.', fundacao: '1988', curiosidade: 'Jalapão é destino de ecoturismo.' },
    'AP': { texto: 'Território federal até 1988. Economia baseada em mineração e madeira.', fundacao: '1988', curiosidade: 'Cortado pela linha do equador.' },
    'MA': { texto: 'São Luís é Patrimônio Cultural da Humanidade. Lençóis Maranhenses são únicos.', fundacao: '1612', curiosidade: 'Reggae é paixão local.' },
    'PI': { texto: 'Serra da Capivara tem pinturas rupestres milenares.', fundacao: '1718', curiosidade: 'Menor litoral do Brasil (66km).' },
    'CE': { texto: 'Fortaleza é principal destino turístico. Jangada é símbolo cultural.', fundacao: '1637', curiosidade: 'Primeira província a abolir a escravidão (1884).' },
    'RN': { texto: 'Maior produtor de sal do país. Natal foi base na Segunda Guerra.', fundacao: '1599', curiosidade: 'Ponto mais próximo da África.' },
    'PB': { texto: 'Ponta do Seixas é o ponto mais oriental das Américas.', fundacao: '1585', curiosidade: 'João Pessoa é uma das cidades mais verdes.' },
    'PE': { texto: 'Frevo e Maracatu são Patrimônios da Humanidade. Recife é a Veneza Brasileira.', fundacao: '1537', curiosidade: 'Olinda é cidade colonial preservada.' },
    'AL': { texto: 'Maceió é um dos destinos mais procurados. Rio São Francisco divide AL e SE.', fundacao: '1817', curiosidade: 'Sururu é prato típico.' },
    'SE': { texto: 'Menor estado do Nordeste. Aracaju foi primeira capital planejada.', fundacao: '1820', curiosidade: 'Cânion do Xingó é um dos maiores do mundo.' },
    'BA': { texto: 'Primeira capital do Brasil (1549). Salvador tem o Pelourinho, Patrimônio Mundial.', fundacao: '1549', curiosidade: 'Acarajé é símbolo da culinária africana.' },
    'MT': { texto: 'Cuiabá foi ponto de parada das bandeiras. Pantanal é a maior planície alagável.', fundacao: '1748', curiosidade: 'Chapada dos Guimarães tem formações rochosas.' },
    'MS': { texto: 'Criado em 1977. Bonito é famoso por águas cristalinas.', fundacao: '1977', curiosidade: 'Faz fronteira com Paraguai e Bolívia.' },
    'GO': { texto: 'Desbravado por bandeirantes no século XVIII. Cidade de Goiás é Patrimônio Mundial.', fundacao: '1727', curiosidade: 'Pequi é fruto típico do cerrado.' },
    'DF': { texto: 'Brasília inaugurada em 1960. Única cidade moderna Patrimônio Mundial.', fundacao: '1960', curiosidade: 'Plano Piloto tem forma de avião.' },
    'MG': { texto: 'Centro do Ciclo do Ouro no século XVIII. Estrada Real ligava minas ao Rio.', fundacao: '1720', curiosidade: 'Pão de queijo é iguaria famosa.' },
    'ES': { texto: 'Influência italiana e alemã. Vitória tem alta qualidade de vida.', fundacao: '1535', curiosidade: 'Convento da Penha é um dos mais antigos.' },
    'RJ': { texto: 'Capital do Brasil por quase 200 anos. Cristo Redentor é 7 maravilhas.', fundacao: '1565', curiosidade: 'Pão de Açúcar é cartão-postal.' },
    'SP': { texto: 'Coração econômico do Brasil. Ciclo do café e imigração europeia marcaram história.', fundacao: '1554', curiosidade: 'Maior metrópole da América do Sul.' },
    'PR': { texto: 'Curitiba é referência em planejamento urbano. Cataratas do Iguaçu são gigantes.', fundacao: '1648', curiosidade: 'Imigração europeia forte.' },
    'SC': { texto: 'Praias e imigração alemã/italiana. Florianópolis é destino turístico.', fundacao: '1738', curiosidade: 'Ponte Hercílio Luz é símbolo.' },
    'RS': { texto: 'Tradição gaúcha. Chimarrão e churrasco são marcas culturais.', fundacao: '1737', curiosidade: 'Revolução Farroupilha foi a mais longa guerra civil.' }
};

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

// ==================== FUNÇÃO DE ENTRAR NO ESTADO ====================
window.entrarNoEstado = function(estado) {
    // Se não tiver estado de origem, salva o primeiro
    if (!estadoOrigem) {
        estadoOrigem = estado.sigla;
        localStorage.setItem('estadoOrigem', estado.sigla);
    }
    
    // Troca para tela do estado
    document.getElementById('tela-mapa').classList.remove('ativa');
    document.getElementById('tela-estado').classList.add('ativa');
    
    // Preenche informações
    document.getElementById('nome-estado').innerText = `${estado.nome} - ${estado.regiao}`;
    document.getElementById('historia-estado').innerText = `📜 ${historias[estado.sigla].texto}`;
    document.getElementById('fundacao-estado').innerText = `🏛️ Fundação: ${historias[estado.sigla].fundacao}`;
    document.getElementById('curiosidade-estado').innerText = `📍 ${historias[estado.sigla].curiosidade}`;
    document.getElementById('sitio-estado').innerText = estado.nome;
};

// ==================== EVENTO DE CLIQUE ====================
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    
    const estado = getEstadoNaPosicao(mouseX, mouseY);
    if (estado) {
        window.entrarNoEstado(estado);
    }
});

// ==================== INICIALIZAÇÃO ====================
desenharMapa();
mostrarBoasVindas();
