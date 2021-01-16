<template>
  <div class="canvas-container">
    <div id="canvas"></div>
  </div>
</template>

<script>
import p5 from "p5";
import Car from "../models/Car";
export default {
  data() {
    return {
      car: undefined,
      canvas: undefined,
      image: undefined,
      p5: undefined,
      worldPixels: undefined,
    };
  },

  methods: {
    getRadian(angle) {
      return (angle * Math.PI) / 180;
    },
    createCar(p5) {
      //Create Car
      p5.translate(
        this.car.x + this.car.width / 2,
        this.car.y + this.car.height / 2
      );

      //Rotate Dönüş Açısı
      p5.angleMode(p5.DEGREES);
      p5.rotate(this.car.angle);

      p5.fill(150, 100, 200);
      const carRelativeCenterX = 0 - this.car.width / 2;
      const carRelativeCenterY = 0 - this.car.height / 2;
      p5.rect(
        carRelativeCenterX,
        carRelativeCenterY,
        this.car.width,
        this.car.height
      );
      p5.fill(150, 150, 50);
      p5.rect(carRelativeCenterX + 25, carRelativeCenterY, 13, 23);
      p5.fill(120, 120, 250);
      p5.ellipse(carRelativeCenterX + 45, carRelativeCenterY + 5, 10, 10);
      p5.ellipse(carRelativeCenterX + 45, carRelativeCenterY + 20, 10, 10);

      //Sensör detector

      p5.stroke(255, 0, 0);
      this.car.sensors.map((sensor) => {
        const targetX =
          sensor.maxDistance * Math.cos(this.getRadian(this.car.angle));
        const targetY =
          sensor.maxDistance * Math.sin(this.getRadian(this.car.angle));

        p5.rotate(-this.car.angle); //Rotateyi hizalıyoruz arabayı çevirdikten sonra çizgiyide tersi kadar

        p5.line(0, 0, targetX, targetY);
        p5.stroke(0);
      });
    },
  },
  mounted() {
    console.log("Game Mounted");
    this.car = new Car();
    const script = (p5) => {
      // These are your typical setup() and draw() methods

      this.p5 = p5;

      p5.setup = () => {
        p5.createCanvas(640, 480);
        p5.background(255);
        p5.noStroke();
      };
      p5.draw = () => {
        p5.background(255);

        if (this.image != undefined) {
          p5.image(this.image, 0, 0, 640, 480);
        }

        p5.update();
        this.createCar(p5);
      };

      p5.update = () => {
        if (p5.keyIsDown(87)) {
          this.car.speedUp();
        }
        if (p5.keyIsDown(83)) {
          this.car.speedDown();
        }
        if (p5.keyIsDown(65)) {
          this.car.steerLeft();
        }
        if (p5.keyIsDown(68)) {
          this.car.steerRight();
        }
        this.car.update(this.worldPixels); //Dünyadaki pixelleri araba veriyoruz
      };

      p5.keyPressed = () => {
        if (p5.keyCode == 76) {
          this.worldPixels = JSON.parse(
            window.localStorage.getItem("map")
          ).values;
          console.log(this.worldPixels);
          const image1 = p5.get(0, 0, 640, 480);
          image1.loadPixels();
          for (let i = 0; i < image1.pixels.length; i += 4) {
            const startIndex = Math.floor(i / 4);
            image1.pixels[i] = this.worldPixels[startIndex][0];
            image1.pixels[i + 1] = this.worldPixels[startIndex][1];
            image1.pixels[i + 2] = this.worldPixels[startIndex][2];
            image1.pixels[i + 3] = 255;
          }


          image1.updatePixels();
      
          this.image = image1;
        }
      };
    };

    // Attach the canvas to the div
    this.canvas = new p5(script, "canvas");
    console.log(this.canvas);
  },
  beforeDestroy() {
    console.log("Game destroyed");
    this.canvas = undefined;
    this.p5.remove();
  },
};
</script>

<style scoped>
.canvas-container {
  display: flex;
  background-color: darkgray;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>