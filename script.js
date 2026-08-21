// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// 1. Sticky Navbar Effect on Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// 2. Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close menu on nav item click
  document.querySelectorAll('.mobile-nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// 3. Dynamic Cycling Hero Roles
const roles = [
  'DevOps & CI/CD Pipelines',
  'AWS Cloud Architecture',
  'Docker & Container Orchestration',
  'Kubernetes Deployments',
  'Prometheus & Grafana Telemetry',
  'Linux System Administration',
];
let currentRoleIdx = 0;
const roleRotator = document.getElementById('role-rotator');
if (roleRotator) {
  setInterval(() => {
    currentRoleIdx = (currentRoleIdx + 1) % roles.length;
    roleRotator.style.opacity = '0';
    setTimeout(() => {
      roleRotator.textContent = roles[currentRoleIdx];
      roleRotator.style.opacity = '1';
    }, 200);
  }, 2800);
}

// 4. Spotlight Tabs Switcher
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-tab');

    tabButtons.forEach((b) => b.classList.remove('active'));
    tabContents.forEach((c) => c.classList.remove('active'));

    btn.classList.add('active');
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  });
});

// 5. Projects Filter Buttons
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach((card) => {
      const categories = card.getAttribute('data-category') || '';
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// 6. Interactive Terminal CLI
const terminalForm = document.getElementById('terminal-form');
const terminalInput = document.getElementById('terminal-input');
const terminalScreen = document.getElementById('terminal-screen');
const resetTerminalBtn = document.getElementById('reset-terminal');
const copyEmailCliBtn = document.getElementById('copy-email-cli');

const portfolioData = {
  email: 'jitendermahlawat696@gmail.com',
  name: 'Jitender Mahlawat',
  github: 'https://github.com/jitender81',
  linkedin: 'https://www.linkedin.com/in/jitender-mahlawat-64303b259/',
  website: 'https://jitender.ddns.net',
};

function executeCommand(cmd) {
  const trimmed = cmd.trim().toLowerCase();
  if (!trimmed) return;

  // Add User Command Line
  const cmdRow = document.createElement('div');
  cmdRow.className = 'term-line';
  cmdRow.innerHTML = `
    <div class="term-cmd-row">
      <span class="text-emerald">➜</span>
      <span class="text-slate">~</span>
      <span class="font-bold text-cyan">${cmd}</span>
    </div>
  `;

  let responseHtml = '';

  switch (trimmed) {
    case 'help':
      responseHtml = `
        <div class="output-text space-y-1">
          <div class="text-cyan font-bold">Available Commands:</div>
          <div><span class="text-emerald font-bold">about</span> - Background summary & engineering focus</div>
          <div><span class="text-emerald font-bold">pipeline</span> - PulseHealth CI/CD pipeline spec</div>
          <div><span class="text-emerald font-bold">projects</span> - List of deployed engineering projects</div>
          <div><span class="text-emerald font-bold">stack</span> - Overview of technical skills & tools</div>
          <div><span class="text-emerald font-bold">contact</span> - Direct email & social links</div>
          <div><span class="text-emerald font-bold">clear</span> - Clear terminal output</div>
        </div>
      `;
      break;

    case 'about':
      responseHtml = `
        <div class="output-text">
          <div class="text-white font-bold">${portfolioData.name}</div>
          <div class="text-cyan">DevOps & Cloud Engineer</div>
          <div class="text-slate-400 mt-1">Specializing in automated Jenkins CI/CD pipelines, AWS EC2 deployments, Docker containers, Kubernetes, and Prometheus/Grafana observability.</div>
        </div>
      `;
      break;

    case 'pipeline':
      responseHtml = `
        <div class="output-text">
          <div class="text-cyan font-bold">PulseHealth Production CI/CD Pipeline:</div>
          <div style="background:#0b1120; padding:6px 10px; border-radius:6px; margin:4px 0; color:#10b981; border:1px solid #1e293b;">
            GitHub → Webhook → Jenkins → SonarQube → Docker Build → DockerHub → AWS EC2
          </div>
          <div class="text-slate-400">Monitoring: Prometheus + Node Exporter → Grafana Dashboards</div>
        </div>
      `;
      break;

    case 'projects':
      responseHtml = `
        <div class="output-text">
          <div class="text-cyan font-bold mb-1">Featured Projects:</div>
          <div class="mb-1.5">• <strong>Hospital Dashboard (PulseHealth)</strong> [FastAPI + React + Jenkins + AWS EC2 + Prometheus]</div>
          <div class="mb-1.5">• <strong>DevOps Portfolio</strong> [Docker + AWS EC2 + Nginx SSL + Jenkins]</div>
          <div>• <strong>Automated Email Dispatcher Engine</strong> [Python + SMTP + Cron]</div>
        </div>
      `;
      break;

    case 'stack':
      responseHtml = `
        <div class="output-text">
          <div class="text-cyan font-bold mb-1">Technical Stack:</div>
          <div>• <strong>CI/CD:</strong> Jenkins, SonarQube, GitHub Webhooks, DockerHub</div>
          <div>• <strong>Cloud & OS:</strong> AWS (EC2, VPC), Linux/Ubuntu, Docker, Kubernetes, Terraform</div>
          <div>• <strong>Observability:</strong> Prometheus, Node Exporter, Grafana</div>
          <div>• <strong>Full-Stack:</strong> Python/FastAPI, React/TypeScript, MongoDB Atlas, Nginx SSL</div>
        </div>
      `;
      break;

    case 'contact':
      responseHtml = `
        <div class="output-text">
          <div class="text-cyan font-bold mb-1">Contact Details:</div>
          <div>Email: <a href="mailto:${portfolioData.email}" class="text-white">${portfolioData.email}</a></div>
          <div>LinkedIn: <a href="${portfolioData.linkedin}" target="_blank" class="text-cyan">${portfolioData.linkedin}</a></div>
          <div>GitHub: <a href="${portfolioData.github}" target="_blank" class="text-cyan">${portfolioData.github}</a></div>
          <div>Domain: <a href="${portfolioData.website}" target="_blank" class="text-emerald">${portfolioData.website}</a></div>
        </div>
      `;
      break;

    case 'clear':
      terminalScreen.innerHTML = '';
      return;

    default:
      responseHtml = `
        <div class="output-text text-rose">
          Command not found: '${trimmed}'. Type <span class="text-cyan font-bold cursor-pointer" onclick="document.getElementById('terminal-input').value='help'; document.getElementById('terminal-form').dispatchEvent(new Event('submit'));">help</span> for commands.
        </div>
      `;
  }

  cmdRow.innerHTML += responseHtml;
  terminalScreen.appendChild(cmdRow);
  terminalScreen.scrollTop = terminalScreen.scrollHeight;
}

if (terminalForm && terminalInput) {
  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    executeCommand(terminalInput.value);
    terminalInput.value = '';
  });
}

