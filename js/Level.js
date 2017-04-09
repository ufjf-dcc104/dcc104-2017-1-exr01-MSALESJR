/**
 * Criado por Marcus em 06/04/2017.
 */
function Level()
{
    /*** Contexto utilizado para manipular a tela **/
    this.contexto = null;

    /*** Array de instancia da class SpriteEstatico **/
    this.spritesEstaticos = [];

    /*** Array de instancia da class SpriteDinamico **/
    this.spritesDinamicos = [];

    /*** Player instancia da class SpriteDinamico **/
    this.player = null;
}

Level.prototype.init = function(contexto)
{
    if(contexto !== null){
        this.contexto = contexto;
        this.montaLevel();
    }else {
        Console.log("Nenhum contexto foi passado com parâmetro para o Objeto Level");
    }
}

Level.prototype.montaLevel = function()
{

    /*** Instanciando o player **/
    this.player = new Player();
    this.player.x = 60;
    this.player.y = 417;
    this.player.width  = 50;
    this.player.height = 50;
    this.player.displayName(this.contexto, 100, 100);

    /*** Adicionar plataforma inicio **/
    var plataformaOrigem = new SpriteEstatico();
    plataformaOrigem.x = 50;
    plataformaOrigem.y = 450;
    plataformaOrigem.width = 100;
    plataformaOrigem.height= 15;
    plataformaOrigem.color = 'red';
    plataformaOrigem.tag   = 'pf_origem';
    this.spritesEstaticos.push(plataformaOrigem);

    /*** Adicionar plataforma fim **/
    var plataformaDestino = new SpriteEstatico();
    plataformaDestino.x = 552;
    plataformaDestino.y = 250;
    plataformaDestino.width = 100;
    plataformaDestino.height= 30;
    plataformaDestino.color = 'red';
    plataformaDestino.tag   = 'pf_destino';
    this.spritesEstaticos.push(plataformaDestino);
}


Level.prototype.desenhar = function (dt)
{
    /*** Desenha os elementos staticos na tela **/
    for(var i = 0; i < this.spritesEstaticos.length; i++){
        this.spritesEstaticos[i].desenhar(this.contexto);
    }

    /*** Desenha os elementos dinamicos na tela **/
    for(var i = 0; i < this.spritesDinamicos.length; i++){
        this.spritesDinamicos[i].desenhar(this.contexto);
    }

    /*** Desenha e exibi o nome do player **/
    this.player.mover(dt);
    this.player.desenhar(this.contexto);
    this.player.displayName(this.contexto,5,25);
    this.player.displayFuel(this.contexto,550,25);
}