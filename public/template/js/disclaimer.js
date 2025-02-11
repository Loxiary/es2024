const main_div = document.getElementById("main-div")
const main_text_div = document.getElementById("main_text")
const continue_btn = document.getElementById("continue-btn")
const main_title_next = document.getElementById("main-title")
const space_div = document.getElementById("space")
const doppler_div = document.getElementById("doppler")

function continueBtn(){
    main_text_div.classList.add("removed")
    continue_btn.classList.add("removed")

    wait(1500).then(() => {
        window.location.href = 'content/';
    })
    // wait(1000).then(() => {
    //     console.log("test")
    //     main_div.classList.add("next")
    //     main_text_div.style.display = "none"
    //     continue_btn.style.display = "none"
    //     space_div.style.display = "flex"
    //     doppler_div.style.display = "flex"
    //     main_title_next.style.display = "block"
    // })
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }