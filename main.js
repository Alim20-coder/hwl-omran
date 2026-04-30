// =====================================================
// HAWAL AL-OMRAN — MAIN JAVASCRIPT
// =====================================================

document.addEventListener('DOMContentLoaded', function () {

  // =====================================================
  // 1. PAGE LOADER
  // =====================================================
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('done');
      // Trigger hero animations after load
      triggerHeroAnims();
    }, 1800);
  });

  // =====================================================
  // 2. CUSTOM CURSOR
  // =====================================================
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  if (cursor && cursorDot) {
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursorDot.style.left = cursorX + 'px';
      cursorDot.style.top = cursorY + 'px';
    });

    // Smooth cursor follow
    function animateCursor() {
      dotX += (cursorX - dotX) * 0.12;
      dotY += (cursorY - dotY) * 0.12;
      cursor.style.left = dotX + 'px';
      cursor.style.top = dotY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effect on interactive elements
    const hoverTargets = document.querySelectorAll(
      'a, button, .service-card, .why-box, .stat-box, .nav-link'
    );
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }

  // =====================================================
  // 3. NAVBAR SCROLL EFFECT
  // =====================================================
  const navbar = document.getElementById('mainNav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    // Back to top visibility
    updateBackToTop();
    // Active nav link
    updateActiveNavLink();
  });

  // =====================================================
  // 4. CLOSE MOBILE MENU ON LINK CLICK
  // =====================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.getElementById('navbarNav');
  const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

  navLinks.forEach(l => {
    l.addEventListener('click', () => {
      if (menuToggle.classList.contains('show')) {
        bsCollapse.toggle();
      }
    });
  });

  // =====================================================
  // 5. ACTIVE NAV LINK ON SCROLL
  // =====================================================
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link) {
        if (scrollPos >= top && scrollPos < bottom) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  // =====================================================
  // 6. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // =====================================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('in-view');
        }, parseInt(delay));
        revealObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-card'
  ).forEach(el => revealObserver.observe(el));

  // =====================================================
  // 7. HERO ENTRANCE ANIMATIONS
  // =====================================================
  function triggerHeroAnims() {
    const heroEls = document.querySelectorAll('#hero .reveal-up, #hero .reveal-scale');
    heroEls.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('in-view');
      }, i * 150 + 200);
    });
  }

  // =====================================================
  // 8. COUNTER ANIMATION (Stats)
  // =====================================================
  const counters = document.querySelectorAll('.stat-num[data-target]');
  let countersStarted = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        counters.forEach(counter => animateCounter(counter));
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  // =====================================================
  // 9. BACK TO TOP BUTTON
  // =====================================================
  const backToTopBtn = document.getElementById('backToTop');

  function updateBackToTop() {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  }

  // =====================================================
  // 10. PARALLAX HERO BACKGROUND
  // =====================================================
  const heroBg = document.querySelector('.hero-bg-image');
  window.addEventListener('scroll', () => {
    if (heroBg && window.scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    }
  });

  // =====================================================
  // 11. SERVICE CARDS TILT EFFECT (3D hover)
  // =====================================================
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // =====================================================
  // 12. TYPED TEXT EFFECT (Hero subtitle)
  // =====================================================
  const heroDesc = document.querySelector('.hero-desc');
  if (heroDesc) {
    const originalText = heroDesc.textContent.trim();
    heroDesc.dataset.originalAr = originalText;
  }

  // =====================================================
  // 13. WHY BOXES STAGGER ANIMATION
  // =====================================================
  const whyBoxes = document.querySelectorAll('.why-box');
  whyBoxes.forEach((box, i) => {
    box.style.transitionDelay = `${i * 80}ms`;
  });

  // =====================================================
  // 14. NAVBAR LOGO FLOAT
  // =====================================================
  const navLogo = document.querySelector('.nav-logo-img');
  if (navLogo) {
    let logoFloat = 0;
    setInterval(() => {
      logoFloat += 0.05;
      navLogo.style.transform = `translateY(${Math.sin(logoFloat) * 3}px)`;
    }, 30);
  }

  // =====================================================
  // 15. SECTION PROGRESS INDICATOR (optional stripe)
  // =====================================================
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #555, #ccc, #fff);
    z-index: 9999;
    width: 0;
    transition: width 0.1s;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    progressBar.style.width = progress + '%';
  });

  // =====================================================
  // 16. SMOOTH ANCHOR SCROLLING
  // =====================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // =====================================================
  // 17. HERO SHAPE MOUSE PARALLAX
  // =====================================================
  const heroShapes = document.querySelectorAll('.hero-shape');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroShapes.forEach((shape, i) => {
      const factor = (i + 1) * 0.5;
      shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  // =====================================================
  // 18. ABOUT IMAGE REVEAL ON SCROLL
  // =====================================================
  const aboutFrame = document.querySelector('.about-img-frame');
  if (aboutFrame) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        aboutFrame.style.clipPath = 'inset(0 0 0 0)';
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    aboutFrame.style.clipPath = 'inset(0 100% 0 0)';
    aboutFrame.style.transition = 'clip-path 1s cubic-bezier(0.77,0,0.175,1)';
    observer.observe(aboutFrame);
  }

  // =====================================================
  // 19. FOOTER LINKS STAGGER
  // =====================================================
  document.querySelectorAll('.footer-link').forEach((link, i) => {
    link.style.transitionDelay = `${i * 40}ms`;
  });

  // =====================================================
  // 20. CONTACT PHONE CARDS RIPPLE
  // =====================================================
  document.querySelectorAll('.contact-phone-card').forEach(card => {
    card.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        background:rgba(255,255,255,0.1);
        transform:scale(0); animation:rippleAnim 0.6s linear;
        width:200px; height:200px;
        left:${e.clientX - rect.left - 100}px;
        top:${e.clientY - rect.top - 100}px;
        pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Ripple keyframe
  const style = document.createElement('style');
  style.textContent = `@keyframes rippleAnim { to { transform:scale(2); opacity:0; } }`;
  document.head.appendChild(style);

});

// =====================================================
// LANGUAGE TOGGLE — GLOBAL FUNCTION
// =====================================================
  // 1. تحديد مفتاح التخزين الموحد
  
    // =====================================================
    // LOGIC OF LANGUAGE BUTTON (يوضع في نهاية البدي)
    // =====================================================

    let currentLang = 'ar'; // اللغة الافتراضية إذا لم يتم حفظ شيء

    // 1. عند تحميل الصفحة: قراءة اللغة المحفوظة لتحديث النصوص فقط
    document.addEventListener('DOMContentLoaded', () => {
        const savedLang = localStorage.getItem('hawal_lang');
        if (savedLang) {
            currentLang = savedLang;
            updateTexts(currentLang); // تحديث النصوص فقط (الاتجاه تم تغييره في الهيد)
        }
    });

    // 2. دالة تغيير اللغة عند الضغط على الزر
    function toggleLang() {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        
        // حفظ اللغة
        localStorage.setItem('hawal_lang', currentLang);
        
        // تطبيق التغييرات فوراً
        applyFullLangUpdate(currentLang);
    }

    // 3. دالة تحديث كل شيء (الاتجاه والنصوص والـ CSS)
    function applyFullLangUpdate(lang) {
        const isEn = lang === 'en';
        const html = document.documentElement;

        // تحديث اتجاه الصفحة واللغة
        html.setAttribute('lang', lang);
        html.setAttribute('dir', isEn ? 'ltr' : 'rtl');

        // تحديث نصوص الأزرار
        const btns = document.querySelectorAll('#langBtnText, #langBtnMobile');
        btns.forEach(btn => {
            if (btn) btn.textContent = isEn ? 'AR' : 'EN';
        });

        // تحديث النصوص داخل الصفحة
        updateTexts(lang);

        // تبديل ملف الـ Bootstrap
        const bsLink = document.getElementById('bootstrap-css');
        if (bsLink) {
            bsLink.href = isEn
                ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
                : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css';
        }
    }

    // دالة مساعدة لتغيير النصوص فقط
    function updateTexts(lang) {
        const isEn = lang === 'en';
        document.querySelectorAll('[data-ar][data-en]').forEach(el => {
            const text = isEn ? el.dataset.en : el.dataset.ar;
            if (!text) return;

            if (el.children.length === 0) {
                el.textContent = text;
            } else {
                // التعامل مع العناصر التي تحتوي على أبناء (مثل الأيقونات داخل الزر)
                el.childNodes.forEach(node => {
                    if (node.nodeType === 3 && node.textContent.trim()) {
                        node.textContent = text;
                    }
                });
            }
        });
    }
  // Smooth lang transition effect
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.25s';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 250);

  // Re-observe reveal elements (some may need re-trigger after layout change)
  setTimeout(() => {
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
      if (!el.classList.contains('in-view')) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          el.classList.add('in-view');
        }
      }
    });
  }, 300);