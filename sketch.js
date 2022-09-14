
var fogueteImg, foguete;
var fundoImg, fundo;

var terraImg;
var starImg;
var cloudImg;

var PLAY = 1;
var END = 0;
var score;


function preload() {
  fogueteImg = loadImage("foguete.png");
  terraImg = loadImage("terra.png");
  fundoImg = loadImage("az.png");
  starImg = loadImage("star.png")
  cloudImg = loadImage("cloud.png");
}


function setup() {
  createCanvas(400,400);

    fundo = createSprite(200,200,50,50);
    fundo.addImage(fundoImg);
    fundo.visible = false
    
    
    foguete = createSprite(200,350,50,50);
    foguete.addImage(fogueteImg);
    foguete.scale = 0.2;

    starG= new Group();
    terraG= new Group();
    cloudsG= new Group();

    score = 0;
}


function draw(){
  background("lightblue");

  text("Pontuação: "+score,320,30)

  if (gameState = PLAY){
    if (keyDown("up")){
      foguete.y = foguete.y - 3;
    }

    if (keyDown("right")){
      foguete.x = foguete.x + 3;
    }

    if (keyDown("left")){
      foguete.x = foguete.x - 3;
    }

    if (keyDown("down")){
      foguete.y = foguete.y + 3;
    }
 
    if (starG.isTouching(foguete)){
      score = score+1;
      starG.destroyEach();
    }

    if (terraG.isTouching(foguete)){
      gameState = END;
    }

    spawmTerra();
    spawmStar();
    spawnClouds();

    drawSprites();
  } 
  
  if (gameState === END){
     background(0);
     

     fill("red")
     stroke("red")
     textSize(24)
     text("Game Over",150,200);
  }

 
}

function spawmStar() {

if (frameCount % 200 === 0){
    star = createSprite(200,10,50,50);
    star.addImage(starImg);
    star.scale = 0.1;

    star.x = Math.round(random(30,400));

    star.velocityY = 2;

    starG.add(star);
    
    star.lifetime = 300;
    
  }
}
function spawmTerra(){
if (frameCount % 250 === 0){
  terra = createSprite(200,20,50,50);
  terra.addImage(terraImg);
  terra.scale = 0.2;

  terra.x = Math.round(random(30,360));

  terra.velocityY = 1;

  terraG.add(terra);

  terra.lifetime = 300;

}
}

function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     
    cloud.lifetime = 200;
    
    
    cloud.depth = foguete.depth;
    foguete.depth = foguete.depth + 1;
    
    
    cloudsG.add(cloud);
  }
}



