const title = document.getElementById("title");
const background = document.getElementById("background");
const sun = document.getElementById("sun");
const bat_1 = document.getElementById("bat_1");
const bat_2 = document.getElementById("bat_2");
const bat_3= document.getElementById("bat_3");
const bat_4 = document.getElementById("bat_4");
const birds = document.getElementById("birds");
const separator = document.getElementById("separator-3d")

let multiplier = 0.5

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

        quizDiv.appendChild(quizHeader)
        quizDiv.appendChild(quizContent)
        quizDiv.appendChild(quizBottom)

        // QUIZ HEADER

        let quizHeaderNbLabel = document.createElement("span")
        quizHeaderNbLabel.id = "quiz-header-number-label"
        quizHeaderNbLabel.textContent = "Question n°6"

        let quizHeaderQuestionLabel = document.createElement("span")
        quizHeaderQuestionLabel.id = "quiz-header-question-label"
        quizHeaderQuestionLabel.textContent = "Ici s'affiche le contenu de la question"

        let quizHeaderDifficultyLabel = document.createElement("span")
        quizHeaderDifficultyLabel.id = "quiz-header-difficulty-label"
        quizHeaderDifficultyLabel.textContent = "Difficulté : Facile"

        quizHeader.appendChild(quizHeaderNbLabel)
        quizHeader.appendChild(quizHeaderQuestionLabel)
        quizHeader.appendChild(quizHeaderDifficultyLabel)

        // QUIZ CONTENT

        for(let i = 0; i < 4; i++){
            let btn = document.createElement("button")
            btn.id = `button_0${i}`
            btn.className = "quiz_content_buttons"
            btn.textContent = `Button : ${i}`
            quizContent.appendChild(btn)
        }

        // QUIZ BOTTOM

        let btn = document.createElement("button")
        btn.id = "quiz-validate-btn"
        btn.className = "quiz_validate_btn"
        btn.textContent = "Valider"
        quizBottom.appendChild(btn)

        document.body.appendChild(quizModalDiv)
    }
}