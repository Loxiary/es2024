const usernameText = document.getElementById("username-text")

window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section') || '0000';
    
    showSection(section);
  });

function switchText(btn){
    const section = btn.dataset.section;

    history.pushState({ section }, '', `?section=${section}`)

    showSection(section);
}

function showSection(section){
    document.querySelectorAll('.section').forEach(div => {
        div.style.display = 'none';
      });

    const activeSection = document.getElementById(`section-${section}`);
    if (activeSection) activeSection.style.display = 'block';
}

// function updateUsername(){
//     fetch('/update-username', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         })
//         .then(response => response.json())
//         .then(data => {
//         if (data.success) {
//             usernameText.textContent = "Menu";
//             console.log("username update done")
//         } else {
//             console.log("username update failed")
//             console.error(data.message);
//         }
//     }).catch(error => {
//         console.error('Erreur:', error)
//         console.log("username update error catched")
//     });
// }