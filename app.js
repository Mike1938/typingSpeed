const textBlock = document.querySelector("#textBlock");
const textInput = document.querySelector("#textInput");
const displayedWords = document.getElementsByClassName("wordVerfiy");
const randomNum = (num) => {
    return Math.floor(Math.random() * num);
}
let countLocal = 0;
const checkWord = (word, count = countLocal, spaceHit = false) => {
    const spanWords = displayedWords[count].innerText.trim();
    const letter = word.length - 1;
    if (spaceHit) {
        console.log(displayedWords[count].className)
        if (word === spanWords) {
            console.log("is correct");
            if (displayedWords[count].classList.contains("incorrect")) {
                displayedWords[count].classList.toggle("incorrect");
            }
            displayedWords[count].classList.add("correct");
        }
    } else if (spanWords[letter] !== word[letter]) {
        displayedWords[count].classList.toggle("incorrect");
    } else {
        displayedWords[count].classList.remove("incorrect");
    }
    return 1;
}
textInput.addEventListener("keyup", function (e) {
    const wordWriten = textInput.value.trim();
    console.log(countLocal);
    if (e.keyCode === 32) {
        countLocal += checkWord(wordWriten, countLocal, true);
        textInput.value = "";
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