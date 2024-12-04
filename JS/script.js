// Select necessary elements
const screen = document.getElementById('screen');
const keys = document.querySelectorAll('.calculator-key');
let currentInput = '0';
let previousInput = '';
let operator = null;

// Update the screen
function updateScreen(value) {
    screen.textContent = value;
}

// Handle button clicks
keys.forEach((key) => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent;

        // Handle clear button
        if (key.classList.contains('clearKey')) {
            clearCalculator();
            return;
        }

        // Handle number input
        if (!isNaN(keyValue) || keyValue === '.') {
            handleNumberInput(keyValue);
        }

        // Handle operator input
        if (['+', '-', '*', '/'].includes(keyValue)) {
            handleOperatorInput(keyValue);
        }

        // Handle equals
        if (keyValue === '=') {
            handleEquals();
        }
    });
});

// Handle number input
function handleNumberInput(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value; // Replace the initial 0
    } else if (value === '.' && currentInput.includes('.')) {
        return; // Ignore if multiple decimals
    } else {
        currentInput += value;
    }
    updateScreen(currentInput);
}

// Handle operator input
function handleOperatorInput(value) {
    if (currentInput === '') return;

    if (previousInput && operator) {
        calculate();
    }

    operator = value;
    previousInput = currentInput;
    currentInput = '';
}

// Perform calculation
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 'Error'; // Handle division by zero
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateScreen(currentInput);
}

// Handle equals button
function handleEquals() {
    if (operator && currentInput) {
        calculate();
    }
}

// Handle clear button
function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateScreen(currentInput);
}
