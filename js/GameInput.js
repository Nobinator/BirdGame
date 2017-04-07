/**
 * Created by Nobinator on 03.04.2017.
 */

function GameInput(){




    this.click = function(id){
        currAction(id);
        console.log('click');
    };

    this.bclick = function(button){
        currAction(button.id);
        console.log('bclick');
    };

    this.handleI = function(){
        if (g.input.keyboard.justPressed(Phaser.Keyboard.Q)){
            //top-left
            this.click(0);

        } else if (g.input.keyboard.justPressed(Phaser.Keyboard.E)){
            //top - right
            this.click(1);
        } else if (g.input.keyboard.justPressed(Phaser.Keyboard.A)){
            //bot-left
            this.click(2);

        } else if (g.input.keyboard.justPressed(Phaser.Keyboard.D)){
            //bottom-right
            this.click(3);

        }
    };

    this.setCurrAction = function(action){
        currAction = action;
        //console.log('Input action : ',currAction);
    };

    this.getCurrAction = function(){return currAction;};

    var currAction;





}