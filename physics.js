var gamemodel = require('./game_model');

Ball = function(){
    var obj = new Object();
    obj.pos = {};
    obj.dir = {};//运动方向
}

BoxCollision = function(){
    var obj = new Object({
        mapSize:{
            width:1280,
            height:720
        },
        block:{
            width:200,
            height:80,
        },
        ball:{
            radius:20
        },
        //抽象坐标转换UI坐标
        transformBlock:function(modelBlock){
            return new {
                x:modelBlock.x * this.widht,
                y:modelBlock.y * this.height,
                width:this.widht,
                height:this.height
            };
        },
        //矩形和圆碰撞
        boxCollisionCircle:function(box,ball){
            return 
                (ball.x - this.ball.radius > box.x) &&
                (ball.x + this.ball.radius < box.x + this.block.widht) &&
                (ball.y - this.ball.radius > box.y) &&
                (ball.y + this.ball.raduis < box.y + box.height)
        },
        //地图和圆碰撞
        mapCollisionCircle: function (ball) {
            return
            (ball.x - this.ball.radius > 0) &&
                (ball.x + this.ball.radius < this.mapSize.widht) &&
                (ball.y - this.ball.radius > 0) &&
                (ball.y + this.ball.raduis < this.mapSize.height)
        },
        //反弹 球 运动方向
        rebound:function(ball){
            //左右墙壁
            if ((ball.x - this.ball.radius == 0) || (ball.x + this.ball.radius == this.mapSize.widht)){
                ball.dir.x = -ball.dir.x;
            }
            //顶部
            if(ball.y + this.ball.raduis == this.mapSize.height){
                ball.dir.y = -ball.dir.y;
            }
            //底部
            if (ball.y - this.ball.radius == 0) {
                this.recoveryBall(ball);
            }
        },
        //回收球
        recoveryBall:function(ball){
            //销毁
        }
    });
    
    
    return obj;
}

console.log(Ball)