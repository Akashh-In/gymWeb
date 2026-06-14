

// ── Sticky Nav on Scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Mobile Hamburger Menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const bars = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    bars[0].style.transform = 'translateY(7px) rotate(45deg)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  }
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(b => {
      b.style.transform = ''; b.style.opacity = '';
    });
  });
});

// ── Active Nav Link on Scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav__links a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// ── Scroll Reveal ──
const revealEls = document.querySelectorAll(
  '.class-card, .trainer-card, .price-card, .testimonial, .about__text, .about__visual, .contact__info, .contact__form'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  revealObserver.observe(el);
});

// ── Contact Form Handler ──
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = form.firstName.value.trim();
  const email     = form.email.value.trim();

  if (!firstName || !email) {
    showFormMessage('Please fill in your name and email.', 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormMessage('Please enter a valid email address.', 'error');
    return;
  }

  // --- would add backend here  hehe---


  showFormMessage(`Thanks, ${firstName}! We'll be in touch within 24 hours.`, 'success');
  form.reset();
});

function showFormMessage(msg, type) {
  let el = document.getElementById('formMsg');
  if (!el) {
    el = document.createElement('p');
    el.id = 'formMsg';
    el.style.cssText = 'margin-top:12px;padding:12px 16px;border-radius:4px;font-size:0.875rem;font-weight:500;text-align:center;';
    form.appendChild(el);
  }
  el.textContent = msg;
  el.style.background = type === 'success' ? 'rgba(245,197,24,0.12)' : 'rgba(220,60,60,0.12)';
  el.style.color       = type === 'success' ? '#F5C518' : '#e06060';
  el.style.border      = type === 'success' ? '1px solid rgba(245,197,24,0.25)' : '1px solid rgba(220,60,60,0.25)';

  setTimeout(() => { if (el) el.remove(); }, 5000);
}

// ── Ticker pause on hover ──
const ticker = document.querySelector('.ticker__track');
if (ticker) {
  ticker.parentElement.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
  ticker.parentElement.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}
