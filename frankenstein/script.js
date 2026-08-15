document.addEventListener('DOMContentLoaded', () => {
    
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                if (entry.target.classList.contains('cast-card')) {
                    const parent = entry.target.parentElement;
                    const index = Array.from(parent.children).indexOf(entry.target);
                    entry.target.style.setProperty('--i', index);
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    const carousel = document.getElementById('galleryCarousel');
    const items = Array.from(carousel.children);
    
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });

    const heroBg = document.querySelector('.hero-bg');
    const animations = [
        'kenBurns 30s ease-in-out infinite alternate',
        'kenBurns 35s ease-in-out infinite alternate-reverse',
        'kenBurns 28s ease-in-out infinite alternate'
    ];
    heroBg.style.animation = animations[Math.floor(Math.random() * animations.length)];

    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            carousel.style.animationPlayState = 'paused';
        });
        
        item.addEventListener('mouseleave', () => {
            carousel.style.animationPlayState = 'running';
        });
    });

    let cursorX = 0, cursorY = 0;
    let currentX = 0, currentY = 0;
    
    const cursor = document.createElement('div');
    cursor.className = 'cursor-atmosphere';
    cursor.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(42,31,53,0.08) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
        mix-blend-mode: screen;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function animateCursor() {
        currentX += (cursorX - currentX) * 0.05;
        currentY += (cursorY - currentY) * 0.05;
        cursor.style.left = currentX + 'px';
        cursor.style.top = currentY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }

    const sectionLines = document.querySelectorAll('.section-line');
    
    const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scaleX(1)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.5 });

    sectionLines.forEach(line => {
        line.style.transform = 'scaleX(0)';
        line.style.opacity = '0';
        line.style.transition = 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease';
        lineObserver.observe(line);
    });

    const quoteText = "The tide that brought me here never comes to take you away ... leaving me stranded.";
    const typewriterEl = document.getElementById('typewriter');
    const quoteAttribution = document.querySelector('.quote-attribution');
    let charIndex = 0;
    let hasTyped = false;

    const typeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasTyped) {
                hasTyped = true;
                typeWriter();
            }
        });
    }, { threshold: 0.5 });

    typeObserver.observe(typewriterEl);

    function typeWriter() {
        if (charIndex < quoteText.length) {
            typewriterEl.textContent += quoteText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 60);
        } else {
            typewriterEl.classList.add('finished');
            quoteAttribution.classList.add('visible');
        }
    }

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});