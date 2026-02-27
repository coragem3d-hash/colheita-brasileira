// ==================== CENTRALIZAÇÃO AUTOMÁTICA ====================
function centralizarMapa() {
    // Encontra os limites do mapa
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    
    estados.forEach(e => {
        minX = Math.min(minX, e.x);
        maxX = Math.max(maxX, e.x);
        minY = Math.min(minY, e.y);
        maxY = Math.max(maxY, e.y);
    });
    
    // Centro atual dos estados
    const centroAtualX = (minX + maxX) / 2;
    const centroAtualY = (minY + maxY) / 2;
    
    // Centro do canvas
    const centroCanvasX = canvas.width / 2;
    const centroCanvasY = canvas.height / 2;
    
    // Calcula deslocamento necessário
    const deslocX = centroCanvasX - centroAtualX;
    const deslocY = centroCanvasY - centroAtualY;
    
    // Aplica o deslocamento em todos os estados
    estados.forEach(e => {
        e.x = Math.round(e.x + deslocX);
        e.y = Math.round(e.y + deslocY);
    });
    
    console.log(`Mapa centralizado! Deslocamento: X=${deslocX.toFixed(0)}, Y=${deslocY.toFixed(0)}`);
}

// ==================== CHAMAR A FUNÇÃO ====================
centralizarMapa();
