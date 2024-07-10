const popupMessages = [
    {
        title: "System Alert",
        content: "Your computer is running low on memory. Click OK to free up some space."
    },
    {
        title: "Virus Detected",
        content: "A virus has been detected on your computer. Click OK to remove it."
    },
    {
        title: "Congratulations!",
        content: "You've won a free gift card. Click OK to claim your prize."
    }
];

function createPopup() {
    console.log("Creating popup...");
    const popupContainer = document.getElementById('popup-container');
    if (!popupContainer) {
        console.error("Popup container not found!");
        return;
    }

    const popup = document.createElement('div');
    popup.className = 'popup';

    const randomMessage = popupMessages[Math.floor(Math.random() * popupMessages.length)];
    popup.innerHTML = `
        <div class="title">${randomMessage.title}</div>
        <div class="content">${randomMessage.content}</div>
        <button class="button">OK</button>
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
}

function randomInterval() {
    const min = 5000;
    const max = 10000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initiatePopups() {
    console.log("Initiating popups...");
    setInterval(createPopup, randomInterval());
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded. Starting popups...");
    initiatePopups();
});
