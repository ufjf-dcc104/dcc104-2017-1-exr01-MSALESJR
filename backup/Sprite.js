function Sprite(){
    this.g = 0;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.color = "blue";
    this.width = 15;
    this.height= 15;
    this.angle = 0;
    this.vang = 0;
}

Sprite.prototype.desenhar = function (ctx) {
    /*** Tira um foto de todas as propriedade do contexto **/
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle * Math.PI/360);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width/2,-this.height/2,this.width,this.height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(-this.width/2,-this.height/2,this.width,this.height);
    ctx.restore();
};

Sprite.prototype.mover = function(dt){
   /** Ajustando a aceleracao ***/
   this.vx = this.vx + this.ax*dt;
   this.vy = this.vy + (this.ay + this.g)*dt;
   /*** Ajustando a nova posicao conforme a aceleracao **/
   this.x = this.x + this.vx * dt;
   this.y = this.y + this.vy * dt;

   this.angle = this.angle + this.vang * dt;
}


Sprite.prototype.colidiuCom = function (alvo) {
  if(this.x + this.width < alvo.x) return false;
  if(this.x > alvo.x + this.width) return false;
  if(this.y + this.height < alvo.y) return false;
  if(this.y > alvo.y + this.height) return false;
  return true;
};

Sprite.prototype.perseguir = function (alvo, dt) {
   this.ax = 10 * dt * (alvo.x - this.x) - 0.05 * this.vx ;
   this.ay = 10 * dt * (alvo.y - this.y) - 0.05 * this.vy ;
};
