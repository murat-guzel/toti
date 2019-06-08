const HEIGHT = 1;
const WIDTH = 0;
var canvas;
var context;
var players = [];
var playerX =0;
var playerY =0;
var lines = [];
const TOTAL = 50; 


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

        constructor(x,y,point,brain){
            this.x = x;
            this.y = y;
            this.point = point;
            //inputs:
            // playerX 
            // closestLine.x , closestLine.y
            if (brain) {
                this.brain = brain.copy();
                this.mutate();
              } else {
                this.brain = new NeuralNetwork(4, 1, 3);
              }
        }

        MoveLeft(){

            this.x = this.x-20;   
            DrawPlayer(this.x);
        
        }
        MoveRight(){
        
            this.x = this.x+20
            DrawPlayer(this.x);
        
        }
        
        think(){
        
            const inputs = [this.x/canvas.width,this.y/canvas.height,_line.x/canvas.width,_line.y/canvas.height];
            const result = this.brain.predict(inputs);
            // console.log(inputs)
            if(result[0] == Math.max(...result))
                this.MoveLeft();
            if(result[1] == Math.max(...result))
                this.MoveRight();
            if(this.x< 0)
                this.x = 0;
            if (this.x > canvas.width)
                this.x = canvas.width;
        }   
        
        mutate = () => {

            this.brain.mutate((x) => {

        
            if (Math.random() < 0.1) {
                let offset = Math.random() * 0.5;
                let newx = x + offset;
                return newx;
            } else {
                return x;
            }
          
            });
        }

      

}

//starting game ...
GameLoop();
PreparePlayer();
setInterval(function(){
    lines = [];
    GenerateRandomLine();
      
    PreparePlayer(pickOne().brain);
    
 

},10000)


    
 function GameLoop(){
    GetContext();
    GenerateRandomLine();
    
   

    //EACH TICK FOR GAME
    setInterval(function(){ 
        ClearCanvas();
       
        
        for(i=0;i<lines.length;i++){
            //TODO 
            
            lines[i].y += 10;
            lines[i].startY += 10;
            DrawLine(lines[i].x,lines[i].y,lines[i].startX,lines[i].startY)
            for(let j=0 ; j<players.length ; j++){
                players[j].think();
                DrawPlayer(players[j].x,players[j].y);
                CheckPoint(players[j],lines)
                
            }
        }
            
        
    }, 100);


 }

 function pickOne () {
     if(!players.length)
        return;
    let index = 0;
    let r = Math.random();
    while (r > 0) {
      r -= players[index].point/1000;
      index += 1;
    }
    index -= 1;
    return this.players[index];
  }

function GenerateRandomLine(){
    var randomX = Math.floor(Math.random() * 500) + 3; 
    _line = new Line(randomX,WIDTH,randomX+30,0);
    lines.push(_line);
}

function CheckPoint(ActivePlayer,ActiveLines){
    
    for(i=0;i<ActiveLines.length;i++){
         
        if( (Math.abs(ActiveLines[i].x - ActivePlayer.x)<20) && (Math.abs(ActiveLines[i].y - ActivePlayer.y)<20)  ){
                
           (ActivePlayer.point++)/1000;    
           document.getElementById("point").innerHTML = player.point-2;
 
        }
        if(ActiveLines[i].y > 300){
            lines.splice(i, 1);
            GenerateRandomLine();

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

function PreparePlayer(brain){
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


