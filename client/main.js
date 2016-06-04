CANVAS_HEIGHT = 640;
CANVAS_WIDTH = 800;

function distance(a, b) {
    var difX = a.x - b.x;
    var difY = a.y - b.y;
    return Math.sqrt(difX * difX + difY * difY);
}

function Background(game) {

    this.x = 0;
    this.y = 0;
    Entity.call(this, game, 0, 0);
    this.game = game;
    this.ctx = game.ctx;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle= "lightBlue";
    ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fill();
    ctx.closePath();
    // Entity.prototype.draw.call(this);
}


var friction = 1;

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
ASSET_MANAGER.queueDownload("./img/black.png");
ASSET_MANAGER.queueDownload("./img/white.png");

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');

    var ctx = canvas.getContext('2d');
    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    gameEngine.addEntity(bg);



    var rect = new Rectangle(gameEngine, 0, 100, 300, 50);
    var rect2 = new Rectangle(gameEngine,200, 300, 400, 50);
    var rect3 = new Rectangle(gameEngine,500, 500, 400, 50);
    var rect4 = new Rectangle(gameEngine, 500, 100, 400, 50);
    var rect5 = new Rectangle(gameEngine, 0, 500, 300, 50);
    var leader = new Circle(gameEngine, true);



    for(var i = 0; i < 2; i++){
        var circle = new Circle(gameEngine);

        gameEngine.addEntity(circle, false);
    }
    gameEngine.addEntity(leader);
    // gameEngine.addEntity(circle);
    gameEngine.addEntity(rect);
    gameEngine.addEntity(rect3);
    gameEngine.addEntity(rect2);
    gameEngine.addEntity(rect4);
    gameEngine.addEntity(rect5);






    var ents = gameEngine.entities;
    var states = [];
    for(var i =0; i< ents.length; i++){
        var ent = ents[i];
        if(ents[i] instanceof Circle){
            var state = {type: "circle",x: ent.x, y: ent.y, color: ent.color};
            states.push(state);
            console.log(states);

            console.log("STATE:");
            console.log(state);
        }
        if(ents[i] instanceof Rectangle){
            var state  = {type: "rectangle",x:ent.x, y: ent.y, width: ent.width, height: ent.height, color: ent.color};
            console.log("STATE:");
            console.log(state);
            states.push(state);
            console.log(states);
        }

    }

    gameEngine.init(ctx);
    gameEngine.start();
});
