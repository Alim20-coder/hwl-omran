        document.addEventListener('DOMContentLoaded', function() {
            // Navbar Scroll Effect
            const navbar = document.getElementById('mainNav');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // Close Mobile Menu on Link Click
            const navLinks = document.querySelectorAll('.nav-link');
            const menuToggle = document.getElementById('navbarNav');
            const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false});
            
            navLinks.forEach((l) => {
                l.addEventListener('click', () => {
                    if(menuToggle.classList.contains('show')) {
                        bsCollapse.toggle();
                    }
                })
            });
        });
    