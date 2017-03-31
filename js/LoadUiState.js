/**
 * Created by Nobinator on 31.03.2017.
 */
var BirdGame = BirdGame || {};


var ui = {};

uibang = function(){

        console.log('Lui cre');

        ui.breadtext = g.add.text(16, 48,'Bread parts : '+getBreadCount(), { fill: '#000000' });

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

        //TODO ui.click сделать


        //g.state.start('Gameplay');

    };