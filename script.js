const display = document.getElementById("display");
const operators = ["+", "-", "×", "÷"];
let isOn = false;

document.addEventListener("keydown", handleKeyPress);

if (localStorage.getItem("calculations") == null) {
  localStorage.setItem("calculations", "");
}

function initialiseAndResetResults() {
  document.getElementById("results").innerHTML =
    localStorage.getItem("calculations");
}

initialiseAndResetResults();

function handleKeyPress(event) {
  const key = event.key;
  if (!isOn) return;

  if (!isNaN(key)) {
    toDisplay(key);
  } else if (operators.includes(key)) {
    toDisplay(key);
  } else if (key === " ") {
    toggleCalculator();
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    cut();
  } else if (key === "c") {
    clearDisplay();
  } else if (key === ".") {
    toDisplay(key);
  } else if (key === "/" || key === "*") {
    toDisplay(key === "/" ? "÷" : "×");
  }
}

function toDisplay(value) {
  if (!isOn) return;

  const currentValue = display.value;
  const lastChar = currentValue.slice(-1);

  if (operators.includes(value)) {
    if (operators.includes(lastChar) || currentValue === "") {
      return;
    }
  }

  if (
    value === "." &&
    (lastChar === "." ||
      currentValue
        .split(/[\+\-\×\÷]/)
        .pop()
        .includes("."))
  ) {
    return;
  }

  display.placeholder = "0";
  display.value += value;
}

function clearDisplay() {
  if (!isOn) return;

  display.value = "";
  display.placeholder = "0";
}

function cut() {
  if (!isOn) return;

  display.value = display.value.slice(0, -1);
}

function calculate() {
  if (!isOn) return;

  if (display.value !== "") {
    try {
      const result = eval(display.value.replace(/×/g, "*").replace(/÷/g, "/"));
      localStorage.setItem(
        "calculations",
        `${localStorage.getItem("calculations")} ${
          display.value
        } = ${result}<br>`
      );
      initialiseAndResetResults();
      display.placeholder = result;
      display.value = "";
    } catch (e) {
      display.placeholder = "Error";
      display.value = "";
    }
  }
}

function toggleCalculator() {
  isOn = !isOn;
  display.value = "";
  display.placeholder = isOn ? "0" : "";
  const buttons = document.querySelectorAll("button:not(.s2-btn)");
  buttons.forEach((button) => {
    button.disabled = !isOn;
  });
}
