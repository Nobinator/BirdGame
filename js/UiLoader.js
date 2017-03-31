/**
 * Created by Nobinator on 31.03.2017.
 */
var BirdGame = BirdGame || {};


var ui = {};

function loadUI(){

        ui.breadtext = g.add.text(16, 48,'Bread parts : '+breadparts, { fill: '#000000' });

        ui.tlb = g.add.button(80, g.world.centerY - 80, 'button', ui.click, this);
        ui.tlb.id = 0;
        ui.tlb.anchor.setTo(0.5);

        ui.trb = g.add.button(g.world.width -80, g.world.centerY - 80, 'button', ui.click, this);
        ui.trb.id = 1;
        ui.trb.anchor.setTo(0.5);

        ui.blb = g.add.button(80, g.world.centerY + 80, 'button', ui.click, this);
        ui.blb.id = 2;
        ui.blb.anchor.setTo(0.5);

        ui.brb = g.add.button(g.world.width -80, g.world.centerY + 80, 'button', ui.click, this);
        ui.brb.id = 3;
        ui.brb.anchor.setTo(0.5);

}

ui.click = function(button){
    console.log('Button click : ' + button.id);
    bird.jumpTo(button.id);
};
