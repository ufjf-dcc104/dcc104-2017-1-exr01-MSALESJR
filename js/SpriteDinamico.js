/**
 * Criado por Marcus em 06/04/2017.
 */
function SpriteDinamico() {
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
}

SpriteDinamico.prototype.desenhar = function (contexto){
    contexto.save();
    contexto.translate(this.x, this.y);
    contexto.rotate(this.angulo * Math.PI / 360);
    contexto.fillStyle = this.color;
    contexto.fillRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
    contexto.strokeStyle = "black";
    contexto.strokeRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
    contexto.restore();
}