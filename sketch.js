const player1 = new Player();
player1.controller = 'mouse';
const player2 = new Player();
const bola = new Bola();

//variáveis

var mm = 0;
var ss = 0;
var mi = 0;

var tempo = 1000;
var cron;

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetGame();
}

// Iniciando o jogo

function resetGame(){
  player1.pos.x = 10;
  player2.pos.x = width - 20;
  player1.pos.y = 180;
  player2.pos.y = 180;
  bola.pos.x = (bola.direcao === 1) ? (player1.pos.x + player1.size.w) : player2.pos.x;
  bola.pos.y = 200;
  cron = setInterval(() => { mostrarTimer(); }, tempo);
}

//Cronômetro

function mostrarTimer() {
  mi++; 
  if (mi == 59) { 
      mi = 0; 
      ss++; 

      if (ss == 59) { 
          ss = 0;
          mm++;
      }
  }

  var format = (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);

  fill('black');
  textSize(70);
  text(format, (width / 2) / 1.07,85);
  return format;
}

function verificaPontuacao(){
  if(bola.pos.x > width){
    player1.pontuacao++;
    aumentaDificuldade();
    resetGame();
  }
  
  if(bola.pos.x + bola.size.w < 0){
    player2.pontuacao++;
    aumentaDificuldade();
    resetGame()
  }
}

function mostrarPontuacao() {
  fill('black');
  textSize(48);
  text(player1.pontuacao, (width / 2) / 2,50);
  text(player2.pontuacao,(width / 2) + (width / 4),50);
}



function aumentaDificuldade(){

  if (player1.pontuacao >= player2.pontuacao + 20){
    bola.deslocamento = 15;
  } else if (player1.pontuacao >= player2.pontuacao + 15){
    bola.deslocamento = 12.5;
  } else if (player1.pontuacao >= player2.pontuacao + 10){
    bola.deslocamento = 10;
  } else if (player1.pontuacao >= player2.pontuacao + 5){
    bola.deslocamento = 7.5;
  } else if (player1.pontuacao >= player2.pontuacao){
    bola.deslocamento = 5;
  } else {
    bola.deslocamento = 2.5;
  }
}


function mostrarNome() {
  fill('green');
  textSize(48);
  text(player1.nome, (width / 2) / 1.70,85);
  text(player2.name,(width / 2) + ((width / 2) / 4.80),85);
}

function teveColisaoObjetos(obj1, obj2) {
  if(
      (
      obj1.pos.x + obj1.size.w > obj2.pos.x 
       && 
      obj1.pos.x < obj2.pos.x + obj2.size.w
      )
    &&
      (
      obj1.pos.y + obj1.size.h > obj2.pos.y
        &&
      obj1.pos.y < obj2.pos.y + obj2.size.h
      )
  ){
    return true;  
  }
  return false;
}

function verificaColisao(){
  if(teveColisaoObjetos(bola, player2)){
    bola.direcao = -1;
    bola.deslocamento += 0.1;
  }
  
  if(teveColisaoObjetos(bola, player1)){
    bola.direcao = 1;
    bola.deslocamento += 0.1;
  }
  
  if((bola.pos.y + bola.size.h) > height){
    bola.direcaoVertical = -1;
  }
  
  if(bola.pos.y < 0){
    bola.direcaoVertical = 1;
  }
}

//criando a imagem
let img;

function preload() {
  img = loadImage('background.jpg');
}


//O que a função draw faz é renderizar os elementos na tela, 
//basicamente ela executa o código que está dentro dela infinitamente 
//e uma quantidade específica de vezes, até que haja uma instrução que faça o programa parar.

function draw() {

  //pode usar cores também
  background(img);

  //Configurando o meio de campo
  strokeWeight(5);
  stroke("white");
  line(width / 2, 0, width / 2, height);
  
  //atualiza as posições dos objetos
  player1.update();
  player2.update();
  bola.update();
  
  
  //verificar colisão
  verificaColisao();
  //verificar se teve pontuação
  verificaPontuacao();
  
  //mostra os objetos
  player1.show();
  player2.show();
  bola.show();
  
  
  mostrarPontuacao();
  mostrarNome();
  mostrarTimer();
}
