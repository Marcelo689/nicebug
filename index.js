tela.style.height = "100%";
tela.style.width = "100%";
tela.style.backgroundColor = "green";

const player = {
    x:0,
    y:0,
    height: 20,
    width: 10 
}

const context = tela.getContext("2d");

function atualizaTela(){
    context.clearRect(0,0, window.innerWidth, window.innerHeight);
    context.fillRect(player.x, player.y, player.width ,player.height);
    context.fill();
}

const frames = 1000 / 120;

function jogar(){
    atualizaTela();
}

async function shoot(){
    var projectile = {
        width:2,
        height:2,
        x:player.x + player.width,
        y:player.y + player.height /2,
        alive:true,
        move: function(){
            if(player.x > window.innerWidth){
                alive = false;
            }
            player.x += 5;
        }
    }

    while(projectile.alive){
        context.clearRect(0,0, window.innerWidth, window.innerHeight);
        context.fillRect(projectile.x, projectile.y, projectile.width , projectile.height);
        context.fill();
        await sleep(frames);
        projectile.move();
    }
}

var sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

mover();
function mover(){
    window.addEventListener("keypress",function (e){
        console.log(e.key);

        switch(e.key){
            case "a":
                player.x -= 10;
                break;
            case "d":
                player.x += +10;
                break;
            case "w":
                player.y += -10;
                break;
            case "s":
                player.y += +10;
                break;
            case "r":
                shoot();
                break;
        }
    })
}

setInterval(() => {
    jogar();
}, frames);
