const HEIGHT = 1;
const WIDTH = 15;
var canvas;
var context;
var playerX =0;
var playerY =0;
var lines = [];

class Line{
    x = 0;
    y = 0;
    startX = 0;
    startY = 0;
        constructor(x,y,startX,startY){
            this.x = x;
            this.y = y;
            this.startX = startX;
            this.startY = startY;
        }

}

//starting game ...
GameLoop();

 
 function GameLoop(){
    GetContext();
    PreparePlayer();
    var randomX = Math.floor(Math.random() * 100); 
    console.log(randomX)
    _line = new Line(randomX,WIDTH,randomX+30,15);
    lines.push(_line);
    _line2 = new Line(randomX+300,WIDTH,randomX+300+30,15);
    lines.push(_line2);

    //EACH TICK FOR GAME
    setInterval(function(){ 
        
        for(i=0;i<lines.length;i++){
            //TODO 
            //ClearCanvas();
            lines[i].y += 10;
            lines[i].startY += 10;
            DrawLine(lines[i].x,lines[i].y,lines[i].startX,lines[i].startY)
            DrawPlayer(playerX,playerY);
            CheckPoint(playerX,playerY,lines)
        }
            
        
    }, 100);


 }

function CheckPoint(playerX,PlayerY,ActiveLines){

    for(i=0;i<ActiveLines.length;i++){
        console.log("ActiveLines[i].x "+ActiveLines[i].x)
        console.log("playerX "+playerX)
        if( Math.abs(ActiveLines[i].x - playerX)<20  ){
                
                console.log("crach")
        }
    }

}


function ClearCanvas(){

    context.clearRect(0, 0, canvas.width, canvas.height);
}    
 

function GetContext(){

    setTimeout(() => {
        canvas = document.getElementById("myCanvas");
        context = canvas.getContext("2d");
    }, 1000);

}

function PreparePlayer(){
    setTimeout(() => {
        playerX = canvas.width / 2;
        playerY = canvas.height - (canvas.height / 12);
    }, 1000);
    
}


function DrawLine(x,y,startX,startY){

   
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(startX, startY);
    context.stroke();

 }

 function DrawPlayer(centerX,centerY){
   
    var radius = 10;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();

 }

 document.addEventListener('keydown', function(event) {
    //left
    if(event.keyCode == 37) {
        playerX = playerX-15
        DrawPlayer(playerX);
    }
     
    //right
    else if(event.keyCode == 39) {
        playerX = playerX+15
        DrawPlayer(playerX);
        
    } 
});
