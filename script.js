document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('fishCanvas');
    const ctx = canvas.getContext('2d');
    const fishTankWidth = canvas.width;
    const fishTankHeight = canvas.height;

    class Fish {
        constructor() {
            this.x = Math.random() * fishTankWidth;
            this.y = Math.random() * fishTankHeight;
            this.speedX = (Math.random() - 0.5) * 4;
            this.speedY = (Math.random() - 0.5) * 4;
            this.size = 20 + Math.random() * 30;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.size, this.size / 2, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.x - this.size, this.y);
            ctx.lineTo(this.x - this.size - 10, this.y - 10);
            ctx.lineTo(this.x - this.size - 10, this.y + 10);
            ctx.closePath();
            ctx.fill();
        }

        move() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x <= 0 || this.x >= fishTankWidth) {
                this.speedX *= -1;
            }
            if (this.y <= 0 || this.y >= fishTankHeight) {
                this.speedY *= -1;
            }
        }
    }

    const fishes = Array.from({ length: 10 }, () => new Fish());

    function animate() {
        ctx.clearRect(0, 0, fishTankWidth, fishTankHeight);
        fishes.forEach(fish => {
            fish.move();
            fish.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
});
