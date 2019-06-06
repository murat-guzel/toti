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
    _line = new Line(0,WIDTH,30,WIDTH);
    lines.push(_line);

    //EACH TICK FOR GAME
    setInterval(function(){ 
        
        for(i=0;i<lines.length;i++){
            context.clearRect(0, 0, canvas.width, canvas.height);
            lines[i].y += 20;
            lines[i].startY += 20;
            DrawLine(lines[i].x,lines[i].y,lines[i].startX,lines[i].startY)
            DrawPlayer(playerX,playerY);
            
        }
            
        
    }, 500);


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
        playerX = playerX-10
        DrawPlayer(playerX);
    }
     
    //right
    else if(event.keyCode == 39) {
        playerX = playerX+10
        DrawPlayer(playerX);
        
    } 
});
