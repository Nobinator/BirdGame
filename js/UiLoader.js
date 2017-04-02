
var ui = {};

var currpanel;

var leadPanel;

var gamePanel;



function updFont(){
    leadPanel[1].font = 'Montserrat';
    leadPanel[1].fontSize = 40;
    leadPanel[2].font = 'Montserrat';
    leadPanel[2].fontSize = 32;
    gamePanel[0].font = 'Montserrat';
}

function setScoreText(value){
    console.log('Final score : '+value);
    leadPanel[1].setText('You scored\n\n'+value);
}

function updLead(t){

    leadPanel[2].setText(t);
}

function updScoreText(t){
    gamePanel[0].setText(t);
}

function preloadUI(){+

    //  Load the Google WebFont Loader script
    g.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
}

function loadUI(){

    function addButtons(){

        var w = g.world.width;
        var h = g.world.height;

        var bpm = [

            {x : w*(1/8), y : h*(7.5/10)},
            {x : w*(7/8), y : h*(7.5/10)},
            {x : w*(1/8), y : h*(9/10)},
            {x : w*(7/8), y : h*(9/10)}
        ];

        ui.tlb = g.add.button(bpm[0].x,bpm[0].y, 'button', gameInput.action, this);
        ui.tlb.id = 0;
        ui.tlb.anchor.setTo(0.5);

        ui.trb = g.add.button(bpm[1].x,bpm[1].y, 'button', gameInput.action, this);
        ui.trb.id = 1;
        ui.trb.anchor.setTo(0.5);

        ui.blb = g.add.button(bpm[2].x,bpm[2].y, 'button', gameInput.action, this);
        ui.blb.id = 2;
        ui.blb.anchor.setTo(0.5);

        ui.brb = g.add.button(bpm[3].x,bpm[3].y, 'button', gameInput.action, this);
        ui.brb.id = 3;
        ui.brb.anchor.setTo(0.5);
    }

    function loadLead(){
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
            //boundsAlignH: "center", boundsAlignV: "top"
            align: "center"/*,
             backgroundColor: "#ffff00"*/ };

        var textA = g.add.text(0, 0,'You scored\n\n502', textAstyle);
        textA.anchor.set(0.5,0);
        textA.x = g.world.centerX;
        textA.y = g.world.height*(1/8);


        var textBstyle = {
            font: "32px Arial",
            fill: "#000000",
            wordWrap: true,
            wordWrapWidth: leadback.width};

        var textB = g.add.text(0, 0,'1. Bronydell - 1024\n2. Nobi - 502\n3. Jacksepticeye - 501', textBstyle);
        textB.anchor.set(0.5,0);
        textB.x = g.world.centerX;
        textB.y = g.world.height*(3/8);

        leadPanel = [leadback,textA,textB]
    }

    function loadGame(){

        var scoreTextStyle = {
            font: "72px Arial",
            fill: "#000000",
            wordWrap: true,
            wordWrapWidth: g.world.width};

        var scoreText = g.add.text(0, 0,'0', scoreTextStyle);
        scoreText.anchor.set(0.5,0);
        scoreText.x = g.world.centerX;
        scoreText.y = g.world.height*(1/8);

        gamePanel = [scoreText];
    }


    loadLead();
    loadGame();

    addButtons();

    show(leadPanel);
}



function show(panel){
    if(currpanel !== undefined)
        currpanel.forEach(function(item){
            item.visible = false;
        });
    panel.forEach(function(item){
        item.visible = true;
    });
    currpanel = panel;

}



//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    active: function(){ g.time.events.add(Phaser.Timer.SECOND, updFont, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: { families: ['Montserrat'] }

};
