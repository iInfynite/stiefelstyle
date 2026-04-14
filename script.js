document.addEventListener('DOMContentLoaded', () => {

    // Loader
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 2000);
    }

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (header && window.scrollY > 50) {
            header.classList.add('scrolled');
        } else if (header) {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }
    }

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Modals
    const modalImpressum = document.getElementById('modal-impressum');
    const modalPrivacy = document.getElementById('modal-privacy');
    const openImpressum = document.getElementById('open-impressum');
    const openPrivacy = document.getElementById('open-privacy');
    const closeModals = document.querySelectorAll('.close-modal');

    function openModal(modal) {
        if (!modal) return;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (modalImpressum) modalImpressum.style.display = 'none';
        if (modalPrivacy) modalPrivacy.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (openImpressum) openImpressum.addEventListener('click', (e) => { e.preventDefault(); openModal(modalImpressum); });
    if (openPrivacy) openPrivacy.addEventListener('click', (e) => { e.preventDefault(); openModal(modalPrivacy); });

    closeModals.forEach(btn => btn.addEventListener('click', closeModal));

    window.addEventListener('click', (e) => {
        if (e.target === modalImpressum || e.target === modalPrivacy) {
            closeModal();
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all others
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        }
    });

    // Cookie Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');
    const rejectCookies = document.getElementById('reject-cookies');

    if (cookieBanner && !localStorage.getItem('luxuryCookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.style.display = 'block';
            cookieBanner.style.animation = 'slideUp 0.5s ease';
        }, 2500);
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('luxuryCookiesAccepted', 'true');
            if (cookieBanner) cookieBanner.style.display = 'none';
        });
    }

    if (rejectCookies) {
        rejectCookies.addEventListener('click', () => {
            localStorage.setItem('luxuryCookiesAccepted', 'false');
            if (cookieBanner) cookieBanner.style.display = 'none';
        });
    }

    // Smooth Scroll
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
});
