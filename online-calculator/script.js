const display = document.getElementById('display');

// Append number to the display
function appendNumber(number) {
    display.value += number;
}

// Append operator to the display
function appendOperator(operator) {
    if (display.value === '' || isNaN(display.value.slice(-1))) return;
    display.value += operator;
}

// Clear the entire display
function clearDisplay() {
    display.value = '';
}

// Delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate the result
function calculateResult() {
    try {
        display.value = eval(display.value.replace('×', '*').replace('÷', '/'));
    } catch {
        alert('Invalid expression');
    }
}
