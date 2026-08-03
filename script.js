/* ==========================================================================
   PERSONAL PORTFOLIO WEBSITE - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all dynamic modules
  initThemeAndAccent();
  initTypingEffect();
  initNavigation();
  initTabbedAbout();
  initSkillAnimations();
  initPortfolioFilter();
  initProjectModal();
  initContactForm();
});

/* --- 1. Theme Mode & Accent Picker Management --- */
function initThemeAndAccent() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const accentDots = document.querySelectorAll('.accent-dot');
  
  // Saved Theme Preferences
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  const savedAccent = localStorage.getItem('portfolio-accent') || 'cyan';

  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('data-accent', savedAccent);
  updateThemeIcon(savedTheme);

  // Theme Toggle Click Event
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  // Accent Switcher Click Events
  accentDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const selectedAccent = dot.dataset.accent;
      document.documentElement.setAttribute('data-accent', selectedAccent);
      localStorage.setItem('portfolio-accent', selectedAccent);
      showToast(`Accent theme updated to ${selectedAccent.toUpperCase()}`);
    });
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

/* --- 2. Dynamic Typing Hero Animation --- */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    "DevOps Engineer",
    "Full-Stack Developer",
    "CI/CD & Cloud Automation Expert",
    "System Architecture Specialist"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let nextDelay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      nextDelay = pauseDuration;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      nextDelay = 500;
    }

    setTimeout(type, nextDelay);
  }

  type();
}

/* --- 3. Navigation & Scroll Spy --- */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Navbar Scroll Background Change
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy Active Link Detection
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      }
    });
  }

  // Close Mobile Menu on Nav Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      if (mobileToggle) {
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  });
}

/* --- 4. Tabbed About Me Switcher --- */
function initTabbedAbout() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(targetTab);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

/* --- 5. Skill Progress Fill Animation --- */
function initSkillAnimations() {
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillsSection = document.getElementById('skills');

  if (!skillsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const targetWidth = bar.dataset.progress || '85%';
          bar.style.width = targetWidth;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillsSection);
}

/* --- 6. Portfolio Filterable Gallery --- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease-in-out forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 7. Project Details Modal --- */
const projectData = {
  projectEmailSender: {
    title: "Automatic Email Sender",
    category: "DevOps & Automation",
    image: "assets/project_email_sender.jpg",
    description: "An automated email dispatch and notification engine built for high reliability. Features SMTP connection pooling, template rendering, bulk queue processing, rate limiting, and delivery analytics.",
    tags: ["DevOps", "Automation", "Python / Node.js", "SMTP", "CI/CD"],
    liveUrl: "#",
    githubUrl: "#"
  },
  project1: {
    title: "AI Analytics & Cloud Intelligence Dashboard",
    category: "DevOps & AI",
    image: "assets/project1.jpg",
    description: "A comprehensive real-time dashboard built with modern web components, interactive metrics charts, AI insights generator, and containerized microservices integration.",
    tags: ["JavaScript", "HTML5", "CSS3", "Docker", "REST APIs"],
    liveUrl: "#",
    githubUrl: "#"
  },
  project2: {
    title: "Luxury E-Commerce & Merchant Hub",
    category: "Full-Stack Web App",
    image: "assets/project2.jpg",
    description: "A high-performance online shopping ecosystem featuring instant client-side cart management, dark/light visual modes, smooth product showcase animations, and scalable backend architecture.",
    tags: ["HTML5", "Vanilla JS", "Glassmorphic UI", "Node.js"],
    liveUrl: "#",
    githubUrl: "#"
  },
  project3: {
    title: "Next-Gen Fintech & Crypto Wallet UI",
    category: "Mobile / Responsive Web UI",
    image: "assets/project3.jpg",
    description: "An intuitive web and mobile interface for asset management, transaction history tracking, real-time price updates, and secure API integration.",
    tags: ["CSS3 Flexbox/Grid", "JavaScript", "Async Fetch", "Custom Animations"],
    liveUrl: "#",
    githubUrl: "#"
  }
};

function initProjectModal() {
  const modalBackdrop = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const detailBtns = document.querySelectorAll('.view-project-btn');

  if (!modalBackdrop) return;

  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.dataset.project;
      const data = projectData[projectId];

      if (data) {
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalImage').src = data.image;
        document.getElementById('modalDesc').textContent = data.description;

        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');

        modalBackdrop.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
    }
  });
}

/* --- 8. Contact Form Handler & Toast Notification --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
      showToast("Please fill out all required fields.", "error");
      return;
    }

    // Submit Simulation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
      showToast(`Thank you, ${name}! Your message has been sent successfully to Jitender.`);
    }, 1200);
  });
}

/* Toast Utility Function */
function showToast(message, type = "success") {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}" style="color: var(--accent-primary);"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
