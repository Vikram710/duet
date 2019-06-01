let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;
let button = document.getElementById("start").addEventListener("click",start);
let img=document.getElementById("img");
let img1=document.getElementById("img1");
let img2=document.getElementById("img2");
function open(){
  ctx.drawImage(img1,0,0,480,480);
}


class Obstacle{
  constructor(width, height, posX,posY){
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.speed=1;
  }
  draw(ctx){
    ctx.fillStyle="white";
    ctx.fillRect(this.posX,this.posY,this.width,this.height);
  }
  update_o(){
    if (temp_score<10){
      this.speed=1;
    }
    else if(temp_score<40){
      this.speed=2;
    }
    else if(temp_score<70){
      this.speed=3;
    }
    else{
      this.speed=4;
    }
    this.posY+=this.speed;
  }
  stop(){
    this.speed=0;
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
  constructor( radius, midX, y, maxRotate,angle ){
      this.radius = radius;
      this.angle=angle;
      this.midX = midX;
      this.y = y;
      this.rotate=0;
      this.maxRotate= maxRotate;
      this.ballr=10;

  }
  draw(ctx){

    this.xr=this.midX+this.radius*Math.cos(this.angle);
    this.yr=this.y+this.radius*Math.sin(this.angle);
    this.xb=this.midX-this.radius*Math.cos(this.angle);
    this.yb=this.y-this.radius*Math.sin(this.angle);

    ctx.beginPath();
    ctx.arc(this.midX, this.y, this.radius, 0, Math.PI*2);
    ctx.strokeStyle="rgba(255,255,255,0.35)"
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.xr, this.yr, this.ballr, 0, Math.PI*2);
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.xb, this.yb, this.ballr, 0, Math.PI*2);
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.restore();
    ctx.closePath();

    }
    moveLeft(){
        this.rotate = -this.maxRotate;
    }
    moveRight(){
      this.rotate = +this.maxRotate;
    }
    update_d(){
      this.angle+=this.rotate;     
    }
    clear(){
      this.rotate=0;
    }
    crash(other){
      if(this.xr-this.ballr<other.posX+other.width && this.xr+this.ballr>other.posX &&
         this.yr-this.ballr<other.posY+other.height && this.yr+this.ballr>other.posY){
        return true;
      }
      if(this.xb-this.ballr<other.posX+other.width && this.xb+this.ballr>other.posX &&
         this.yb-this.ballr<other.posY+other.height && this.yb+this.ballr>other.posY){
        return true;
      }
    }

  stop(){
    this.angle=0;
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

class Sound {
  constructor(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
  }
  play(){
      this.sound.play();
  }
  stop(){
      this.sound.pause();
  }    
}

var sound = new Sound("song.mp3")
var obj = [new Obstacle(70,30 ,200,0)]
var duet = new Duet(50,240,400,0.12,0); 
new Input();
var score = new Score(350, 30, "black");
var count = 0;
var y=0;
var temp_score=0;

function updategame(){
  for ( var i = 0; i<obj.length; i++){
    if(duet.crash(obj[i])){ 
      obj[i].stop();
      duet.stop();
      sound.stop();
      ctx.drawImage(img2,0,0,480,480);
      return;
      
    }
  }

  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  ctx.drawImage(img,0,0,480,480);
  sound.play();

  for ( var i = 0; i<obj.length; i++){
    obj[i].update_o();
    obj[i].draw(ctx);
  }

  count+=1;
  temp_score=Math.floor(count/63);
  score.text="SCORE: " + temp_score;
  score.draw(ctx);

  duet.update_d(ctx);
  duet.draw(ctx);
  duet.clear();

  var max = 120;
  var min = 300;
  var x = Math.floor(Math.random()*(max-min) + min);

  if(temp_score<10){
    y=y+1;
    if((y/150)%1==0){
      obj.push(new Obstacle(70,30,x,0));
    y=0;}
  }
  else if(temp_score<40){
    y+=1;
    if((y/90)%1==0){
      obj.push(new Obstacle(70,30,x,0));
    y=0;}
  }
  else if(temp_score<70){
    y+=1;
    if((y/70)%1==0){
      obj.push(new Obstacle(70,30,x,0));
    y=0;}
  }
  else{y+=1;
    if((y/50)%1==0){
      obj.push(new Obstacle(70,30,x,0));
    y=0;}
  }
  setTimeout(updategame,16);
}
function start(){
  updategame();  
}







