const dropzone = document.getElementById('dropzone');
const imageInput = document.getElementById('imageInput');
const compressButton = document.getElementById('compressButton');
const qualityInput = document.getElementById('quality');
const preview = document.getElementById('preview');
let selectedFile;

dropzone.addEventListener('click', () => imageInput.click());

imageInput.addEventListener('change', (event) => {
    selectedFile = event.target.files[0];
    if (selectedFile) {
        previewImage(selectedFile);
    }
});

dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropzone.style.backgroundColor = '#313143';
});

dropzone.addEventListener('dragleave', () => {
    dropzone.style.backgroundColor = '#2a2a3f';
});

dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropzone.style.backgroundColor = '#2a2a3f';
    selectedFile = event.dataTransfer.files[0];
    if (selectedFile) {
        previewImage(selectedFile);
    }
});

compressButton.addEventListener('click', async () => {
    if (!selectedFile) {
        alert('Please upload an image first.');
        return;
    }

    const quality = parseInt(qualityInput.value, 10) / 100;
    try {
        const compressedFile = await imageCompression(selectedFile, { quality });
        displayCompressedImage(compressedFile);
    } catch (error) {
        console.error('Error compressing image:', error);
    }
});

function previewImage(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        preview.innerHTML = `<img src="${event.target.result}" alt="Selected Image">`;
    };
    reader.readAsDataURL(file);
}

function displayCompressedImage(file) {
    const url = URL.createObjectURL(file);
    preview.innerHTML += `
        <h3>Compressed Image</h3>
        <img src="${url}" alt="Compressed Image">
        <a href="${url}" download="compressed-${selectedFile.name}">
            <button>Download Compressed Image</button>
        </a>
    `;
}
