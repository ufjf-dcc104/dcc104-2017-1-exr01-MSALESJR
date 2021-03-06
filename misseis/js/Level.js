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

    /*** indica a quantidade de obstaculo que teremos no level **/
    this.quantidade_obstaculo = 20;
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

    /*** Adiciona plataforma inicio **/
    var plataformaOrigem = new SpriteEstatico();
    plataformaOrigem.x = 50;
    plataformaOrigem.y = 450;
    plataformaOrigem.width = 100;
    plataformaOrigem.height= 20;
    plataformaOrigem.color = '#069';
    plataformaOrigem.tag   = 'pf_origem';
    this.plataforma_origem = plataformaOrigem;
    this.spritesEstaticos.push(plataformaOrigem);

    /*** Adiciona plataforma fim **/
    var plataformaDestino = new SpriteEstatico();
    plataformaDestino.x = 552;
    plataformaDestino.y = 250;
    plataformaDestino.width = 100;
    plataformaDestino.height= 20;
    plataformaDestino.color = '#069';
    plataformaDestino.tag   = 'pf_destino';
    this.plataforma_destino = plataformaDestino;
    this.spritesEstaticos.push(plataformaDestino);

    /*** Display nome do player **/
    var namePlayer = new SpriteText();
    namePlayer.value = this.player.name;
    namePlayer.posicao_x = 5;
    namePlayer.posicao_y = 25;
    this.spritesEstaticos.push(namePlayer);

    /*** Adiciona parede esquerda**/
    var paredeEsquerda = new SpriteEstatico();
    paredeEsquerda.x = 0;
    paredeEsquerda.y = this.game.height / 2;
    paredeEsquerda.width = 3;
    paredeEsquerda.height= this.game.height + 4;
    paredeEsquerda.color = '#069';
    paredeEsquerda.tag   = 'parede';
    this.spritesEstaticos.push(paredeEsquerda);

    /*** Adiciona parede direita**/
    var paredeDireita = new SpriteEstatico();
    paredeDireita.x = this.game.width;
    paredeDireita.y = this.game.height / 2;
    paredeDireita.width = 3;
    paredeDireita.height= this.game.height;
    paredeDireita.color = '#069';
    paredeDireita.tag   = 'parede';
    this.spritesEstaticos.push(paredeDireita);

    /*** Adiciona parede superior **/
    var paredeSuperior = new SpriteEstatico();
    paredeSuperior.x = this.game.width / 2 ;
    paredeSuperior.y = 0;
    paredeSuperior.width = this.game.width + 2;
    paredeSuperior.height= 3;
    paredeSuperior.color = '#069';
    paredeSuperior.tag   = 'parede';
    this.spritesEstaticos.push(paredeSuperior);

    /*** Adiciona parede superior **/
    var paredeInferior = new SpriteEstatico();
    paredeInferior.x = this.game.width / 2;
    paredeInferior.y = this.game.height;
    paredeInferior.width = this.game.width + 2;
    paredeInferior.height= 3 ;
    paredeInferior.color = '#069';
    paredeInferior.tag   = 'parede';
    this.spritesEstaticos.push(paredeInferior);

    for(var i = 0; i < this.quantidade_obstaculo; i++){
        var obstaculoStatico = new SpriteEstatico();
        obstaculoStatico.x = this.plataforma_origem.width + (Math.random() * (this.game.width - this.plataforma_origem.width - this.plataforma_destino.width));
        obstaculoStatico.y = this.game.height * Math.random();
        obstaculoStatico.width = 20;
        obstaculoStatico.height= 20;
        obstaculoStatico.color = 'green';
        obstaculoStatico.tag = 'obstaculo';
        obstaculoStatico.angulo = 30;
        this.spritesEstaticos.push(obstaculoStatico);
    }
}

Level.prototype.updateLevel = function ()
{
    /*** Barra de combustivel **/
    var barraFuel = new SpriteEstatico();
    barraFuel.color = 'red';
    barraFuel.x = 490;
    barraFuel.y = 15;
    barraFuel.strokeStyle = '#fff';
    barraFuel.width = this.player.fuel * 2;
    barraFuel.height = 10;
    this.spritesEstaticos.push(barraFuel);

    /*** Display combustivel do player ***/
    var fuelPlayer = new SpriteText();
    fuelPlayer.value = this.player.fuel.toFixed(0) +" %";
    fuelPlayer.posicao_x = 540;
    fuelPlayer.posicao_y = 40;
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

        if(objetoEstatico.tag === 'obstaculo'){
            objetoEstatico.angulo += 30;
            (function(level, player, objetoEstatico){
                level.verificaColisao(player, objetoEstatico, function (player, objeto) {
                    /*** Finaliza o jogo **/
                    if(player.fuel > 0){
                        player.fuel -= 5;
                    }
                });
            })(this,this.player, objetoEstatico);
        }

        objetoEstatico.desenhar(this.contexto);
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

    this.updateLevel();
}

Level.prototype.verificaColisao  = function(objeto1, objeto2, callback){
    if(objeto1.x + (objeto1.width / 2) < objeto2.x - (objeto2.width / 2))  return false;
    if(objeto1.x - (objeto1.width / 2) > objeto2.x + (objeto2.width / 2))  return false;
    if(objeto1.y + (objeto1.height/ 2) < objeto2.y - (objeto2.height / 2)) return false;
    if(objeto1.y - (objeto1.height/ 2) > objeto2.y + (objeto2.height/2)) return false;
    callback(objeto1, objeto2);
}