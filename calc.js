let currentValue = '';
let previousValue = '';
let operator = '';

// function for the arithmetics
function add (num1,num2){
  return num1+num2;
};
function subtract (num1,num2){
  return num1-num2;
};
function multiply (num1,num2){
  return num1*num2;
};
function divide (num1,num2){
  return num2===0? "Error": num1/num2;
};

// Function to convert HTML operator symbols to standard ones
function normalizeOperator(op) {
  switch(op) {
    case '÷': return '/';
    case '×': return '*';
    case '−': return '-';
    case '+': return '+';
    default: return op;
  }
}
// function operate to call the arithmetics functions
function operate(operator, num1, num2) {
  const op = normalizeOperator(operator);
  switch(op) {
    case "+": return add(num1, num2);
    case "-": return subtract(num1, num2);
    case "*": return multiply(num1, num2);
    case "/": return divide(num1, num2);
    default: return "invalid operator";
  }
};

//adding the DOM elements
const previousDisplay = document.querySelector('.previousDisplay');
const currentDisplay = document.querySelector('.currentDisplay');
const backBtn = document.querySelector('.backBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const numBtn = document.querySelectorAll('.numBtn');
const decimalBtn =document.querySelector('.decimalBtn');
const bracketBtn =document.querySelectorAll('.bracketBtn');
const operatorBtn = document.querySelectorAll('.operatorBtn');
const equalsBtn = document.querySelector('.equalsBtn');

//adding event listeners
numBtn.forEach(button => {
    button.addEventListener('click', function(e) {
      if(currentValue === "Error") return;
      appendNumber(e.target.textContent);
      currentDisplay.textContent= currentValue;
    });
});

operatorBtn.forEach(button => {
  button.addEventListener('click', function(e){
    if(currentValue === "Error") return;
    //iif expression is complete compute it
    if(previousValue !== '' && currentValue !== '' && operator){
      calculate();
      previousValue = currentValue;
      currentValue = '';
    }
    //allow chaining operator if we have previousValue and no
    const newOperator = e.target.textContent;
    if (previousValue !== '' && currentValue === '') {
      operator = newOperator;
      updateDisplay();
      return;
    }

    appendOperator(e.target.textContent);
    previousDisplay.textContent = previousValue + "" + operator;
    currentDisplay.textContent = currentValue;
  });
});

bracketBtn.forEach(button => {
  button.addEventListener('click', function(e){
    appendBracket(e.target.textContent);
  });
});

decimalBtn.addEventListener('click',function(e){
  appendDecimal(e.target.textContent)
})

//clear screen button
deleteBtn.addEventListener('click',()=> {
  previousValue = '';
  currentValue = '';
  operator = '';
  currentDisplay.textContent = currentValue;
  previousDisplay.textContent = currentValue;
}); 

//backspace on input
backBtn.addEventListener('click',()=>{
  currentValue = currentValue.slice(0,-1);
  updateDisplay();
})


//function to update display
function updateDisplay() {
  currentDisplay.textContent = currentValue;
  previousDisplay.textContent = previousValue + "" + operator;
};

//function to display number on button click
function appendNumber(num) {
currentValue += num;
} ;

//function to handle operator click
function appendOperator(op) {
  if (currentValue === '' && previousValue !== ''){
    operator = op;
    return;
  }
  operator = op;
  previousValue = currentValue;
  currentValue = '';

  equalsBtn.disabled = false; //reenable equals if user clicks operator
} ;


//calculation logic function
function calculate() {
  if (previousValue === '' || currentValue === '' || operator === null) return;
  const num1 = parseFloat(previousValue);
  const num2 = parseFloat(currentValue);
  let results = operate(operator, num1, num2);
  results = roundOff(results)

  if (results === "Error"){
    currentValue = "Error";
    previousValue ='';
    operator = '';
  }else{
    previousDisplay.textContent = `${previousValue} ${operator} ${currentValue}`;
    currentValue = results.toString();
    previousValue = currentValue; 
    operator = '';
  }  
  updateDisplay(); 
  
  // equalsBtn.disabled = true; //disable equals button after calculation
};


function appendDecimal(decimal){
  if(!currentValue.includes(".")){
    currentValue += decimal;
  };
  updateDisplay(currentValue);
}

//function round off the numbers
function roundOff(num){
  return Math.round(num * 100000) / 100000;
}

function appendBracket(bracket){
  currentValue += bracket;
  updateDisplay(currentValue);
}

equalsBtn.addEventListener('click', function(e){
  if (previousValue !== '' && currentValue !== '' && operator !== null){
    calculate();
  }
});
