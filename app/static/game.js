
var canvas = document.getElementById("gameCanvas")
var canvasctx = canvas.getContext("2d");
let typing = false;
let text
let pos = 0
let tagOpen = false
let textField = document.getElementById("gameText")
let animationFrame = 0
let animation = 1
let scenariodata = [
    {
        "framecount":[10, 6, 8, 8, 7],
        "animationcount":5,
        "script":`"This is Arieful.<br>
        Arieful's family is very poor.<br>
        At the age of 7, he had to work in the fields of plantation company to help his family survive.<br>
        His family can't afford school.<br>
        Arieful has to work up to 16 hours every day for less than 2$.<br>
        In the world's poorest countries, slightly more than 1 in 5 children are engaged in work that is potentially harmful to their health.<br>
        - UNICEF, August 2021`
    },
    {
        "framecount":[4, 8, 8, 8, 8, 8, 8],
        "animationcount":7,
        "script":`
        This is Jason.<br>
        Jason lost his mother at the age of 3. His father takes care of him <br>
        His father is alcoholic and hits him when Jason misbehaves. <br>
        Jason is responsible for buying groceries and washing the dishes. He is often sent to buy more alcohol bottles for his father. <br>
        Because of this, he doesn't have a lot of time to do his homework and he hides the bruises on his body from his classmates.<br>
        Jason does not feel like his home is a home.<br>
        In a majority of countries, more than 2 in 3 children are subjected to violent discipline by caregivers. <br>
        - UNICEF, August 2021
        `
    }
]
let scenario = 1
let draw = false

function setupTypeWrite(scene) {
    pos = 0;
    typing = false
    text = scenariodata[scene-1]["script"];
    textField.innerHTML = '';
    typing = true;
}

function typeWrite() {
    if (pos < text.length && typing) {
        if (text.charAt(pos) == '<') {
            tagOpen = true;
          }
      
          if (!tagOpen) {
            textField.innerHTML += text.charAt(pos);
          }
      
          if (text.charAt(pos) == '>') {
            tagOpen = false;
            textField.insertAdjacentHTML('beforeend', '<br>');
          }
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
    setupTypeWrite(1)
}

async function setScenario2(){
    scenario = 2
    animationFrame = 0
    animation = 1
    console.log(scenario)
    start()
    setupTypeWrite(2)
}

document.getElementById("gameCanvas").addEventListener("click", render)
document.getElementById("scenario1button").addEventListener("click", setScenario1)
document.getElementById("scenario2button").addEventListener("click", setScenario2)
start()
setupTypeWrite(1)