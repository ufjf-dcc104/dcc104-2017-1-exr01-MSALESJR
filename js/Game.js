/**
 * Criado por Marcus em 06/04/2017.
 */
function Game()
{
    /** largura da tela do jogo **/
    this.width    = 0;

    /** altura da tela do jogo **/
    this.height   = 0;

    /*** Tela onde o jogo sera executado **/
    this.canvas   = null;

    /*** Contexto utilizado para manipular a tela **/
    this.contexto = null;

    /*** Level do jogo - Instancia da class Level***/
    this.level = null;
}

Game.prototype.init = function(idCanvas, width, height)
{
    this.canvas = document.getElementById(idCanvas);
    if (canvas !== null) {
        /*** Ajusta o tamanho da tela do jogo**/
        this.canvas   = canvas;
        this.canvas.setAttribute('width',width);
        this.canvas.setAttribute('height',height);

        this.width    = width;
        this.height   = height;
        this.contexto = canvas.getContext('2d');

        /*** Inicializa o level do game **/
        this.level = new Level();
        this.level.init(this.contexto);
    } else {
        console.log("Nenhum elemento canvas foi encontrado no documento.");
    }

    /*** Inicializa controles ***/
    this.controls();
}

Game.prototype.montaTela = function()
{
    this.contexto.clearRect(0,0,this.width, this.height);
}

Game.prototype.run = function ()
{
    this.montaTela();
    this.level.desenhar();
}

Game.prototype.controls = function()
{
    /*** Controle Nave Botao Apertado***/
    addEventListener("keydown",function(event){
        switch(event.keyCode){
            /*** Apertou a tecla espaço **/
            case 32 :
                console.log("Apertou para espaço");
                break;

            /*** Apertou a tecla seta para esquerda **/
            case 37 :
                console.log("Apertou para esquerda");
                break;

            /*** Apertou a tecla seta para cima **/
            case 38 :
                console.log("Apertou para cima");
                break;

            /*** Apertou a tecla seta para direita **/
            case 39 :
                console.log("Apertou para direita");
                break;

            /*** Apertou a tecla seta para baixo **/
            case 40 :
                console.log("Apertou para baixo");
                break;
        }
    });

    /*** Controle Nave Botao solto ***/
    addEventListener("keyup",function(event){
        switch(event.keyCode){
            /*** Soltou a tecla espaço **/
            case 32 :
                console.log("Soltou para espaço");
                break;

            /*** Soltou a tecla seta para esquerda **/
            case 37 :
                console.log("Soltou para esquerda");
                break;

            /*** Soltou a tecla seta para cima **/
            case 38 :
                console.log("Soltou para cima");
                break;

            /*** Soltou a tecla seta para direita **/
            case 39 :
                console.log("Soltou para direita");
                break;

            /*** Soltou a tecla seta para baixo **/
            case 40 :
                console.log("Soltou para baixo");
                break;
        }
    });
}
