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
         'u' : 'ю',
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
         'U' : 'Ю',
         'V' : 'В',
         'W' : 'В',
         'X' : 'ЕКС',
         'Y' : 'И',
         'Z' : 'З',
    };

    text = text.replace(/ия\b/g, "ia")
    .replace(/Ия\b/g, "Ia")
    .replace(/иЯ\b/g, "iA")
    .replace(/ИЯ\b/g, "IA");


return text.split('').map(letter => transliterationMap[letter] || letter).join('');


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
    const filterVal = filterNumberInput.value ? parseInt(filterNumberInput.value, 10) : null;
    result.innerHTML = "";
    bgFilterContainer.style.display = "block";
    allResults.forEach(({ word, destinyNumber }) => {
        const transliteratedWord = transliterate(word);
        const transliteratedNumber = calculateNumerology(transliteratedWord);

        if (!filterVal || destinyNumber === filterVal || transliteratedNumber === filterVal) {
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
        originalElement.innerText = `Оригинал: ${word} - ${destinyNumber}`;
        const transliteratedElement = document.createElement("div");
        transliteratedElement.classList.add("numerologyResult");
        transliteratedElement.innerText = `Транслитерация: ${transliteratedWord} - ${transliteratedNumber}`;
        row.appendChild(originalElement);
        row.appendChild(transliteratedElement);
        result.appendChild(row);
    });
}
