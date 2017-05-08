/**
 * Criado por Marcus em 06/04/2017.
 */
function SpriteDinamico()
{
    /*** Posicao x **/
    this.x = 0;

    /*** Posicao y **/
    this.y = 0;

    /*** Largura **/
    this.width  = 0;

    /*** Altura **/
    this.height = 0;

    /*** Cor  **/
    this.color  = '#069';

    /*** Angulo **/
    this.angulo = 0;

    /*** Componente da velocidade na direção x**/
    this.velocidade_x = 0;

    /*** Componente da velocidade na direção y**/
    this.velocidade_y = 0;

    /*** Componente da aceleracao na direção x**/
    this.aceleracao_x = 0;

    /*** Componente da aceleracao na direção y**/
    this.aceleracao_y = 0;

    /*** Força da gravidade aplicada sobre a Nave **/
    this.gravidade = 10;

    this.tag  = null;
}

SpriteDinamico.prototype.desenhar = function (contexto)
{
    contexto.save();
    contexto.translate(this.x, this.y);
    contexto.rotate(this.angulo * Math.PI / 360);
    contexto.fillStyle = this.color;
    contexto.fillRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
    contexto.strokeStyle = "black";
    contexto.strokeRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
    contexto.restore();
}

SpriteDinamico.prototype.mover = function (dt)
{
    /*** Calculando as componente da velocidade **/
    this.velocidade_x = this.velocidade_x +   this.aceleracao_x * dt;
    //this.velocidade_y = this.velocidade_y + ( this.aceleracao_y + this.gravidade ) * dt;
    /*** Calculando as compontente da posição **/
    this.x = this.x + this.velocidade_x * dt;
    //this.y = this.y + this.velocidade_y * dt;
};