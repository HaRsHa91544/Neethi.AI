// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger-icon');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const closeDrawer = document.getElementById('closeDrawer');

hamburger.addEventListener('click', () => {
    drawer.classList.add('open');
    drawerOverlay.classList.add('active');
});

closeDrawer.addEventListener('click', () => {
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
});

drawerOverlay.addEventListener('click', () => {
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
});

async function checkToken() {
    const token = localStorage.getItem('neethiToken') || null;
    if (token) {
        const request = await fetch('http://localhost:3000/check-token', {
            method: 'POST',
            headers: {
                'Authorization': token
            }
        });
        const response = await request.json();
        if (response.valid) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

async function addMyProfile() {
    const isValidToken = await checkToken();
    if (!isValidToken) {
        const myProfile = document.getElementById('profile-link');
        myProfile.style.display = 'none';
        localStorage.removeItem('neethiToken');
    }
}

addMyProfile();