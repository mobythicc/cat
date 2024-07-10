const popupMessages = [
    {
        title: "Congratulations!",
        content: "You've won a free iPhone! Click here to claim your prize."
    },
    {
        title: "Limited Time Offer!",
        content: "Get 50% off on male performance pills. Buy now!"
    },
    {
        title: "Urgent Message",
        content: "Your computer is infected with a virus. Click here to fix it."
    }
];

function createPopup() {
    const popupContainer = document.getElementById('popup-container');
    const popup = document.createElement('div');
    popup.className = 'popup';

    const randomMessage = popupMessages[Math.floor(Math.random() * popupMessages.length)];
    popup.innerHTML = `
        <div class="title">${randomMessage.title}</div>
        <div class="content">${randomMessage.content}</div>
        <div class="button">Close</div>
    `;

    popup.querySelector('.button').addEventListener('click', () => {
        popup.style.display = 'none';
    });

    popupContainer.appendChild(popup);

    const randomX = Math.floor(Math.random() * (window.innerWidth - 300));
    const randomY = Math.floor(Math.random() * (window.innerHeight - 200));
    popup.style.left = `${randomX}px`;
    popup.style.top = `${randomY}px`;

    popup.style.display = 'block';

    createPrompt(randomX + 20, randomY + 150);
}

function createPrompt(x, y) {
    const prompt = document.createElement('div');
    prompt.className = 'prompt';

    prompt.innerHTML = `
        <div class="title">Windows XP</div>
        <div class="message">Are you sure you want to proceed?</div>
        <div class="button">OK</div>
    `;

    prompt.querySelector('.button').addEventListener('click', () => {
        prompt.style.display = 'none';
    });

    prompt.style.left = `${x}px`;
    prompt.style.top = `${y}px`;
    prompt.style.display = 'block';

    document.body.appendChild(prompt);
}

function randomInterval() {
    const min = 5000;
    const max = 10000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initiatePopups() {
    setInterval(createPopup, randomInterval());
}

document.addEventListener('DOMContentLoaded', () => {
    initiatePopups();
});
