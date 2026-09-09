// charts.js - Simple CSS-based bar charts

function renderCSSBarChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    const chartDiv = document.createElement('div');
    chartDiv.className = 'bar-chart';
    
    // Find max value
    const maxVal = Math.max(...data.map(d => d.value), 1);
    
    data.forEach(item => {
        const heightPct = (item.value / maxVal) * 100;
        const barWrapper = document.createElement('div');
        barWrapper.style.flex = '1';
        barWrapper.style.display = 'flex';
        barWrapper.style.flexDirection = 'column';
        barWrapper.style.justifyContent = 'flex-end';
        barWrapper.style.height = '100%';
        barWrapper.style.position = 'relative';
        barWrapper.style.margin = '0 10px';
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${heightPct}%`;
        bar.style.backgroundColor = item.color || 'var(--primary-color)';
        
        const valueLabel = document.createElement('div');
        valueLabel.className = 'bar-value';
        valueLabel.innerText = item.value;
        
        const nameLabel = document.createElement('div');
        nameLabel.className = 'bar-label';
        nameLabel.innerText = item.label;
        
        bar.appendChild(valueLabel);
        barWrapper.appendChild(bar);
        barWrapper.appendChild(nameLabel);
        chartDiv.appendChild(barWrapper);
    });
    
    container.appendChild(chartDiv);
}
