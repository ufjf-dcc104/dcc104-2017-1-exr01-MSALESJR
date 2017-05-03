/**
 * Criado por Marcus em 06/04/2017.
 */
function SpriteLine()
{
    /*** Posicao x inicial **/
    this.posicao_x_inicial = 0;

    /*** Posicao y inicial **/
    this.posicao_y_inicial = 0;

    /*** Posicao x final **/
    this.posicao_x_final = 0;

    /*** Posicao y final **/
    this.posicao_y_final = 0;

    /*** Cor da Linnha **/
    this.color = '#fff'
}

SpriteLine.prototype.desenhar = function (contexto)
{
    contexto.moveTo(this.posicao_x_inicial,this.posicao_y_inicial);
    contexto.lineTo(this.posicao_x_final,this.posicao_y_final);
    contexto.stroke();
}

SpriteLine.prototype.size = function()
{
    return Math.sqrt(Math.pow((this.posicao_x_final - this.posicao_x_inicial),2) + Math.pow((this.posicao_y_final - this.posicao_y_inicial),2));
}