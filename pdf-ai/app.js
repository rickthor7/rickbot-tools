const pdfjsLib = window['pdfjs-dist/build/pdf'];
let pdfDoc = null, currentPage = 1, totalPages = 0;

const pdfInput = document.getElementById("pdfInput");
const pdfViewer = document.getElementById("pdfViewer");
const currentPageElement = document.getElementById("currentPage");
const totalPagesElement = document.getElementById("totalPages");

// Load PDF
pdfInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
      totalPages = pdfDoc.numPages;
      totalPagesElement.textContent = totalPages;
      renderPage(currentPage);
    };
    reader.readAsArrayBuffer(file);
  }
});

// Render PDF Page
async function renderPage(pageNumber) {
  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 1 });
  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext("2d");
  await page.render({ canvasContext: ctx, viewport }).promise;

  pdfViewer.innerHTML = "";
  pdfViewer.appendChild(canvas);
  currentPageElement.textContent = pageNumber;
}

// Pagination
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
  }
});

// Summarize PDF with Cohere
document.getElementById("summarizeBtn").addEventListener("click", async () => {
  const text = await extractText();
  const summary = await callCohereAPI(text, "summarize");
  document.getElementById("summary").value = summary || "No summary available.";
});

// Ask Questions with Cohere
document.getElementById("askBtn").addEventListener("click", async () => {
  const text = await extractText();
  const question = document.getElementById("question").value;
  const answer = await callCohereAPI(text, "ask", question);
  document.getElementById("answer").value = answer || "No answer available.";
});

// Extract Text from PDF
async function extractText() {
  let fullText = "";
  for (let i = 1; i <= totalPages; i++) {
    const page = await pdfDoc.getPage(i);
    const content = await page.getTextContent();
    fullText += content.items.map(item => item.str).join(" ");
  }
  return fullText;
}

// Call Cohere API
async function callCohereAPI(text, type, question = "") {
  const apiUrl = type === "summarize" 
    ? "https://api.cohere.ai/summarize" 
    : "https://api.cohere.ai/generate";
  const body = type === "summarize" 
    ? { text, length: "medium" }
    : { model: "command-xlarge-nightly", prompt: `${text}\nQuestion: ${question}\nAnswer:`, max_tokens: 300 };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer bC0VP2qgDkFENwejXgqI4zxG9UQguRN41CcISnY7",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return type === "summarize" ? data.summary : data.generations[0]?.text.trim();
}
