CANVAS_HEIGHT = 640;
CANVAS_WIDTH = 800;

var socket = io.connect("http://76.28.150.193:8888");



var ASSET_MANAGER = new AssetManager();

// ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
ASSET_MANAGER.queueDownload("./img/black.png");
// ASSET_MANAGER.queueDownload("./img/white.png");

window.onload = function(){
    ASSET_MANAGER.downloadAll(function () {
        var canvas = document.getElementById('gameWorld');
        var ctx = canvas.getContext('2d');
        var gameEngine = new GameEngine();
        gameEngine.init(ctx);

        gameEngine.start();
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


        var STUDENT_NAME ="Michael Ford";
        var STATE_NAME= "entityData";
        document.getElementById("save").onclick = function (e) {
            e.preventDefault();
            console.log("doing that save thing");
            var ents = gameEngine.entities;
            var stateToSave = {studentName: STUDENT_NAME, stateName:STATE_NAME, gameState: []};
            for(var i = 0; i< ents.length; i++){
                var ent = ents[i];
                if(ent instanceof Circle){
                    stateToSave.gameState.push({type:"circle", x: ent.x, y:ent.y, color: ent.color,
                        velocityX : ent.velocity.x, velocityY: ent.velocity.y});
                    console.log("Pushing Circle");
                }

                if(ent instanceof Rectangle){
                    stateToSave.gameState.push({type:"rectangle", x: ent.x, y: ent.y, width: ent.width,
                        height: ent.height, color:ent.color});
                    console.log("Pushing rectangle");
                }
            }
            // for(var i = 0; i< stateToSave.gameState.length; i++){
            //     console.log(stateToSave.gameState[i]);
            // }
            console.log(socket.emit("save", stateToSave));


        };

        document.getElementById("load").onclick = function (e) {
            e.preventDefault();
            console.log("Load it back in!");
            console.log(socket.emit("load", {studentName: STUDENT_NAME, stateName: STATE_NAME}));

        };

        // document.getElementById("pause").onclick = function(e){
        //     e.preventDefault();
        //     console.log("PAUSE");
        //     var ents = gameEngine.entities;
        //     for(var i = 0; i< ents.length; i++){
        //         // if(ents[i] instanceof Circle){
        //         //     ents[i].move = false;
        //         // }
        //     }
        // };

        // document.getElementById("play").onclick = function (e) {
        //     e.preventDefault();
        //     console.log("PLAY");
        // };
        socket.on("load", function (data) {

            console.log(data.gameState);
            gameEngine.entities = [];
            gameEngine.addEntity(bg);
            var ents = data.gameState;
            for(var i = 0; i<ents.length; i++){
                var ent = ents[i];
                if(ent.type==="circle"){
                    var circle = new Circle(gameEngine);
                    circle.x = ent.x;
                    circle.y = ent.y;
                    circle.velocity.x = ent.velocityX;
                    circle.velocity.y = ent.velocityY;
                    circle.color = ent.color;
                    gameEngine.entities.push(circle);
                }

                if(ent.type==="rectangle"){
                    var rect = new Rectangle(gameEngine, ent.x, ent.y, ent.width, ent.height);
                    rect.color = ent.color;
                    gameEngine.entities.push(rect);
                }
            }
        });
    });
};


