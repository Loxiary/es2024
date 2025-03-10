const title = document.getElementById("title");
const background = document.getElementById("background");
const sun = document.getElementById("sun");
const bat_1 = document.getElementById("bat_1");
const bat_2 = document.getElementById("bat_2");
const bat_3= document.getElementById("bat_3");
const bat_4 = document.getElementById("bat_4");
const birds = document.getElementById("birds");

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