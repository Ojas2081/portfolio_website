// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const cameraSound = new Audio('https://www.fesliyanstudios.com/play-mp3/641');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    cameraSound.currentTime = 0.9;
    cameraSound.play();
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Section Navigation
const sectionBtns = document.querySelectorAll('.section-btn');
const sections = document.querySelectorAll('.section');

function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    sectionBtns.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

sectionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const sectionId = btn.getAttribute('data-section');
        showSection(sectionId);
    });
});

// Code Copy Functionality
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const code = btn.getAttribute('data-code');
        try {
            await navigator.clipboard.writeText(code);
            
            // Visual feedback
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';
            
            setTimeout(() => {
                btn.innerHTML = originalIcon;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    });
});