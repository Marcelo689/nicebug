tela.style.height = "100%";
tela.style.width = "100%";
tela.style.backgroundColor = "green";

var pontuacao = 0;

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
                atualizaPontuacao();
            }
        }
    }
}

function atualizaPontuacao(){
    contador.innerText = ++pontuacao;
    playExplodeSound();
}

function playSound(caminhoAudio, tempo){
    let audio = new Audio(caminhoAudio);
    audio.loop = true;
    audio.play();
    setTimeout(() => {
        audio.pause();
    }, tempo * 1000);
}

function playExplodeSound(){
    playSound("explode.mp3", 1);
}

const enemy = {
    x:180,
    y:20,
    height: 10,
    width: 10 ,
    alive: true,
    resetaInimigo:function(){
        this.x = 180;
        this.y = 20;
        this.alive = true;
    }
}

const context = tela.getContext("2d");

function atualizaTela(){
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

    if(enemy.alive == false){
        enemy.resetaInimigo();
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
        
        switch(keyCode){
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
        renderPlayer();
    })
}
const canvasWidth = 200;

function shoot(){
    projectile.updateBulletStartPosition();
    projectile.move();
    playSound("blaster.mp3",1);
}
function renderProjectile() {
    context.fillStyle = "red";
    context.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);
    context.fill();
}

setInterval(() => {
    jogar();
}, frames);
