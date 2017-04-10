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

    /*** Base de partida da nave **/
    this.plataforma_origem = null;

    /*** Base de origem da nave **/
    this.plataforma_destino= null;

    /*** Player instancia da class SpriteDinamico **/
    this.player = null;

    /*** Gravidade  **/
    this.gravidade = 30;
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
    this.player.y = 410;
    this.player.width  = 50;
    this.player.height = 50;
    this.player.gravidade = this.gravidade;
    this.player.displayName(this.contexto, 100, 100);

    /*** Adicionar plataforma inicio **/
    var plataformaOrigem = new SpriteEstatico();
    plataformaOrigem.x = 50;
    plataformaOrigem.y = 450;
    plataformaOrigem.width = 100;
    plataformaOrigem.height= 30;
    plataformaOrigem.color = 'red';
    plataformaOrigem.tag   = 'pf_origem';
    this.plataforma_origem = plataformaOrigem;
    this.spritesEstaticos.push(plataformaOrigem);

    /*** Adicionar plataforma fim **/
    var plataformaDestino = new SpriteEstatico();
    plataformaDestino.x = 552;
    plataformaDestino.y = 250;
    plataformaDestino.width = 100;
    plataformaDestino.height= 30;
    plataformaDestino.color = 'red';
    plataformaDestino.tag   = 'pf_destino';
    this.plataforma_destino = plataformaDestino;
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
    this.player.displayFuel(this.contexto,545,20);
    //console.log("player x : "+ this.player.x + " y : " + this.player.y);
    //console.log("Origem x : "+ this.plataforma_origem.x + " y : " + this.plataforma_origem.y);
    this.verificaColisao(this.player,this.plataforma_origem, function(player, plataforma_origem){
        player.velocidade_y = 0;
        player.velocidade_x = 0;
        player.gravidade = 0;
    });
    this.verificaColisao(this.player,this.plataforma_destino, function(player, plataforma_destino){
        player.velocidade_y = 0;
        player.velocidade_x = 0;
        player.gravidade = 0;
    });
}

Level.prototype.verificaColisao  = function(objeto1, objeto2, callback){
    if(objeto1.x + (objeto1.width / 2) < objeto2.x - (objeto2.width / 2))  return false;
    if(objeto1.x - (objeto1.width / 2) > objeto2.x + (objeto2.width / 2))  return false;
    if(objeto1.y + (objeto1.height/ 2) < objeto2.y - (objeto2.height / 2)) return false;
    if(objeto1.y - (objeto1.height/ 2) > objeto2.y + (objeto2.height/2)) return false;
    callback(objeto1, objeto2);
}