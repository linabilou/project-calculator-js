const displayHistoryEl = document.querySelector('.display-history'); 
const displayFinalResultEl = document.querySelector('.display-finalResult');
const TemporaryResultEl = document.querySelector('.display-temporaryResult');
const numbersEl = document.querySelectorAll('.number');
const operationsEl = document.querySelectorAll('.operation');
const equalEl = document.querySelector('.equal');
const clearAllEl = document.querySelector('.all-clear');
const clearLastEl = document.querySelector('.last-entity-clear');

let historyNumbers = ''; //content history of numbers
let currentResultNumber = ''; //content number of final result
let result = null;
let lastOperation = ''; 
let haveDot = false;

numbersEl.forEach(number => {
    number.addEventListener('click', (event) => {
        if(event.target.innerText === '.' && !haveDot){
            haveDot = true;
        }else if(event.target.innerText === '.' && haveDot){
            return;
        }
        currentResultNumber += event.target.innerText;
        console.log(currentResultNumber);
        displayFinalResultEl.innerText = currentResultNumber;
    });
});

operationsEl.forEach(operation => {
    operation.addEventListener('click', (event) =>{
        if(!currentResultNumber) return;
        haveDot = false;
        const operationName = event.target.innerText;
        if(historyNumbers  && currentResultNumber &&  lastOperation){
            mathOperation();
        }else{
            result = parseFloat(currentResultNumber);
        }
        clearVar(operationName);  
        lastOperation = operationName; 
    }                                                                                                                                                                                                         )
});

//clear currentResultNumber and it to historyNumbers; 
//show temporary result to displayTemporary zone
function clearVar(name = ' '){
    historyNumbers += currentResultNumber + ' ' + name + ' ';
    displayHistoryEl.innerText = historyNumbers;
    currentResultNumber.innerText = '';
    currentResultNumber = '';
    TemporaryResultEl.innerText = result;
}

function mathOperation(){
    switch(lastOperation){
        case 'X':
            result = parseFloat(result) * parseFloat(currentResultNumber);
            break;
        case '+':
            result = parseFloat(result) + parseFloat(currentResultNumber);
            break;
        case '-':
            result = parseFloat(result) - parseFloat(currentResultNumber);
            break;
        case '/':
            result = parseFloat(result) / parseFloat(currentResultNumber);
            break;
        case '%':
            result = parseFloat(result) % parseFloat(currentResultNumber);
            break;
    }

}

equalEl.addEventListener('click', (event)=>{
    if(!historyNumbers || !currentResultNumber) return;
    haveDot = false;
    mathOperation();
    clearVar();
    displayFinalResultEl.innerText = result;
    TemporaryResultEl.innerText = '';
    currentResultNumber = result;
     historyNumbers = '';    
});

clearAllEl.addEventListener('click', (event)=>{
    displayHistoryEl.innerText = '0';
    displayFinalResultEl.innerText = '0';
    historyNumbers = '';
    currentResultNumber = '';
    result = '';
    TemporaryResultEl.innerText = '0';
});

clearLastEl.addEventListener('click', (event) =>{
    displayFinalResultEl.innerText = '';
    currentResultNumber = '';
});

//use keyboard numbers and operations to use our calculator

window.addEventListener('keydown', (event) =>{
    if(
        event.key === '0' || 
        event.key === '1' || 
        event.key === '2' || 
        event.key === '3' || 
        event.key === '4' || 
        event.key === '5' || 
        event.key === '6' || 
        event.key === '7' || 
        event.key === '8' || 
        event.key === '9' || 
        event.key === '.'  
    ){
        clickButtonEl(event.key);
    }else if(
        event.key === '+'||
        event.key === '-'||
        event.key === '%'
    ){
        clickOperation(event.key);
    }else if(event.key === '*'){
        clickOperation('X');
    }else if(event.key == 'Enter' || event.key === "="){
        clickEqual();
    }
});

function clickButtonEl(key){
    numbersEl.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    });
}

function clickOperation(key){
    operationsEl.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    });
}

function clickEqual(){
    equalEl.click();
}