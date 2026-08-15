
document.addEventListener('DOMContentLoaded', () => {

    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, parseInt(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(el => revealObserver.observe(el));

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

    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.dataset.count);
                const duration = 2000;
                const startTime = performance.now();
                const startValue = 0;

                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const currentValue = Math.floor(startValue + (countTo - startValue) * easeOut);

                    target.textContent = currentValue;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = countTo;
                    }
                };

                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    const hero = document.querySelector('.hero');
    const heroLayers = document.querySelectorAll('.hero-bg-layer');
    const compassRose = document.querySelector('.compass-rose');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            const progress = scrolled / heroHeight;

            heroLayers.forEach((layer, index) => {
                const speed = (index + 1) * 0.15;
                layer.style.transform = `translateY(${scrolled * speed}px)`;
            });

            if (compassRose) {
                compassRose.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.1}deg)`;
            }

            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = 1 - (progress * 1.5);
                heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--accent-dark), var(--accent), var(--accent-bright));
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightNav = () => {
        const scrollPos = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                        link.style.color = 'var(--accent-pale)';
                    } else {
                        link.style.color = '';
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    setTimeout(() => {
        document.querySelectorAll('.hero .scroll-reveal').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('revealed');
            }, i * 200);
        });
    }, 300);

});
