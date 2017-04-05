




function GameManager(){

    const GAME_OVER = 0;
    const START = 1;

    var status = GAME_OVER;
    var score = 0;

    var breadparts;

    var spawnloop;

    this.startComics = function(){

    };

    this.start = function(){
        // Повторение enemies.push каждую секунду
        spawnloop = g.time.events.loop(Phaser.Timer.SECOND, gameObject.enemies.deploy, this);

        breadparts = 4;
        gameObject.bread.restore();

        score = 0;

        ui.showGame();
        status = START;

        input.setCurrAction(gameObject.bird.jumpTo);

    };

    this.gameover = function(){
        g.time.events.remove(spawnloop);
        gameObject.enemies.undeployAll();

        ui.setLeadScore(score);
        ui.showLead();

        status = GAME_OVER;

        input.setCurrAction(this.start);
    };

    this.decreaseBread = function(){
        breadparts -= 1;
        gameObject.bread.setFrame(4 - breadparts);
        if(breadparts<=0){
            this.gameover();
        }
    };

    this.addScore = function(value){
        score += value;
        ui.updateScore(score);
    }

}