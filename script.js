document.addEventListener('DOMContentLoaded', () => {

    // Removed: INSECURE CLIENT-SIDE LOGIN LOGIC
    /*
    const loginForm = document.getElementById('login-form');
    const loginOverlay = document.getElementById('login-overlay');
    const portfolioContent = document.getElementById('portfolio-content');
    const logoutBtn = document.getElementById('logout-btn');
    */
    const heroElements = document.querySelectorAll('.hero-section .greeting, .hero-section .name, .hero-section .role, .hero-section img');


    // Removed: showPortfolioAndAnimateHero function and related checks
    /*
    const showPortfolioAndAnimateHero = () => {
        loginOverlay.style.display = 'none';
        portfolioContent.classList.remove('hidden');
        heroElements.forEach(element => {
            element.classList.add('animate-visible');
        });
    };

    if (sessionStorage.getItem('loggedIn') === 'true') {
        showPortfolioAndAnimateHero();
    } else {
        loginOverlay.style.display = 'flex';
        portfolioContent.classList.add('hidden');
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username === 'jomarie' && password === 'jomarie4') {
                sessionStorage.setItem('loggedIn', 'true');
                showPortfolioAndAnimateHero();
            } else {
                alert('Invalid username or password. (Hint: jomarie / jomarie4)');
                passwordInput.value = '';
            }
        });
    }

    // Removed: Logout Logic
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('loggedIn');
            loginOverlay.style.display = 'flex';
            portfolioContent.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            heroElements.forEach(element => {
                element.classList.remove('animate-visible');
            });
        });
    }
    */

    // --- Directly trigger hero animation on page load since there's no login ---
    heroElements.forEach(element => {
        element.classList.add('animate-visible');
    });

    // --- Smooth scroll for internal anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Form validation for contact form ---
    // Make sure your HTML <form> in the contact section has id="contact-form"
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.querySelector('#name');
            const email = document.querySelector('#email');
            const message = document.querySelector('#message');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                e.preventDefault();
                alert('Please fill out all fields.');
            } else if (!validateEmail(email.value)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
            }
        });
    }

    // Basic email format validation
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // --- Intersection Observer for "on-scroll" animations ---
    const animatedSections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedSections.forEach(element => {
        elementObserver.observe(element);
    });


    // --- Highlight current section in navigation as you scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar ul li a, footer nav ul li a');
    const mainNavbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollY = window.pageYOffset;
        const navbarHeight = mainNavbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active'); // No need to exclude logout button anymore
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

}); // End of DOMContentLoaded
