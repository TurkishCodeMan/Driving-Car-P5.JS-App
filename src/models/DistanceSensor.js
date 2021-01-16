export default class DistanceSensor {
    maxDistance = 150;

    getRadian(angle) {
        return (angle * Math.PI) / 180;
    }

    //Çarpışma Noktasını Bul Git yda gitme araçtan başlayıp ileri doğru
    findInterSection(worldPixels, carX, carY, targetX, targetY, carAngle) {

        const pixel = worldPixels[Math.floor(targetY) * 640 + Math.floor(targetX)]//=>worldpixels[10]
        if (pixel && pixel[0] !== 0) {
            const centerX = carX + (targetX - carX) / 2;
            const centerY = carY + (targetY - carY) / 2;
            return this.findInterSection(worldPixels,
                carX + 1 ,
                carY + 1 ,
                centerX,
                centerY,
                carAngle)
        }
        return [carX, carY]
    }

    getValue(worldPixels, carX, carY, carAngle) { //Eğer yolda bişey varsa 0 yoksa 1 üretecek
        //Çizgi ucunun değdiği yer
        const targetX = carX +
            this.maxDistance * Math.cos(this.getRadian(carAngle));
        const targetY = carY +
            this.maxDistance * Math.sin(this.getRadian(carAngle));

        if (worldPixels) {
            const [foundX, foundY] = this.findInterSection(worldPixels, carX, carY, targetX, targetY, carAngle);
            console.log(Math.sqrt(Math.pow((carX - foundX), 2) + Math.pow((carY - foundY), 2) / this.maxDistance))//İki nokta arası uzaklık
        }

        return 0;
    }

}