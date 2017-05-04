/**
 * Criado por Marcus em 06/04/2017.
 */
function SpriteText()
{
    /*** Posicao x **/
    this.posicao_x = 0;

    /*** Posicao y**/
    this.posicao_y = 0;

    /*** Valor a ser exibido **/
    this.value =  null;

    /** Configuracao da font tamanho e familia**/
    this.font = '18px Arial';

    /*** Tag ***/
    this.tag = null;
}

SpriteText.prototype.desenhar = function (contexto)
{
    contexto.fillStyle   = '#fff';
    contexto.strokeStyle = "#fff";
    contexto.font=this.font;
    contexto.fillText(this.value,this.posicao_x,this.posicao_y);
}
