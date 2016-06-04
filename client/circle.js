function Circle(game){

    


    this.radius = 30;
    var randX = Math.floor(Math.random() * (CANVAS_WIDTH - this.radius) + this.radius);
    this.x = randX;
    this.y = -this.radius - 20;
    this.mass = this.radius * 10;
    this.falling = true;
    this.hitWall = false;

    var i = Math.floor((Math.random() * 6));
    var j = Math.floor((Math.random() * 6));
    var k = Math.floor((Math.random() * 6));
    this.color = 'rgb(' + Math.floor(255-42.5 * i) + ',' +
        Math.floor(255-42.5* j) + ','+Math.floor(255-42.5 * k)+ ')';
    console.log(this.color);
    Entity.call(this, game, this.x, this.y);
    this.game = game;
    this.ctx = game.ctx;
    //fall at random speed with mass taken into account
    // var randVelocity = Math.random();
    this.velocity = {y:(0.5 * this.mass), x:0};


}

Circle.prototype = new Entity();
Circle.prototype.constructor = Circle;

Circle.prototype.collideRecSide = function (other) {
    var circleBox = {x: this.x - this.radius, y: this.y - this.radius, width: this.radius*2, height:this.radius*2 };
    var otherBox = {x: otherx, y: other.y, width: other.width, height: other.height};
    //TODO bounce ball off side of rects
    var rightSide = circleBox.x + circleBox.width === otherBox.x && circleBox.y;
    var leftSide = circleBox.x === otherBox.x + otherBox.width;
    // if(this.x){
    //
    // }
};

Circle.prototype.collideRecTop = function (other) {

    var circleBox = {x:this.x - this.radius, y:this.y - this.radius,width:this.radius * 2, height:this.radius * 2};
    // var circleBox = {x:this.x, y:this.y,width:this.radius, height:this.radius}
    var otherBox = {x: other.x, y: other.y, width: other.width, height: other.height}

    // ctx.rect(circleBox.x, circleBox.y, circleBox.width, circleBox.height);
    // ctx.stroke();
    if((circleBox.x < otherBox.x + otherBox.width) && (circleBox.x + circleBox.width > otherBox.x) &&
        (circleBox.y < otherBox.y + otherBox.height) && (circleBox.height + circleBox.y > otherBox.y)){
        return true;
    }else{
        return false;
    }
    // return distance(this, other) < this.radius + other.radius;

};

Circle.prototype.collideBottom = function () {
    return this.y > CANVAS_HEIGHT + this.radius;
};

Circle.prototype.collideLeft = function () {
    return (this.x )< 0;
};

Circle.prototype.collideRight = function (){
    return (this.x + this.radius) > CANVAS_WIDTH;
};



Circle.prototype.draw = function (ctx) {
    ctx.beginPath();

    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    var circleBox = {x:this.x - this.radius, y:this.y - this.radius,width:this.radius * 2, height:this.radius * 2}
    ctx.rect(circleBox.x,circleBox.y, circleBox.width, circleBox.height);
    // ctx.stroke();
    Entity.prototype.draw.call(this);
};

Circle.prototype.update = function () {


    if(this.collideBottom()){
        this.y = -this.radius;

        this.x = Math.floor(Math.random() * (CANVAS_WIDTH - this.radius) + this.radius);

    }



    // for(var i = 0; i< this.game.entities.length; i++){
    //     var ent = this.game.entities[i];
    //     if(this != ent && this.collideRecTop(ent)){
    //         //go right or left
    //         console.log("Contact!");
    //
    //         // this.velocity.y = 0;
    //
    //     };
    // };




    for(var j = 0; j<this.game.entities.length; j++){
        var ent = this.game.entities[j];
        if(this != ent && ent instanceof Rectangle && this.falling){
            this.velocity.x = 0;

            this.velocity.y = (1.2 * this.mass);
        }


    }

    // for(var i = 0; i< this.game.entities.length; i++){
    //     var ent = this.game.entities[i];
    //     if(ent.leader && this !=ent && ent instanceof Circle){
    //         this.seek(ent);
    //     }
    // }

    if(this.collideRight()||this.collideLeft()){
        // console.log("RIGHT OR LEFT");
        this.velocity.x = -this.velocity.x;
        if(this.collideRight()){
            this.hitWall = true;
        }else{
            this.hitWall = false;
        }
    }


    for(var i = 0; i< this.game.entities.length; i++){
        var ent = this.game.entities[i];
        if(this != ent && ent instanceof Rectangle && this.collideRecTop(ent)){
            this.falling = false;

            if(!this.hitWall){
                this.velocity.x = this.mass * 0.8;
            }else{
                this.velocity.x = -(this.mass * 0.8);
            }

            this.velocity.y = 0;
            // console.log(this.game.entities[i].toString());

        }else {
            this.falling = true;
        }


    }





    this.y += this.velocity.y  * this.game.clockTick;
    this.x += this.velocity.x  * this.game.clockTick;
    Entity.prototype.update.call(this);
};

Circle.prototype.seek = function (other) {
    if(this.x > other.x || this.x < other.x){
        this.velocity.x = other.velocity.x;

    }


};

