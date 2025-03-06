let currentOperand = "0";
let previousOperand = "";
let operation = undefined;
let shouldResetScreen = false;

const display = {
  current: document.querySelector(".current-operand"),
  previous: document.querySelector(".previous-operand"),
};

function updateDisplay() {
  display.current.textContent = currentOperand;
  display.previous.textContent = previousOperand;
}

function appendNumber(number) {
  if (currentOperand === "0" || shouldResetScreen) {
    currentOperand = number;
    shouldResetScreen = false;
  } else {
    currentOperand += number;
  }
  updateDisplay();
}

function appendDecimal() {
  if (shouldResetScreen) {
    currentOperand = "0";
    shouldResetScreen = false;
  }
  if (!currentOperand.includes(".")) {
    currentOperand += ".";
  }
  updateDisplay();
}

function clearDisplay() {
  currentOperand = "0";
  previousOperand = "";
  operation = undefined;
  updateDisplay();
}

function setOperation(op) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    calculate("=");
  }
  operation = op;
  previousOperand = currentOperand + " " + operation;
  shouldResetScreen = true;
  updateDisplay();
}

function factorial(n) {
  if (n < 0) return "Error";
  if (n === 0) return 1;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

function calculate(action) {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (action === "=") {
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = "";
  } else {
    switch (action) {
      case "sin":
        computation = Math.sin((current * Math.PI) / 180);
        break;
      case "cos":
        computation = Math.cos((current * Math.PI) / 180);
        break;
      case "tan":
        computation = Math.tan((current * Math.PI) / 180);
        break;
      case "sqrt":
        computation = Math.sqrt(current);
        break;
      case "square":
        computation = current * current;
        break;
      case "cube":
        computation = current * current * current;
        break;
      case "log":
        computation = Math.log10(current);
        break;
      case "ln":
        computation = Math.log(current);
        break;
      case "power":
        previousOperand = current + " ^";
        operation = "power";
        shouldResetScreen = true;
        updateDisplay();
        return;
      case "pi":
        computation = Math.PI;
        break;
      case "e":
        computation = Math.E;
        break;
      case "factorial":
        computation = factorial(current);
        break;
      default:
        return;
    }
    currentOperand = computation.toString();
    previousOperand = "";
  }
  shouldResetScreen = true;
  updateDisplay();
}

// Event Listeners para teclas do teclado
document.addEventListener("keydown", (event) => {
  if (event.key >= "0" && event.key <= "9") appendNumber(event.key);
  if (event.key === ".") appendDecimal();
  if (event.key === "=" || event.key === "Enter") calculate("=");
  if (event.key === "Backspace") clearDisplay();
  if (event.key === "+") setOperation("+");
  if (event.key === "-") setOperation("-");
  if (event.key === "*") setOperation("×");
  if (event.key === "/") setOperation("/");
});
