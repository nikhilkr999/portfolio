// Initialize AOS Animations
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark Mode Toggle
const toggle = document.getElementById('darkModeToggle');
const body = document.body;

toggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    toggle.textContent = body.dataset.theme === 'dark' ? '☀️' : '🌙';
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.dataset.theme = 'dark';
    toggle.textContent = '☀️';
}

// Contact Form Submission (via Formspree - replace 'your-form-id' with yours from formspree.io)
const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    try {
        const response = await fetch('https://formspree.io/f/xyzbdjja', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            alert('Thanks for your message! I\'ll get back to you soon.');
            form.reset();
        } else {
            alert('Oops! There was a problem submitting the form. Try emailing me directly.');
        }
    } catch (error) {
        alert('Network error. Please try again.');
    }
});

// Project Modal Functionality
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
        if (ps) linksHTML += ` <a href="${ps}" target="_blank">Play Store</a>`;
        if (apk) linksHTML += ` <a href="${apk}" target="_blank">Live Demo</a>`;
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