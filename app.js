const textBlock = document.querySelector("#textBlock");
const textInput = document.querySelector("#textInput");
const secInputs = document.getElementById("timer");
const timeBlock = document.getElementById("time");
const wordInfo = document.querySelectorAll(".info")
const next = document.getElementsByClassName("next");
const clock = document.querySelector("#clock");
const displayedWords = document.getElementsByClassName("wordVerfiy");
const correct = document.getElementsByClassName("correct");
const incorrect = document.getElementsByClassName("incorrect");
const resetBtn = document.querySelector("#resetBtn");
const netWPM = document.querySelector("#netWPM");
let nextLocal = 0;
let nextWordVerify = false;
let textBlockWidth = textBlock.offsetWidth - 40;
let textBlockHeight = textBlock.offsetHeight - 40;
let countLocal = 0;
let charatersTyped = 0;
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
    displayedWords[countLocal].classList.add("next");
    nextLocal += displayedWords[countLocal - 1].offsetWidth;
    let doneWords = incorrect.length + correct.length;
    if (nextLocal + next[1].offsetWidth >= textBlockWidth || nextWordVerify) {

        for (let i = doneWords - 1; i >= 0; i--) {
            displayedWords[i].remove();
        }
        nextWordVerify = false;
        nextLocal = 0;
        countLocal = 0;
        insertWord(true);
    } else {
        if (nextLocal + displayedWords[countLocal + 1].offsetWidth >= textBlockWidth) {
            nextWordVerify = true
        }
    }
    if (countLocal - 1 >= 0) {
        displayedWords[countLocal - 1].classList.remove("next");
    }
    textInput.value = "";
}
const results = () => {
    let totalWords = correctWords + incorrectWords;
    const info = [totalWords, correctWords, incorrectWords, charatersTyped];
    let gross = "";
    if (secInputs.value === "30") {
        gross = Math.floor((charatersTyped / 5) / 0.5);
    } else {
        gross = Math.floor((charatersTyped / 5));
    }
    netWPM.innerText = gross;
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
    if (word === " ") {
        textInput.value = "";
        return
    };
    const trimedWord = word.trim()
    const letter = trimedWord.length;
    const spanWords = displayedWords[count].innerText.trim();
    if (spaceHit) {
        countLocal++
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
            displayedWords[count].classList.add("incorrect");
        }
        nextWord();
    } else if (spanWords.substring(0, letter) !== trimedWord) {
        displayedWords[count].classList.add("incorrect");
    } else {
        charatersTyped++;
        displayedWords[count].classList.remove("incorrect");
    }
}
const reset = () => {
    nextWordVerify = false;
    countLocal = 0;
    charatersTyped = 0;
    correctWords = 0;
    incorrectWords = 0;
    nextLocal = 0;
    counting = secInputs.value;
    results();
    startGame = false;
    textBlock.innerHTML = '';
    insertWord()
    clearInterval(timer);
    clock.innerText = counting;
    textInput.disabled = false;
    textInput.value = "";
}
resetBtn.addEventListener("click", reset);
secInputs.addEventListener('change', reset)
textInput.addEventListener("input", function (e) {
    wordWriten = this.value;
    if (wordWriten === " ") {
        checkWord(wordWriten);
    }
    else if (!startGame) {
        startGame = true
        timer = setInterval(counter, 1000);
    }
    if (e.data === " ") {
        checkWord(wordWriten, countLocal, true);
        wordWriten = "";
    } else {
        checkWord(wordWriten);
    }
});

const insertWord = (addWords = false) => {
    let wordSize = 0;
    let wordInsert = addWords;
    do {
        let spanCreate = document.createElement("span");
        spanCreate.innerText = ` ${words[randomNum(words.length)]}`;
        spanCreate.classList.add("wordVerfiy");
        textBlock.append(spanCreate);
        if (wordInsert) {
            for (let i = 0; i < displayedWords.length; i++) {
                wordSize = wordSize + (displayedWords[i].offsetHeight * displayedWords[i].offsetWidth);
            }
            wordInsert = false;
        } else {
            wordSize = wordSize + (spanCreate.offsetHeight * spanCreate.offsetWidth);
        }
    } while (textBlockWidth * textBlockHeight > wordSize + 30000);
    displayedWords[countLocal].classList.add("next");
}
insertWord()
window.addEventListener('resize', () => {
    textBlockWidth = textBlock.offsetWidth;
    setTimeout(reset, 1000)
})