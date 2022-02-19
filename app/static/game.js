
var canvas = document.getElementById("gameCanvas")
var canvasctx = canvas.getContext("2d");
let typing = false;
let text
let pos = 0
let textField = document.getElementById("gameText")
let animationFrame = 0
let animation = 1
let scenariodata = [
    {
        "framecount":[10, 6, 8, 8, 7],
        "animationcount":5,
        "script":`abcs`
    },
    {
        "framecount":[4, 8, 8, 8, 8, 8, 8],
        "animationcount":7,
        "script":`abcd`
    }
]
let scenario = 1
let draw = false

function setupTypeWrite(scene) {
    pos = 0;
    text = scenariodata[scene-1]["script"];
    textField.innerHTML = '';
    typing = true;
}

function typeWrite() {
    if (pos < text.length && typing) {
        textField.innerHTML += text.charAt(pos)
        pos++;
        setTimeout(typeWrite, 25);
    }
}

function start() {
    draw = false
    renderAnimation(1)
}

function renderBackground(){
    let img = new Image()
    img.src = `/static/scene_${scenario}/background.png`
    img.onload = () => {
        canvasctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
    }
}

async function renderAnimation(timestamp){
    renderBackground()
    let img = new Image()
    img.src = `/static/scene_${scenario}/Animation_${animation}_${animationFrame}.png`
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
    if (!draw){
        draw = true
        typing = true
        typeWrite()
        while (draw){
            window.requestAnimationFrame(renderAnimation);
            await new Promise(r => setTimeout(r, 200));
        }
    }
}

async function setScenario1(){
    scenario = 1
    animationFrame = 0
    animation = 1
    console.log(scenario)
    start()
    typing = false
    setupTypeWrite(1)
}

async function setScenario2(){
    scenario = 2
    animationFrame = 0
    animation = 1
    console.log(scenario)
    start()
    typing = false
    setupTypeWrite(2)
}

document.getElementById("gameCanvas").addEventListener("click", render)
document.getElementById("scenario1button").addEventListener("click", setScenario1)
document.getElementById("scenario2button").addEventListener("click", setScenario2)
start()
setupTypeWrite(1)