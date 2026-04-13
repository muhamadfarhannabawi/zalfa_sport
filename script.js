document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SELEKTOR UTAMA ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const katBtn = document.getElementById('katalog-toggle');
    const katList = document.getElementById('katalog-list');
    const katIcon = document.getElementById('katalog-icon');

    // --- 2. FUNGSI UTAMA (REUSABLE) ---
    const closeAllMenus = () => {
        if (mobileMenu) mobileMenu.classList.add('hidden');
        if (menuIcon) menuIcon.classList.replace('fa-times', 'fa-bars');
        document.body.style.overflow = 'auto';
    };

    // --- 3. MENU MOBILE TOGGLE ---
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                menuIcon?.classList.replace('fa-bars', 'fa-times');
                document.body.style.overflow = 'hidden'; // Kunci scroll
            } else {
                closeAllMenus();
            }
        });
    }

    // --- 4. KATALOG & SUB-MENU ACCORDION ---
    // Toggle List Katalog Utama
    if (katBtn && katList) {
        katBtn.addEventListener('click', () => {
            katList.classList.toggle('hidden');
            katIcon?.classList.toggle('fa-plus');
            katIcon?.classList.toggle('fa-minus');
        });
    }

    // Sub-Toggle (Panah Accordion untuk Detail Produk)
    const subToggles = document.querySelectorAll('.sub-toggle');
    subToggles.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const parentLi = this.closest('li');
            const content = parentLi?.querySelector('.sub-content');
            const arrowIcon = this.querySelector('i');

            if (content) {
                const isHidden = content.classList.contains('hidden');
                
                // Tutup sub-content lain yang sedang terbuka (Optional: Accordion Mode)
                // document.querySelectorAll('.sub-content').forEach(el => el.classList.add('hidden'));

                if (isHidden) {
                    content.classList.remove('hidden');
                    content.classList.add('grid');
                    arrowIcon?.classList.add('rotate-180');
                } else {
                    content.classList.add('hidden');
                    content.classList.remove('grid');
                    arrowIcon?.classList.remove('rotate-180');
                }
            }
        });
    });

    // --- 5. EVENT CLEANUP ---
    // Tutup menu jika mengklik link biasa
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeAllMenus);
    });

    // Tutup menu jika user me-resize layar ke ukuran Desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) { // 768px adalah breakpoint 'md' di Tailwind
            closeAllMenus();
        }
    });

    // Tutup menu jika klik di luar area menu (Click Outside)
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            closeAllMenus();
        }
    });

    // --- 6. REVEAL ANIMATION (INTERSECTION OBSERVER) ---
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Berhenti mengamati setelah elemen muncul (opsional agar animasi tidak berulang)
                // observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mainNav = document.getElementById('main-nav');
    const katalogToggle = document.getElementById('katalog-toggle');

    // Toggle Mobile Menu
    menuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        
        // Animasi Icon
        menuIcon.className = isHidden ? 'fas fa-bars' : 'fas fa-times';
        
        // Lock Scroll agar tidak bisa di scroll saat menu buka
        document.body.style.overflow = isHidden ? 'auto' : 'hidden';
        
        // Paksa navbar jadi gelap saat menu dibuka (agar tombol terlihat)
        if(!isHidden) {
            mainNav.classList.add('nav-glass');
        } else if (window.scrollY <= 50) {
            mainNav.classList.remove('nav-glass');
        }
    });

    // Perbaikan pada Scroll Event
    window.addEventListener('scroll', () => {
        // Jika menu sedang terbuka, jangan hapus background navigasi
        if (window.scrollY > 50 || !mobileMenu.classList.contains('hidden')) {
            mainNav.classList.add('nav-glass', 'py-3'); // Mengecilkan padding saat scroll
            mainNav.classList.remove('py-5');
        } else {
            mainNav.classList.remove('nav-glass', 'py-3');
            mainNav.classList.add('py-5');
        }
    });
    
    // Klik link di mobile menu otomatis tutup menu
    document.querySelectorAll('.mobile-link, #katalog-list a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.className = 'fas fa-bars';
            document.body.style.overflow = 'auto';
        });
    });
});
