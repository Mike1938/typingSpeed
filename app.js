const textBlock = document.querySelector("#textBlock");
const textInput = document.querySelector("#textInput");

textInput.addEventListener("keyup", function(e){
    if(e.keyCode === 32){
        textInput.value = "";
        console.log("You hitting space");
    }
    console.log(textInput.value);
});
