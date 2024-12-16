const introductionDiv = document.getElementById("introduction-div")
const firstPartDiv = document.getElementById("first-part-div")
const secondPartDiv = document.getElementById("second-part-div")
const thirdPartDiv = document.getElementById("third-part-div")
const conclusionDiv = document.getElementById("conclusion-div")

const texts = [introductionDiv, firstPartDiv, secondPartDiv, thirdPartDiv, conclusionDiv]

function switchText(text){
    texts.forEach(element => {
        element.style.display = "none";
    });
    texts[text].style.display = "block";
}