const complexityInput = document.getElementById('complexity');
const smoothnessInput = document.getElementById('smoothness');
const generateButton = document.getElementById('generateBlob');
const blobSVG = document.getElementById('blob');
const blobCode = document.getElementById('blobCode');
const copyCodeButton = document.getElementById('copyCode');

// Function to generate blob
function generateBlob() {
    const complexity = complexityInput.value;
    const smoothness = smoothnessInput.value;

    // Generate random blob points
    const points = [];
    for (let i = 0; i < complexity; i++) {
        const angle = (i / complexity) * (2 * Math.PI);
        const radius = 100 + Math.random() * smoothness;
        points.push([
            250 + radius * Math.cos(angle),
            250 + radius * Math.sin(angle),
        ]);
    }

    // Create blob path
    const path = points
        .map((point, index) => {
            const next = points[(index + 1) % points.length];
            return `Q ${point[0]} ${point[1]} ${next[0]} ${next[1]}`;
        })
        .join(' ');

    const d = `M ${points[0][0]} ${points[0][1]} ${path} Z`;

    // Update SVG
    blobSVG.innerHTML = `<path d="${d}" fill="#00ffcc"></path>`;

    // Update SVG code
    blobCode.value = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path d="${d}" fill="#00ffcc"></path></svg>`;
}

// Copy SVG Code
function copyCode() {
    blobCode.select();
    document.execCommand('copy');
    alert('SVG Code copied to clipboard!');
}

// Event Listeners
generateButton.addEventListener('click', generateBlob);
copyCodeButton.addEventListener('click', copyCode);

// Generate initial blob
generateBlob();
