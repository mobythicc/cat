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
            console.log(`Drawing fish at (${this.x}, ${this.y}) with size ${this.size} and color ${this.color}`);
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

    class Decoration {
        constructor(x, y, type) {
            this.x = x;
            this.y = y;
            this.type = type;
        }

        draw() {
            if (this.type === 'seaweed') {
                ctx.fillStyle = 'green';
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                for (let i = 0; i < 5; i++) {
                    ctx.quadraticCurveTo(this.x - 10, this.y - 20, this.x, this.y - 40);
                    ctx.quadraticCurveTo(this.x + 10, this.y - 20, this.x, this.y);
                    this.y -= 40;
                }
                ctx.fill();
            } else if (this.type === 'rock') {
                ctx.fillStyle = 'gray';
                ctx.beginPath();
                ctx.ellipse(this.x, this.y, 30, 20, 0, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }

    const fishes = Array.from({ length: 10 }, () => new Fish());
    const decorations = [
        new Decoration(100, fishTankHeight - 50, 'seaweed'),
        new Decoration(300, fishTankHeight - 30, 'rock'),
        new Decoration(500, fishTankHeight - 50, 'seaweed'),
        new Decoration(700, fishTankHeight - 30, 'rock')
    ];

    function createBubble(x, y) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();
        setTimeout(() => {
            ctx.clearRect(x - 10, y - 10, 20, 20);
        }, 2000);
    }

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createBubble(x, y);
    });

    function animate() {
        ctx.clearRect(0, 0, fishTankWidth, fishTankHeight);
        decorations.forEach(deco => deco.draw());
        fishes.forEach(fish => {
            fish.move();
            fish.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
});

