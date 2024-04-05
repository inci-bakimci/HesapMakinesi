const display = document.querySelector('.calculator-input');
const buttons = document.querySelectorAll('button');

let displayValue = '0'; // Hesap makinesinin ekranında gösterilen değeri saklayan değişken
let firstValue = null; // İlk değeri saklayan değişken
let operator = null; // Operatörü saklayan değişken
let waitingForSecondValue = false; // İkinci değerin girilmesini bekleyen bir bayrak

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

buttons.forEach(button => { // Her bir buton için event listener ekleyen döngü
    button.addEventListener('click', function(e) { // Buton tıklama olayını dinleyen fonksiyon
        const element = e.target; // Tıklanan öğeyi al
        const value = element.value;

        if (!element.matches('button')) return;

        switch(value){
            case '+':
            case '-':
            case '*':
            case '/':
            case '=':
                handleOperator(value);
                break;
            case '.':
                inputDecimal();
                break;
            case 'clear':
                clearDisplay();
                break;
            default:
                inputNumber(value);
        }

        updateDisplay();
    });
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first, second, operator) {// İki sayı ve bir operatör alarak işlem yapan fonksiyon
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        return first / second;
    }

    return second;
}

function inputNumber(num) {// Sayı butonlarını işleyen fonksiyon
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += ".";
    }
}

function clearDisplay() {
    displayValue = '0';
}
