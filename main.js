import { Calculator } from "./calculator.js";

const validNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const validOperators = ['+', '-', '*', '/'];
const calculator = new Calculator();
const errorField = document.querySelector('.error-message');
const operandField = document.querySelector('.operand');
const currentValueField = document.querySelector('.current-value');
const numberButtons = document.querySelectorAll('.button--number');
const operatorButtons = document.querySelectorAll('.button--operation');
const resetButton = document.querySelector('.button--reset');
const resultButton = document.querySelector('.button--result');
const reverseButton = document.querySelector('.button--reverse');
const backspaceButton = document.querySelector('.button--backspace');
let isDisabled = false;

function disabledCalculatorInput() {
  numberButtons.forEach((button) => {
    button.setAttribute('disabled', 'disabled');
  });
  operatorButtons.forEach((button) => {
    button.setAttribute('disabled', 'disabled');
  });
  resultButton.setAttribute('disabled', 'disabled');
  reverseButton.setAttribute('disabled', 'disabled');
  backspaceButton.setAttribute('disabled', 'disabled');
  isDisabled = true;
}

function enabledCalculatorInput() {
  errorField.textContent = '';
  isDisabled = false;

  numberButtons.forEach((button) => {
    button.removeAttribute('disabled');
  });
  operatorButtons.forEach((button) => {
    button.removeAttribute('disabled');
  });
  resultButton.removeAttribute('disabled');
  reverseButton.removeAttribute('disabled');
  backspaceButton.removeAttribute('disabled');
}

function checkNumberLength(number) {
  currentValueField.style.fontSize = number.length > 13 ? '46px' : '56px';
}

function enterNumber(value) {
  const isZero = currentValueField.textContent === '0' && value === '0';
  const isFractionRepeat = value === '.' && currentValueField.textContent.includes('.');
  
  if (operandField.textContent.includes('=')) {
    resetCalculator();
  }

  if ( isZero || isFractionRepeat) {
    return;
  }

  if (calculator.operation) {
    if ( !calculator.secondValue || currentValueField.textContent === '0') {
      currentValueField.textContent = value === '.' ? '0.' : value;
    } else {
      if (currentValueField.textContent.length > 15) {
        return;
      }
      currentValueField.textContent += value;
    }
  
    checkNumberLength(currentValueField.textContent);
    calculator.secondValue = currentValueField.textContent;
    return;
  }

  if (currentValueField.textContent.length > 15) {
    return;
  }

  if ( !calculator.firstValue || currentValueField.textContent === '0') {
    currentValueField.textContent = value === '.' ? '0.' : value;
  } else {
    currentValueField.textContent += value;
  }

  checkNumberLength(currentValueField.textContent);
  calculator.firstValue = currentValueField.textContent;
}

function onNumberButtonClick(evt) {
  enterNumber(evt.target.value);
}

function enterOperator(value) {
  if ( operandField.textContent.includes('=') ) {
    calculator.secondValue = null;
    calculator.operationSymbol = value;
    calculator.operation = value;

    operandField.textContent = `${calculator.firstValue} ${calculator.operationSymbol}`;

    currentValueField.textContent = calculator.firstValue;

    return;
  }

  if (calculator.operation && calculator.firstValue && calculator.secondValue) {
    calculator.firstValue = calculator.getResult();
    calculator.secondValue = null;
    calculator.operationSymbol = value;
    calculator.operation = value;

    operandField.textContent = `${calculator.firstValue} ${calculator.operationSymbol}`;

    currentValueField.textContent = calculator.firstValue;

    return;
  }

  if (currentValueField.textContent === '0') {
    calculator.firstValue = '0';
  }
  calculator.operationSymbol = value;
  calculator.operation = value;
  operandField.textContent = `${calculator.firstValue} ${calculator.operationSymbol}`;
}

function onOperatorButtonClick(evt) {
  enterOperator(evt.target.value);
}

function resetCalculator() {
  if (isDisabled) {
    enabledCalculatorInput();
  }

  operandField.textContent = '';
  currentValueField.textContent = '0';
  calculator.firstValue = null;
  calculator.secondValue = null;
  calculator.operation = null;
}

function backspace() {
  if (currentValueField.textContent.length === 1) {
    currentValueField.textContent = '0';

    return;
  }

  currentValueField.textContent = currentValueField.textContent.substring(0, currentValueField.textContent.length - 1);
  checkNumberLength(currentValueField.textContent);
}

function onReverseButtonClick() {
  if ( calculator.operation && calculator.secondValue) {
    calculator.secondValue *= -1;
    currentValueField.textContent = calculator.secondValue;

    return;
  }
  
  if ( calculator.firstValue ) {
    calculator.firstValue *= -1;
    currentValueField.textContent = calculator.firstValue;
  }
}

function getResult() {
  try {
    const result = calculator.getResult();

    if(result || result === 0) {
      checkNumberLength( String(result) );

      operandField.textContent = `${calculator.firstValue} ${calculator.operationSymbol} ${calculator.secondValue} =`;
      currentValueField.textContent = result;
      calculator.firstValue = result;
    }
  } catch (error) {
    disabledCalculatorInput();

    operandField.textContent = '';
    currentValueField.textContent = '';
    errorField.textContent = error.message;
  }
}

function onKeyDown(evt) {
  const value = evt.key;

  if (validNumbers.includes(value)) {
    enterNumber(value);

    return;
  }

  if (validOperators.includes(value)) {
    enterOperator(value);
    
    return;
  }

  if (value === 'Backspace') {
    backspace();
    
    return;
  }

  if (value === '=' || value === 'Enter') {
    evt.preventDefault();
    getResult();
  }
}

numberButtons.forEach((button) => {
  button.addEventListener('click', onNumberButtonClick);
})

operatorButtons.forEach((button) => {
  button.addEventListener('click', onOperatorButtonClick);
})

resetButton.addEventListener('click', resetCalculator);
resultButton.addEventListener('click', getResult);
reverseButton.addEventListener('click', onReverseButtonClick);
backspaceButton.addEventListener('click', backspace);
document.addEventListener('keydown', onKeyDown);