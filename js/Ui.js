
function Ui(){

    // public methods
    this.showGame = function(){
        console.log('showGame',gamePanel);
        show(gamePanel);
    };
    this.showLead = function(){
        show(leadPanel);
    };
    this.updateFont = function(){
        leadPanel[1].font = 'Montserrat';
        leadPanel[1].fontSize = 40;
        leadPanel[2].font = 'Montserrat';
        leadPanel[2].fontSize = 32;
        gamePanel[0].font = 'Montserrat';
    };
    this.updateScore = function(value){
        gamePanel[0].setText(value);
    };

    this.setLeadScore = function(value){
        leadPanel[1].setText(value);
    };

    this.loadUi = function() {
        gamePanel = (function () {
            var scoreTextStyle = {
                font: "72px Arial",
                fill: "#000000",
                wordWrap: true,
                wordWrapWidth: g.world.width
            };

            var scoreText = g.add.text(0, 0, '0', scoreTextStyle);
            scoreText.anchor.set(0.5, 0);
            scoreText.x = g.world.centerX;
            scoreText.y = g.world.height * (1 / 8);

            return [scoreText];
        }());
        leadPanel = (function () {
            var graphics = g.add.graphics(0, 0);
            graphics.beginFill(0xDADADA);
            graphics.drawRect(0, 0, g.world.width, g.world.height);
            var leadback = g.add.sprite(0, 0, graphics.generateTexture());
            graphics.destroy();

            var textAstyle = {
                font: "40px Arial",
                fill: "#000000",
                wordWrap: true,
                wordWrapWidth: leadback.width,
                align: "center"
            };
            var textA = g.add.text(0, 0, 'You scored\n\n502', textAstyle);
            textA.anchor.set(0.5, 0);
            textA.x = g.world.centerX;
            textA.y = g.world.height * (1 / 8);

            var textBstyle = {
                font: "32px Arial",
                fill: "#000000",
                wordWrap: true,
                wordWrapWidth: leadback.width
            };
            var textB = g.add.text(0, 0, '1. Bronydell - 1024\n2. Nobi - 502\n3. Jacksepticeye - 501', textBstyle);
            textB.anchor.set(0.5, 0);
            textB.x = g.world.centerX;
            textB.y = g.world.height * (3 / 8);

            return [leadback, textA, textB]
        }());
        buttonPad = (function () {
            var w = g.world.width;
            var h = g.world.height;

            var bpm = [
                {x: w * (1 / 8), y: h * (7.5 / 10)},
                {x: w * (7 / 8), y: h * (7.5 / 10)},
                {x: w * (1 / 8), y: h * (9 / 10)},
                {x: w * (7 / 8), y: h * (9 / 10)}
            ];
            var Button = function(id){
                var b = g.add.button(bpm[id].x, bpm[id].y, 'button', input.bclick, this);
                b.id = id;
                b.anchor.setTo(0.5);
                b.scale.setTo(0.8);
                return b;
            };

            return [new Button(0),new Button(1),new Button(2),new Button(3)];
        }());
    };

    // private methods
    var show = function(panel){
        if(currPanel !== undefined)
            currPanel.forEach(function(item){
                item.visible = false;
            });
        panel.forEach(function(item){
            item.visible = true;
        });
        currPanel = panel;

    };

    //private fields
    var currPanel,gamePanel,leadPanel,buttonPad;




    //loadGoogleFonts
    g.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

}

function updateFont(){
    Ui.updateFont();
}

