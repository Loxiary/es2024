const title = document.getElementById("title");
const background = document.getElementById("background");
const sun = document.getElementById("sun");
const bat_1 = document.getElementById("bat_1");
const bat_2 = document.getElementById("bat_2");
const bat_3= document.getElementById("bat_3");
const bat_4 = document.getElementById("bat_4");
const birds = document.getElementById("birds");
const separator = document.getElementById("separator-3d")

let questionID = 0;
let questionNumber = 0;
let multiplier = 0.5
let score = 0

let jsonData;

let btns = ["Home", "Tout le contenu", "Galerie", "Sources", "À propos"]

window.addEventListener('scroll', updateParallax);
window.addEventListener('touchmove', updateParallax);

function updateParallax() {
    setTimeout(() => {
        let value = window.scrollY;

        title.style.marginTop = value * 1 + 'px';
        sun.style.top = value * -0.5 + 'px';
        bat_4.style.left = value * -0.5 + 'px';
        bat_3.style.left = value * 0.5 + 'px';
        birds.style.left = value * 0.2 + 'px';
        bat_2.style.marginTop = value * 0.5 + 'px';

        if(value > 1200){
            title.style.display = "none";
            sun.style.display = "none";
            bat_4.style.display = "none";
            bat_3.style.display = "none";
            birds.style.display = "none";
            bat_2.style.display = "none";
        }else{
            title.style.display = "block";
            sun.style.display = "block";
            bat_4.style.display = "block";
            bat_3.style.display = "block";
            birds.style.display = "block";
            bat_2.style.display = "block";
        }
        }, 0);
}

async function LoadData(){
    fetch('http://localhost:3000/api/quiz')
    .then(response => response.json())
    .then(data => jsonData = data)
    .catch(error => console.error('Erreur lors de la récupération du quiz:', error));
}

function ToggleNavbar(){
    document.getElementById("mobile-nav-div").classList.toggle("show")
}

function ToggleQuiz(){
    console.log("quiz init")
    if(!document.getElementById("quiz-modal-div")){

        // QUIZ BASE 
        let quizModalDiv = document.createElement("div")
        quizModalDiv.id = "quiz-modal-div"
        quizModalDiv.className = "quiz_modal_div"

        let quizDiv = document.createElement("div")
        quizDiv.id = "quiz-div"
        quizDiv.className = "quiz_div"
        quizModalDiv.appendChild(quizDiv)

        // QUIZ CLOSE BUTTON

        let quizCloseButton = document.createElement("button")
        quizCloseButton.id = "quiz-close-button"
        quizCloseButton.textContent = "x"
        quizCloseButton.onclick = function(){
            ToggleQuiz()}

        // QUIZ DISCLAIMER

        let quizDisclaimer = document.createElement("p")
        quizDisclaimer.id = "quiz-disclaimer"
        quizDisclaimer.textContent = "Erreur de dimension : Merci de faire ce quiz avec votre téléphone à l'horizontale ou d'agrandir verticalement votre fenêtre !"

        // QUIZ BODY

        let quizHeader = document.createElement("div")
        quizHeader.id = "quiz-header"
        quizHeader.className = "quiz_header"

        let quizContent = document.createElement("div")
        quizContent.id = "quiz-content"
        quizContent.className = "quiz_content"

        let quizBottom = document.createElement("div")
        quizBottom.id = "quiz-bottom"
        quizBottom.className = "quiz_bottom"

        quizDiv.appendChild(quizCloseButton)
        quizDiv.appendChild(quizDisclaimer)
        quizDiv.appendChild(quizHeader)
        quizDiv.appendChild(quizContent)
        quizDiv.appendChild(quizBottom)

        // QUIZ HEADER

        let quizHeaderTitle = document.createElement("h2")
        quizHeaderTitle.id = "quiz-header-title"
        quizHeaderTitle.textContent = "Quiz"

        let quizHeaderNbLabel = document.createElement("span")
        quizHeaderNbLabel.id = "quiz-header-number-label"
        quizHeaderNbLabel.textContent = "Question n°6"

        let quizHeaderQuestionLabel = document.createElement("span")
        quizHeaderQuestionLabel.id = "quiz-header-question-label"
        quizHeaderQuestionLabel.textContent = "Ici s'affiche le contenu de la question"

        let quizHeaderDifficultyLabel = document.createElement("span")
        quizHeaderDifficultyLabel.id = "quiz-header-difficulty-label"
        quizHeaderDifficultyLabel.textContent = "Difficulté : Facile"

        quizHeader.appendChild(quizHeaderTitle)
        quizHeader.appendChild(quizHeaderNbLabel)
        quizHeader.appendChild(quizHeaderQuestionLabel)
        quizHeader.appendChild(quizHeaderDifficultyLabel)

        // QUIZ CONTENT

        for(let i = 0; i < 4; i++){
            let btn = document.createElement("button")
            btn.id = `button_0${i}`
            btn.className = "quiz_content_buttons"
            btn.textContent = `Button : ${i}`
            btn.onclick = function(){
                SelectAnswer(this);
            }
            quizContent.appendChild(btn)
        }

        // QUIZ BOTTOM

        let btn = document.createElement("button")
        btn.id = "quiz-validate-btn"
        btn.className = "quiz_validate_btn"
        btn.textContent = "Valider"
        btn.onclick = function(){
            CheckValidity()
        }
        quizBottom.appendChild(btn)

        document.body.appendChild(quizModalDiv)

        LoadQuestion()
    }else{
        document.body.removeChild(document.getElementById("quiz-modal-div"))
    }
}

