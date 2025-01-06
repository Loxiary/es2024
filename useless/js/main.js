const leftDiv = document.getElementById("left-div")
const rightDiv = document.getElementById("right-div")
const overBtn = document.getElementById("overview-btn")

function overviewBtn(){
    window.location.href = 'overview/';
}

setTimeout(() => {
    leftDiv.classList.add("activated")
    rightDiv.classList.add("activated")
    overBtn.classList.remove("removed")
  }, 5000);

