const textBlock = document.querySelector("#textBlock");
const textInput = document.querySelector("#textInput");
const secInputs = document.getElementById("timer");
const timeBlock = document.getElementById("time");
const wordInfo = document.querySelectorAll(".info")
const clock = document.querySelector("#clock");
const displayedWords = document.getElementsByClassName("wordVerfiy");
const resetBtn = document.querySelector("#resetBtn");
let countLocal = 0;
let wordsTyped = 0;
let correctWords = 0;
let incorrectWords = 0;
let startGame = false;
let counting = secInputs.value;
let timer;
const randomNum = (num) => {
    return Math.floor(Math.random() * num);
}
clock.innerText = counting;
const nextWord = () => {
    const allWords = displayedWords.length
    if (allWords === countLocal) {
        textBlock.innerHTML = '';
        countLocal = 0;
        insertWord();
    }
    displayedWords[countLocal].classList.add("next");
    if (displayedWords[countLocal - 1].classList.contains("next")) {
        displayedWords[countLocal - 1].classList.remove("next");
    }
    textInput.value = "";
}
const results = () => {
    const info = [correctWords, incorrectWords, wordsTyped];
    for (let i = 0; i < wordInfo.length; i++) {
        wordInfo[i].innerText = info[i];
    }
}

const counter = () => {
    clock.innerText = counting;
    if (counting === 0) {
        textInput.disabled = true;
        results()
        clearInterval(timer);
    }
    counting--
}

const checkWord = (word, count = countLocal, spaceHit = false) => {
    const trimedWord = word.trim()
    const letter = trimedWord.length;
    const spanWords = displayedWords[count].innerText.trim();
    if (spaceHit) {
        if (trimedWord === spanWords) {
            displayedWords[count];
            if (displayedWords[count].classList.contains("incorrect")) {
                displayedWords[count].classList.toggle("incorrect");
            } else {
                displayedWords[count].classList.add("correct");
                correctWords++
            }
        } else {
            incorrectWords++
        }
        wordsTyped++;
    } else if (spanWords.substring(0, letter) !== trimedWord) {
        displayedWords[count].classList.add("incorrect");
    } else {
        displayedWords[count].classList.remove("incorrect");
    }
    return 1
}
const reset = () => {
    countLocal = 0;
    wordsTyped = 0;
    correctWords = 0;
    incorrectWords = 0;
    startGame = false;
    textBlock.innerHTML = '';
    insertWord()
    clearInterval(timer);
    clock.innerText = counting;
}
resetBtn.addEventListener("click", reset);
textInput.addEventListener("input", function (e) {
    wordWriten = this.value;
    if (!startGame) {
        startGame = true
        timer = setInterval(counter, 1000);
    }
    if (e.data === " ") {
        countLocal += checkWord(wordWriten, countLocal, true);
        wordWriten = "";
        nextWord();
    } else {
        checkWord(wordWriten);
    }
});

const insertWord = () => {
    for (let i = 0; i < 20; i++) {
        let spanCreate = document.createElement("span");
        spanCreate.innerText = ` ${words[randomNum(words.length)]}`;
        spanCreate.classList.add("wordVerfiy");
        textBlock.append(spanCreate);
    }
}
insertWord()
displayedWords[countLocal].classList.add("next");