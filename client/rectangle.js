function Rectangle(game, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    var i = Math.floor((Math.random() * 6));
    var j = Math.floor((Math.random() * 6));
    this.color = 'rgb(' + Math.floor(255-42.5 * i) + ',' +
        Math.floor(255-42.5* j) + ',0)';
    this.radius = (height/2);
    this.game = game;
    Entity.call(this, game, this.x, this.y);
    this.velocity = 0;
}

Rectangle.prototype = new Entity();
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.update = function () {
    Entity.prototype.update.call(this);
};
Rectangle.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
};
