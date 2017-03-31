





// Берем существующий объект из пространства имен или получаем пустой (В данном случае точно пустой получим)
var BirdGame = BirdGame || {};
// Создаем game instance
var g = new Phaser.Game(window.innerWidth, window.innerHeight,Phaser.AUTO,'game');



var breadparts = 4;
getBreadCount = function(){
    return breadparts;
};


// Добавляем состояний
//g.state.add('Boot', BirdGame.BootState);
//g.state.add('LoadObjects', BirdGame.LoadObjectsState);
//g.state.add('LoadUi', BirdGame.LoadUiState);
g.state.add('Gameplay', BirdGame.GameplayState);
// Загружаем состояние
g.state.start('Gameplay');
/*

 http://localhost/PhaserProjects/BirdGame/index.html

 */