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

    /*** Largura **/
    this.width  = 0;

    /*** Altura **/
    this.height = 0;

    /*** Cor  **/
    this.color  = 'green';

    /*** Fuel Quantidade vida do player ***/
    this.fuel = '100%';
}

Player.prototype.desenhar = function (contexto)
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

Player.prototype.displayName = function (contexto, x, y)
{
    contexto.fillStyle   = '#fff';
    contexto.strokeStyle = "#fff";
    contexto.font="18px Arial";
    contexto.fillText(this.name,x,y);
}

Player.prototype.displayFuel = function (contexto, x, y)
{
    contexto.fillStyle   = '#fff';
    contexto.strokeStyle = "#fff";
    contexto.font="18px Arial";
    contexto.fillText(this.fuel,x,y);
}
