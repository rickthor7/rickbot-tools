// DOM Elements
const cppCodeInput = document.getElementById("cppCode");
const explainBtn = document.getElementById("explainBtn");
const highlightedCode = document.getElementById("highlightedCode");
const explanation = document.getElementById("explanation");

// API Key (Replace with your Cohere API Key)
const API_KEY = "bC0VP2qgDkFENwejXgqI4zxG9UQguRN41CcISnY7";

// Event Listener for the Explain Button
explainBtn.addEventListener("click", async () => {
  const cppCode = cppCodeInput.value.trim();

  if (!cppCode) {
    explanation.textContent = "Please enter some C++ code!";
    return;
  }

  // Syntax Highlighting
  highlightedCode.textContent = cppCode;
  Prism.highlightElement(highlightedCode);

  // Fetch Explanation from API
  explanation.textContent = "Processing... Please wait.";
  
  try {
    const response = await fetch("https://api.cohere.ai/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-xlarge-nightly",
        prompt: `Explain the following C++ code:\n\n${cppCode}`,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    // Cek apakah API mengirimkan penjelasan atau tidak
    if (data && data.generations && data.generations.length > 0) {
      explanation.textContent = data.generations[0].text.trim();
    } else {
      explanation.textContent = "No explanation was generated. Please check your code.";
    }
  } catch (error) {
    console.error("Error fetching explanation:", error);
    explanation.textContent = "An error occurred while processing. Please try again.";
  }
});
