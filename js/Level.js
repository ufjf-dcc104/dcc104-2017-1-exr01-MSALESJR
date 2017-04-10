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

    /*** Adiciona plataforma inicio **/
    var plataformaOrigem = new SpriteEstatico();
    plataformaOrigem.x = 50;
    plataformaOrigem.y = 450;
    plataformaOrigem.width = 100;
    plataformaOrigem.height= 30;
    plataformaOrigem.color = 'red';
    plataformaOrigem.tag   = 'pf_origem';
    this.plataforma_origem = plataformaOrigem;
    this.spritesEstaticos.push(plataformaOrigem);

    /*** Adiciona plataforma fim **/
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

Level.prototype.updateLevel = function ()
{
    /*** Display nome do player **/
    var namePlayer = new SpriteText();
    namePlayer.value = this.player.name;
    namePlayer.posicao_x = 5;
    namePlayer.posicao_y = 25;
    namePlayer.desenhar(this.contexto);

    /*** Display combustivel do player ***/
    var fuelPlayer = new SpriteText();
    fuelPlayer.value = this.player.fuel.toFixed(2) +" %";
    fuelPlayer.posicao_x = 520;
    fuelPlayer.posicao_y = 20;
    fuelPlayer.desenhar(this.contexto);

    /*** Adiciona o circulo na nave **/
    var circleNave = new SpriteCircle();
    circleNave.posicao_x = this.player.x;
    circleNave.posicao_y = this.player.y + (this.player.height / 2);
    circleNave.raio = 5;
    circleNave.desenhar(this.contexto);

    /*** Adiciona o circulo a plataforma inicial **/
    var circlePlataformaInicial = new SpriteCircle();
    circlePlataformaInicial.posicao_x = this.plataforma_origem.x;
    circlePlataformaInicial.posicao_y = this.plataforma_origem.y - (this.plataforma_origem.height / 2);
    circlePlataformaInicial.raio = 5;
    circlePlataformaInicial.desenhar(this.contexto);

    /*** Adiciona o circulo a plataforma final **/
    var circlePlataformaFinal = new SpriteCircle();
    circlePlataformaFinal.posicao_x = this.plataforma_destino.x;
    circlePlataformaFinal.posicao_y = this.plataforma_destino.y - (this.plataforma_destino.height / 2);
    circlePlataformaFinal.raio = 5;
    circlePlataformaFinal.desenhar(this.contexto);

    /*** Adicionar linha que liga plataforma inicial a neve **/
    var linePlataformaInicialNave = new SpriteLine();
    linePlataformaInicialNave.posicao_x_inicial = circleNave.posicao_x;
    linePlataformaInicialNave.posicao_y_inicial = circleNave.posicao_y;
    linePlataformaInicialNave.posicao_x_final = circlePlataformaInicial.posicao_x;
    linePlataformaInicialNave.posicao_y_final = circlePlataformaInicial.posicao_y;
    linePlataformaInicialNave.desenhar(this.contexto);

    /*** Adicionar linha que liga plataforma final a neve **/
    var linePlataformaFinalNave = new SpriteLine();
    linePlataformaFinalNave.posicao_x_inicial = circleNave.posicao_x;
    linePlataformaFinalNave.posicao_y_inicial = circleNave.posicao_y;
    linePlataformaFinalNave.posicao_x_final = circlePlataformaFinal.posicao_x;
    linePlataformaFinalNave.posicao_y_final = circlePlataformaFinal.posicao_y;
    linePlataformaFinalNave.desenhar(this.contexto);
    /*** Distancia ate o objetivo ***/
    var distancia = linePlataformaFinalNave.size()

    /*** Mostrar mensagem de Vitoria **/
    var displayDistancia = new SpriteText();
    displayDistancia.value = distancia.toFixed(2);
    displayDistancia.posicao_x = this.player.x + 20;
    displayDistancia.posicao_y = this.player.y + 35;
    displayDistancia.font = '10px Arial';
    displayDistancia.desenhar(this.contexto);

    if(distancia <= 2)
    {
        /*** Mostrar mensagem de Vitoria **/
        var vitoriaDisplay = new SpriteText();
        vitoriaDisplay.value = "Parabéns";
        vitoriaDisplay.posicao_x = 250;
        vitoriaDisplay.posicao_y = 250;
        vitoriaDisplay.font = '28px Arial';
        vitoriaDisplay.desenhar(this.contexto);

        /*** sinaliza o fim do jogo **/
        this.game.vitoria = true;
    }

    /*** Vamos verificar se o player ainda tem combustivel **/
    if (this.player.fuel <= 0){
        this.player.fuel = 0;
        /*** Mostrar mensagem de Derrota **/
        var derrotaDisplay = new SpriteText();
        derrotaDisplay.value = "Fim de Jogo";
        derrotaDisplay.posicao_x = 250;
        derrotaDisplay.posicao_y = 250;
        derrotaDisplay.font = '28px Arial';
        derrotaDisplay.desenhar(this.contexto);
        this.game.derrota = true;
    }
}

Level.prototype.desenhar = function (dt)
{
    this.updateLevel();
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

    /*** Verifica colisao nave com plataforma inicial **/
    this.verificaColisao(this.player,this.plataforma_origem, function(player, plataforma_origem){
        player.velocidade_y = 0;
        player.velocidade_x = 0;
        player.gravidade = 0;
    });

    /*** Verifica colisao nave com plataforma final **/
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