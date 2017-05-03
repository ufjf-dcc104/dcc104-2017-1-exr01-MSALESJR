/**
 * Criado por Marcus em 06/04/2017.
 * Por padrao desenho um circulo de raio = 5
 */
function SpriteCircle()
{
    /*** Posicao x **/
    this.posicao_x = 0;

    /*** Posicao y **/
    this.posicao_y = 0;

    /*** raio do circulo **/
    this.raio = 5;

    /*** Angulo inicial **/
    this.angulo_inicial = 0;

    /*** Angulo final **/
    this.angulo_final = Math.PI * 2;

    /*** Cor da Linnha **/
    this.color = '#fff'
}

SpriteCircle.prototype.desenhar = function (contexto)
{
    contexto.beginPath();
    contexto.arc(this.posicao_x,this.posicao_y,this.raio,this.angulo_inicial,this.angulo_final);
    contexto.stroke();
}