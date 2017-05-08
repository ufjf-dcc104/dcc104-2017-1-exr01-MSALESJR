/**
 * Criado por Marcus em 06/04/2017.
 */
function Level()
{
    /*** Refencia do game que carregou o level **/
    this.game = null;

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

    this.time = 0;
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
    this.player.x = 50;
    this.player.y = 415;
    this.player.width  = 50;
    this.player.height = 50;
    this.player.gravidade = this.gravidade;

    /*** Display nome do player **/
    var namePlayer = new SpriteText();
    namePlayer.value = this.player.name;
    namePlayer.posicao_x = 5;
    namePlayer.posicao_y = 25;
    this.spritesEstaticos.push(namePlayer);

    /*** Adiciona parede superior**/
    var paredeSuperior = new SpriteEstatico();
    paredeSuperior.x = 0;
    paredeSuperior.y = 2;
    paredeSuperior.width = this.game.width;
    paredeSuperior.height= 4;
    paredeSuperior.color = '#069';
    paredeSuperior.tag   = 'parede';
    this.spritesEstaticos.push(paredeSuperior);

    /*** Adiciona parede inferior **/
    var paredeInferior = new SpriteEstatico();
    paredeInferior.x = this.game.width;
    paredeInferior.y = this.game.height / 2;
    paredeInferior.width = 3;
    paredeInferior.height= this.game.height;
    paredeInferior.color = '#069';
    paredeInferior.tag   = 'parede';
    this.spritesEstaticos.push(paredeInferior);
}

Level.prototype.criarPlataformaRandomica = function () {
    var spriteD = new SpriteDinamico();
    spriteD.x = 750;
    spriteD.y = 0;
    spriteD.width  = 100;
    spriteD.height = 350;
    spriteD.aceleracao_x = -5;
    spriteD.aceleracao_y = 0;
    spriteD.gravidade = 0;
    spriteD.tag = 'obstaculo';
    this.spritesDinamicos.push(spriteD);
}

Level.prototype.updateLevel = function (dt)
{
    this.time += dt;

    if(this.time > 3){
        this.time = 0;
        this.criarPlataformaRandomica();
    }

    /*** Barra de combustivel
    var barraFuel = new SpriteEstatico();
    barraFuel.color = 'red';
    barraFuel.x = 490;
    barraFuel.y = 15;
    barraFuel.strokeStyle = '#fff';
    barraFuel.width = this.player.fuel * 2;
    barraFuel.height = 10;
    this.spritesEstaticos.push(barraFuel);
     **/

    /*** Display combustivel do player
    var fuelPlayer = new SpriteText();
    fuelPlayer.value = this.player.fuel.toFixed(0) +" %";
    fuelPlayer.posicao_x = 540;
    fuelPlayer.posicao_y = 40;
    fuelPlayer.desenhar(this.contexto);
     ***/
}

Level.prototype.desenhar = function (dt)
{
    /*** Desenha os elementos staticos na tela **/
    for(var i = 0; i < this.spritesEstaticos.length; i++){
        var objetoEstatico = this.spritesEstaticos[i];
        if(objetoEstatico.tag === 'parede'){
            this.verificaColisao(this.player, objetoEstatico, function (player, objeto) {
                /*** Coloca o player na base **/
                player.x = 60;
                player.y = 410;
                player.velocidade_x = 0;
                player.velocidade_y = 0;
            });
        }
        objetoEstatico.desenhar(this.contexto);
    }

    /*** Desenha os elementos dinamicos na tela **/
    for(var i = 0; i < this.spritesDinamicos.length; i++){
        var sprite = this.spritesDinamicos[i];
        if(sprite.tag == 'obstaculo'){
            console.log('obstaculo');
            sprite.mover(dt);
            sprite.desenhar(this.contexto);
        }else{
            console.log('Nao obstaculo');
            sprite.desenhar(this.contexto);
        }

    }

    /*** Desenha e exibi o nome do player **/
    this.player.mover(dt);
    this.player.desenhar(this.contexto);

    this.updateLevel(dt);
}

Level.prototype.verificaColisao  = function(objeto1, objeto2, callback){
    if(objeto1.x + (objeto1.width / 2) < objeto2.x - (objeto2.width / 2))  return false;
    if(objeto1.x - (objeto1.width / 2) > objeto2.x + (objeto2.width / 2))  return false;
    if(objeto1.y + (objeto1.height/ 2) < objeto2.y - (objeto2.height / 2)) return false;
    if(objeto1.y - (objeto1.height/ 2) > objeto2.y + (objeto2.height/2)) return false;
    callback(objeto1, objeto2);
}