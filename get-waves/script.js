const waveSVG = document.getElementById('wave');
const waveHeightInput = document.getElementById('waveHeight');
const waveFrequencyInput = document.getElementById('waveFrequency');
const waveColorInput = document.getElementById('waveColor');
const generateWaveButton = document.getElementById('generateWave');
const downloadWaveButton = document.getElementById('downloadWave');

// Function to generate waves
function generateWave() {
    const waveHeight = waveHeightInput.value;
    const waveFrequency = waveFrequencyInput.value;
    const waveColor = waveColorInput.value;

    // Generate wave path
    const width = 500;
    const height = 300;
    const points = [];
    for (let i = 0; i <= width; i += 10) {
        const y =
            height / 2 +
            waveHeight * Math.sin((i / width) * waveFrequency * Math.PI * 2);
        points.push([i, y]);
    }
    const pathData =
        `M0,${height} ` +
        points.map(point => `L${point[0]},${point[1]}`).join(' ') +
        ` L${width},${height} Z`;

    // Update SVG
    waveSVG.innerHTML = `<path d="${pathData}" fill="${waveColor}"></path>`;
}

// Function to download SVG
function downloadWave() {
    const svgData = waveSVG.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wave.svg';
    link.click();
    URL.revokeObjectURL(url);
}

// Event Listeners
generateWaveButton.addEventListener('click', generateWave);
downloadWaveButton.addEventListener('click', downloadWave);

// Generate initial wave
generateWave();