if (resetTerminalBtn && terminalScreen) {
  resetTerminalBtn.addEventListener('click', () => {
    terminalScreen.innerHTML = `
      <div class="term-line output-text">
        <div class="text-cyan font-bold">Jitender Mahlawat :: DevOps & Cloud Engineer CLI v2.4</div>
        <div class="text-slate-400">Type <span class="text-emerald font-bold">'help'</span> to view available commands.</div>
      </div>
    `;
  });
}

// 7. Clipboard Copy Buttons
function copyText(text, btnElement, successLabel = 'Copied!') {
  navigator.clipboard.writeText(text).then(() => {
    const originalHtml = btnElement.innerHTML;
    btnElement.innerHTML = `<i data-lucide="check"></i> <span>${successLabel}</span>`;
    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => {
      btnElement.innerHTML = originalHtml;
      if (window.lucide) window.lucide.createIcons();
    }, 2000);
  });
}

const copyEmailBtn = document.getElementById('copy-email-btn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', () => {
    copyText(portfolioData.email, copyEmailBtn, 'Copied!');
  });
}

if (copyEmailCliBtn) {
  copyEmailCliBtn.addEventListener('click', () => {
    copyText(portfolioData.email, copyEmailCliBtn, 'Copied');
  });
}

// 8. Contact Form Handler (Direct Mailto)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const message = document.getElementById('form-message').value;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:${portfolioData.email}?subject=${subject}&body=${body}`;
  });
}

// 9. Scroll to Top
const scrollTopBtn = document.getElementById('scroll-to-top');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
