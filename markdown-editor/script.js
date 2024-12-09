// Import library to convert Markdown to HTML
function markdownToHtml(markdown) {
    return markdown
        .replace(/^# (.*$)/gim, '<h1>$1</h1>') // Heading 1
        .replace(/^## (.*$)/gim, '<h2>$1</h2>') // Heading 2
        .replace(/^### (.*$)/gim, '<h3>$1</h3>') // Heading 3
        .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>') // Bold
        .replace(/\*(.*)\*/gim, '<i>$1</i>') // Italic
        .replace(/!(.*?)(.*?)/gim, '<img alt="$1" src="$2" />') // Image
        .replace(/(.*?)(.*?)/gim, '<a href="$2" target="_blank">$1</a>') // Link
        .replace(/\n$/gim, '<br>'); // Line breaks
}

// Update the preview as the user types
function updatePreview() {
    const markdownInput = document.getElementById("markdownInput").value;
    const markdownPreview = document.getElementById("markdownPreview");
    markdownPreview.innerHTML = markdownToHtml(markdownInput);
}

// Add event listener to the textarea
document.getElementById("markdownInput").addEventListener("input", updatePreview);

// Initialize with placeholder text
document.getElementById("markdownInput").placeholder =
    "# Markdown Previewer\n\n" +
    "Write **markdown** here and see the live preview!\n\n" +
    "## Features:\n" +
    "- Supports **bold**, *italic*, [links](https://example.com), and images.\n" +
    "- Real-time rendering.\n\n" +
    "![Example Image](https://via.placeholder.com/150)";
