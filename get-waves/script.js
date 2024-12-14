const waveColor = document.getElementById('waveColor');
const waveHeight = document.getElementById('waveHeight');
const waveOpacity = document.getElementById('waveOpacity');
const wavePreview = document.getElementById('wavePreview');
const waveSVG = document.getElementById('waveSVG');
const copyXML = document.getElementById('copyXML');
const downloadXML = document.getElementById('downloadXML');

// Update wave preview
function updateWave() {
    const color = waveColor.value;
    const height = waveHeight.value;
    const opacity = waveOpacity.value;

    const path = `
        M0,96L48,${Number(height) + 5}C96,${Number(height) + 10},192,${Number(height) + 20},
        288,${Number(height) + 40}C384,${Number(height) + 60},480,${Number(height) + 80},
        576,${Number(height) + 90}C672,${Number(height) + 100},768,${Number(height) + 80},
        864,${Number(height) + 70}C960,${Number(height) + 60},1056,${Number(height) + 40},
        1152,${Number(height) + 50}C1248,${Number(height) + 60},1344,${Number(height) + 70},
        1392,${Number(height) + 75}L1440,${Number(height) + 80}L1440,320L1392,320C1344,320,
        1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,
        288,320C192,320,96,320,48,320L0,320Z`;

    waveSVG.innerHTML = `
        <path fill="${color}" fill-opacity="${opacity}" d="${path}"></path>
    `;
}

// Copy XML to clipboard
function copyToClipboard() {
    const xml = wavePreview.innerHTML.trim();
    navigator.clipboard.writeText(xml).then(() => {
        alert('Wave XML copied to clipboard!');
    }).catch(err => {
        alert('Failed to copy XML: ' + err.message);
    });
}

// Download SVG file
function downloadSVG() {
    const svgBlob = new Blob([wavePreview.innerHTML.trim()], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'waves-byrickbot.svg';
    a.click();
    URL.revokeObjectURL(url);
}

// Event Listeners
waveColor.addEventListener('input', updateWave);
waveHeight.addEventListener('input', updateWave);
waveOpacity.addEventListener('input', updateWave);
copyXML.addEventListener('click', copyToClipboard);
downloadXML.addEventListener('click', downloadSVG);

// Initialize wave preview
updateWave();
