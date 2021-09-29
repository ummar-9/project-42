var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;

var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading = createElement("h1")
  scoreboard = createElement("h1")
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes

  if(gameState===1){
    gun.y=mouseY

    if(frameCount %80 === 0){
      drawBlueBubble();
    }
    if(frameCount%100 === 0){
      drawRedBubble();
    }
    if(keyDown("space")){
      shootBullet()
    }
    scoreboard.html("Score:" +score);
    scoreboard.style('color:red');
    scoreboard.position(width-200,20);

    heading.html("life "+ life)
    heading.style('color:red')
    heading.position(150,20);
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
      
    }
     
    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }
    if(blueBubbleGroup.collide(backBoard)){
      life = life-1;
      blueBubbleGroup.destroyEach();
    }
    if(redBubbleGroup.collide(backBoard)){
      life = life-1;
      redBubbleGroup.destroyEach();
    }
    if(life === 0){
    gameState =2;
    }
    handleGameOver();
    drawSprites();
  }
  }


function shootBullet(){
   bullet = createSprite(0,0,10,10);
   bullet.y = gun.y;
   bullet.x = gun.x +10
   bullet.velocityX = 200;
   bullet.addImage(bulletImg);
   bullet.scale = 0.1;
   bullet.lifetime = 400;
   bulletGroup.add(bullet)
  
}
function drawBlueBubble(){
  bluebubble = createSprite(800,0,20,20);
  bluebubble.y = random(10,700);
  bluebubble.velocityX = -5;
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.lifetime = 800;
  blueBubbleGroup.add(bluebubble)
}
function drawRedBubble(){
  redbubble = createSprite(800,0,20,20);
  redbubble.y = random(10,700);
  redbubble.velocityX = -5;
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.lifetime = 800;
  redBubbleGroup.add(redbubble)
}
function handleBubbleCollision(bubbleGroup){
if(life>0){
score = score +1;
}
blast = createSprite(bullet.x+60,bullet.y,50,50);
blast.addImage(blastImg);
blast.scale = 0.1;
blast.lifetime = 20;
   bubbleGroup.destroyEach();
   bulletGroup.destroyEach();
}
function handleGameOver(){
if(gameState ===2){
  swal({
    title: 'Game Over',
    text: 'oops you lost the game...!',
    imageUrl:
    "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize:"100x100",
   confirmButtonText: "Thanks for playing"
  })
}
} 