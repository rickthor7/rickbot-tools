// Generate a random color in HEX format
function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Update colors in the palette
function updateColors() {
    for (let i = 1; i <= 5; i++) {
        const colorBox = document.getElementById(`color${i}`);
        const hexText = document.getElementById(`hex${i}`);
        const randomColor = generateRandomColor();
        colorBox.style.backgroundColor = randomColor;
        hexText.textContent = randomColor;
    }
}

// Copy HEX code to clipboard on click
function copyToClipboard(event) {
    const hexText = event.target.textContent;
    navigator.clipboard.writeText(hexText).then(() => {
        alert(`Copied ${hexText} to clipboard!`);
    });
}

// Add event listeners
document.getElementById("generateButton").addEventListener("click", updateColors);
document.querySelectorAll(".hex").forEach(hex => {
    hex.addEventListener("click", copyToClipboard);
});

// Initialize with default colors
updateColors();
