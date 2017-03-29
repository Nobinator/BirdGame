



/*
* Базовые навыки
*   Загрузка изображений
*   Отрисовка, вращение, увеличение/уменьшение спрайтов
*   Вывод текста
*   Ввод с клавиатуры
*   Ввод с кнопок на экране
*
*
*/

var game = new Phaser.Game(800,600,Phaser.AUTO,'game',{preload: preload,create: create,update: update});

var box,red;

function preload() {
    // Загрузка изображения в рабочую область
    game.load.image("box", "assets/CrateWood.png");
    game.load.image("red", "assets/CrateRed.png");
    game.load.image("btn", "assets/ButtonUp.png");
}

function create() {

    // Добавление изображения как спрайта на поле в координатах 0,0 считая от левого верхнего угла.
    game.add.sprite(0,0,'box');

    box = game.add.sprite(game.world.centerX,game.world.centerY,'box');
    // Anchor - установка центра спрайта (аля origin в libgdx)
    box.anchor.setTo(0.5);

    // Scale объекта
    box.scale.setTo(2,2);

    // Разрешить влияние на спрайт путем ввода
    box.inputEnabled = true;
    // Разрешить перетаскивание
    box.input.enableDrag();

    red = game.add.sprite(100,100,'red');
    red.anchor.setTo(0.5);
    // Поворот спрайта в градусах
    red.angle = 45;

    //  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.
    //  These are all Phaser.Key objects, so anything you can do with a Key object you can do with these.
    cursors = game.input.keyboard.createCursorKeys();

    // Зададим большие размеры мира, чтобы камера могла по нему перемещаться
    game.world.setBounds(-1000, -1000, 2000, 2000);


    var text = game.add.text(32, 32, 'Text >> Cursors to move. Shift + Up / Down to Rotate World', { fill: '#ffffff' });


    var action = function(){
        console.log('Click!');
        box.scale.setTo(box.scale.x,-box.scale.y);
    };

    var button = game.add.button(200, 200, 'btn', action, this, 0, 0, 0,0);
    button.anchor.setTo(0.5);

    // Ограничивает количество касаний до 1 за раз. Странно, кнопка срабатывает дважды, если исключить эту конструкцию
    game.input.maxPointers = 1;

    // Дополнительные действия кнопки
    //button.onInputOver.add(function(){console.log('Over')}, this);
    //button.onInputOut.add(function(){console.log('Out')}, this);
    //button.onInputUp.add(function(){console.log('Up')}, this);

}

function update() {

    red.angle += 0.5;

    // Проверка на нажатие клавиши с клавиатуры
    if (game.input.keyboard.isDown(Phaser.Keyboard.R)){
        red.angle -= 1.5;
    }

    //  For example this checks if the up or down keys are pressed and moves the camera accordingly.
    if (cursors.up.isDown) {
        //  If the shift key is also pressed then the world is rotated
        if (cursors.up.shiftKey) {
            game.world.rotation += 0.05;
        } else {
            game.camera.y -= 4;
        }
    } else if (cursors.down.isDown) {
        if (cursors.down.shiftKey) {
            game.world.rotation -= 0.05;
        } else {
            game.camera.y += 4;
        }
    }

    if (cursors.left.isDown) {
        game.camera.x -= 4;
    } else if (cursors.right.isDown) {
        game.camera.x += 4;
    }

}














