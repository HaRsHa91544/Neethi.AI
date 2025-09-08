document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const pasteButton = document.getElementById('pasteButton');
    const detectUrlButton = document.getElementById('detectUrlButton');
    const validationMessage = document.getElementById('validationMessage');

    // Show/hide paste button on input focus/blur
    urlInput.addEventListener('focus', () => {
        pasteButton.style.display = 'inline-block';
    });

    urlInput.addEventListener('blur', () => {
        // Delay hiding to allow click on paste button
        setTimeout(() => {
            if (!pasteButton.matches(':hover')) {
                pasteButton.style.display = 'none';
            }
        }, 100);
    });

    pasteButton.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            urlInput.value = text;
            validationMessage.style.display = 'none'; // Hide validation message on paste
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
            validationMessage.textContent = 'Failed to paste. Please paste manually.';
            validationMessage.style.display = 'block';
        }
    });

    detectUrlButton.addEventListener('click', () => {
        if (urlInput.value.trim() === '') {
            validationMessage.textContent = 'URL cannot be empty.';
            validationMessage.style.display = 'block';
        } else {
            validationMessage.style.display = 'none';
            // Here you would typically send the URL to a backend for detection
            alert('Detecting URL: ' + urlInput.value);
        }
    });
});

