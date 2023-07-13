// https://craftpix.net/


class SpriteRenderer{
        constructor(attr={
            pos : {
                x : 0,
                y : 0
            },
            crop : {
                width : 0,
                height : 0
            },
            totalFrames : 0,
            scale : {
                x : 1,
                y : 1,
            },
            flip : false,
            interval : 0
        }){
        
            this.pos = attr.pos || { x:0 , y:0 }
            this.pos.x = this.pos.x || 0
            this.pos.y = this.pos.y || 0

            // this.path = attr.path || undefined

            this.crop = attr.crop || { width:0 , height:0 }
            this.crop.width = this.crop.width || 0
            this.crop.height = this.crop.height || 0

            this.totalFrames = attr.totalFrames || 0

            this.scale = attr.scale || { x:1 , y:1 }
            this.scale.x = this.scale.x || 1
            this.scale.y = this.scale.y || 1

            this.flip = attr.flip || false
            this.interval = attr.interval || 0

            this.i = 0
            this.imageSection = 0

            this.image
            // this.image.src = this.path

            this.timer = new Krono({
                output : 1000,
                isBackwards : true,
                initial : this.interval,
                end : true
            })

            this.spriteCanvas = document.createElement('canvas')
            this.spriteCtx = this.spriteCanvas.getContext('2d',{willReadFrequently: true}) 

            this.loadedSprites = []
            this.loadedIndex = undefined;
            // this.loadedSprites.push(this.image)

            this.spritesPath = []



    }

    update(ctx){
        this.timer.start()
        if(this.timer.getTime() == 0){
            this.timer.toInitial()
            this.goToNext()
        }
        this.draw(ctx)
        
    }

    goToNext(){

        this.i = this.i + 1 > this.totalFrames - 1 ? 0 : this.i + 1
    
        this.imageSection = Math.abs(this.i-(this.flip ? this.totalFrames - 1 : 0))




    }

    draw(ctx){

    
                
            
        if (this.loadedSprites[this.loadedIndex].width > 0) {
            
        

            this.spriteCanvas.width = this.loadedSprites[this.loadedIndex].width
            this.spriteCanvas.height = this.loadedSprites[this.loadedIndex].height

            if(this.flip) {
                this.spriteCtx.translate(this.spriteCanvas.width, 0)
                this.spriteCtx.scale(-1,1)
            }


            // this.spriteCtx.drawImage(this.image,0,0);
            this.spriteCtx.drawImage(this.loadedSprites[this.loadedIndex],0,0);
            

            
           

            ctx.drawImage(this.spriteCanvas, this.crop.width*this.imageSection,0,this.crop.width,this.crop.height,this.pos.x,this.pos.y,this.crop.width*this.scale.x,this.crop.height*this.scale.y)
           
        }

    }

    play(path = '', totalFrames = this.totalFrames, interval = this.interval){

        let index = this.loadedSprites.findIndex( img => img.src.replace(document.URL,'') == path)
        let originalIndex = this.loadedIndex
        this.loadedIndex = index
        
        if(this.loadedIndex != originalIndex){
            this.i = 0
            this.imageSection = 0
            this.totalFrames = totalFrames
            this.interval = interval
            this.timer.initial = this.interval
            this.timer.toInitial()
        }

    }

    loadImages(){
        this.spritesPath.forEach(path => {
            this.image = new Image()
            this.image.src = path
            this.loadedSprites.push(this.image)
        })
    }

    isLoaded(){
        return this.loadedSprites.every( img => img.complete)
    }

}

