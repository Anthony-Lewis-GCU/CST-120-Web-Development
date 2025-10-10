// Stores the current input string for operations like toggleSign and percentage
let currentInput = "";

// Tracks whether the last action was a total (used to control button mode)
let isTotaled = false;

/**
 * Handles numeric and decimal input.
 * Replaces leading zero unless input is a decimal.
 * Resets isTotaled flag and updates the mode toggle button.
 */
function press(value) {
  const display = document.getElementById('display');

  // Prevent leading zero unless entering a decimal
  if (display.value === '0' && value !== '.') {
    display.value = value;
  } else {
    display.value += value;
  }

  currentInput = display.value;
  isTotaled = false;
  updateModeToggle();
}

/**
 * Evaluates the current expression in the display.
 * Sets isTotaled to true and updates the mode toggle button.
 */
function calculate() {
  const display = document.getElementById('display');
  try {
    display.value = eval(display.value); // ⚠️ Consider replacing eval() for safety
    currentInput = display.value;
    isTotaled = true;
    updateModeToggle();
  } catch (e) {
    display.value = 'Error';
    currentInput = '';
    isTotaled = true;
    updateModeToggle();
  }
}

/**
 * Clears the display and resets input state.
 * Sets display to default "0" and updates the mode toggle button.
 */
function clearDisplay() {
  const display = document.getElementById('display');
  display.value = '0';
  currentInput = '';
  isTotaled = false;
  updateModeToggle();
}

/**
 * Removes the last character from the display.
 * If empty, resets to "0".
 */
function backspace() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1) || '0';
  currentInput = display.value;
}

/**
 * Toggles the sign of the current input value.
 * Converts string to number, negates it, and updates display.
 */
function toggleSign() {
  if (currentInput) {
    try {
      let value = eval(currentInput);
      value = -value;
      currentInput = value.toString();
      document.getElementById("display").value = currentInput;
    } catch {
      document.getElementById("display").value = "Error";
      currentInput = "";
    }
  }
}

/**
 * Converts the current input to a percentage.
 * Divides by 100 and updates display.
 */
function percentage() {
  if (currentInput) {
    try {
      let value = eval(currentInput);
      value = value / 100;
      currentInput = value.toString();
      document.getElementById("display").value = currentInput;
    } catch {
      document.getElementById("display").value = "Error";
      currentInput = "";
    }
  }
}

/**
 * Handles the dynamic mode toggle button.
 * Executes either clearDisplay() or backspace() depending on label.
 */
function handleModeToggle() {
  const button = document.getElementById('mode-toggle');
  const label = button.textContent;

  if (label === 'AC') {
    clearDisplay();
  } else {
    backspace();
  }
}

/**
 * Updates the mode toggle button label and ARIA label.
 * Shows "AC" if display is empty, zero, or totaled; otherwise shows "⌫".
 */
function updateModeToggle() {
  const button = document.getElementById('mode-toggle');
  const display = document.getElementById('display');
  const value = display.value.trim();

  // Show "AC" if result was just calculated or display is empty/default
  if (isTotaled || value === '' || value === '0' || value === 'Error') {
    button.textContent = 'AC';
    button.setAttribute('aria-label', 'Clear all');
  } else {
    button.textContent = '⌫';
    button.setAttribute('aria-label', 'Backspace');
  }
}