let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

class Obstacle{
  constructor(width, height, posX,posY){
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
  }
  draw(ctx){
    ctx.fillRect(this.posX,this.posY,this.width,this.height);
  }
  update_o(){
    if (this.posY < 450){
      this.posY+=1;
    }
    else{
      this.posY=450;
    }
  }
}

class Input{
  constructor(){
    document.addEventListener("keydown",(event)=>{
      switch(event.keyCode){
        case 37:
         duet.moveLeft();
          break;
        case 39:
            duet.moveRight();
          break;
      }
    })
  }
}

class Duet{
  constructor( radius, midX, y, maxRotate ){
      this.radius = radius;
      this.midX = midX;
      this.y = y;
      this.rotate=0;
      this.maxRotate= maxRotate;

  }
  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.midX, this.y, this.radius, 0, Math.PI*2);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.midX+this.radius, this.y, 10, 0, Math.PI*2);
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.midX-this.radius, this.y, 10, 0, Math.PI*2);
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.restore();
    ctx.closePath();

    }
    moveLeft(){
        this.rotate = this.maxRotate;
    }
    moveRight(){
      this.rotate = -this.maxRotate;
    }
    update_d(ctx){
      ctx.rotate(this.rotate);
      this.rotate=0;

    }
    crash(otherobj){


    }
    
}

class Score{
  constructor(x, y, color){
    this.x = x;
    this.y = y;
  }
  draw(ctx){
    ctx.font="20px Arial";
    ctx.fillStyle= "color";
    ctx.fillText(this.text, this.x, this.y);
  }
}


var obj = [new Obstacle(70,30 ,200,0)]
var duet = new Duet(40,240,430,0.012); 
new Input();
var score = new Score(350, 30, "black");
var y = 0;

function updategame(){
  if(duet.crash(obj)){  //Must write code for crash 
    alert('Game over');
  }
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for ( var i = 0; i<obj.length; i++){
    obj[i].update_o();
    obj[i].draw(ctx);
  }

  y+=1;
  score.text="SCORE: " + Math.floor(y/63);
  score.draw(ctx);

  duet.update_d(ctx);
  duet.draw(ctx);

  if((y/150)%1==0){
    x = Math.floor(Math.random()*300);
    if(x<170){
      x=150;
    }
    else if(x>300){
      x=300;
    }
    obj.push(new Obstacle(70,30,x,0));
  }


  setTimeout(updategame,16);
}

updategame();