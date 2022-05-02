var runner;
var runner_running;
var jungle;
var jungleImg;
var obstacle;
var obstacleImg;
var coinImg;
var coin;
var PLAY = 1;
var END = 0;
var score = 0;
var gameState=PLAY;


function preload() {

  runner_running = loadAnimation("./images/runner01.png", "./images/runner02.png", "./images/runner04.png");

  jungleImage = loadImage("images/bg.png");
  obstacle1Img = loadImage("./images/stone.png");
  obstacle2Img = loadImage('./images/snake.png');
  coinImg = loadImage('./images/coin.png');
  restartImg= loadImage ('./images/restart.png');
  gameOverImg= loadImage ('./images/gameOver.png');
runner_collided = loadImage ('./images/runner01.png');




}

function setup() {
  createCanvas(800, 400)
  runner = createSprite()

  jungle = createSprite(400, 100, 400, 20);
  jungle.addImage("jungle", jungleImage);
  jungle.scale = 0.3
  jungle.x = width / 2;

  runner = createSprite(50, 250, 20, 50);
  runner.addAnimation("running", runner_running);
  runner.addAnimation("collided", runner_collided);
  runner.scale = 0.4;
  runner.setCollider("circle", 0, 0, 300)


  coinsGroup = new Group();
  obstaclesGroup = new Group();

  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(550,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  




}

function draw() {
  background("black");
  if (gameState === PLAY) {
    jungle.velocityX = -3

    if (jungle.x < 100) {
      jungle.x = 400
    }


    if (obstaclesGroup.isTouching(runner)) {
      gameState = END;
    }
    if (coinsGroup.isTouching(runner)) {
      score = score + 1;
      coinsGroup.destroyEach();
    }
  
    spawnCoin();
    spawnobstacle();
    drawSprites();



    textSize(20);
    stroke(3);
    fill("black")
    text("Score: " + score, camera.position.x, 50);
  }
  else if (gameState === END) {
    gameOver.x = camera.position.x;
    restart.x = camera.position.x;
    gameOver.visible = true;
    restart.visible = true;
    runner.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);

    runner.changeAnimation("collided", runner_collided);

    obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      reset();
    }
  }
}


function spawnCoin() {

  if (frameCount % 80 === 0) {

    var coin = createSprite(camera.position.x + 500, 330, 40, 10);

    coin.velocityX = -6
    coin.scale = 0.1;
    coin.addImage(coinImg);


    coin.lifetime = 400;

    coin.setCollider("rectangle", 0, 0, coin.width / 2, coin.height / 2)
    coinsGroup.add(coin);

  }

}



function spawnobstacle() {

  if (frameCount % 50 === 0) {

    var obstacle = createSprite(camera.position.x + 500, 330, 40, 10);

    obstacle.velocityX = -6
    obstacle.scale = 0.6;

    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1Img);
        break;
      case 2: obstacle.addImage(obstacle2Img);

      default: break;
    }

    obstacle.scale = 0.15;
    obstacle.lifetime = 400;

    obstacle.setCollider("rectangle", 0, 0, obstacle.width / 2, obstacle.height / 2)
    obstaclesGroup.add(obstacle);

  }

}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  runner.visible = true;
  runner.changeAnimation("runner",
    runner_running);
  obstaclesGroup.destroyEach();
  obstaclesGroup.destroyEach();
  score = 0;
}

