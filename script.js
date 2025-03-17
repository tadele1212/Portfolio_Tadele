document.addEventListener('DOMContentLoaded', function() {
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    document.addEventListener('mousemove', function(e) {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });
    
    // Apply hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            if (cursorOutline) {
                cursorOutline.style.width = '6rem';
                cursorOutline.style.height = '6rem';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            }
        });
        
        el.addEventListener('mouseleave', function() {
            if (cursorOutline) {
                cursorOutline.style.width = '4rem';
                cursorOutline.style.height = '4rem';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Navigation indicator
    const navLinks = document.querySelectorAll('nav a');
    const navIndicator = document.querySelector('.nav-indicator');

    function updateNavIndicator(element) {
        navIndicator.style.width = `${element.offsetWidth}px`;
        navIndicator.style.left = `${element.offsetLeft}px`;
    }

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            updateNavIndicator(this);
        });
    });

    const navbar = document.querySelector('nav ul');
    navbar.addEventListener('mouseleave', function() {
        const activeLink = document.querySelector('nav a.active');
        if (activeLink) {
            updateNavIndicator(activeLink);
        }
    });

    // Initialize the nav indicator position
    window.addEventListener('load', function() {
        const activeLink = document.querySelector('nav a.active');
        if (activeLink) {
            updateNavIndicator(activeLink);
        }
    });

    // Active navigation on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
                updateNavIndicator(link);
            }
        });
    });

    // Projects filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                // Show all projects if filter is 'all', otherwise check if project matches filter
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(2rem)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                
                // Update the URL but without the jump
                history.pushState(null, null, targetId);
            }
        });
    });

    // Form label animation (move label up when input is focused or has value)
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.querySelector('label').classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentNode.querySelector('label').classList.remove('active');
            }
        });
        
        // Check on page load if input has value
        if (input.value !== '') {
            input.parentNode.querySelector('label').classList.add('active');
        }
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to your server here
            // This is just a placeholder for demonstration purposes
            
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData);
            
            console.log('Form submitted with values:', formValues);
            
            // Show success message (you would customize this in a real app)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset the form
            this.reset();
            
            // Reset the label positions
            this.querySelectorAll('label').forEach(label => {
                label.classList.remove('active');
            });
        });
    }

    // Add scroll reveal animation
    const scrollRevealElements = document.querySelectorAll('.section-title, .about-content, .skill-category, .project-card, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    scrollRevealElements.forEach(element => {
        element.classList.add('reveal-hidden');
        observer.observe(element);
    });

    // Add particle background effect to hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles-container');
        heroSection.appendChild(particlesContainer);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 6 + 1;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            
            // Random animation delay
            const delay = Math.random() * 5;
            
            // Apply styles
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Add dynamic year to the footer copyright
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2023', new Date().getFullYear());
    }
});

// Add CSS class for the particles in the hero section
const style = document.createElement('style');
style.textContent = `
    .particles-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: -1;
    }
    
    .particle {
        position: absolute;
        background-color: rgba(0, 240, 255, 0.3);
        border-radius: 50%;
        animation: float linear infinite;
    }
    
    @keyframes float {
        0% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(100px, -100px);
            opacity: 0;
        }
    }
    
    .reveal-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .reveal {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style); 