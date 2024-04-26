tela.style.height = "100%";
tela.style.width = "100%";
tela.style.backgroundColor = "green";

const player = {
    x:0,
    y:0,
    height: 20,
    width: 10 ,
    speed:2
}

const projectile = {
    x:0,
    y:0,
    height: 2,
    width: 2 ,
    speed:7,
    alive: false,
    isMoving :false,
    updateBulletStartPosition: function(){
        this.x = player.x + player.width;
        this.y = player.y + player.height/2;
    },
    move: function(){
        this.x += this.speed;
        console.log(this.x);
        this.isMoving = true;
        if(this.x > 200){
            this.alive = false;
            this.isMoving = false;
            this.x = 0;
        }

        if(this.x + this.width >= enemy.x && this.x + this.width <= enemy.x + enemy.width){
            if(this.y >= enemy.y && this.y <= enemy.y + enemy.height){
                enemy.alive = false;
                console.log("morreu");
            }
        }
    }
}

const enemy = {
    x:180,
    y:20,
    height: 10,
    width: 10 ,
    alive: true,
}

const context = tela.getContext("2d");

function atualizaTela(keyCode){
    renderPlayer();
    if(enemy.alive){

        if(projectile.isMoving){
            projectile.move();
            renderProjectile();
        }

        renderEnemy();
        moveEnemy();
    }
}

function moveEnemy(){
    if(enemy.y < 120){
        if(enemy.y < 118){
            enemy.y += 3;
        }else{
            enemy.y -= 120;
        }
    }
}

const frames = 1000 / 10;

function renderEnemy() {
    context.fillStyle = "white";
    context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    context.fill();
}

function renderPlayer() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "black";
    context.fillRect(player.x, player.y, player.width, player.height);
    context.fill();
}

function jogar(){

    atualizaTela();
    window.addEventListener("keypress",function (e){
        const keyCode = e.key;
        
        switch(e.key){
            case "a":
                player.x -= player.speed;
                break;
            case "d":
                player.x += player.speed;
                break;
            case "w":
                player.y += -player.speed;
                break;
            case "s":
                player.y += player.speed;
                break;
            case "r":
                shoot();
                break;
        }
        atualizaTela(keyCode);
    })
}
const canvasWidth = 200;

function shoot(){
    projectile.updateBulletStartPosition();
    renderProjectile();
    projectile.move();
}
function renderProjectile() {
    //context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "red";
    context.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);
    context.fill();
}
var sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

setInterval(() => {
    jogar();
}, frames);
