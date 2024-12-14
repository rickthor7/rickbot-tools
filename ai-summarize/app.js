const summarizeBtn = document.getElementById('summarizeBtn');
const inputText = document.getElementById('inputText');
const summaryText = document.getElementById('summaryText');
const summaryLength = document.getElementById('summaryLength');
const loading = document.getElementById('loading');
const output = document.getElementById('output');
const toggleMode = document.getElementById('toggleMode');

// API Key
const API_KEY = "bC0VP2qgDkFENwejXgqI4zxG9UQguRN41CcISnY7";

// Dark Mode Toggle
toggleMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleMode.textContent = document.body.classList.contains('dark-mode') 
        ? '☀️ Light Mode' 
        : '🌙 Dark Mode';
});

// Summarize Function
async function summarizeText() {
    const text = inputText.value.trim();
    const length = summaryLength.value;

    if (!text) {
        alert('Please enter text to summarize!');
        return;
    }

    // Show loading animation
    loading.classList.remove('hidden');
    output.style.display = 'none';

    try {
        const response = await fetch('https://api.cohere.ai/summarize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                length: length,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch summary. Please try again.');
        }

        const result = await response.json();
        summaryText.textContent = result.summary || 'No summary available.';
        output.style.display = 'block';
    } catch (error) {
        console.error(error);
        summaryText.textContent = 'Error: Unable to summarize the text.';
        output.style.display = 'block';
    } finally {
        loading.classList.add('hidden');
    }
}

summarizeBtn.addEventListener('click', summarizeText);
