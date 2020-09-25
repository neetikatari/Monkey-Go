var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var score1=0;
function preload(){
  monkey_running =         loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.09;
  
  ground = createSprite(20,190,1900,10);
  ground.velocityX=-4;

  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
  //monkey.setCollider("circle",0,0,400);
  //monkey.debug = true
  
}

function draw() {
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  text("Bananas collected: "+score1,470,70)
  if(gameState === PLAY){

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the bananas
    spawnBananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
    score=Math.ceil(frameCount/frameRate())
   
    if(bananasGroup.isTouching(monkey)){
        
       score1=score1+1
       bananasGroup.destroyEach()
      
    }
    if(obstaclesGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }
   else if (gameState === END) {
     textSize(30)
     stroke("red")
     text("GAME OVER",150,100)
     ground.velocityX = 0;
     monkey.velocityY = 0
      
    //set lifetime of the game objects so that they are never destroyed
     obstaclesGroup.setLifetimeEach(-1);
     bananasGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0); 
     
     bananasGroup.destroyEach()
     obstaclesGroup.destroyEach()
     
   }
  
     monkey.collide(ground)

  drawSprites(); 
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
   obstacle.addImage(obstacleImage)
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.09;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnBananas() {
  //write code here to spawn the bananas
  if (frameCount % 60 === 0) {
    var banana = createSprite(800,320,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -(6+score/100);
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    bananasGroup.add(banana);
  }
}






