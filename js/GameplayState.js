/**
 * Created by Nobinator on 31.03.2017.
 */
var BirdGame = BirdGame || {};

BirdGame.GameplayState = {

    preload : function(){

        bobang();
    },

    create : function(){

        bopast();

        ojbang();


        uibang();

        console.log('Gam cre');
        // Повторение enemies.push каждую секунду
        g.time.events.loop(Phaser.Timer.SECOND, enemies.push, this);


    },

    update : function(){


        console.log('Gam upd');

        handleInput();

        // Обработка пересечений bird и enemiesс коллбеком collisionHandler
        g.physics.arcade.overlap(bird, enemies, collisionHandler, null, this);

        enemies.forEach(function(enemy){
            if(enemy.isActive && enemy.y > g.world.height){
                enemy.pop();
            }
        });

    }

};

ui.click = function(button){
    console.log('click : ' + button.id);
    bird.jumpTo(button.id);
};


collisionHandler = function(obj1, obj2){
    //console.log('[ # ] Kicked!');
    obj2.kick();
};

handleInput = function(){

    if (g.input.keyboard.justPressed(Phaser.Keyboard.Q)){
        //top-left
        bird.jumpTo(0);

    } else if (g.input.keyboard.justPressed(Phaser.Keyboard.E)){
        //top - right
        bird.jumpTo(1);
    } else if (g.input.keyboard.justPressed(Phaser.Keyboard.A)){
        //bot-left
        bird.jumpTo(2);

    } else if (g.input.keyboard.justPressed(Phaser.Keyboard.D)){
        //bottom-right
        bird.jumpTo(3);

    }

};