function LoadQuestion(){
    for(let i = 0; i < 4; i++){
        let button = document.getElementById(`button_0${i}`)
        button.classList.remove("chosen")
        button.classList.remove("wrong")
    }
    const questionLabel = document.getElementById("quiz-header-question-label")
    const questionNumberLabel = document.getElementById("quiz-header-number-label")
    const difficultyLabel = document.getElementById("quiz-header-difficulty-label")
    const quizContent = document.getElementById("quiz-content")
    const quizBottom = document.getElementById("quiz-bottom")
    
    if(questionID == 15){
        questionLabel.textContent = "Félicitations vous avez fini le quiz. Score : " + score + "/ 15"
        questionNumberLabel.style.display = "none"
        difficultyLabel.style.display = "none"
        quizContent.style.display = "none"
        quizBottom.style.display = "none"
    }

    questionLabel.textContent = jsonData[questionID].question;
    questionNumberLabel.textContent = `Question n°${questionID+1}`;
    difficultyLabel.textContent = `Difficulté : ${jsonData[questionID].difficulty}`;

    for(let i = 0; i < 4; i++){
        let btn = document.getElementById(`button_0${i}`)
        btn.data = "wrong"
        let btnAnswer = GetButtonAnswer(btn, i);
        btn.textContent = btnAnswer
    }

    for(let i = 0; i < 4; i++){
        let btn = document.getElementById(`button_0${i}`)
        if(btn.data == "answer"){
            console.log(btn)
        }
    }

}

function SelectAnswer(btn){
    for(let i = 0; i < 4; i++){
        let button = document.getElementById(`button_0${i}`)
        button.classList.remove("chosen")
    }

    btn.classList.add("chosen")
}

function GetButtonAnswer(btn, i){
    const values = Object.values(jsonData[questionID]);
    const selectedValue = values.slice(2, 6);
    if(getKeyByValue(jsonData[questionID], selectedValue[i]) == 'answer'){
        btn.data = "answer"
    }
    return selectedValue[i];
}

function CheckValidity(){
    for(let i = 0; i < 4; i++){
        let button = document.getElementById(`button_0${i}`)
        if(button.classList.contains("chosen")){
            ValideAnswer(button)
        }
    }
}

function ValideAnswer(button) {
    let question = jsonData[questionID].question;
    let userAnswer = button.textContent;
    let correctAnswer = jsonData[questionID].answer;
    let isCorrectAnswer = false;

    // Mise à jour du bouton et de l'affichage
    if (button.data == "answer") {
        button.textContent = "VRAI !";
        button.classList.add("correct");
        isCorrectAnswer = true;
        score = score + 1
    } else {
        button.classList.remove("chosen");
        button.classList.add("wrong");
        button.textContent = "FAUX !";
        
        // Mettre en évidence la bonne réponse
        for (let i = 0; i < 4; i++) {
            let btn = document.getElementById(`button_0${i}`);
            if (btn.data == "answer") {
                btn.classList.add("chosen");
            }
        }
    }

    // Envoi des données au backend
    fetch('http://localhost:3000/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            question,
            userAnswer,
            correctAnswer,
            isMistake: !isCorrectAnswer, // Inversé pour correspondre à la logique backend
            score
        })
    })
    .then(response => response.json())
    .then(data => console.log('Log enregistré:', data))
    .catch(error => console.error('Erreur:', error));

    // Charger la question suivante après un délai
    questionID++;
    setTimeout(LoadQuestion, 500);
}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }