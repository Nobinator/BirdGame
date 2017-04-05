
function EnemySpawner(enemies){


    var e = enemies;
    var loop;

    this.start = function(){
        // Повторение enemies.push каждую секунду
        loop = g.time.events.loop(Phaser.Timer.SECOND, e.deploy, this);
    };

    this.stop = function(){
        g.time.events.remove(loop);
    };





















}