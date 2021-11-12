// Player 2 é a IA
var name_teste = prompt("Seja bem-vindo ao Pingo Pongo! Qual é o seu nome?");
class Player {
    constructor() {
      this.pos = {x:0, y:0};
      this.size = {w:10, h:100};
      this.pontuacao = 0;
      this.controller = 'cpu';
      this.nome = name_teste;
      this.name = 'Pyong';
      this.direcao = 1;
    }
    
    update() {
      if(this.controller === 'mouse'){
        this.pos.y = mouseY;
      } else if(this.controller === 'cpu'){
        const mediaYBola = (bola.pos.y + (bola.size.h/2));
        const mediaYPlayer = (this.pos.y + (this.size.h/2));
        if(mediaYBola > mediaYPlayer) {
          this.direcao = 1
        } else {
          this.direcao = -1;
        }
        this.pos.y += (bola.deslocamento * random(0.9,0.97)) * this.direcao;
      }
    }
    
    show() {
      noStroke();
      fill('red');
      rect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    }
  }