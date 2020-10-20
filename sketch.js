
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, ground;
var FoodGroup, obstacleGroup;
var score = 0, survivalTime = 0;

function preload(){
  
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("m", monkey_running);
  monkey.scale = 0.1;
    
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background("white");
  if(ground.x < 150){
    ground.x = ground.width/2;
  }
  if(keyDown("space") && monkey.y === 314.3){
    monkey.velocityY = -19;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("black");
  text("score: "+score, 50, 500);
  
  stroke("black");
  textSize(20);
  fill("white");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("survival time: "+survivalTime, 100, 50);
  
  spawnBananas();
  spawnObstacles();
  
  if(FoodGroup.isTouching(monkey)){
    score++;
    FoodGroup.destroyEach();
  }
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
  }
  else{
    obstacleGroup.setVelocityXEach(-6);
  }
  drawSprites();
}
       
function spawnBananas(){
  if(frameCount % 80 === 0){
    banana = createSprite(600, Math.round(random(120, 200)), 10, 10);
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.scale = 0.1;
    banana.lifetime = 600;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(600, 310,10, 10);
    obstacle.velocityX = -6;
    obstacle.collide(ground);
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 600;
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.2;
  }
}



