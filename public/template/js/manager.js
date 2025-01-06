const introductionDiv = document.getElementById("introduction-div")
const firstPartDiv = document.getElementById("first-part-div")
const secondPartDiv = document.getElementById("second-part-div")
const thirdPartDiv = document.getElementById("third-part-div")
const conclusionDiv = document.getElementById("conclusion-div")
const usernameText = document.getElementById("username-text")

const texts = [introductionDiv, firstPartDiv, secondPartDiv, thirdPartDiv, conclusionDiv]

function switchText(text){
    texts.forEach(element => {
        element.style.display = "none";
    });
    texts[text].style.display = "block";
}

function updateUsername(){
    console.log("start updating username")
    fetch('/update-username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        })
        .then(response => response.json())
        .then(data => {
        if (data.success) {
            usernameText.textContent = data.username;
            console.log("username update done")
        } else {
            console.log("username update failed")
            console.error(data.message);
        }
    }).catch(error => {
        console.error('Erreur:', error)
        console.log("username update error catched")
    });
}