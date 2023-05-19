const modal = document.getElementById("myModal");
function launchModal() {
    console.log("launchModal")
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


