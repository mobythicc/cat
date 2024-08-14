const fishContainer = document.getElementById('fish-container');
const bubblesContainer = document.getElementById('bubbles');

const fishEmojis = ['🐟', '🐠', '🐡', '🐬', '🐳'];
const fishNames = ['Nemo', 'Dory', 'Marlin', 'Bubbles', 'Bruce', 'Coral', 'Finn', 'Gill', 'Splash', 'Sunny'];
const numFish = 10;

// Create fish
for (let i = 0; i < numFish; i++) {
    const fish = document.createElement('div');
    fish.className = 'fish';
    fish.textContent = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
    fish.style.top = `${Math.random() * 80 + 10}%`;
    fish.style.animationDuration = `${Math.random() * 5 + 5}s`;
    
    const name = document.createElement('span');
    name.style.fontSize = '0.5rem';
    name.style.marginLeft = '5px';
    name.style.color = 'white';
    name.textContent = fishNames[Math.floor(Math.random() * fishNames.length)];
    
    fish.appendChild(name);
    fishContainer.appendChild(fish);
}

// Create bubbles
setInterval(() => {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.width = `${Math.random() * 20 + 5}px`;
    bubble.style.height = bubble.style.width;
    bubble.style.animationDuration = `${Math.random() * 5 + 3}s`;
    bubblesContainer.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, 8000);
}, 1000);
// Drop food on click
document.getElementById('tank').addEventListener('click', (event) => {
    const food = document.createElement('div');
    food.className = 'food';
    food.style.left = `${event.clientX}px`;
    food.style.top = `${event.clientY}px`;
    document.getElementById('tank').appendChild(food);

    // Make fish swim to food
    const fishes = document.querySelectorAll('.fish');
    fishes.forEach(fish => {
        const fishRect = fish.getBoundingClientRect();
        const angle = Math.atan2(event.clientY - fishRect.top, event.clientX - fishRect.left);
        fish.style.transform = `rotate(${angle}rad)`;
        fish.style.animation = 'none'; // Stop swimming animation
        
        setTimeout(() => {
            fish.style.animation = ''; // Restart swimming animation
        }, 2000);
    });

    setTimeout(() => {
        food.remove();
    }, 3000);
});
