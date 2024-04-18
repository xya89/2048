// Get DOM elements
var gridElmt = document.querySelector('.grid');
var scoreElmt = document.querySelector("#score");
var bestElmt = document.querySelector('#best');
console.log(scoreElmt);
console.log(gridElmt);

//New Game
var newGameBtn = document.querySelector('button');
newGameBtn.addEventListener('click', function(){
    if(confirm("Are you sure to start a new game? All Progress will be lost.")){
        window.location.reload();
    }
    
})

//OnLoad
//Initialize Displays
var score = 0;
const width = 4;
var box = [];

// Draw grid
function drawGrid(){
    for(var i=0; i<width*width;i++){
        // "2D array to track box's relative location"
        var col = i%width;
        var row = Math.floor(i / width);

        box = document.createElement('div');
        box.setAttribute('index', i);
        box.setAttribute('x', row);
        box.setAttribute('y', col);

        box.innerHTML = '';
        gridElmt.appendChild(box);
    }

}

// Generate Number - Initailize the playground
function generateNumber(){
    var boxes = document.querySelectorAll('.grid div');
    
    //Let two random box have the value.
    //generate two random index to assign value.
    let index1 = Math.floor(Math.random()*boxes.length);
    let index2;
    do{
        index2 = Math.floor(Math.random()*boxes.length)
    }while(index1===index2);

    boxes[index1].textContent = Math.random() < 0.5 ? 2 : 4;
    boxes[index2].textContent = Math.random() < 100 ? 2 : 4;
    
    return boxes
}

drawGrid()
console.log(gridElmt);
var boxes = generateNumber();


// Handle keyboard
// callback dictionary - keymap
const keyMap = {
    'w': upHandler,
    'a': leftHandler,
    's': downHandler,
    'd': rightHandler,
    'ArrowUp': upHandler,
    'ArrowLeft': leftHandler,
    'ArrowDown': downHandler,
    'ArrowRight': rightHandler
}

function keyBoardHandler(){
    window.addEventListener('keydown',function(ev){
        const action = keyMap[ev.key];
        action();
    })
}

function upHandler(){
    console.log("keyup!");
}
function downHandler(){

}
function leftHandler(){

}
function rightHandler(){

}

// keyBoardHandler();


// test value arry
for (var i =0;i<boxes.length;i++){
    console.log("i: ",i);
    if(boxes[i].textContent != ''){
        var k=0;
        var emptyBox = [];
        while(k<=i){
            if((i-k)%4==0 && boxes[k].textContent==''){
                console.log('this is box k: ',boxes[k] );
                emptyBox.push(boxes[k])
                emptyBox.sort(function(a,b){
                    return a.getAttribute('index').value - b.getAttribute('index').value
                });
            }
            console.log("k: ",k);
            k++;
        }
        console.log("first empty box:", emptyBox[0]);
        console.log('textcontent is:',emptyBox[0].textContent);
        emptyBox[0].textContent = 999
        console.log(boxes[i]);
        // TODO: fix when first box[i]: i=[0,4] the next box does not work!
    }

    var value = boxes[i].textContent;

}