
var grupodenuvens;
var grupodeobstaculos;
var JOGANDO = 1;
var GAMEOVER = 0;
var estadodejogo = JOGANDO;

var trex, trex_correndo, trex_colidindo
var borda;
var solo, ground;
var nuvem, clouns;
var obstaculo1, cacto, cact, cact2, cact3, cact4, cact5;
var pontuacao = 0;
var fimdejogo,carregarfim;
var botaofimdejogo, botao;
var som
var som1
var som2


function preload(){
    trex_correndo = loadAnimation("trex1.png","trex3.png", "trex4.png");
        ground = loadImage("ground2.png");
          clouns = loadImage("cloud.png");
            cacto = loadImage("obstacle1.png");
          cact1 = loadImage("obstacle2.png");
         cact2 = loadImage("obstacle3.png");
         cact3 = loadImage("obstacle4.png");
        cact4 = loadImage("obstacle5.png");
       cact5 = loadImage("obstacle6.png");
        trex_colidindo = loadAnimation("trex_collided.png");
        carregarfim = loadImage("gameOver.png");
        botao = loadImage("restart.png");
        som = loadSound("checkPoint.mp3");
         som1 = loadSound("die.mp3");
          som2 = loadSound("jump.mp3");
  //loadAnimation
  //loadImage
  
}

function setup(){
    createCanvas(600,200)
  
  
     trex = createSprite(70,170,30,50);
       trex.addAnimation("running", trex_correndo);
         trex.scale = 0.5;
        borda=createEdgeSprites()
      solo = createSprite(300,190,600,1);
        solo.addImage(ground);
          grupodenuvens = createGroup();
        grupodeobstaculos = createGroup();
      fimdejogo = createSprite(300,100,20,10);
       fimdejogo.addImage(carregarfim);
       botaofimdejogo = createSprite(300,120,10,10);
        botaofimdejogo.addImage(botao);
       
          trex.setCollider("circle",0,0,40)
        trex.addAnimation("colidindo", trex_colidindo)
       botaofimdejogo.scale = 0.4
     fimdejogo.scale = 0.5
          
          
          
   
  
 
 
}

function draw(){
      background("180"); 
  
 
  if (estadodejogo === JOGANDO)  {
  
     pontuacao = pontuacao + Math.round(frameRate() / 60);
    if (pontuacao > 0 && pontuacao % 100 === 0){
      
      
      
      som.play ();
    }
    if(solo.x < 0){
        solo.x = solo.width/2
    
    }
    fimdejogo.visible = false
    botaofimdejogo.visible = false
     solo.velocityX = -8
      if(keyDown("up") && trex.y > 175){
                trex.velocityY = -9
        som2.play ();
      }
        trex.velocityY = trex.velocityY + 0.5
     clound();
    cact();
   
   // trex.debug = true
    grupodeobstaculos.debug = true
            if (trex.isTouching (grupodeobstaculos)){
    estadodejogo = GAMEOVER
              som1.play ();
           
              
      }
    
  }
   
    
  
  else if (estadodejogo === GAMEOVER)   {
       
     grupodeobstaculos.setVelocityXEach(0)
              grupodenuvens.setVelocityXEach(0)
              trex.velocityX = 0
           solo.velocityX = 0 
      trex.velocityY = 0
    
    
    
  
           trex.changeAnimation("colidindo",trex_colidindo)
    fimdejogo.visible = true
    botaofimdejogo.visible = true
    
    if (mousePressedOver (botaofimdejogo)){
    reiniciar();
    }
  }
  
        
          text("pontos " + pontuacao ,500,30);
           
         
    
                 
                    
                  trex.collide(borda[3])
                    
      


                      drawSprites();
                  

}
  function clound(){
    
   

    if (frameCount % 60 === 0){
       nuvem = createSprite(600,80,20,20);
      nuvem.velocityX = (-4);
      nuvem.y = Math.round(random(20,90));
     nuvem.addImage(clouns);
      nuvem.depth = trex.depth;
      trex.depth = trex.depth + 1
      nuvem.lifetime = 180;
      grupodenuvens.add(nuvem)
     
      }
  
    
    
  }
function cact(){
  
  
  
  if (frameCount % 40 === 0){
    obstaculo1 = createSprite(600,175,20,20);
    obstaculo1.velocityX = (-6)
    //obstacilo1.velocityX = -(6 + pontuacao / 100)
    var aleatorio = Math.round(random(1,6));
    obstaculo1.scale = 0.5;
    obstaculo1.lifetime = 180
   grupodeobstaculos.add(obstaculo1);
    
    
    switch(aleatorio){
      case 1: obstaculo1.addImage (cacto);
        break;
        case 2: obstaculo1.addImage (cact1);
        break;
        case 3: obstaculo1.addImage (cact2);
         break;
         case 4: obstaculo1.addImage (cact3);
        break; 
        case 5: obstaculo1.addImage (cact4);
        break;
        case 6: obstaculo1.addImage (cact5);
        break;
        default:break;
        
        
 }
    
    grupodeobstaculos.debug = true
    
    
    
  }
  
  
  
  
  
  
  
  
}
function reiniciar(){
  
  estadodejogo = JOGANDO
    grupodeobstaculos.destroyEach();
   grupodenuvens.destroyEach();
 trex.changeAnimation("running",trex_correndo);
  pontuacao = 0
}



