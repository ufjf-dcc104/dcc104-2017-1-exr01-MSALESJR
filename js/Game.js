/**
 * Criado por Marcus em 06/04/2017.
 */
function Game(){

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

Game.prototype.init = function(idCanvas, width, height){
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
}

Game.prototype.montaTela = function(){
    this.contexto.clearRect(0,0,this.width, this.height);
}


Game.prototype.run = function (){
    this.montaTela();
    this.level.desenhar();
}
