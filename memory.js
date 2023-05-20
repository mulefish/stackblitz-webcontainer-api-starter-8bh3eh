const MEMORY_CONTROLLER_LOG_COLOR="background:lightgreen"
const modal = document.getElementById("myModal");
function launchModal() {
    const msg = {
        verb:"setLocalstorageKey",
        noun:LOCAL_STORAGE_GLOBAL_EVENTS_KEY
    }
    sendMessage(msg)
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
  console.log("%c " + msg , MEMORY_CONTROLLER_LOG_COLOR);
}
////////////// FROM PARENT TO CHILD 
const iframe = document.getElementById("modalContent");
function sendMessage(command) {
    try {
        console.log("%c" + "command:" + command.verb, MEMORY_CONTROLLER_LOG_COLOR)
        iframe.contentWindow.postMessage(command, "*");
    } catch (boom) {
        console.error(boom)
    }
}

