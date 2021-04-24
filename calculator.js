var Numbers = document.querySelectorAll('.number'),
    Operations = document.querySelectorAll('.operation'),
    DecimalBtn = document.getElementById('decimal'),
    ClearBtn = document.getElementById('c'),
    Display = document.getElementById('display'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';

    display.scrollLeft = display.scrollWidth;

for (var i = 0; i < Numbers.length; i++) {
    var number = Numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
}

for (var i = 0; i < Operations.length; i++) {
    var operat = Operations[i];
    operat.addEventListener('click', function (e) {
        operation((e.target.textContent));
    });
}

ClearBtn.addEventListener('click', clear);

DecimalBtn.addEventListener('click', decimal);

function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }
}

function operation(symbol) {
    var localOperationMemory = display.value;

    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
            if (!Number.isInteger(MemoryCurrentNumber)) {
                MemoryCurrentNumber = (MemoryCurrentNumber.toFixed(8).replace(/0*$/,''));
            } else {
                MemoryCurrentNumber = MemoryCurrentNumber;
            }
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
            if (!Number.isInteger(MemoryCurrentNumber)) {
                MemoryCurrentNumber = MemoryCurrentNumber.toFixed(8).replace(/0*$/,'');
            } else {
                MemoryCurrentNumber = MemoryCurrentNumber;
            }
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
            if (!Number.isInteger(MemoryCurrentNumber)) {
                MemoryCurrentNumber = MemoryCurrentNumber.toFixed(8).replace(/0*$/,'');
            } else {
                MemoryCurrentNumber = MemoryCurrentNumber;
            }
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
            if (!Number.isInteger(MemoryCurrentNumber)) {
                MemoryCurrentNumber = MemoryCurrentNumber.toFixed(8).replace(/0*$/,'');
            } else {
                MemoryCurrentNumber = MemoryCurrentNumber;
            }
        } else if(display.value == 'ERROR'){
            display.value = 'ERROR';
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        };

        if(MemoryCurrentNumber == 'Infinity' || MemoryCurrentNumber == '-Infinity' || display.value == 'ERROR'){
            display.value = 'ERROR';
        } else display.value = MemoryCurrentNumber;

        MemoryPendingOperation = symbol;
    }
}

function decimal() {
    var localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
    };

    display.value = localDecimalMemory;
}

function clear() {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
}