let num1 = 0;
let operator = "";
let num2 = 0;

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const utility = document.querySelectorAll(".utility");
const dot = document.querySelector(".dot");

// Variable used to update the display value to new number when needed
let numIsSensitive = false; // when number is answer or switching first operand 

let displayValue = display.textContent; // Variable used to store the numbers

numbers.forEach(button => button.addEventListener("click", populateDisplay));
operators.forEach(button => button.addEventListener("click", useOperand));
utility.forEach(button => button.addEventListener("click", useUtility));


function add(a, b) {
    return a + b;
}


function subtract(a, b) {
    return a - b;
}


function multiply(a, b) {
    return a * b;
}


function divide(a, b) {
    return a / b;
}


function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return 0;
    }
}


function populateDisplay(event) {
    let number = event.target.textContent;
    if (display.textContent === "0" || numIsSensitive) {
        displayValue = (display.textContent = number);
        numIsSensitive = false;
    } else if (display.textContent.length === 9) {
        alert("Max size reached");
    } else {
        displayValue = (display.textContent += number);
    }
}


function useOperand(event) {
    let currentOperator = event.target.textContent;
    if (currentOperator === "=") {
        if (!operator || numIsSensitive) { // If there isn't operator or num2
            return alert("Missing Arguments");
        } else {
            if (checkDivide()) return;

            calculate();
        }
    } else {
        if (!operator) {
            num1 = parseFloat(display.textContent);
            numIsSensitive = true;
            operator = currentOperator;
        } else if (numIsSensitive) { // If there is an operator but no num2
            return alert("Missing Arguments");
        } else {
            if (checkDivide()) return;

            calculate();
            operator = currentOperator;
        }
    }
}


function calculate() {
    num2 = parseFloat(display.textContent);
    num1 = operate(num1, num2, operator);

    // Rounding up to avoid overflow in HTML
    num1 = Math.round(num1 * 1000) / 1000;

    display.textContent = `${num1}`;
    numIsSensitive = true;
    operator = "";
    num2 = 0;
}


function useUtility(event) {
    if (event.target.textContent === "AC") {
        clear();
    } else if (event.target.textContent === "DEL") {
        if (numIsSensitive) {
            clear();
        } else if (display.textContent.length === 1 || 
            display.textContent === "0") {
                display.textContent = "0";
        } else {
            display.textContent = display.textContent.slice(0, -1);
        }
    }
}


function checkDivide() {
    if (operator === "/" && parseFloat(display.textContent) === 0) {
        display.textContent = "Bro! No dividing by 0";
        num1 = num2 = 0;
        operator = "";
        numIsSensitive = true;
        return true;
    }
}


function clear() {
    num1 = 0;
    num2 = 0;
    operator = "";
    display.textContent = "0";
}
