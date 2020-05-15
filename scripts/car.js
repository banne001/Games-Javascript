class Car{
    constructor(carImage, x,y, LorR){
        this.carImage = carImage;
        this.x = x;
        this.y = y;
        this.goingLeft = LorR;
    }
    update(){
        
        if(this.goingLeft){ 
            if(this.x == 0){
                this.x= 625;
            }
            this.x-=25;
        }
        else {
            if(this.x == 600){
                this.x = -25;
            }
            this.x+=25;
        }
    }
}