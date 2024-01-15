let num1 = 0;
let operator = "";
let num2 = 0;

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let numIsAnswer = false; // Variable which keeps the answer immutable
let displayValue = ""; // Variable used to store temporary numbers

numbers.forEach(button => button.addEventListener("click", populateDisplay));


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
    number = event.target.textContent;
    if (display.textContent === "0" || numIsAnswer) {
        displayValue = (display.textContent = number);
    } else if (display.textContent.length === 9) {
        alert("Max size reached");
    } else {
        displayValue = (display.textContent += number);
    }
}
