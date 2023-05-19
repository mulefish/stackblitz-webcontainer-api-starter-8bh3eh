const modal = document.getElementById("myModal");
function launchModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}
///////////// FROM CHILD TO PARENT 
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
window.addEventListener("message", gotMessageFromIFrame, false);
function gotMessageFromIFrame(event) {
  const msg = "gotMessageFromIFrame:" +  event.data
  console.log("%c " + msg , "background:lightyellow");
}
////////////// FROM PARENT TO CHILD 
const iframe = document.getElementById("modalContent");
function sendMessage() {
    try {
        console.log("%c sendMessage memory.js ", "background:lightyellow")
        const r = Math.random() 
        const obj = {
            r:r, 
            "hello":"there"
        }
        iframe.contentWindow.postMessage(obj, "*");
    } catch (boom) {
        console.error(boom)
    }
}

