<template>
  <div class="canvas-container">
    <div id="canvas"></div>
  </div>
</template>

<script>
import p5 from "p5";

export default {
  data() {
    return {
      canvas: undefined,
      p5: undefined,
    };
  },

  methods: {},
  mounted() {
    console.log("ReDRAW Mounted");

    const script = (p5) => {
      // These are your typical setup() and draw() methods

      this.p5 = p5;
      p5.setup = () => {
        p5.createCanvas(640, 480);
        p5.background(255);
      };
      p5.draw = () => {
        p5.noStroke();
        if (p5.mouseIsPressed) {
          p5.fill(0);
          p5.ellipse(p5.mouseX, p5.mouseY, 60, 60);
        }
      };

      p5.keyPressed = () => {
          console.log(p5.keyCode+"-------------")
        if (p5.keyCode == 107) {
          const image1 = p5.get(0, 0, 640, 480);
          image1.loadPixels();
          const px = [];
          console.log("redraw");
          for (let i = 0; i < image1.pixels.length; i += 4) {
            const R = image1.pixels[i];
            const G = image1.pixels[i + 1];
            const B = image1.pixels[i + 2];
            px.push([R, G, B]);
          }

          window.localStorage.setItem("map", JSON.stringify({ values: px }));
        }
      };
    };

    // Attach the canvas to the div
    this.canvas = new p5(script, "canvas");
  },
  beforeDestroy() {
    console.log("Redraw destroyed");
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