
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2,rope2,rope3,cutbtn3;

var bg_img;
var food;
var rabbit,button1;

var canh,canw;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var fruitcon2,rope3,fruitcon3;

var isMobile;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  //createCanvas(,700);
  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canw = displayWidth;
    canh = displayHeight;
    createCanvas(displayWidth+80,displayHeight); 
  } else {
    canw = windowWidth;
    canh = windowHeight;
    createCanvas(windowWidth,windowHeight);
  }

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  button1 = createImg('cut_btn.png');
  button1.position(80,200);
  button1.size(50,50);
  button1.mouseClicked(drop2);
  cutbtn3 = createImg('cut_btn.png');
  cutbtn3.position(390,200);
  cutbtn3.size(50,50);
  cutbtn3.mouseClicked(drop3)

  
  rope = new Rope(7,{x:245,y:30});
  rope2 = new Rope(6,{x:80,y:200});
  rope3 = new Rope(8,{x:420,y:200});
  ground = new Ground(canw/2,canh,canw,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);
  //Matter.Composite.add(rope2.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruitcon2 = new Link(rope2,fruit);
  fruitcon3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,canw+80,canh);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    fruit=null;
     
   }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  rope2.break();
  fruitcon2.detach();
  fruitcon2 = null; 
}

function drop3()
{
  rope3.break();
  fruitcon3.detach();
  fruitcon3 = null; 
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


