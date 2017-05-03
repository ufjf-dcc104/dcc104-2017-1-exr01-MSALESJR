/**
 * Criado por Marcus em 06/04/2017.
 */
function SpriteEstatico()
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

    /*** strokeStyle **/
    this.strokeStyle = 'black';

    /*** Tag ***/
    this.tag = null;
}

SpriteEstatico.prototype.desenhar = function (contexto)
{
    contexto.save();
    contexto.translate(this.x, this.y);
    contexto.rotate(this.angulo * Math.PI / 360);
    contexto.fillStyle = this.color;
    contexto.fillRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
    contexto.strokeStyle = 'white';
    contexto.strokeRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
    contexto.restore();
}