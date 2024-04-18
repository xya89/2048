// Get DOM elements
var gridElmt = document.querySelector('.grid');
var scoreElmt = document.querySelector("#score");
var bestElmt = document.querySelector('#best');
// console.log(scoreElmt);
// console.log(gridElmt);

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
        // box.setAttribute('index', i);
        box.setAttribute('x', row);
        box.setAttribute('y', col);

        box.textContent = '';
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
generateNumber();

// get boxes coord -> array
function boxCoord(){
    //initialize a 2D array to store the box's coord
    var arr = [];
    for(var i=0;i<width;i++){
        arr[i]=[];
    }
    //get box
    var b = document.querySelectorAll('.grid div');
    //iterate through each box, store the value of box to array[x][y]
    b.forEach(function(box){
        var x = parseInt(box.getAttribute('x'));
        var y = parseInt(box.getAttribute('y'));
        var val;
        if(box.textContent != '') {
            val = parseInt(box.textContent);
        } else {
            val = 0;
        }
        arr[x][y] = val;
    });
    return arr;
}
console.log(boxCoord());
console.log(gridElmt);

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

// Evaluation Function
// Evaluate Right
// Condition: 
// 1. Right side value is equal
// 2. immediate right's value is 0;
function canMoveRight(){
    var board = boxCoord();
    for(var i= 3; i>=0; i--){
        for(var j=2; j>=0; j--){
            //current box not empty
            if(board[i][j] != 0){
                if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

// Evaluate Left 
// Condition: 
// 1. Left side value is equal 
// 2. current boxes' left's value is 0;
function canMoveLeft(){
    var board = boxCoord();
    for(i=3;i>=0;i--){
        for(j=3;j>=1;j--){
            //current box not empty
            if(board[i][j] != 0){
                //check if immediate left is empty and if left is equal value.
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

// Evaluate Top
// Condition: 

// Evaluate Bottom

console.log("can move right: ",canMoveRight());
console.log("can move left: ", canMoveLeft());
console.log("can move top: ");
console.log("can move bottom: ");


































































// // test value arry
// for (var i =0;i<boxes.length;i++){
//     console.log("i: ",i);
//     if(boxes[i].textContent != ''){
//         var k=0;
//         var emptyBox = [];
//         while(k<=i){
//             if((i-k)%4==0 && boxes[k].textContent==''){
//                 console.log('this is box k: ',boxes[k] );
//                 emptyBox.push(boxes[k])
//                 emptyBox.sort(function(a,b){
//                     return a.getAttribute('index').value - b.getAttribute('index').value
//                 });
//             }
//             console.log("k: ",k);
//             k++;
//         }
//         console.log("first empty box:", emptyBox[0]);
//         console.log('textcontent is:',emptyBox[0].textContent);
//         emptyBox[0].textContent = 999
//         console.log(boxes[i]);
//         // TODO: fix when first box[i]: i=[0,4] the next box does not work!
//     }

//     var value = boxes[i].textContent;

// determine if can move right
// function canMoveRight(boxes){

//     for(var i=3;i>=0; i--){
//         for(var j=2; j>=0;j--){
//             if(boxes.getAttribute('x'))
        
//     }

// }


