/**
 * Ujwal Kumar - Portfolio Logic
 * Includes: Typing Effect, Theme Toggle, Scroll Reveal, 
 * EmailJS, Stats Counter, and UI Helpers.
 */

// --- 1. Typing Effect ---
const typingSpan = document.querySelector('.typing');
const roles = ["Full Stack Developer", "Prompt Engineer", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}

// --- 2. Theme Toggle ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const updateToggleButton = (isLight) => {
    themeToggle.textContent = isLight ? "🌙" : "☀️";
};

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    updateToggleButton(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Load saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    updateToggleButton(true);
} else {
    updateToggleButton(false);
}

// --- 3. Scroll Reveal ---
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: false 
});

sr.reveal('.hero-text, .section-title');
sr.reveal('.skill-card', { interval: 100 });
sr.reveal('.project-card', { interval: 200 });
sr.reveal('.timeline-item', { origin: 'left' });

// --- 4. Contact Form (EmailJS) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = "Sending...";
        btn.disabled = true;

        // Ensure these IDs match your EmailJS dashboard exactly
        const serviceID = 'YOUR_SERVICE_ID';
        const templateID = 'YOUR_TEMPLATE_ID';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.textContent = "Message Sent!";
                btn.style.backgroundColor = "#28a745"; 
                contactForm.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = ""; 
                    btn.disabled = false;
                }, 3000);
            }, (err) => {
                btn.disabled = false;
                btn.textContent = "Error! Try Again";
                console.error("EmailJS Error:", err);
            });
    });
}

// --- 5. Navigation & UI Helpers (Scroll Events) ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const pageYOffset = window.pageYOffset;

    // Active Link Highlighter
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    // Back to Top Visibility
    if (pageYOffset > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- 6. Stats Counter ---
const startCounters = () => {
    const stats = document.querySelectorAll('.stat-number');
    const speed = 200;

    stats.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/,/g, '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc).toLocaleString();
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toLocaleString() + "+";
            }
        };
        updateCount();
    });
};

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('#stats');
if (statsSection) statsObserver.observe(statsSection);

// --- 7. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    if(typingSpan) type(); 
});
// --- Pre-loader Logic ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    // Smooth fade out
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 500); // 500ms delay for a better feel
});
// --- Success Popup Logic ---
const successPopup = document.getElementById('success-popup');

function openPopup() {
    successPopup.classList.add('show');
}

function closePopup() {
    successPopup.classList.remove('show');
}

// Update your EmailJS code in script.js:
// ... inside the .then(() => { ... block
    openPopup(); // Call this instead of alert()
    btn.textContent = "Message Sent!";
    btn.style.backgroundColor = "#28a745"; 
    contactForm.reset();
// ...
