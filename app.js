const textBlock = document.querySelector("#textBlock");
const textInput = document.querySelector("#textInput");
const secInputs = document.getElementsByName("secInput");
const timeBlock = document.getElementById("time");
const clock = document.querySelector("#clock");
const displayedWords = document.getElementsByClassName("wordVerfiy");
const randomNum = (num) => {
    return Math.floor(Math.random() * num);
}
let countLocal = 0;
let wordsTyped = 0;
let correctWords = 0;
let incorrectWords = 0;
let startGame = false;
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
const counter = (seconds) => {
    let counting = seconds;
    setInterval(() => {
        clock.innerText = counting;
        if (counting === 0) {
            clearInterval();
            textInput.disable = true;
        }
        counting--
    }, 1000)
}
const checkWord = (word, count = countLocal, spaceHit = false) => {
    const spanWords = displayedWords[count].innerText.trim();
    const letter = word.length - 1;
    if (spaceHit) {
        if (word === spanWords) {
            if (displayedWords[count].classList.contains("incorrect")) {
                displayedWords[count].classList.toggle("incorrect");
            }
            displayedWords[count].classList.add("correct");
            correctWords++
        }
        wordsTyped++
        incorrectWords++
    } else if (spanWords[letter] !== word[letter]) {
        displayedWords[count].classList.add("incorrect");
    } else {
        displayedWords[count].classList.remove("incorrect");
    }

    return 1;
}

textInput.addEventListener("keydown", function (e) {
    if (!startGame) {
        startGame = true
        counter(60);
    }
    let wordWriten = textInput.value.trim();
    if (e.keyCode === 32) {
        countLocal += checkWord(wordWriten, countLocal, true);
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