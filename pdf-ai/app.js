// PDF.js Initialization
const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

let pdfDoc = null,
    currentPage = 1,
    totalPages = 0;

// Load PDF
document.getElementById('pdfInput').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const arrayBuffer = e.target.result;
            pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
            totalPages = pdfDoc.numPages;
            document.getElementById('totalPages').textContent = totalPages;
            renderPage(currentPage);
        };
        reader.readAsArrayBuffer(file);
    }
});

// Render PDF Page
async function renderPage(pageNumber) {
    const page = await pdfDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');

    page.render({
        canvasContext: ctx,
        viewport,
    });
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.innerHTML = '';
    pdfViewer.appendChild(canvas);
    document.getElementById('currentPage').textContent = pageNumber;
}

// Pagination
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
    }
});

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// AI Integration
const summarizeBtn = document.getElementById('summarizeBtn');
const askBtn = document.getElementById('askBtn');

summarizeBtn.addEventListener('click', async () => {
    const text = await extractTextFromPDF();
    showLoading("Summarizing...");
    const summary = await fetchSummary(text);
    hideLoading();
    document.getElementById('summary').value = summary;
});

askBtn.addEventListener('click', async () => {
    const text = await extractTextFromPDF();
    const question = document.getElementById('question').value;
    if (question.trim() === "") {
        alert("Please enter a question.");
        return;
    }
    showLoading("Fetching answer...");
    const answer = await fetchAnswer(text, question);
    hideLoading();
    document.getElementById('answer').value = answer;
});

// Extract Text from PDF
async function extractTextFromPDF() {
    let extractedText = '';
    for (let i = 1; i <= totalPages; i++) {
        const page = await pdfDoc.getPage(i);
        const content = await page.getTextContent();
        content.items.forEach((item) => (extractedText += item.str + ' '));
    }
    return extractedText;
}

// AI API Integration
async function fetchSummary(text) {
    try {
        const response = await fetch('https://api.cohere.ai/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer bC0VP2qgDkFENwejXgqI4zxG9UQguRN41CcISnY7',
            },
            body: JSON.stringify({
                text,
                length: "medium",
            }),
        });
        const data = await response.json();
        return data.summary || "No summary available.";
    } catch (error) {
        console.error("Error summarizing:", error);
        return "An error occurred while summarizing.";
    }
}

async function fetchAnswer(text, question) {
    try {
        const response = await fetch('https://api.cohere.ai/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer bC0VP2qgDkFENwejXgqI4zxG9UQguRN41CcISnY7',
            },
            body: JSON.stringify({
                model: "command-xlarge-nightly",
                prompt: `${text}\n\nQuestion: ${question}\nAnswer:`,
                max_tokens: 300,
            }),
        });
        const data = await response.json();
        return data.generations[0].text.trim() || "No answer available.";
    } catch (error) {
        console.error("Error answering question:", error);
        return "An error occurred while fetching the answer.";
    }
}

// Loading Indicator
function showLoading(message) {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.textContent = message;
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '50%';
    loadingDiv.style.left = '50%';
    loadingDiv.style.transform = 'translate(-50%, -50%)';
    loadingDiv.style.backgroundColor = '#333';
    loadingDiv.style.color = '#fff';
    loadingDiv.style.padding = '20px';
    loadingDiv.style.borderRadius = '10px';
    loadingDiv.style.zIndex = '1000';
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
          }
