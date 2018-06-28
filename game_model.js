/**
 * 锚点设置左下角(0,0)
 */

Block = function(pos,level){
    var obj = new Object();
    obj.pos = pos;
    obj.num = level;
    obj.type = 'block';
    return obj;
}

Ball = function(pos){
    var obj = new Object();
    obj.pos = pos;
    obj.num = 1;
    obj.type = 'ball';
    return obj;
}

GameModel = function(){
    var obj = new Object();
    obj.ball = 1;
    obj.level = 1;
    obj.col = 5;
    obj.row = 7;
    obj.map = [];
    obj.init = function(){
        for(var i = 0;i<this.col;i++){
            this.map[i] = [];
        }
    }
    //顺序生成行可用位置  0 到 col-1
    obj.getMaxPosXs = function(){
        var posx = [];
        for(var i = 0;i<obj.col;i++){
            posx[i] = i;
        }
        return posx;
    };
    //随机生成砖块和道具
    obj.createNewBlocks = function() {
        var blockCount = parseInt(Math.random() * 10) % ( obj.col - 2) + 1;
        var posxs = obj.getMaxPosXs();
        var currLevelBlocks = [],index = 0,y = this.row-1;
        while(blockCount-- > 0){
            var randIndex = parseInt(Math.random() * 10) % posxs.length;
            var randBlockPos = {
                x : posxs[randIndex],
                y : y
            };
            posxs.splice(randIndex,1);
            currLevelBlocks[index++] = new Block(randBlockPos,obj.level);
        }
        var randIndex = parseInt(Math.random() * 10) % posxs.length;
        var randBallPos = {
            x : posxs[randIndex],
            y : y
        };
        currLevelBlocks[index] = new Ball(randBallPos);
        return currLevelBlocks;
    };
    //添加砖块和道具
    obj.addBlocksToMap = function(blocks){
        obj.map[this.row-1] = blocks;
    };
    //是否失败
    obj.isDead = function(){
        return !this.map[0].length;
    };
    //下一等级
    obj.nextLevel = function(){
        this.level++;
        var newBlocks = this.createNewBlocks();
        obj.addBlocksToMap(newBlocks);
    };
    //整体向下移动一行
    obj.moveDown = function(){
        if(this.map.length < 0) return ;
        for (let i = 0; i < this.map.length; i++) {
            var bottomRow = this.map[i];
            if(!bottomRow.length) continue;
            this.map[i-1] = bottomRow;
        }
        //移除最顶行
        this.map.splice(this.map.length - 1,1);
    }
    return obj;
};

exports.gamemodel = new GameModel();