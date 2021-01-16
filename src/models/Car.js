import DistanceSensor from "./DistanceSensor";

export default class Car {
    x = 50;
    y = 50;
    width = 40;
    height = 25;
    speed = 0;
    maxSpeed = 5;
    angle = 0;//Açı duruş açısı
    acc = 0.5;

    sensors=[new DistanceSensor()];
 
    speedUp() {

        this.speed = Math.min(this.maxSpeed, this.speed += this.acc)
    }
    speedDown() {
        this.speed = Math.max(0, this.speed -= this.acc)
    }
    steerLeft() {
        this.angle = (this.angle - 1) % 360

    }
    steerRight() {
        this.angle = (this.angle + 1) % 360

    }

    update(worldPixels) {
        
        //Açıyı radyana çevireceğiz
        const radian = this.angle * Math.PI / 180
        this.x += this.speed * Math.cos(radian);
        this.y += this.speed * Math.sin(radian);

        const sensorData=this.collectSensorData(worldPixels);//Bu neural networka verilecek
        console.log(sensorData)
    }

    collectSensorData(worldPixels){
        return this.sensors.map(sensor=>{
            return sensor.getValue(worldPixels,this.x,this.y,this.angle);
        })
    }
}