const popupMessages = [
    {
        title: "Critical Error",
        content: "You have no brain cells left."
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

let activePopups = [];

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
        activePopups = activePopups.filter(p => p !== popup);
    });

    popupContainer.appendChild(popup);

    let randomX, randomY, overlaps;
    do {
        overlaps = false;
        randomX = Math.floor(Math.random() * (window.innerWidth - 320));
        randomY = Math.floor(Math.random() * (window.innerHeight - 160));
        for (const p of activePopups) {
            const rect = p.getBoundingClientRect();
            if (rect.left < randomX + 320 && rect.left + 320 > randomX &&
                rect.top < randomY + 160 && rect.top + 160 > randomY) {
                overlaps = true;
                break;
            }
        }
    } while (overlaps);

    popup.style.left = `${randomX}px`;
    popup.style.top = `${randomY}px`;
    popup.style.display = 'block';

    activePopups.push(popup);
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
