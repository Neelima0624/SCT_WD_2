// Grab the display element
let display = document.getElementById("display");
let expression = "";  // Store the full expression
let current = "";     // Store the current input

// Update display with current expression + input
function updateDisplay() {
  display.textContent = expression + current;
}

// Clear calculator state
function clearDisplay() {
  expression = "";
  current = "";
  updateDisplay();
}
function backspace() {
  if (current.length > 0) {
    current = current.slice(0, -1);
    updateDisplay();
  } else if (expression.length > 0) {
    // If current is empty but expression has content
    expression = expression.slice(0, -1);
    updateDisplay();
  }
}

// Toggle sign (+/-)
function toggleSign() {
  if (current) {
    current = (parseFloat(current) * -1).toString();
    updateDisplay();
  }
}

// Percentage
function percentage() {
  if (current) {
    current = (parseFloat(current) / 100).toString();
    updateDisplay();
  }
}

// Add number to current input
function appendNumber(number) {
  current += number;
  updateDisplay();
}

// Add decimal
function appendDecimal() {
  if (!current.includes(".")) {
    current += ".";
    updateDisplay();
  }
}

// Add operator and store expression
function appendOperator(op) {
  if (current) {
    expression += current + op;
    current = "";
  } else if (expression && "+-*/".includes(expression.slice(-1))) {
    // Replace the last operator if pressed again
    expression = expression.slice(0, -1) + op;
  }
  updateDisplay();
}

// Perform calculation
function calculate() {
  if (current) {
    expression += current;
  }
  try {
    let result = eval(expression);
    display.textContent = result;
    current = result.toString();
    expression = "";
  } catch {
    display.textContent = "Error";
    expression = "";
    current = "";
  }
}

// Toggle sections: Home, About, Contact
function toggleSection(sectionId) {
  const sections = document.querySelectorAll(".content");
  sections.forEach((sec) => {
    sec.style.display = sec.id === sectionId ? "block" : "none";
  });

  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    link.classList.toggle("active", link.id.includes(sectionId.split("-")[0]));
  });
}

// Navigation event listeners
document.getElementById("home-link").addEventListener("click", () => toggleSection("home-section"));
document.getElementById("about-link").addEventListener("click", () => toggleSection("about-section"));
document.getElementById("contact-link").addEventListener("click", () => toggleSection("contact-section"));

// Handle contact form submission
function submitContactForm(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && email && message) {
    alert("Thanks for your message, " + name + "!");
    document.querySelector(".contact-form").reset();
  }
}

// Show home section by default
toggleSection("home-section");
