document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card, .section-title, .hero-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Typing Effect
    const greetingElement = document.querySelector('.greeting');
    if (greetingElement) {
        const textPart1 = "Hi, my name is ";
        const textPart2 = "Prakriti";
        const typingSpeed = 100; // ms per char

        // Create cursor
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        greetingElement.appendChild(cursor);

        let i = 0;

        function typeWriter() {
            if (i < textPart1.length) {
                cursor.before(textPart1.charAt(i));
                i++;
                setTimeout(typeWriter, typingSpeed);
            } else if (i < textPart1.length + textPart2.length) {
                // If starting the second part, creating a span if it doesn't exist yet
                let span = greetingElement.querySelector('.highlight-name');
                if (!span) {
                    span = document.createElement('span');
                    span.classList.add('highlight-name');
                    cursor.before(span);
                }

                // Append char to span
                const charIndex = i - textPart1.length;
                span.textContent += textPart2.charAt(charIndex);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate hamburger to X
            const lines = menuToggle.querySelectorAll('line');
            if (navLinks.classList.contains('active')) {
                lines[0].setAttribute('x1', '18'); lines[0].setAttribute('y1', '6'); lines[0].setAttribute('x2', '6'); lines[0].setAttribute('y2', '18');
                lines[1].style.opacity = '0';
                lines[2].setAttribute('x1', '6'); lines[2].setAttribute('y1', '6'); lines[2].setAttribute('x2', '18'); lines[2].setAttribute('y2', '18');
            } else {
                lines[0].setAttribute('x1', '3'); lines[0].setAttribute('y1', '6'); lines[0].setAttribute('x2', '21'); lines[0].setAttribute('y2', '6');
                lines[1].style.opacity = '1';
                lines[2].setAttribute('x1', '3'); lines[2].setAttribute('y1', '18'); lines[2].setAttribute('x2', '21'); lines[2].setAttribute('y2', '18');
            }
        });

        // Close menu when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const lines = menuToggle.querySelectorAll('line');
                lines[0].setAttribute('x1', '3'); lines[0].setAttribute('y1', '6'); lines[0].setAttribute('x2', '21'); lines[0].setAttribute('y2', '6');
                lines[1].style.opacity = '1';
                lines[2].setAttribute('x1', '3'); lines[2].setAttribute('y1', '18'); lines[2].setAttribute('x2', '21'); lines[2].setAttribute('y2', '18');
            });
        });
    }
});
