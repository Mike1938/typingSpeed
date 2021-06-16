const textBlock = document.querySelector("#textBlock");
const textInput = document.querySelector("#textInput");
const secInputs = document.getElementById("timer");
const timeBlock = document.getElementById("time");
const wordInfo = document.querySelectorAll(".info")
const clock = document.querySelector("#clock");
const displayedWords = document.getElementsByClassName("wordVerfiy");
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
    const spanWords = displayedWords[count].innerText.trim();
    const letter = word.length - 1;
    // console.log(word);
    if (spaceHit) {
        if (word === spanWords) {
            if (displayedWords[count].classList.contains("incorrect")) {
                displayedWords[count].classList.toggle("incorrect");
            }
            displayedWords[count].classList.add("correct");
            correctWords++
        } else {
            incorrectWords++
        }
        wordsTyped++;
    } else if (spanWords[letter] !== word[letter]) {
        displayedWords[count].classList.add("incorrect");
    } else {
        displayedWords[count].classList.remove("incorrect");
    }

    return 1
}


textInput.addEventListener("input", function (e) {
    wordWriten = this.value;
    console.log(wordWriten)
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