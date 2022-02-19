var current_tile
var image = current_tile+'_image'

function show_arrow(){
    if (current_tile.top === 'free') {
        document.getElementById("up").style.display = 'none'
    }
    if (current_tile.bottom === 'free') {
        document.getElementById("down").style.display = 'none'
    }
    if (current_tile.left === 'free') {
        document.getElementById("left").style.display = 'none'
    }
    if (current_tile.right === 'free') {
        document.getElementById("right").style.display = 'none'
    }
}

function hide_tile(){
    current_tile.style.display = 'none'
}

const start_page =  {
    x: 0,
    y: 0,
    image: show,
    text: fade,
    top: 'taken',
    bottom: 'free',
    left: 'free',
    right: 'free',
    status: 'free',
    id: ""
}

const poverty_tile = {
    x: 0,
    y: 1,
    image: show,
    text: fade,
    top: 'free',
    bottom: 'taken',
    left: 'free',
    right: 'free',
    status: 'free'
}

const tiles =[start_page]

var x_position = 0
var y_position = 0

function north() {
    y_position++
    console.log(y_position)
    for (let tile of tiles){
        if(tile.y === y_position){
            tile.show(tile)
            tile.fade(tile)
            current_tile = tile
        }
    }

}

function south() {
    y_position -= 1
    for (let tile of tiles){
        if(tile.y === y_position){
            tile.show(tile)
            tile.fade(tile)
            current_tile = tile
        }
    }
}

function west() {
    x_position -= 1
    for (let tile of tiles){
        if(tile.y === x_position){
            tile.show(tile)
            tile.fade(tile)
            current_tile = tile
        }
    }
}

function east() {
    x_position++
    for (let tile of tiles){
        if(tile.y === x_position){
            tile.show(tile)
            tile.fade(tile)
            current_tile = tile
        }
    }
}

function start() {
    start_page.image('intro_image');
    start_page.text('intro_message');
    current_tile = start_page
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
document.getElementById("up").addEventListener("click",north)
document.getElementById("down").addEventListener("click",south)
document.getElementById("left").addEventListener("click",west)
document.getElementById("right").addEventListener("click",east)
