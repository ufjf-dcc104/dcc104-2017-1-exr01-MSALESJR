/**
 * Criado por Marcus em 06/04/2017.
 */
function Level() {
    /*** Contexto utilizado para manipular a tela **/
    this.contexto = null;

    /*** Array de instancia da class SpriteEstatico **/
    this.spritesEstaticos = [];

    /*** Array de instancia da class SpriteDinamico **/
    this.spritesDinamicos = [];

    /*** Player instancia da class SpriteDinamico **/
    this.player = null;
}

Level.prototype.init = function(contexto){
    console.log(contexto);
    if(contexto !== null){
        this.contexto = contexto;
        this.montaLevel();
    }else {
        Console.log("Nenhum contexto foi passado com parâmetro para o Objeto Level");
    }
}

Level.prototype.montaLevel = function(){

    /*** Instanciando o player **/
    this.player = new Player();
    this.player.x = 100;
    this.player.y = 100;
    this.player.width  = 50;
    this.player.height = 50;
    this.player.displayName(this.contexto, 100, 100);

    for(var i = 0; i < 10; i++){
        var spriteEstatico = new SpriteEstatico();
        spriteEstatico.x = (this.contexto.canvas.width  * Math.random());
        spriteEstatico.y = (this.contexto.canvas.height * Math.random());
        spriteEstatico.width = 50;
        spriteEstatico.height= 50;
        this.spritesEstaticos.push(spriteEstatico);
    }

    for(var i = 0; i < 10; i++){
        var spriteDinamico = new SpriteDinamico();
        spriteDinamico.x = (this.contexto.canvas.width  * Math.random());
        spriteDinamico.y = (this.contexto.canvas.height * Math.random());
        spriteDinamico.width = 50;
        spriteDinamico.height= 50;
        spriteDinamico.color = 'red';
        this.spritesDinamicos.push(spriteDinamico);
    }

}


Level.prototype.desenhar = function (){
    /*** Desenha os elementos staticos na tela **/
    for(var i = 0; i < this.spritesEstaticos.length; i++){
        this.spritesEstaticos[i].desenhar(this.contexto);
    }

    /*** Desenha os elementos dinamicos na tela **/
    for(var i = 0; i < this.spritesDinamicos.length; i++){
        this.spritesDinamicos[i].desenhar(this.contexto);
    }

    /*** Desenha e exibi o nome do player **/
    this.player.desenhar(this.contexto);
    this.player.displayName(this.contexto,5,25);
    this.player.displayFuel(this.contexto,550,25);
}