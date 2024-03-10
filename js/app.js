// Global variables
const buttonCalculate = document.getElementById("calculate");
const displayHeader = document.querySelector('.window__header');
const displayWindow = document.querySelector('.window');
const buttonClean = document.getElementById("clean");
const buttonFilter = document.getElementById("applyFilter");
const filterNumberInput = document.getElementById("filterNumber");
const modal = document.getElementById("modal");
const result = document.getElementById("result");
const inputName = document.getElementById("name");
const errorDiv = document.getElementById("error");

const bgFilterContainer = document.getElementById("bgFilterContainer");
const bgFilterNumberInput = document.getElementById("bgFilterNumber");
const applyBgFilterButton = document.getElementById("applyBgFilter");
const copyBtn = document.getElementById("copyButton");


const insertLetterInput = document.getElementById("insertLetter");
const generateWordsButton = document.getElementById("generateWords");



applyBgFilterButton.addEventListener("click", function () {
    const bgNumber = parseInt(bgFilterNumberInput.value, 10);
    displayBgFilteredResults(bgNumber);
});



let allResults = [];

// Convert letters to numbers
const lettersToNumbers = {
    а: 1, й: 1, т: 1, ь: 1, a: 1, á: 1, ã: 1, â: 1, j: 1, s: 1,
    б: 2, к: 11, у: 2, ю: 11, b: 2, k: 11, t: 2,
    в: 3, л: 3, ф: 3, я: 3, c: 3, l: 3, u: 3, ú: 3,
    г: 4, м: 4, х: 22, d: 4, m: 4, v: 22,
    д: 5, н: 5, ц: 5, e: 5, é: 5, ê: 5, n: 5, ñ: 5, w: 5,
    е: 6, о: 6, ч: 6, f: 6, o: 6, ó: 6, ô: 6, x: 6,
    ж: 7, п: 7, ш: 7, g: 7, p: 7, y: 7,
    з: 8, р: 8, щ: 8, h: 8, q: 8, z: 8,
    и: 9, с: 9, ъ: 9, i: 9, í: 9, r: 9

};

// Function for transliteration
function transliterate(text) {
    const transliterationMap = {
        // lower case
        'a': 'а', 'b': 'б', 'c': 'к', 'd': 'д', 'e': 'е', 'f': 'ф',
        'g': 'г', 'h': 'х', 'i': 'и', 'j': 'дж', 'k': 'к', 'l': 'л',
        'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п', 'q': 'к', 'r': 'р',
        's': 'с', 't': 'т', 'v': 'в', 'w': 'в', 'x': 'екс', 'y': 'и',
        'z': 'з',
        // upper case
        'A': 'А', 'B': 'Б', 'C': 'К', 'D': 'Д', 'E': 'Е', 'F': 'Ф',
        'G': 'Г', 'H': 'Х', 'I': 'И', 'J': 'ДЖ', 'K': 'К', 'L': 'Л',
        'M': 'М', 'N': 'Н', 'O': 'О', 'P': 'П', 'Q': 'К', 'R': 'Р',
        'S': 'С', 'T': 'Т', 'V': 'В', 'W': 'В', 'X': 'ЕКС', 'Y': 'И',
        'Z': 'З',
        // Special cases
        'u': ['у', 'ю'], // Обработка на "u"
    };

  
    if (text.includes('u') || text.includes('U')) {
        let variations = ['у', 'ю'];
        let results = [];

       
        variations.forEach(variation => {
            let variationText = text.replace(/u/gi, variation); // Заменяме всички "u" с текущата вариация
            let transliteratedText = variationText.split('').map(letter => 
                transliterationMap[letter.toLowerCase()] ? transliterationMap[letter.toLowerCase()] : letter
            ).join('');
            results.push(transliteratedText);
        });

        return results.join('\n'); // Обединяваме всеки вариант с нов ред
    } else {
        // Директна транслитерация, ако няма "u"
        return [text.split('').map(letter => 
            transliterationMap[letter.toLowerCase()] ? transliterationMap[letter.toLowerCase()] : letter
        ).join('')].join('\n'); // Добавяме нов ред към резултата
    }
}



