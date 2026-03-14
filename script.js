// --- Typing Effect ---
const typingSpan = document.querySelector('.typing');
const roles = ["Full Stack Developer", "prompt engineer", "Problem Solver"];
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

// --- Theme Toggle ---
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

// Check preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    updateToggleButton(true);
} else {
    updateToggleButton(false);
}

// --- Scroll Reveal Animations ---
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

// --- Contact Form Handling (EmailJS Integration) ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = "Sending...";
        btn.disabled = true;

        // Replace these with your actual IDs from EmailJS
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

// --- Active Nav Link Highlighter ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
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
});

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    if(typingSpan) type(); 
});
