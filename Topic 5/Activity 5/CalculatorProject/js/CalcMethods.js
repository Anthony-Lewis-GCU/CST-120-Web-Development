let currentInput = "";

// this function I pulled from an online resource because i did not have it on my initial design
function press(value) {
  currentInput += value;
  document.getElementById("display").value = currentInput;
}

function calculate() {
  try {
    const result = eval(currentInput);
    document.getElementById("display").value = result;
    currentInput = result.toString();
  } catch (error) {
    document.getElementById("display").value = "Error";
    currentInput = "";
  }
}

function clearDisplay() {
  currentInput = "";
  document.getElementById("display").value = "";
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  document.getElementById("display").value = currentInput;
}

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

