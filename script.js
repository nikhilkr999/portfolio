// Initialize AOS Animations
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Dark Mode Toggle
const toggle = document.getElementById('darkModeToggle');
const body = document.body;

function applyTheme(theme) {
    if (theme === 'dark') {
        body.dataset.theme = 'dark';
        toggle.textContent = '\u2600\uFE0F';
        toggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        delete body.dataset.theme;
        toggle.textContent = '\u{1F319}';
        toggle.setAttribute('aria-label', 'Switch to dark mode');
    }
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

toggle.addEventListener('click', () => {
    applyTheme(body.dataset.theme === 'dark' ? 'light' : 'dark');
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(event.matches ? 'dark' : 'light');
    }
});

// Contact Form Submission via mailto fallback (no backend required)
const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const recipient = form.dataset.email || 'nk17cse0351@gmail.com';

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'visitor'}`);
    const body = encodeURIComponent(
        `Name: ${name || 'Not provided'}\n` +
        `Email: ${email || 'Not provided'}\n\n` +
        `${message || 'No message provided.'}`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    form.reset();
});

// Project Modal Functionality
const modal = document.getElementById('projectModal');
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('.project-links a')) return;

        const title = card.dataset.title;
        const desc = card.dataset.desc;
        const tech = card.dataset.tech;
        const gh = card.dataset.gh;
        const site = card.dataset.site || '';
        const ps = card.dataset.ps || '';
        const apk = card.dataset.apk || '';
        const images = card.dataset.images ? card.dataset.images.split(',') : [];
        const video = card.dataset.video || '';

        // Populate common fields
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDesc').textContent = desc;

        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = tech.split(',').map(t => `<span>${t.trim()}</span>`).join('');

        const imagesContainer = document.getElementById('modalImages');
        imagesContainer.innerHTML = ''; // clear previous content

        if (video) {
            // Video project
            const videoEl = document.createElement('video');
            videoEl.src = video;
            videoEl.controls = true;
            videoEl.autoplay = false;
            videoEl.style.width = '100%';
            videoEl.style.maxHeight = '70vh';
            videoEl.style.borderRadius = '8px';
            videoEl.style.background = '#000';

            // Fullscreen on click
            videoEl.addEventListener('click', () => {
                if (videoEl.requestFullscreen) videoEl.requestFullscreen();
                else if (videoEl.webkitRequestFullscreen) videoEl.webkitRequestFullscreen();
                else if (videoEl.msRequestFullscreen) videoEl.msRequestFullscreen();
            });

            imagesContainer.appendChild(videoEl);
        } else if (images.length > 0) {
            // Image project (existing behavior)
            images.forEach(img => {
                const imgEl = document.createElement('img');
                imgEl.src = img.trim();
                imgEl.alt = `${title} Screenshot`;
                imgEl.loading = 'lazy';
                imagesContainer.appendChild(imgEl);
            });
        }

        // Links
        const linksContainer = document.getElementById('modalLinks');
        let linksHTML = `<a href="${gh}" target="_blank">View on GitHub</a>`;
        if (site) linksHTML += ` <a href="${site}" target="_blank" rel="noopener noreferrer">Website</a>`;
        if (ps) linksHTML += ` <a href="${ps}" target="_blank" rel="noopener noreferrer">Play Store</a>`;
        if (apk) linksHTML += ` <a href="${apk}" target="_blank" rel="noopener noreferrer">Live Demo</a>`;
        linksContainer.innerHTML = linksHTML;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal
const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
