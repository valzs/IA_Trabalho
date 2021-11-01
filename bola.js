class Bola {
    constructor(){
      this.pos = {x:0, y:0};
      this.size = {w:35, h:50};
      this.direcao = 1;
      this.direcaoVertical = 1; 
      this.deslocamento = 3;
    }
    
    update(){
      this.pos.x += (this.deslocamento * this.direcao);
      this.pos.y += (this.deslocamento * this.direcaoVertical);
    }
    
    show(){
      noStroke();
      fill('red');
      circle(this.pos.x, this.pos.y, this.size.w);
    }
  }