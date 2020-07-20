var PLAY;
var END;
var monkey,monkey_animation;
var bananaGroup,banana_image;
var jungle,jungle_image;
var gameover,gameover_image;
var restart,restart_image;
var stoneGroup,stone_image;
var ground;
var score;
gameState = PLAY;

function preload() {
  monkey_animation =  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  jungle_image = loadImage("jungle.jpg");
  
  banana_image = loadImage("Banana.png");
  
  stone_image = loadImage("stone.png");
  
  gameeover_image = loadImage("gameOver.png");
  
  restart_image = loadImage("restart.png");
}

function setup() {
  createCanvas(800,400);
  
  jungle = createSprite(0, 0 , 800, 400);
  jungle.addImage(jungle_image);
  jungle.scale = 1.5;
  jungle.x = jungle.width/2;
  
  ground = createSprite(300, 280, 600, 10);
  ground.visible = false;
  
  monkey = createSprite(100, 250, 30, 40);
  monkey.addAnimation("running",monkey_animation);
  monkey.scale = 0.1;
  
  bananaGroup = Group();
  
  stoneGroup = Group();
  
  score = 0;
}

function draw() {
 background(255);

  if(gameState === PLAY) {
    jungle.velocityX = -6;
    if(jungle.x < 0) {
      jungle.x = jungle.width/2;
    }
    if(keyDown("space") && monkey.y >= 244) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    Banana();
    
    Stone();
    
    if(bananaGroup.isTouching(monkey)) {
       score = score + 2;
        bananaGroup.removeSprites();
    }
    
    if(stoneGroup.isTouching(monkey)) {
      gameState = END;
    }
    
  } else if(gameState === END) {
    gameover = createSprite(300, 150, 20, 20);
    gameover.addImage(gameover_image);
    
    stoneGroup.setVelocityXEach(0);
    
    monkey.velocityY = 0;
  }
  
  monkey.collide(ground);
  
  drawSprites();
  stroke("black");
  fill("black");
  textSize(21);
  text("Score: "+score, 20, 30);
}

function Banana() {
  if(frameCount % 80 === 0) {
    var banana;
    banana = createSprite(600, 150, 40, 10);
    banana.addImage(banana_image);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 90;
    bananaGroup.add(banana);
  }
}

function Stone() {
  if(frameCount % 80 === 0) {
    var stone
    stone = createSprite(600, 250, 40, 40);
    stone.addImage(stone_image);
    stone.scale = 0.15;
    stone.velocityX = -6;
    stone.lifetime = 90;
    stoneGroup.add(stone);
  }
}