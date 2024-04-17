// Get DOM elements
var gridElmt = document.querySelector('.grid');
var scoreElmt = document.querySelector("#score");
var bestElmt = document.querySelector('#best');
console.log(scoreElmt);
console.log(gridElmt);

//OnLoad
//Initialize Displays
var score = 0;
const width = 4;
var box = [];

// Draw grid
function drawGrid(){
    for(var i=0; i<width*width;i++){
        box = document.createElement('div');
        box.innerHTML = 0
        gridElmt.appendChild(box);
    }
}

drawGrid()