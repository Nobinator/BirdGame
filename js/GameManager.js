




function GameManager(){

    const GAME_OVER = 0;
    const START = 1;

    var status = GAME_OVER;
    var score = 0;

    var breadparts;

    this.start = function(){

        console.log("Игра начата");

        if(comicsView.isEnabled()){
            comicsView.stop();
        }

        //TODO spawner loop
        enemySpawner.start();

        breadparts = 4;
        gameObject.bread.restore();

        score = 0;

        ui.showGame();
        status = START;

        input.setCurrAction(gameObject.bird.jumpTo);

    };

    this.gameover = function(){

        console.log("Игра закончена");

        // TODO spawner stop loop
        enemySpawner.stop();
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