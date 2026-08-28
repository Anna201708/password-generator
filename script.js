var passwordInput = document.getElementById('password');
var lengthSlider = document.getElementById('length');
var lengthValue = document.getElementById('lengthValue');
var useUppercase = document.getElementById('useUppercase');
var useLowercase = document.getElementById('useLowercase');
var useNumbers = document.getElementById('useNumbers');
var useSymbols = document.getElementById('useSymbols');
var generateBtn = document.getElementById('generateBtn');
var copyBtn = document.getElementById('copyBtn');
var strengthText = document.getElementById('strengthText');
var strengthFill = document.getElementById('strengthFill');

var UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var LOWER = 'abcdefghijklmnopqrstuvwxyz';
var NUMBERS = '0123456789';
var SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function generatePassword() {
    var alphabet = '';
    if (useUppercase.checked) alphabet = alphabet + UPPER;
    if (useLowercase.checked) alphabet = alphabet + LOWER;
    if (useNumbers.checked) alphabet = alphabet + NUMBERS;
    if (useSymbols.checked) alphabet = alphabet + SYMBOLS;

    if (alphabet === '') {
        alphabet = LOWER;
        useLowercase.checked = true;
    }

    var length = parseInt(lengthSlider.value);

    var password = '';
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * alphabet.length);
        password = password + alphabet[randomIndex];
    }

    passwordInput.value = password;

    updateStrength(password);
}

function updateStrength(password) {
    var length = password.length;
    var score = 0;

    if (length >= 8) score = score + 1;
    if (length >= 12) score = score + 1;
    if (length >= 16) score = score + 1;

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score = score + 1;
    if (/\d/.test(password)) score = score + 1;
    if (/[^a-zA-Z0-9]/.test(password)) score = score + 1;

    var percent = (score / 6) * 100;
    if (percent > 100) percent = 100;

    var label = 'Слабый';
    var color = '#fc8181';

    if (percent >= 80) {
        label = 'Отличный';
        color = '#48bb78';
    } else if (percent >= 50) {
        label = 'Средний';
        color = '#ecc94b';
    }

    strengthText.textContent = 'Сложность: ' + label;
    strengthFill.style.width = percent + '%';
    strengthFill.style.background = color;
}

function copyPassword() {
    var password = passwordInput.value;

    if (password === '') {
        alert('Сначала сгенерируйте пароль!');
        return;
    }

    if (navigator.clipboard) {
        navigator.clipboard.writeText(password).then(function() {
            var originalText = copyBtn.textContent;
            copyBtn.textContent = 'Скопировано!';
            copyBtn.style.background = '#48bb78';

            setTimeout(function() {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '#4299e1';
            }, 2000);
        }).catch(function() {
            passwordInput.select();
            document.execCommand('copy');
            alert('Пароль скопирован!');
        });
    } else {
        passwordInput.select();
        document.execCommand('copy');
        alert('Пароль скопирован!');
    }
}

lengthSlider.oninput = function() {
    lengthValue.textContent = this.value;
};

generateBtn.onclick = generatePassword;
copyBtn.onclick = copyPassword;

generatePassword();

console.log('Генератор паролей загружен!');
console.log('Элемент password:', passwordInput);
console.log('Кнопка generate:', generateBtn);