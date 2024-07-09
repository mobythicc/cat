document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('image-input');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            document.getElementById('image-gallery').appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});
