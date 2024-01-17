let num1 = 0;
let operator = "";
let num2 = 0;

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const utility = document.querySelectorAll(".utility");
const dot = document.querySelector(".dot");
const buttons = document.querySelectorAll("button");

// Variable used to update the display value to new number when needed
let numIsSensitive = false; // when number is answer or switching first operand 

let displayValue = display.textContent; // Variable used to store the numbers

numbers.forEach(button => button.addEventListener("click", populateDisplay));
operators.forEach(button => button.addEventListener("click", useOperator));
utility.forEach(button => button.addEventListener("click", useUtility));
dot.addEventListener("click", addDot);
window.addEventListener("keydown", addKeyboardSupport); // window or doc

// Prevents focus on buttons, so when clicking Enter it prevents button click
buttons.forEach(button => button.addEventListener("mousedown", 
    (event) => event.preventDefault()
));


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


function populateDisplay(eventOrKey) {
    // Keyboard support
    let number;
    if (checkIfKeyboard(eventOrKey)) number = eventOrKey;
    else number = eventOrKey.target.textContent;
    // Checks if an event is passed in or a key(string)
    // let number = event.target.textContent;

    if (display.textContent === "0" || numIsSensitive) {
        displayValue = (display.textContent = number);
        numIsSensitive = false;
    } else if (display.textContent.length === 9) {
        alert("Max size reached");
    } else {
        displayValue = (display.textContent += number);
    }
}


function useOperator(eventOrKey) {
    // Keyboard support
    let currentOperator;
    if (checkIfKeyboard(eventOrKey)) currentOperator = eventOrKey;
    else currentOperator = eventOrKey.target.textContent;
    // Checks if an event is passed in or a key(string)
    // let currentOperator = event.target.textContent;
    
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


function calculate() { // Callback
    num2 = parseFloat(display.textContent);
    num1 = operate(num1, num2, operator);

    // Rounding up to avoid overflow in HTML
    num1 = Math.round(num1 * 1000) / 1000;

    display.textContent = `${num1}`;
    numIsSensitive = true;
    operator = "";
    num2 = 0;
}


function useUtility(eventOrKey) {
    // Keyboard support
    let utility = "";
    if (checkIfKeyboard(eventOrKey)) {
        if (eventOrKey === "Delete") utility = "AC";
        else if (eventOrKey === "Backspace") utility = "DEL";
    } else utility = eventOrKey.target.textContent;
    // Checks if an event is passed in or a key(string)
    // let utility = event.target.textContent;

    if (utility === "AC") {
        clear();
    } else if (utility === "DEL") {
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


function checkDivide() { // callback
    if (operator === "/" && parseFloat(display.textContent) === 0) {
        display.textContent = "Bro! No dividing by 0";
        num1 = num2 = 0;
        operator = "";
        numIsSensitive = true;
        return true;
    }
}


function clear() { // callback
    num1 = 0;
    num2 = 0;
    operator = "";
    display.textContent = "0";
}


function addDot() {
    if (numIsSensitive) {
        display.textContent = "0.";
        numIsSensitive = false;
    } else if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
}


function addKeyboardSupport(event) {
    //event.preventDefault();

    let key = event.key;

    const allowedKeys = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "+", "-", "*", "/", "=", "Enter",
        "Backspace", "Delete", "."
    ];

    if (allowedKeys.includes(key)) {
        if (key === "Backspace" || key === "Delete") {
            useUtility(key);
        } else if (Number.isInteger(parseFloat(key))) {
            populateDisplay(key);
        } else if (allowedKeys.slice(10, 16).includes(key)) {
            if (key === "Enter") key = "=";
            useOperator(key);
        } else {
            addDot();
        }
    }
}


function checkIfKeyboard(eventOrKey) { // callback
    return typeof eventOrKey === "string";
    // checks if an event is passed in or a key
}
