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