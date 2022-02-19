const start_page =  {
    x: 0,
    y: 0,
    image: show,
    text: fade,
    top: 'free',
    bottom: 'free',
    left: 'free',
    right: 'free'
}


var x_position = 0
var y_position = 0

function north() {
    y_position++
}

function south() {
    y_position -= 1
}

function west() {
    x_position -= 1
}

function east() {
    x_position++
}

function start() {
    start_page.image('intro_image');
    start_page.text('intro_message');
}

function show(element_ID) {
    console.log(element_ID)
    var x = document.getElementById(element_ID);
    console.log(x)
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}

async function fade(element_ID) {
    var x = document.getElementById(element_ID);
    x.style.display = "none"
    if (x.style.display === "none") {
        x.style.display = "block";
        x.style.opacity = '0';
    }
    for (let opacity = 0; x.style.opacity < 1; opacity+=0.1){
        x.style.opacity = opacity
        console.log(opacity)
        await new Promise(r => setTimeout(r, 100));
    }
}

document.getElementById("Start_button").addEventListener("click", start)