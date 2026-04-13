document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SELEKTOR UTAMA ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mainNav = document.getElementById('main-nav');
    
    const katBtn = document.getElementById('katalog-toggle');
    const katList = document.getElementById('katalog-list');
    const katIcon = document.getElementById('katalog-icon');

    // --- 2. FUNGSI UTAMA (REUSABLE) ---
    const closeAllMenus = () => {
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            // Jika Anda menggunakan span hamburger custom, hapus class 'open'
            menuBtn.classList.remove('open'); 
            // Jika menggunakan FontAwesome
            if (menuIcon) menuIcon.className = 'fas fa-bars';
            
            document.body.style.overflow = 'auto';
            
            // Kembalikan navbar ke transparan jika di posisi paling atas
            if (window.scrollY <= 50) {
                mainNav.classList.remove('nav-glass', 'py-3');
                mainNav.classList.add('py-5');
            }
        }
    };

    // --- 3. MENU MOBILE TOGGLE ---
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpening = mobileMenu.classList.toggle('hidden');
            
            // Toggle State: Jika isOpening false artinya menu sedang DIBUKA (karena toggle hidden)
            if (!isOpening) {
                // Saat Menu Terbuka
                menuBtn.classList.add('open'); // Untuk animasi span
                if (menuIcon) menuIcon.className = 'fas fa-times';
                document.body.style.overflow = 'hidden';
                mainNav.classList.add('nav-glass');
            } else {
                // Saat Menu Tertutup
                closeAllMenus();
            }
        });
    }

    // --- 4. NAV SCROLL EFFECT ---
    window.addEventListener('scroll', () => {
        const isMenuOpen = !mobileMenu.classList.contains('hidden');
        
        if (window.scrollY > 50 || isMenuOpen) {
            mainNav.classList.add('nav-glass', 'py-3');
            mainNav.classList.remove('py-5');
        } else {
            mainNav.classList.remove('nav-glass', 'py-3');
            mainNav.classList.add('py-5');
        }
    });

    // --- 5. KATALOG & SUB-MENU ACCORDION ---
    if (katBtn && katList) {
        katBtn.addEventListener('click', (e) => {
            e.preventDefault();
            katList.classList.toggle('hidden');
            
            // Animasi Icon: Rotate atau ganti Plus/Minus
            if (katIcon) {
                if (katIcon.classList.contains('fa-chevron-down')) {
                    katIcon.style.transform = katList.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                } else {
                    katIcon.classList.toggle('fa-plus');
                    katIcon.classList.toggle('fa-minus');
                }
            }
        });
    }

    // Sub-Toggle (Detail Produk di dalam Katalog)
    document.querySelectorAll('.sub-toggle').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const parentLi = this.closest('li');
            const content = parentLi?.querySelector('.sub-content');
            const arrowIcon = this.querySelector('i');

            if (content) {
                const isHidden = content.classList.toggle('hidden');
                content.classList.toggle('grid', !isHidden);
                arrowIcon?.classList.toggle('rotate-180', !isHidden);
            }
        });
    });

    // --- 6. EVENT CLEANUP & OUTSIDE CLICK ---
    // Klik link otomatis tutup menu
    document.querySelectorAll('.mobile-link, #mobile-menu a').forEach(link => {
        link.addEventListener('click', closeAllMenus);
    });

    // Tutup jika klik di luar area menu
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            closeAllMenus();
        }
    });

    // Resize handling
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) { // Breakpoint LG Tailwind
            closeAllMenus();
        }
    });

    // --- 7. REVEAL ANIMATION (INTERSECTION OBSERVER) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});