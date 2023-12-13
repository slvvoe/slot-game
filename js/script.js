let money = 1000;
let images = [];
let resultElement; 
window.onload = function () {
    const username = promptForUsername();
if (username) {
    document.getElementById('money').textContent = `Гроші: ${money} грн`;
}
    resultElement = document.getElementById('result');
    document.querySelectorAll('#slotRow td').forEach(function (cell) {
        cell.addEventListener('animationend', function () {
            cell.classList.remove('rotating');
            showResult();
        });
    });
};
function promptForUsername() {
    let username = '';
    while (username.length < 3) {
        username = prompt('Щоб зареєструватися, введіть своє ім\'я (не менше 3 символів):');
        if (username && username.length < 3) {
            alert('Будь ласка, введіть ім\'я довжиною не менше 3 символів.');
        }
    }
    return username;
}
function updateMoney() {
    document.getElementById('money').textContent = `Гроші: ${money} грн`;
}
function getRandomImage() {
    const symbols = [
        { symbol: '🍒', probability: 1.2 },
        { symbol: '🍊', probability: 1.2 },
        { symbol: '🍇', probability: 0.25},
        { symbol: '🍉', probability: 1.9 },
        { symbol: '🍋', probability: 1.2 },
        { symbol: '🍑', probability: 0.6 },
        { symbol: '💎', probability: 0.9 },
    ];
    const weightedSymbols = symbols.flatMap(({ symbol, probability }) =>
        Array.from({ length: Math.ceil(probability * 10) }, () => symbol)
    );

    const randomIndex = Math.floor(Math.random() * weightedSymbols.length);
    return weightedSymbols[randomIndex];
}
function showResult() {
    if (!resultElement.classList.contains('shown')) {
        resultElement.classList.add('shown');
    }
}
function hideResult() {
    resultElement.classList.remove('shown');
}
function checkWin() {
    const cells = document.querySelectorAll('#slotRow td');
    const images = Array.from(cells).map((cell) => cell.innerHTML);

    return images.every((img) => img === images[0]);
}
const winLevels = {
    '🍒': 30,
    '🍊': 50,
    '🍇': 100,
    '🍉': 20,
    '🍋': 70,
    '🍑': 80,
    '💎': 500,
};

function startGame() {
    if (money >= 10) {
        money -= 10;
        updateMoney();

        const slotRow = document.getElementById('slotRow');
        const resultElement = document.getElementById('result');
        images = [];

        for (let i = 0; i < 3; i++) {
            const cell = slotRow.cells[i];
            const randomImage = getRandomImage();
            cell.innerHTML = randomImage;
            cell.classList.add('rotating');
            images.push(randomImage);
        }

        if (checkWin()) {
            const winAmount = winLevels[images[0]];

            if (winAmount) {
                money += winAmount;
                resultElement.textContent = `Вітаємо! Ви виграли ${winAmount} гривень!`;
            }
        } else {
            resultElement.textContent = `Спробуйте ще раз :(`;
        }

        document.querySelector('button').classList.add('clicked');
        updateMoney();
    } else {
        alert('Недостатньо коштів. Будь ласка, поповніть рахунок!');
    }
}
