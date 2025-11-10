document.addEventListener('DOMContentLoaded', () => {

    const path = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    let targetLink = null;
    
    if (path === '' || path === 'index.html' || path === '/') {
        targetLink = document.querySelector('.nav-link[href="index.html"]');
    } else if (path === 'products.html') {
        targetLink = document.querySelector('.nav-link[href="products.html"]');
    } else if (path === 'team.html') {
        targetLink = document.querySelector('.nav-link[href="team.html"]');
    } else if (path === 'contact.html') {
        targetLink = document.querySelector('.nav-link[href="contact.html"]');
    }

    if (targetLink) {
        targetLink.classList.add('active');
    }

    // ----------------------------------------------------------------------

    // 2. LOGIKA PRODUCT SWITCH (Hanya berlaku di products.html)
    const switchBtns = document.querySelectorAll('.switch-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (switchBtns.length > 0 && productCards.length > 0) {
        switchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                
                // Update active button
                switchBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Show/hide products
                productCards.forEach(card => {
                    if (card.getAttribute('data-category') === category) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ----------------------------------------------------------------------

    // 3. CLOSE MOBILE MENU WHEN LINK IS CLICKED
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
});


// 4. NAVBAR SCROLL EFFECT
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});


// 5. FADE IN ANIMATION ON SCROLL
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});