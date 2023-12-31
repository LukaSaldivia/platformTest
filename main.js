const G = 9.81;

let c = document.querySelector('#c');
let ctx = c.getContext('2d');

// const WKey = document.querySelector('#WKey')
// const AKey = document.querySelector('#AKey')
// const SKey = document.querySelector('#SKey')
// const DKey = document.querySelector('#DKey')
// const RKey = document.querySelector('#RKey')
// const isOnAirLight = document.querySelector('#isOnAirLight')

class Suelo{
    constructor(xpos, ypos, largo){
        this.xpos = xpos
        this.ypos = ypos
        this.largo = largo
        this.alto = 15
        this.color = '#aaa'
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.fillRect(this.xpos, this.ypos, this.largo, this.alto)
    }

    update(ctx){
        this.draw(ctx)
    }

}

let suelos = [
    new Suelo(0, 500, 500),
    new Suelo(400, 400, 100),
    new Suelo(200, 250, 100),
    new Suelo(200, 100, 500),
]

let sizes = {
    w: 650,
    h: 550
}

c.width = sizes.w;
c.height = sizes.h;

ctx.imageSmoothingEnabled = false;

class Fisico{
    constructor(xpos, ypos){
        // Basics
        this.xpos = xpos
        this.ypos = ypos
        this.largo = 50
        this.color = '#F0F00000'
        
        this.speed = 5
        this.jumpForce = 22

        this.mass = 15;

        this.xd = 0

        this.yi = this.ypos
        this.yf = 0
        this.yd = 0

        this.isOnAir = false

    }
    
    draw(ctx){

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.fillRect(this.xpos, this.ypos, this.largo, this.largo)
    }
    
    update(ctx){

            this.move()
            this.canJump()
            this.jump()
            
            this.ypos += this.yd
            this.xpos += this.xd
    
            if(this.isOnAir){
                this.yd += this.mass/G
            }
            this.collisionSuelo()


            this.draw(ctx);


        }
    jump() {
        if(playerYmovement[playerYmovement.length-1] == 'up'){
            if (!this.isOnAir) {
                this.yd -= this.jumpForce+this.yd;
                playerSprite.play('character/jump_8.png',7,100)
            }
          }
        if(playerYmovement[playerYmovement.length-1] == 'down'){
            this.isOnAir = true
        }
    }
    move() {
        if(playerXmovement[playerXmovement.length-1] == 'right'){
            this.xd = this.speed;
            playerSprite.flip = false
            if (!this.isOnAir) {
                playerSprite.play('character/run_6.png',6,60)
            }
        }
        if(playerXmovement[playerXmovement.length-1] == 'left'){
            this.xd = -this.speed;
            playerSprite.flip = true
            if (!this.isOnAir) {
                playerSprite.play('character/run_6.png',6,60)
            }
          }
          if(playerXmovement.length == 0 && !this.isOnAir){
            player.xd = 0;
            playerSprite.play('character/idle_4.png',4,150)
          }
    }

    canJump(){
        this.yi = this.yf
        this.yf = this.ypos
        this.isOnAir = this.yi != this.yf
    }

    collisionSuelo(){
        let contador = 0
        let altura = 0

        suelos.forEach( suelo => {
      if(
        this.xpos + this.largo >= suelo.xpos &&
        this.xpos <= suelo.xpos + suelo.largo &&
        this.ypos + this.largo >= suelo.ypos &&
        this.ypos <= suelo.ypos
        
        ){  
            contador++;
            altura = suelo.ypos - this.largo
        }
        })

        if (contador > 0 && playerYmovement[playerYmovement.length-1] != 'down') {
            this.ypos = altura
            this.isOnAir = false
        }else{
            this.isOnAir = true
        }
    }

}



let player = new Fisico(100, 300)
let playerSprite = new SpriteRenderer({
    pos : {
        x : player.xpos,
        y : player.ypos
    },
    crop : {
        width : 32,
        height : 32
    },
    totalFrames : 4,
    scale : {
        x : 2,
        y : 2
    },
    interval : 60
})

playerSprite.spritesPath = ['character/run_6.png','character/jump_8.png','character/idle_4.png']
playerSprite.loadImages()

let playerXmovement = []
let playerYmovement = []





function loop() {
    requestAnimationFrame(loop)


    if (playerSprite.isLoaded()) {
        
    
    ctx.fillStyle = "#002222";
    ctx.fillRect(0,0,c.width,c.height)

    
    
    suelos.forEach(suelo => suelo.update(ctx))
    
    player.update(ctx)

    if(player.isOnAir){
        // isOnAirLight.classList.add('active')
    }else{
        // isOnAirLight.classList.remove('active')
    }

    playerSprite.pos.x = player.xpos - player.largo/8
    playerSprite.pos.y = player.ypos - player.largo/3.5
    playerSprite.update(ctx)
}
}

loop()


document.addEventListener('keydown', (e)=>{
    switch (e.code) {
        case 'KeyA':
            playerXmovement.push('left')
            // AKey.classList.add('active')
            
            break;
        case 'KeyD':
            playerXmovement.push('right')
            // DKey.classList.add('active')
            break;
        case 'KeyW':
            playerYmovement.push('up')
            // WKey.classList.add('active')
            break;
        case 'KeyR':
            player.xpos = 100
            player.ypos = 300
            player.yd = 0
            player.yi = 0
            player.yf = 1
            player.xd = 0
            player.isOnAir = true
            // RKey.classList.add('active')
            // ctx.fillStyle = "#002222";
            // ctx.fillRect(0,0,c.width,c.height)
            break;
            
        case 'KeyS':
            // SKey.classList.add('active')
            playerYmovement.push('down')
            break;
    
        default:
            break;
    }
})

document.addEventListener('keyup', (e)=>{
    switch (e.code) {
        case 'KeyA':
            playerXmovement = playerXmovement.filter(mov => mov != 'left');
            // AKey.classList.remove('active')
            break;
        case 'KeyD':
            playerXmovement = playerXmovement.filter(mov => mov != 'right');
            // DKey.classList.remove('active')
            break;
        case 'KeyW':
            playerYmovement = playerYmovement.filter(mov => mov != 'up');
            // WKey.classList.remove('active')
            break;
        case 'KeyS':
            playerYmovement = playerYmovement.filter(mov => mov != 'down');
            // SKey.classList.remove('active')
            break;

        case 'KeyR':
            // RKey.classList.remove('active')
            break;
    
        default:
            break;
    }
})



