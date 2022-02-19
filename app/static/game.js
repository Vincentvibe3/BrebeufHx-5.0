
var canvas = document.getElementById("gameCanvas")
var canvasctx = canvas.getContext("2d");

let animationFrame = 0
let animation = 1
let scenariodata = [
    {
        "framecount":[10, 6, 8, 8, 7],
        "animationcount":5,
        "script":``
    },
    {
        "framecount":[4, 8, 8, 8, 8, 8, 8],
        "animationcount":7
    }
]
let scenario = 1
let draw = false

// function setupTypeWrite() {
//     pos = 0;
//     typingSpeed = 1;
//     entryContent = document.getElementById(id);
//     text = entryContent.innerHTML.replace(/\s+/g, ' ');
//     buffer = text;
//     entryContent.innerHTML = '';
//     typing = true;
// }

// function typeWrite() {
//     if (pos < text.length && typing) {
//       if (text.charAt(pos) == '<') {
//         tagOpen = true;
//       }
  
//       if (!tagOpen) {
//         entryContent.innerHTML += text.charAt(pos);
//       }
  
//       if (text.charAt(pos) == '>') {
//         tagOpen = false;
//         entryContent.insertAdjacentHTML('beforeend', '<br>');
//       }
  
//       pos++;
//       setTimeout(typeWrite, 25);
//     }
//   }

function start() {
    draw = false
    renderAnimation(1)
}

function renderBackground(){
    let img = new Image()
    img.src = `/static/scene_${scenario}/background.png`
    console.log(img)
    img.onload = () => {
        canvasctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
    }
}

async function renderAnimation(timestamp){
    renderBackground()
    console.log(animationFrame)
    console.log(timestamp)
    let img = new Image()
    img.src = `/static/scene_${scenario}/Animation_${animation}_${animationFrame}.png`
    console.log(img)
    img.onload = () => {
        canvasctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
    }
    if (animationFrame == scenariodata[scenario-1]["framecount"][animation-1]-1) {
        animationFrame = 0
        if (animation == scenariodata[scenario-1]["animationcount"]){
            animation = 1
        } else {
            animation++
        }
        
    } else {
        animationFrame++
    }
    
}

async function render(){
    draw = true
    while (draw){
        window.requestAnimationFrame(renderAnimation);
        await new Promise(r => setTimeout(r, 200));
    }
}

async function setScenario1(){
    scenario = 1
    animationFrame = 0
    animation = 1
    console.log(scenario)
    start()
}

async function setScenario2(){
    scenario = 2
    animationFrame = 0
    animation = 1
    console.log(scenario)
    start()
}

document.getElementById("gameCanvas").addEventListener("click", render)
document.getElementById("scenario1button").addEventListener("click", setScenario1)
document.getElementById("scenario2button").addEventListener("click", setScenario2)
start()