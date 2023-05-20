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
    const command = event.data
    console.log("VERB: " + command )
    if (command.verb === "checkLocalstorage") {
        const rawString = localStorage.getItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY)
        const events = JSON.parse(rawString)
        console.log(JSON.stringify( events, null ,2 ))
    } 

    // } else {
    //     const msg = "gotMessageFromIFrame:" +  event.data
    //     console.log("%c " + JSON.stringify(msg), MEMORY_CONTROLLER_LOG_COLOR);              
    // }



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

