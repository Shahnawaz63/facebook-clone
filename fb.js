// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Select all the center navigation icons
    const navIcons = document.querySelectorAll('.nav-center .nav-icon');

    // Add a click event listener to each one
    navIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // 1. Remove the 'active' class from ALL icons
            navIcons.forEach(nav => nav.classList.remove('active'));
            
            // 2. Add the 'active' class ONLY to the icon that was clicked
            icon.classList.add('active');
        });
    });
});