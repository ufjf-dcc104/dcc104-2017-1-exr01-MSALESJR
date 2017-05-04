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
    this.quantidade_obstaculo = 10;

    /** Array de variaveis **/
    this.variaveis = [];

    this.time = 0;

    this.time_tiro = 1;
    this.tempo_ente_tiro = 0.200;
    this.pode_atirar = true;
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
    /*** Seta variaveis iniciais **/
    this.variaveis['vidas'] = 3;
    this.variaveis['energia'] = 100;
    this.variaveis['pontos']  = 0;

    /*** Instanciando o player **/
    this.player = new Player();
    this.player.x = this.game.width / 2;
    this.player.y = 450;
    this.player.width  = 50;
    this.player.height = 50;
    this.player.gravidade = 0;

    /*** Display Label Vida **/
    var lblVida = new SpriteText();
    lblVida.value = 'Vida : ' + this.variaveis['vidas'];
    lblVida.posicao_x = 15;
    lblVida.posicao_y = 25;
    lblVida.tag = 'vidas';
    this.spritesEstaticos.push(lblVida);

    /*** Display Label Pontos **/
    var lblPontos = new SpriteText();
    lblPontos.value = 'Pontos : ' + this.variaveis['pontos'];
    lblPontos.posicao_x = 100;
    lblPontos.posicao_y = 25;
    lblPontos.tag = 'pontos';
    this.spritesEstaticos.push(lblPontos);
}

Level.prototype.updateLevel = function (dt)
{
    this.time = this.time + dt;
    this.time_tiro = this.time_tiro + dt;

    /*** Desenha os elementos staticos na tela **/
    for(var i = 0; i < this.spritesEstaticos.length; i++){
        var elementoEstatico = this.spritesEstaticos[i];
        if(elementoEstatico.tag === 'vidas'){
            elementoEstatico.value = 'Vida : ' + this.variaveis['vidas'];
        }else if(elementoEstatico.tag === 'pontos'){
            elementoEstatico.value = 'Pontos : ' + this.variaveis['pontos'];
        }
        elementoEstatico.desenhar(this.contexto);
    }

    /*** Desenha os elementos dinamicos na tela **/
    for(var i = 0; i < this.spritesDinamicos.length; i++){
        var elementoDinamico = this.spritesDinamicos[i];

        if(elementoDinamico.y > elementoDinamico.height + this.game.height){
            this.spritesDinamicos.splice(i,1);
            elementoDinamico = null;
        }else if(elementoDinamico.y < -elementoDinamico.height){
            this.spritesDinamicos.splice(i,1);
            elementoDinamico = null;
        }else{
            if(elementoDinamico.tag === 'tiro'){
                for(var j = 0; j < this.spritesDinamicos.length; j++){
                    if(this.spritesDinamicos[j].tag !== 'tiro'){
                        var inimigo = this.spritesDinamicos[j];
                        this.verificaColisao(this, elementoDinamico, inimigo, function(level, tiro, inimigo){
                            tiro.y = -100;
                            inimigo.y = -100;
                            level.variaveis['pontos'] += 5;
                        });
                    }
                }
            }else {
                for(var j = 0; j < this.spritesDinamicos.length; j++){
                    if(this.spritesDinamicos[j].tag !== 'tiro'){
                        var inimigo = this.spritesDinamicos[j];
                        this.verificaColisao(this, this.player, elementoDinamico, function(level, player, inimigo){
                            level.variaveis['vidas']  -= 1;
                            inimigo.y = level.game.height + inimigo.height;
                        });
                    }
                }
            }
            elementoDinamico.mover(dt);
            elementoDinamico.desenhar(this.contexto);
        }
    }

    if(this.time >= 2.5){
        /*** Instanciando o player **/
        var inimigo = new Player();
        var x_random = Math.random() * this.game.width;
        inimigo.x = x_random;
        inimigo.y = -20;
        inimigo.width  = 50;
        inimigo.height = 50;
        inimigo.angulo = 360;
        inimigo.gravidade = 10;
        inimigo.velocidade_y = 30;
        this.spritesDinamicos.push(inimigo);
        this.time = 0;
    }
    if(this.time_tiro >= this.tempo_ente_tiro){
        this.pode_atirar = true;
        this.time_tiro = 0;
    }
}

Level.prototype.desenhar = function (dt)
{
    /*** Desenha e exibi o nome do player **/
    this.player.mover(dt);
    this.player.desenhar(this.contexto);
    this.updateLevel(dt);
}

Level.prototype.verificaColisao  = function(level, objeto1, objeto2, callback){
    if(objeto1.x + (objeto1.width / 2) < objeto2.x - (objeto2.width / 2))  return false;
    if(objeto1.x - (objeto1.width / 2) > objeto2.x + (objeto2.width / 2))  return false;
    if(objeto1.y + (objeto1.height/ 2) < objeto2.y - (objeto2.height / 2)) return false;
    if(objeto1.y - (objeto1.height/ 2) > objeto2.y + (objeto2.height/2)) return false;
    callback(level, objeto1, objeto2);
}