const homeDiv = document.getElementById("home-div")
const introductionDiv = document.getElementById("introduction-div")
const div0101 = document.getElementById("0101-div")
const div0102 = document.getElementById("0102-div")
const div0103 = document.getElementById("0103-div")
const div0201 = document.getElementById("0201-div")
const div0202 = document.getElementById("0202-div")
const div0203 = document.getElementById("0203-div")
const div0301 = document.getElementById("0301-div")
const div0302 = document.getElementById("0302-div")
const div0303 = document.getElementById("0303-div")
const conclusionDiv = document.getElementById("conclusion-div")
const usernameText = document.getElementById("username-text")

const texts = [homeDiv, introductionDiv, div0101, div0102, div0103, div0201, div0202, div0203, div0301, div0302, div0303, conclusionDiv]

function switchText(text){
    console.log(texts[text])
    texts.forEach(element => {
        element.style.display = "none";
        if(element == texts[text]){element.style.display = "block"; }
    });
    // texts[text].style.display = "block";
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
            usernameText.textContent = "Menu";
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