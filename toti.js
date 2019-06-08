const HEIGHT = 1;
const WIDTH = 15;
var canvas;
var context;
var players = [];
var playerX =0;
var playerY =0;
var lines = [];
const TOTAL = 20; 


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
class Player{

    x = 0;
    y = 0;
    point = 0;

        constructor(x,y,point){
            this.x = x;
            this.y = y;
            this.point = point;
            //inputs:
            // playerX 
            // closestLine.x , closestLine.y
            this.brain = new NeuralNetwork(3,4,3);
        }

        MoveLeft(){

            player.x = player.x-15;   
            DrawPlayer(player.x);
        
        }
        MoveRight(){
        
            player.x = player.x+15
            DrawPlayer(player.x);
        
        }
        
        think(){
        
            const inputs = [this.x,_line.x,_line.y];
            const result = this.brain.predict(inputs);
            if(result[0] == Math.max(...result))
                player.MoveLeft();
            if(result[1] == Math.max(...result))
                player.MoveRight();
            if(player.x< 0)
                player.x = 0;
            if (player.x > canvas.width)
                player.x = 300;
        }        

      

}

//starting game ...
GameLoop();

 
 function GameLoop(){
    GetContext();
    PreparePlayer();
    
    
   

    //EACH TICK FOR GAME
    setInterval(function(){ 
        ClearCanvas();
        var randomX = Math.floor(Math.random() * 500) + 3; 
        _line = new Line(randomX,WIDTH,randomX+30,15);
        lines.push(_line);
        
        for(i=0;i<lines.length;i++){
            //TODO 
            
            lines[i].y += 10;
            lines[i].startY += 10;
            DrawLine(lines[i].x,lines[i].y,lines[i].startX,lines[i].startY)
            for(let j=0 ; j<players.length ; j++){
                players[j].think();
                DrawPlayer(players[j].x,players[j].y);
                CheckPoint(players[j].x,players[j].y,lines)
                
            }
        }
            
        
    }, 100);


 }

function CheckPoint(playerX,PlayerY,ActiveLines){
    
    for(i=0;i<ActiveLines.length;i++){
         
        if( (Math.abs(ActiveLines[i].x - player.x)<20) && (Math.abs(ActiveLines[i].y - player.y)<20)  ){
                
           player.point++;    
           document.getElementById("point").innerHTML = player.point-2;
 
        }
        if(ActiveLines[i].y > 300){
            console.log(i);
            ActiveLines.splice(i, 1);

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
        for(let i=0;i<TOTAL;i++){
            var randomNum = Math.floor(Math.random() * 500) + 3;
            playerX = canvas.width / 2 +randomNum;
            playerY = canvas.height - (canvas.height / 12);
            player = new Player(playerX,playerY,0);
            players.push(player);
        }
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
        player.MoveLeft();
        console.log(player.x);
    }
     
    //right
    else if(event.keyCode == 39) {
        player.MoveRight();
        console.log(player.x);
    } 
});


