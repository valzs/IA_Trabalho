const player1 = new Player();
player1.controller = 'mouse';
const player2 = new Player();
const bola = new Bola();
//fundo img = 

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetGame();
}

function resetGame(){
  player1.pos.x = 10;
  player2.pos.x = width - 20;
  player1.pos.y = 180;
  player2.pos.y = 180;
  bola.pos.x = (bola.direcao === 1) ? (player1.pos.x + player1.size.w) : player2.pos.x;
  bola.pos.y = 200;
  bola.deslocamento = 3;
}

function verificaPontuacao(){
  if(bola.pos.x > width){
    player1.pontuacao++;
    resetGame();
  }
  
  if(bola.pos.x + bola.size.w < 0){
    player2.pontuacao++;
    resetGame()
  }
}

function mostrarPontuacao() {
  fill('pink');
  textSize(48);
  text(player1.pontuacao, (width / 2) / 2,50);
  text(player2.pontuacao,(width / 2) + (width / 4),50);
}

function mostrarNome() {
  fill('green');
  textSize(48);
  text(player1.nome, (width / 2) / 3,50);
  text(player2.nome,(width / 2) + ((width / 2) / 3,50),50);
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
  img = loadImage('fundo.jpg');
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
}
