addEventListener('mousemove', (event) => {

    document.querySelectorAll(".object").forEach(function(move){

        let moving_value = move.getAttribute("value");
        let x = (event.clientX * moving_value) / 100
        let y = (event.clientY * moving_value) / 100

        move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
        
    })

})