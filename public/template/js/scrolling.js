const title = document.getElementById("title");
const background = document.getElementById("background");
const sun = document.getElementById("sun");
const bat_1 = document.getElementById("bat_1");
const bat_2 = document.getElementById("bat_2");
const bat_3= document.getElementById("bat_3");
const bat_4 = document.getElementById("bat_4");
const birds = document.getElementById("birds");

let multiplier = 0.5

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
    }, 0);
}


function ToContentWindow(){
    window.location.href = 'content/';
}
