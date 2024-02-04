// Global variables
const buttonCalculate = document.getElementById("calculate");
const buttonClean = document.getElementById("clean");
const modal = document.getElementById("modal");
const result = document.getElementById("result");
const inputName = document.getElementById("name");
const errorDiv = document.getElementById("error");

// Convert letters to numbers
const lettersToNumbers = {
    a: 1, á: 1, ã: 1, â: 1, j: 1, s: 1,
    b: 2, k: 2, t: 2,
    c: 3, l: 3, u: 3, ú: 3,
    d: 4, m: 4, v: 4,
    e: 5, é: 5, ê: 5, n: 5, ñ: 5, w: 5,
    f: 6, o: 6, ó: 6, ô: 6, x: 6,
    g: 7, p: 7, y: 7,
    h: 8, q: 8, z: 8,
    i: 9, í: 9, r: 9
};

// Function to start separating name and open modal
buttonCalculate.onclick = (e) => {
    e.preventDefault();
    separateWords();
    modal.style.display = "block";
    modal.style.opacity = "1";
}

// Function to clean input and modal
buttonClean.onclick = (e) => {
    e.preventDefault();
    cleanAll();
}

const cleanAll = () => {
    result.innerText = "";
    inputName.value = "";
    errorDiv.innerText = "";
    modal.style.display = "none";
}

// Function to separate words and handle each word
const separateWords = () => {
    const words = inputName.value.toLowerCase().split(' ');

    if (words.length === 0 || inputName.value === "") {
        errorDiv.innerText = "Please, write your name.";
        return;
    }

    result.innerHTML = ""; // Clear previous results
    words.forEach(word => {
        if (word !== "") {
            calculateWordNumerology(word);
        }
    });

    modal.style.display = "block";
    
}

// Function to calculate numerology for a single word
const calculateWordNumerology = (word) => {
    const letters = word.split('');
    const numbers = letters.map(letter => lettersToNumbers[letter] || 0);
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const destinyNumber = reduceNumber(sum);
    if (destinyNumber === 8) { // Show results only for destiny number 8
        displayResult(word, destinyNumber);
    }
}

// Function to reduce number to a single digit
const reduceNumber = (number) => {
    while (number > 9) {
        number = number.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return number;
}

// Function to display result in modal
const displayResult = (word, number) => {
    const element = document.createElement("div");
    element.classList.add('numerologyResult');
    element.innerText = `${word}- ${number}`;
    result.appendChild(element);
}
