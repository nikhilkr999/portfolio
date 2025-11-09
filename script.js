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
const modal = document.getElementById('projectModal');
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevent link clicks from triggering modal
        if (e.target.closest('.project-links a')) return;
        
        const title = card.dataset.title;
        const desc = card.dataset.desc;
        const tech = card.dataset.tech;
        const images = card.dataset.images.split(',');
        const gh = card.dataset.gh;
        const ps = card.dataset.ps || '';
        const apk = card.dataset.apk || '';

        // Populate Modal
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDesc').textContent = desc;
        
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = tech.split(',').map(t => `<span>${t.trim()}</span>`).join('');

        const imagesContainer = document.getElementById('modalImages');
        imagesContainer.innerHTML = images.map(img => `<img src="${img.trim()}" alt="${title} Screenshot" loading="lazy">`).join('');

        const linksContainer = document.getElementById('modalLinks');
        let linksHTML = `<a href="${gh}" target="_blank">View on GitHub</a>`;
        if (ps) linksHTML += ` <a href="${ps}" target="_blank">Play Store</a>`;
        if (apk) linksHTML += ` <a href="${apk}" download>Live Demo</a>`;
        linksContainer.innerHTML = linksHTML;

        // Show Modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scroll
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
