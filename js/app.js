// Global variables
const buttonCalculate = document.getElementById("calculate");
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



applyBgFilterButton.addEventListener("click", function() {
    const bgNumber = parseInt(bgFilterNumberInput.value, 10);
    displayBgFilteredResults(bgNumber);
});



let allResults = [];

// Convert letters to numbers
const lettersToNumbers = {
    а: 1, й: 1,  т: 1,  ь: 1,  a: 1, á: 1, ã: 1, â: 1, j: 1, s: 1,
    б: 2, к: 11, у: 2,  ю: 11,  b: 2,  k: 11, t: 2,
    в: 3, л: 3,  ф: 3,  я: 3,  c: 3,  l: 3, u: 3, ú: 3,
    г: 4, м: 4,  х: 22, d: 4,  m: 4, v: 22,
    д: 5, н: 5,  ц: 5,  e: 5,  é: 5, ê: 5, n: 5, ñ: 5, w: 5,
    е: 6, о: 6,  ч: 6,  f: 6,  o: 6, ó: 6, ô: 6, x: 6,
    ж: 7, п: 7,  ш: 7,  g: 7,  p: 7, y: 7,
    з: 8, р: 8,  щ: 8,  h: 8,  q: 8, z: 8,
    и: 9, с: 9,  ъ: 9,  i: 9,  í: 9, r: 9

};

// Function for transliteration
function transliterate(text) {
    const transliterationMap = {
         // lower case
         'a' : 'а',
         'b' : 'б',
         'c' : 'к',
         'd' : 'д',
         'e' : 'е',
         'f' : 'ф',
         'g' : 'г',
         'h' : 'х',
         'i' : 'и',
         'j' : 'дж',
         'k' : 'к',
         'l' : 'л',
         'm' : 'м',
         'n' : 'н',
         'o' : 'о',
         'p' : 'п',
         'q' : 'к',
         'r' : 'р',
         's' : 'с',
         't' : 'т',
         'u': ['у', 'ю'],
         'v' : 'в',
         'w' : 'в',
         'x' : 'екс',
         'y' : 'и',
         'z' : 'з',
 
         // upper case
         'A' : 'А',
         'B' : 'Б',
         'C' : 'К',
         'D' : 'Д',
         'E' : 'Е',
         'F' : 'Ф',
         'G' : 'Г',
         'H' : 'Х',
         'I' : 'И',
         'J' : 'ДЖ',
         'K' : 'К',
         'L' : 'Л',
         'M' : 'М',
         'N' : 'Н',
         'O' : 'О',
         'P' : 'П',
         'Q' : 'К',
         'R' : 'Р',
         'S' : 'С',
         'T' : 'Т',
         'U': ['У', 'Ю'],
         'V' : 'В',
         'W' : 'В',
         'X' : 'ЕКС',
         'Y' : 'И',
         'Z' : 'З',
    };
    text = text.replace(/TS/g, "Ц")
    .replace(/ts/g, "ц")
    .replace(/Ts/g, "Ц").replace(/tS/g, "ц")
    text = text.replace(/ия\b/g, "ia")
    .replace(/Ия\b/g, "Ia")
    .replace(/иЯ\b/g, "iA")
    .replace(/ИЯ\b/g, "IA")
 
  
    const transliteratedText = text.split('').map(letter => {
        if (transliterationMap[letter]) {
            if (Array.isArray(transliterationMap[letter])) {
                return transliterationMap[letter].join('/');
            } else {
                return transliterationMap[letter];
            }
        } else {
            return letter;
        }
    }).join('');

 
    return transliteratedText.replace(/\//g, ' / ');
}

// Event listeners
buttonCalculate.onclick = (e) => {
    e.preventDefault();
    separateWords();
    modal.style.display = "block";
    modal.style.opacity = "1";
};

buttonClean.onclick = (e) => {
    e.preventDefault();
    cleanAll();
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
const calculateNumerology = (word) => {
    let sum = word.split('').map(letter => lettersToNumbers[letter.toLowerCase()] || 0).reduce((acc, curr) => acc + curr, 0);
    return reduceNumber(sum);
};
const reduceNumber = (number) => {
    while (number > 9) {
        number = number.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return number;
};

const displayResults = () => {
    result.innerHTML = "";
    bgFilterContainer.style.display = "block";
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
    const filteredResults = allResults.filter(({ word }) => {
        const transliteratedWord = transliterate(word);
        const transliteratedNumber = calculateNumerology(transliteratedWord);
        return transliteratedNumber === bgNumber;
    });
    result.innerHTML = ""; 
    bgFilterContainer.style.display = "none"; 

 
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

let filteredWords = []; // Глобална променлива за съхранение на филтрирани думи

const displayEnglishResults = () => {
    const filterVal = filterNumberInput.value ? parseInt(filterNumberInput.value, 10) : null;
    result.innerHTML = "";
    bgFilterContainer.style.display = "block";
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
generateWordsButton.addEventListener("click", function(e) {
    e.preventDefault();
    const letter = insertLetterInput.value.toUpperCase();
    if(letter.length === 1 && /^[A-Z]$/.test(letter)) { // Проверка дали е въведена една буква от A до Z
        generateNewWords(letter);
    } else {
        alert("Please enter a single letter from A to Z.");
    }
});
function generateNewWords(insertedLetter) {
    copyBtn.style.display = "block";
    const newWordsSets = filteredWords.map(baseWord => {
        const newWords = [];
        for(let i = 0; i <= baseWord.length; i++) {
            const newWord = [baseWord.slice(0, i), insertedLetter, baseWord.slice(i)].join('');
            newWords.push(newWord);
        }
        return newWords;
    });

    console.log(newWordsSets); 
    displayNewWords(newWordsSets); 
}

function displayNewWords(wordsGroups) {
    result.innerHTML = ""; // Изчистване на предишни резултати

    wordsGroups.forEach((group, groupIndex) => {
        const groupContainer = document.createElement("div");
        group.forEach(word => {
            const wordElement = document.createElement("h5");
            wordElement.textContent = word;
            groupContainer.appendChild(wordElement);
        });

        result.appendChild(groupContainer);

    
        if (groupIndex < wordsGroups.length - 1) {
            const separator = document.createElement("div");
            separator.style.padding = "10px 0"; 
            separator.textContent = "------------"; 
        }
    });
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
