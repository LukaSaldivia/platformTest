const G = 9.81;

let c = document.querySelector('#c');
let ctx = c.getContext('2d');

const WKey = document.querySelector('#WKey')
const AKey = document.querySelector('#AKey')
const DKey = document.querySelector('#DKey')
const RKey = document.querySelector('#RKey')
const isOnAirLight = document.querySelector('#isOnAirLight')

class Suelo{
    constructor(xpos, ypos, largo){
        this.xpos = xpos
        this.ypos = ypos
        this.largo = largo
        this.alto = 20
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
    new Suelo(20, 500, 350),
    new Suelo(400, 400, 100),
    new Suelo(550, 250, 100),
    new Suelo(20, 100, 500),
]





let sizes = {
    w: 650,
    h: 550
}

c.width = sizes.w;
c.height = sizes.h;



class Fisico{
    constructor(xpos, ypos){
        // Basics
        this.xpos = xpos
        this.ypos = ypos
        this.largo = 50
        this.color = '#395'
        
        this.speed = 10;
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
            }
          }
    
    }
    move() {
        if(playerXmovement[playerXmovement.length-1] == 'right'){
            this.xd = this.speed;
          }
          if(playerXmovement[playerXmovement.length-1] == 'left'){
            this.xd = -this.speed;
          }
        
          if(playerXmovement.length == 0){
            player.xd = 0;
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

        if (contador > 0) {
            this.ypos = altura
            this.isOnAir = false
        }else{
            this.isOnAir = true
        }
    }
    






}



let player = new Fisico(100, 300)


let playerXmovement = []
let playerYmovement = []





function loop() {
    requestAnimationFrame(loop)




    ctx.fillStyle = "#00222277";
    ctx.fillRect(0,0,c.width,c.height)

    
    
    suelos.forEach(suelo => suelo.update(ctx))
    
    player.update(ctx)

    if(player.isOnAir){
        isOnAirLight.classList.add('active')
    }else{
        isOnAirLight.classList.remove('active')
    }

    
}

loop()


document.addEventListener('keydown', (e)=>{
    switch (e.code) {
        case 'KeyA':
            playerXmovement.push('left')
            AKey.classList.add('active')
            
            break;
        case 'KeyD':
            playerXmovement.push('right')
            DKey.classList.add('active')
            break;
        case 'KeyW':
            playerYmovement.push('up')
            WKey.classList.add('active')
            break;
        case 'KeyR':
            player.xpos = 100
            player.ypos = 300
            player.yd = 0
            RKey.classList.add('active')
            break;

    
        default:
            break;
    }
})

document.addEventListener('keyup', (e)=>{
    switch (e.code) {
        case 'KeyA':
            playerXmovement = playerXmovement.filter(mov => mov != 'left');
            AKey.classList.remove('active')
            break;
        case 'KeyD':
            playerXmovement = playerXmovement.filter(mov => mov != 'right');
            DKey.classList.remove('active')
            break;
        case 'KeyW':
            playerYmovement = playerYmovement.filter(mov => mov != 'up');
            WKey.classList.remove('active')
            break;

        case 'KeyR':
            RKey.classList.remove('active')
            break;
    
        default:
            break;
    }
})