// Event listeners
buttonCalculate.onclick = (e) => {
    e.preventDefault();
    separateWords();
    modal.style.display = "block";
    modal.style.opacity = "1";

    displayHeader.classList.add('hidden');
    displayWindow.classList.add('hidden-window');

};

buttonClean.onclick = (e) => {
    e.preventDefault();
    cleanAll();
    displayHeader.classList.remove('hidden');
    displayWindow.classList.remove('hidden-window');

};

buttonFilter.onclick = (e) => {
    e.preventDefault();
    displayResults();

};

const cleanAll = () => {
    result.innerHTML = "";
    inputName.value = "";
    errorDiv.innerText = "";
    modal.style.display = "none";
    filterNumberInput.value = "";
    allResults = [];
};

const separateWords = () => {
    const words = inputName.value.toLowerCase().split(' ');
    if (words.length === 0 || inputName.value === "") {
        errorDiv.innerText = "Please, write your name.";
        return;
    }
    allResults = [];
    words.forEach(word => {
        if (word !== "") {
            calculateWordNumerology(word);
        }
    });
    displayResults();
};

const calculateWordNumerology = (word) => {
    let sum = word.split('').map(letter => lettersToNumbers[letter] || 0).reduce((acc, curr) => acc + curr, 0);
    let destinyNumber = reduceNumber(sum);
    allResults.push({ word, destinyNumber });
};
const calculateNumerology = (words) => {
    if (!Array.isArray(words)) {
        words = [words];
    }

    // Обхожда всички думи и изчислява техните нумерологични числа
    return words.map(word => {
        let sum = word.split('').reduce((acc, char) => {
            let number = lettersToNumbers[char.toLowerCase()] || 0; // Превръща буквата в число, ако е в мапинга
            return acc + number;
        }, 0);

    
        while (sum > 9) {
            sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        }
        
        return sum; 
    });
};
const reduceNumber = (number) => {
    while (number > 9) {
        number = number.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return number;
};

const displayResults = () => {
    result.innerHTML = "";
    // bgFilterContainer.style.display = "block";
    allResults.forEach(({ word, destinyNumber }) => {

        if (/^[a-zA-Z]+$/.test(word)) {
            const transliteratedWord = transliterate(word);
            const transliteratedNumber = calculateNumerology(transliteratedWord);

            const row = document.createElement("div");
            row.classList.add('resultRow');

            const originalElement = document.createElement("div");
            originalElement.classList.add('numerologyResult');
            originalElement.innerText = `${word} - ${destinyNumber}`;
            row.appendChild(originalElement);

            const transliteratedElement = document.createElement("div");
            transliteratedElement.classList.add('numerologyResult');
            transliteratedElement.innerText = `${transliteratedWord} - ${transliteratedNumber}`;
            row.appendChild(transliteratedElement);

            result.appendChild(row);
        }
    });
};

// 
function displayBgFilteredResults(bgNumber) {
    // Филтрираме всички резултати, чиито нумерологични числа съвпадат с bgNumber
    const filteredResults = allResults.filter(({ word }) => {
        const numerologyNumbers = calculateNumerology(transliterate(word));
        // Проверяваме дали някое от нумерологичните числа съвпада с bgNumber
        return numerologyNumbers.includes(bgNumber);
    });

    // Изчистваме предишните резултати
    result.innerHTML = "";

    // Показваме филтрираните резултати
    filteredResults.forEach(({ word, destinyNumber }) => {
        const transliteratedWord = transliterate(word);
        const transliteratedNumber = calculateNumerology(transliteratedWord);
        const row = document.createElement("div");
        row.classList.add("resultRow");
        const originalElement = document.createElement("div");
        originalElement.classList.add("numerologyResult");
        originalElement.innerText = `${word} - ${destinyNumber}`;
        const transliteratedElement = document.createElement("div");
        transliteratedElement.classList.add("numerologyResult");
        transliteratedElement.innerText = `${transliteratedWord} - ${transliteratedNumber}`;
        row.appendChild(originalElement);
        row.appendChild(transliteratedElement);
        result.appendChild(row);
    });
}

let filteredWords = []; 

const displayEnglishResults = () => {
    const filterVal = filterNumberInput.value ? parseInt(filterNumberInput.value, 10) : null;
    result.innerHTML = "";
    // bgFilterContainer.style.display = "block";
    filteredWords = [];
    allResults.forEach(({ word, destinyNumber }) => {
        if (/^[a-zA-Z]+$/.test(word)) {
            const transliteratedWord = transliterate(word);
            const transliteratedNumber = calculateNumerology(transliteratedWord);

            if (!filterVal || destinyNumber === filterVal) {
                filteredWords.push(word);

                const row = document.createElement("div");
                row.classList.add('resultRow');

                const originalElement = document.createElement("div");
                originalElement.classList.add('numerologyResult');
                originalElement.innerText = `${word} - ${destinyNumber}`;
                row.appendChild(originalElement);

                if (transliteratedNumber === filterVal) {
                    const transliteratedElement = document.createElement("div");
                    transliteratedElement.classList.add('numerologyResult');
                    transliteratedElement.innerText = `${transliteratedWord} - ${transliteratedNumber}`;
                    // row.appendChild(transliteratedElement); // Ако искате да покажете и транслитерираните резултати
                }

                result.appendChild(row);
            }
        }
    });
};


// Event listener за филтър за английски думи
buttonFilter.onclick = (e) => {
    e.preventDefault();
    displayEnglishResults();
};
generateWordsButton.addEventListener("click", function (e) {
    e.preventDefault();
    const letter = insertLetterInput.value.toUpperCase();
    if (letter.length === 1 && /^[A-Z]$/.test(letter)) {
        generateNewWords(letter);
    } else {
        alert("Please enter a single letter from A to Z.");
    }
});
function generateNewWords(insertedLetter) {
    copyBtn.style.display = "block";
    const newWordsSets = filteredWords.map(baseWord => {
        const newWords = [];
        for (let i = 0; i <= baseWord.length; i++) {
            const newWord = [baseWord.slice(0, i), insertedLetter, baseWord.slice(i)].join('');
            newWords.push(newWord);
        }
        return newWords;
    });

    console.log(newWordsSets);
    displayNewWords(newWordsSets);
}

function generateNewWords(insertedLetter) {
    // Проверяваме дали буквата е 'U' за да обработим специалния случай
    let variants = insertedLetter.toUpperCase() === 'U' ? ['У', 'Ю'] : [insertedLetter];

    // Подготовка на контейнер за новите думи
    let newWordsWithVariants = [];

    filteredWords.forEach(word => {
        variants.forEach(variant => {
            // За всяка буква от думата + 1 (за да позволим добавяне в края)
            for (let i = 0; i <= word.length; i++) {
                // Създаваме нова дума с вмъкнатата буква
                let newWord = word.slice(0, i) + variant + word.slice(i);
                newWordsWithVariants.push(newWord);
            }
        });
    });

    // Показваме новите думи
    displayNewWordsWithVariants(newWordsWithVariants);
}

function displayNewWordsWithVariants(words) {
    result.innerHTML = ""; // Изчистваме текущите резултати

    // За всяка дума създаваме елемент и го добавяме към DOM
    words.forEach(word => {
        let wordElement = document.createElement("h5");
        wordElement.textContent = word;
        result.appendChild(wordElement);
    });

    // Ако е нужно, добавете допълнителна логика за визуализация или обработка
}

function copyGeneratedWordsToClipboard() {

    const tempTextArea = document.createElement("textarea");
    document.body.appendChild(tempTextArea);


    const words = Array.from(document.querySelectorAll("#result h5")).map(el => el.textContent).join("\n");
    tempTextArea.value = words;


    tempTextArea.select();
    document.execCommand("copy");


    document.body.removeChild(tempTextArea);


    alert("Generated words copied to clipboard!");
}

const copyButton = document.getElementById("copyButton");
copyButton.addEventListener("click", copyGeneratedWordsToClipboard);
