let display = document.getElementById("display");
let expression = "";

function updateDisplay() {
    display.textContent = expression || "0";
}

function appendNumber(number) {
    expression += number;
    updateDisplay();
}

function appendDecimal() {
    if (expression === "" || /[+\-*/]$/.test(expression)) {
        expression += "0.";
    } else {
        // Prevent multiple decimals in the same number
        const parts = expression.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        if (!lastPart.includes(".")) {
            expression += ".";
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (expression === "") return;

    // Replace last operator if multiple in a row
    if (/[+\-*/]$/.test(expression)) {
        expression = expression.slice(0, -1);
    }
    expression += op;
    updateDisplay();
}

function calculate() {
    if (expression === "") return;

    try {
        const result = eval(expression);
        expression = result.toString();
        updateDisplay();
    } catch (err) {
        expression = "Error";
        updateDisplay();
        setTimeout(() => {
            expression = "";
            updateDisplay();
        }, 1500);
    }
}

function percentage() {
    try {
        const result = eval(expression) / 100;
        expression = result.toString();
        updateDisplay();
    } catch (err) {
        expression = "Error";
        updateDisplay();
    }
}

function toggleSign() {
    try {
        const result = eval(expression) * -1;
        expression = result.toString();
        updateDisplay();
    } catch (err) {
        expression = "Error";
        updateDisplay();
    }
}

function clearDisplay() {
    expression = "";
    updateDisplay();
}

// Keyboard support
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        appendOperator(key);
    } else if (key === ".") {
        appendDecimal();
    } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculate();
    } else if (key === "Escape") {
        clearDisplay();
    }
});

// Initialize
updateDisplay();
