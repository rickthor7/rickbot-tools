document.getElementById('formatButton').addEventListener('click', () => {
    const inputCode = document.getElementById('inputCode').value;

    if (inputCode.trim() === "") {
        alert("Please paste your code to format.");
        return;
    }

    // Format the code by adding indentation
    try {
        const formattedCode = js_beautify(inputCode, {
            indent_size: 4,
            space_in_empty_paren: true,
        });
        document.getElementById('outputCode').value = formattedCode;
    } catch (error) {
        alert("An error occurred while formatting the code.");
    }
});

// Beautifier library
function js_beautify(code, options) {
    return code
        .replace(/\s*({|})\s*/g, '\n$1\n')
        .replace(/;\s*/g, ';\n')
        .replace(/\s*([{}])\s*/g, '$1')
        .replace(/\n+/g, '\n')
        .replace(/^\s*\n/gm, '')
        .replace(/(\S)\n/g, '$1\n');
}
