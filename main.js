document.addEventListener('DOMContentLoaded', () => {

    // 1. MEMPERBAIKI STATUS ACTIVE PADA NAVBAR DI HALAMAN TERPISAH
    // Memastikan tautan navigasi tetap aktif di halaman terpisah (misalnya products.html atau team.html)
    const path = window.location.pathname.split('/').pop();

    // Hapus semua kelas 'active' yang sudah ada terlebih dahulu
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Tentukan tautan yang harus aktif
    let targetLink = null;
    
    if (path === '' || path === 'index.html') {
        // Jika di halaman utama, aktifkan 'Home'
        // Gunakan selector untuk #home di index.html
        targetLink = document.querySelector('.nav-link[href="#home"]');
    } else {
        // Untuk halaman terpisah (products.html, team.html, dll.)
        // Mencari link yang href-nya sama dengan nama file
        targetLink = document.querySelector(`.nav-link[href="${path}"]`);
    }

    // Terapkan kelas 'active' jika ditemukan
    if (targetLink) {
        targetLink.classList.add('active');
    }

    // ----------------------------------------------------------------------


    // 2. LOGIKA PRODUCT SWITCH (Hanya berlaku di products.html)
    // Logika ini akan berfungsi jika elemen switchBtns ada (di products.html)
    const switchBtns = document.querySelectorAll('.switch-btn');
    const productCards = document.querySelectorAll('.product-card');

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
});


// 3. NAVBAR SCROLL EFFECT
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// 4. SMOOTH SCROLL FOR NAVIGATION LINKS (Untuk link internal seperti #about, #vision)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // 80px offset untuk navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active nav link HANYA untuk link on-page
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            // Hapus kelas active dari products.html dan team.html jika ada
            document.querySelector('.nav-link[href="products.html"]')?.classList.remove('active');
            document.querySelector('.nav-link[href="team.html"]')?.classList.remove('active');

            this.classList.add('active');
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
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


// 6. UPDATE ACTIVE NAV LINK ON SCROLL (Untuk halaman index.html)
window.addEventListener('scroll', function() {
    // Pastikan kita hanya menjalankan ini di index.html atau halaman dengan navigasi on-page
    const path = window.location.pathname.split('/').pop();
    if (path !== '' && path !== 'index.html') return;

    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Kita hanya perlu check untuk section on-page (di index.html)
        if (section.id !== 'products' && section.id !== 'team') {
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        // Jangan hapus kelas active untuk link external seperti products.html atau team.html
        if (!link.getAttribute('href').includes('.html')) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        }
    });
});