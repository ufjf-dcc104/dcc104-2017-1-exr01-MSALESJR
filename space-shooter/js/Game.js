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

    /*** Variaveis utilizada para calcular a variacao de tempo dt***/
    this.anterior = new Date();
    this.atual    = new Date();
    this.dt       = (1 / 120);

    /** Sinaliza fim do jogo com vitoria **/
    this.vitoria = false;

    /** Sinaliza fim do jogo com derrota **/
    this.derrota = false;
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
        this.level.game = this;
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
    (function(game){
        function run(){
            animationID = requestAnimationFrame(run);

            /*** Atualiza o dt a cada frame ***/
            game.atual = new Date();
            game.dt    = ((game.atual - game.anterior) / 1000);

            /**** Desenha o cenario aqui **/
            game.montaTela();
            game.level.desenhar(game.dt);
            /*** Fim do desenho do cenario ***/

            /*** Atualiza o valor para calcular um novo dt**/
            game.anterior = game.atual;

            /*** Caso o jogo tenha chegado ao fim paramos a animacao**/
            if(game.vitoria || game.derrota){
                cancelAnimationFrame(animationID);
            }
        }
        run();
    })(this);

}

Game.prototype.controls = function()
{
    /*** Controle Nave Botao Apertado usamos clousure para passa a referencia de this na variavel game ***/
    (function(game){
        addEventListener("keydown",function(event){
            switch(event.keyCode){

                /*** Apertou a tecla espaço **/
                case 32 :
                    if(game.level.pode_atirar){
                        var tiro = game.level.player.atirar();
                        game.level.spritesDinamicos.push(tiro);
                        game.level.pode_atirar = false;
                    }
                    break;

                /*** Apertou a tecla seta para esquerda **/
                case 37 :
                    if(game.level.player.x > 29 ){
                        game.level.player.aceleracao_x = -50;
                    }else{
                        game.level.player.x = 29;
                        game.level.player.aceleracao_x = 0;
                        game.level.player.velocidade_x = 0;
                    }
                    break;

                /*** Apertou a tecla seta para cima **/
                case 38 :
                    break;

                /*** Apertou a tecla seta para direita **/
                case 39 :
                    if(game.level.player.x < 570){
                        game.level.player.aceleracao_x = +50;
                    }else{
                        game.level.player.aceleracao_x = 570;
                        game.level.player.aceleracao_x = 0;
                        game.level.player.velocidade_x = 0;
                    }
                    break;

                /*** Apertou a tecla seta para baixo **/
                case 40 :
                    break;
            }
        });

        /*** Controle Nave Botao solto ***/
        addEventListener("keyup",function(event){
            switch(event.keyCode){
                /*** Soltou a tecla espaço **/
                case 32 :
                    break;

                /*** Soltou a tecla seta para esquerda **/
                case 37 :
                    game.level.player.aceleracao_x = 0;
                    break;

                /*** Soltou a tecla seta para cima **/
                case 38 :
                    break;

                /*** Soltou a tecla seta para direita **/
                case 39 :
                    game.level.player.aceleracao_x = 0;
                    break;

                /*** Soltou a tecla seta para baixo **/
                case 40 :
                    break;
            }
        });
    })(this);
}
