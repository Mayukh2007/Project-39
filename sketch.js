var player,diamond,diamondImage, diamondsGroup,score = 0,invisibleground,laserbeam, laserImage, laserbeamGroup,life=10,blank1,blank2, blank1Image,blank2Image,strawberry,strawberryImage, strawberryGroup, collider, colliderGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
boy1 = loadImage("boy1.png");
boy2 = loadImage("boy2.png");
boy3 = loadImage("boy3.png");
boy4 = loadImage("boy4.png");
boy5 = loadImage("boy5.png");
boy6 = loadImage("boy6.png");
boy7 = loadImage("boy7.png");
boy8 = loadImage("boy8.png");

diamondImage = loadAnimation("Diamond.png");
laserImage = loadAnimation("laser.png");
blank1Image = loadImage("win.png"); 
blank2Image = loadImage("Loose.png");
strawberryImage = loadAnimation("Strawberry.png");
backgroundImage = loadImage("background.png");
}

function setup() {
canvas = createCanvas(displayWidth-20,displayHeight-150);

diamondsGroup = new Group();
laserbeamGroup= new Group();
strawberryGroup=new Group();
colliderGroup = new Group();


player = createSprite(50,300,20,20);
var rand = Math.round(random(1,8));
    switch(rand) {
      case 1: player.addImage(boy1);
              break;
      case 2: player.addImage(boy2);
              break;
      case 3: player.addImage(boy3);
              break;
      case 4: player.addImage(boy4);
              break;
      case 5: player.addImage(boy5);
              break;
      case 6: player.addImage(boy6);
              break;
      case 7: player.addImage(boy7);
              break;
      case 8: player.addImage(boy8);
            break;
      default: break;
    }
player.setCollider("circle",0,0);
player.debug = true;

invisibleground = createSprite(200,550,100000,10);

blank1 = createSprite(50,240,400,400);
blank1.addImage(blank1Image);
blank1.visible = false;
blank1.scale = 2;

blank2 = createSprite(50,240,400,400);
blank2.addImage(blank2Image);
blank2.visible = false;
blank2.scale = 2;
  

}
function draw() {
    background(backgroundImage);
    camera.x = player.x;
if (gameState === PLAY){



spawndiamonds();
spawnstrawberry();
spawnlaserbeam();
spawncollider();
 
if (keyDown("space")){
player.velocityY = -10;
}else{
player.velocityY = 4;
}
if (keyDown(RIGHT_ARROW)){
player.x = player.x + 10;
blank1.x = blank1.x + 10;
blank2.x = blank2.x + 10;
}
if (keyDown(LEFT_ARROW)){
player.x = player.x - 10;
}

player.velocityY = player.velocityY + 0.40; 
player.collide(invisibleground);
    
if (player.isTouching(diamondsGroup)){
diamondsGroup.destroyEach();
score = score+5;
}
if (player.isTouching(strawberryGroup)){
strawberryGroup.destroyEach();
score = score+1;
}
if (player.isTouching(laserbeamGroup)){
laserbeamGroup.destroyEach();
life = life-2;
}

if (player.isTouching(colliderGroup)){
player.velocityY = 0;
}
  
}
drawSprites();
fill("red");
textSize(20);
text("Score:"+score,camera.x+100,50);
text("Life:"+life,camera.x,50)
text("USE RIGHT AND LEFT ARROW KEYS",10,200)
text("SCORE 10 TO WIN AND IF YOU HIT THE LASER BEEM YOU LOOSE",10,250)
if (score===10 || score>10){
    blank1.visible=true;
    gameState = END;
    }
    if (life<1){
    gameState = END;
    blank2.visible=true;
    }
    if (gameState ===END){
    
    
    strawberryGroup.destroyEach();
    colliderGroup.destroyEach();
    
    }
}
function spawndiamonds(){
if (frameCount%600===0){
diamond = createSprite(camera.x+width/2,400,490,20,20);
diamond.addAnimation("diamond",diamondImage);
diamond.scale = 0.3;
player.depth = diamond.depth;
player.depth = player.depth+1;
diamondsGroup.add(diamond);
}
}
function spawnlaserbeam(){
if (frameCount%60===0){
laserbeam = createSprite(camera.x+width/2,490,40,40);
laserbeam.addAnimation("laser",laserImage);
laserbeam.scale = 0.13;
//laserbeam.collide(ground);
laserbeam.setlifetime = 150;
player.depth = laserbeam.depth;
player.depth = player.depth+1;
laserbeamGroup.add(laserbeam);
}
}
function spawnstrawberry(){
if (frameCount%100===0){
strawberry = createSprite(camera.x+width/2,490,20,20);  
strawberry.addAnimation("strawberry",strawberryImage);
strawberry.scale = 0.3;
player.depth = strawberry.depth; 
player.depth = player.depth+1;
strawberry.collide(invisibleground);
strawberryGroup.add(strawberry);
}
}
function spawncollider(){
if (frameCount%50===0){
collider = createSprite(camera.x+width/2,300,50,10);
colliderGroup.add(collider);
} 
}