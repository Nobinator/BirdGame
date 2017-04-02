
function Ui(){

    // public methods
    this.showGame = function(){
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
    this.setScore = function(score){
        //TODO stub
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
        buttonPad = (function (action) {
            var w = g.world.width;
            var h = g.world.height;

            var bpm = [

                {x: w * (1 / 8), y: h * (7.5 / 10)},
                {x: w * (7 / 8), y: h * (7.5 / 10)},
                {x: w * (1 / 8), y: h * (9 / 10)},
                {x: w * (7 / 8), y: h * (9 / 10)}
            ];

            var tlb = g.add.button(bpm[0].x, bpm[0].y, 'button', action, this);
            tlb.id = 0;
            tlb.anchor.setTo(0.5);

            var trb = g.add.button(bpm[1].x, bpm[1].y, 'button', action, this);
            trb.id = 1;
            trb.anchor.setTo(0.5);

            var blb = g.add.button(bpm[2].x, bpm[2].y, 'button', action, this);
            blb.id = 2;
            blb.anchor.setTo(0.5);

            var brb = g.add.button(bpm[3].x, bpm[3].y, 'button', action, this);
            brb.id = 3;
            brb.anchor.setTo(0.5);

            return [tlb, trb, blb, brb];
        }());
    }


    //loadGoogleFonts
    g.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    // private methods
    var show = function(panel){
        if(currpanel !== undefined)
            currpanel.forEach(function(item){
                item.visible = false;
            });
        panel.forEach(function(item){
            item.visible = true;
        });
        currpanel = panel;

    };

    //private fields
    var gamePanel,leadPanel,buttonPad;

}

function updateFont(){
    Ui.updateFont();
}

