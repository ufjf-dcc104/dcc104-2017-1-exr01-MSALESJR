/**
 * Criado por Marcus em 06/04/2017.
 */
function Player()
{
    /*** Nome do Player **/
    this.name = 'Player 1'

    /*** Posicao x **/
    this.x = 0;

    /*** Posicao y **/
    this.y = 0;

    /*** Força da gravidade aplicada sobre a Nave **/
    this.gravidade = 10;

    /*** Componente da velocidade na direção x**/
    this.velocidade_x = 0;

    /*** Componente da velocidade na direção y**/
    this.velocidade_y = 0;

    /*** Componente da aceleracao na direção x**/
    this.aceleracao_x = 0;

    /*** Componente da aceleracao na direção y**/
    this.aceleracao_y = 0;

    /*** Angulo de inclinação da Nave **/
    this.angulo = 0;

    /*** Velocidade angular **/
    this.velocidade_angular = 0;

    /*** Aceleracao media **/
    this.aceleracao_media = 0;

    /*** Largura **/
    this.width  = 0;

    /*** Altura **/
    this.height = 0;

    /*** Cor  **/
    this.color  = 'green';

    /*** Fuel Quantidade vida do player ***/
    this.fuel = 100;
}

Player.prototype.desenhar = function (contexto)
{
    contexto.save();
    contexto.translate(this.x, this.y);
    contexto.rotate(this.angulo * Math.PI / 360);
    contexto.fillStyle = this.color;
    contexto.beginPath();
    contexto.moveTo(-this.width/2, this.height/2);
    contexto.lineTo(this.width/2, this.height/2);
    contexto.lineTo(0,-this.height/2);
    contexto.closePath();
    contexto.fill();
    contexto.strokeStyle = "white";
    contexto.stroke();
    contexto.strokeStyle = "grey";
    contexto.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
    contexto.restore();
}

Player.prototype.mover = function (dt)
{
    /*** Calculando as componente da velocidade **/
    this.velocidade_x = this.velocidade_x +   this.aceleracao_x* dt;
    this.velocidade_y = this.velocidade_y + ( this.aceleracao_y + this.gravidade ) * dt;
    /*** Calculando as compontente da posição **/
    this.x = this.x + this.velocidade_x * dt;
    this.y = this.y + this.velocidade_y * dt;
    /*** Calculando o angulo **/
    this.angulo = this.angulo + this.velocidade_angular * dt;
};