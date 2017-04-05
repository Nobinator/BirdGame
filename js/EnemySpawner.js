

var START_RATE = 1000; // one per sec
var MAX_RATE = 1000 / 4; // four per sec
var RATE_STEP = 100;

var SPEEDUP_RATE = 5000; // once per 5 sec

function EnemySpawner(enemies){


    var e = enemies;
    var loop,sul;

    this.start = function(){
        // Повторение enemies.push каждую секунду
        loop = g.time.events.loop(START_RATE, deployAnEnemy, this);
        //console.log(loop.timer.duration,loop.delay);
        //loop.delay = -400;
        sul = g.time.events.loop(SPEEDUP_RATE, speedUp, this);
    };

    this.stop = function(){
        g.time.events.remove(loop);
        g.time.events.remove(sul);
    };

    var deployAnEnemy = function(){
        e.deploy();
    };

    var speedUp = function(){

        if(getCurrentSpawnRate===MAX_RATE)
            return;

        loop.delay -= RATE_STEP;
        if(getCurrentSpawnRate()<MAX_RATE){
            loop.delay = MAX_RATE - loop.timer.duration;
        }
        console.log('New Rate : ',getCurrentSpawnRate());
    };

    var getCurrentSpawnRate = function(){
        return loop.timer.duration+loop.delay;
    }



















};