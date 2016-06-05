/**
 * Created by Mike on 6/4/16.
 */
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