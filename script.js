/**
 * ========================================================
 * MUTHULAKSHMI - PORTFOLIO INTERACTIVE JAVASCRIPT
 * Features:
 * - Dynamic Role Typing Animation
 * - Sticky Navbar & Reading Progress Bar
 * - Mobile Menu Drawer Toggle
 * - Scroll Spy (Active Navigation Highlighting)
 * - Skills Category Filtering
 * - Project Deep-Dive Modal Popups
 * - Real Resume Download Generator & Modal Preview
 * - Form Validation & Client Feedback
 * - Scroll-Triggered Reveal Animations
 * - Back to Top Button
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------
  // 1. DYNAMIC HERO ROLE TYPING ANIMATION
  // --------------------------------------------------------
  const dynamicRoleElement = document.getElementById('dynamicRole');
  const roles = [
    "Aspiring AI & ML Engineer",
    "B.Sc. Computer Science Graduate",
    "Python & Machine Learning Developer",
    "Data Analytics Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;
  let erasingDelay = 50;
  let newRoleDelay = 2000;

  function typeRoleEffect() {
    if (!dynamicRoleElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      // Remove a character
      dynamicRoleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Add a character
      dynamicRoleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    // Determine speed
    let nextDelay = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentRole.length) {
      // Finished typing current role, pause before erasing
      nextDelay = newRoleDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished erasing, move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      nextDelay = 500;
    }

    setTimeout(typeRoleEffect, nextDelay);
  }

  // Start the typing effect
  typeRoleEffect();


  // --------------------------------------------------------
  // 2. SCROLL PROGRESS BAR & STICKY NAVBAR
  // --------------------------------------------------------
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const navbarWrapper = document.getElementById('navbarWrapper');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Update scroll progress bar
    if (scrollProgressBar && scrollHeight > 0) {
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Sticky Navbar styling on scroll
    if (navbarWrapper) {
      if (scrollTop > 50) {
        navbarWrapper.classList.add('scrolled');
      } else {
        navbarWrapper.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to top action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // --------------------------------------------------------
  // 3. MOBILE MENU DRAWER TOGGLE
  // --------------------------------------------------------
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseLinks = document.querySelectorAll('[data-close-drawer]');

  function toggleMobileMenu() {
    if (!mobileMenuToggle || !mobileDrawer) return;
    const isOpen = mobileMenuToggle.classList.toggle('open');
    mobileDrawer.classList.toggle('open');
    mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    mobileDrawer.setAttribute('aria-hidden', !isOpen);
  }

  function closeMobileMenu() {
    if (!mobileMenuToggle || !mobileDrawer) return;
    mobileMenuToggle.classList.remove('open');
    mobileDrawer.classList.remove('open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }

  drawerCloseLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });


  // --------------------------------------------------------
  // 4. ACTIVE NAVIGATION LINK ON SCROLL (SCROLL SPY)
  // --------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);


  // --------------------------------------------------------
  // 5. SKILLS FILTER TABS
  // --------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });


  // --------------------------------------------------------
  // 6. PROJECT DETAILS MODAL
  // --------------------------------------------------------
  const projectModalOverlay = document.getElementById('projectModalOverlay');
  const projectModalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalContent');
  const projectModalTriggers = document.querySelectorAll('[data-project-modal]');

  // Detailed Project Data
  const projectsData = {
    laptop: {
      title: "Laptop Price Prediction using Random Forest",
      category: "Machine Learning & Python",
      image: "assets/laptop-project.jpg",
      description: "A machine learning project built to predict the current market price of laptops based on hardware configurations. Designed to assist consumers and retailers in estimating accurate valuation without manual guesswork.",
      keyHighlights: [
        "Collected and preprocessed a comprehensive laptop specifications dataset with features like Processor, RAM, Storage (SSD/HDD), GPU, Display resolution, and Brand.",
        "Implemented Exploratory Data Analysis (EDA) using Pandas & NumPy to analyze feature correlation and detect price outliers.",
        "Applied categorical encoding (One-Hot Encoding) and feature scaling for optimal model convergence.",
        "Trained multiple regression models including Linear Regression and Random Forest Regressor; achieved superior performance and high R² score with Random Forest.",
        "Evaluated model accuracy using Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE)."
      ],
      tools: ["Python", "Scikit-learn", "Random Forest Regressor", "Pandas", "NumPy", "Jupyter Notebook"],
      githubUrl: "https://github.com/your-username/laptop-price-prediction"
    },
    servease: {
      title: "ServEase - Home Service Booking Platform",
      category: "Full-Stack Web Development",
      image: "assets/servease-project.jpg",
      description: "A responsive, modern web application connecting homeowners with qualified local technicians (electricians, plumbers, cleaners, and appliance specialists). Features real-time price estimation and booking scheduling.",
      keyHighlights: [
        "Engineered an intuitive multi-step service booking UI with category selectors and interactive date/time calendar scheduling.",
        "Created an interactive cost estimation calculator that computes real-time pricing based on selected hours and task difficulty.",
        "Designed clean, responsive layouts using semantic HTML5, custom modern CSS3 (Flexbox/Grid), and vanilla JavaScript.",
        "Implemented robust client-side form validation and accessible error feedback for seamless user booking.",
        "Optimized page load speed and asset rendering for mobile and tablet devices."
      ],
      tools: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "UI/UX Prototyping"],
      githubUrl: "https://github.com/your-username/servease-platform"
    }
  };

  function openProjectModal(projectKey) {
    const data = projectsData[projectKey];
    if (!data || !modalContent || !projectModalOverlay) return;

    modalContent.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-project-img">
      <span class="modal-project-badge">${data.category}</span>
      <h3 class="modal-project-title">${data.title}</h3>
      <p class="modal-project-desc">${data.description}</p>
      
      <div class="modal-details-block">
        <h4 class="modal-block-heading">Key Project Contributions & Technical Details:</h4>
        <ul class="modal-bullet-list">
          ${data.keyHighlights.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-details-block">
        <h4 class="modal-block-heading">Technologies Used:</h4>
        <div class="project-tech-stack">
          ${data.tools.map(tool => `<span class="tech-pill">${tool}</span>`).join('')}
        </div>
      </div>

      <div class="modal-actions-footer">
        <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span>View on GitHub</span>
        </a>
        <button class="btn btn-outline btn-sm" id="btnInnerCloseModal">Close</button>
      </div>
    `;

    // Bind close button inside dynamically created modal content
    const innerClose = document.getElementById('btnInnerCloseModal');
    if (innerClose) {
      innerClose.addEventListener('click', closeProjectModal);
    }

    projectModalOverlay.classList.add('open');
    projectModalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModalOverlay) return;
    projectModalOverlay.classList.remove('open');
    projectModalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projectModalTriggers.forEach(button => {
    button.addEventListener('click', () => {
      const projectKey = button.getAttribute('data-project-modal');
      openProjectModal(projectKey);
    });
  });

  if (projectModalCloseBtn) {
    projectModalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModalOverlay) {
    projectModalOverlay.addEventListener('click', (e) => {
      if (e.target === projectModalOverlay) {
        closeProjectModal();
      }
    });
  }


  // --------------------------------------------------------
  // 7. RESUME PREVIEW & DOWNLOAD MECHANISM
  // --------------------------------------------------------
  const resumeModalOverlay = document.getElementById('resumeModalOverlay');
  const resumeModalCloseBtn = document.getElementById('resumeModalCloseBtn');
  const btnCloseResumeModal = document.getElementById('btnCloseResumeModal');
  const previewResumeTriggers = document.querySelectorAll('[data-resume-preview]');
  const downloadResumeTriggers = document.querySelectorAll('[data-resume-trigger]');

  function openResumeModal() {
    if (!resumeModalOverlay) return;
    resumeModalOverlay.classList.add('open');
    resumeModalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeResumeModal() {
    if (!resumeModalOverlay) return;
    resumeModalOverlay.classList.remove('open');
    resumeModalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  previewResumeTriggers.forEach(btn => {
    btn.addEventListener('click', openResumeModal);
  });

  if (resumeModalCloseBtn) resumeModalCloseBtn.addEventListener('click', closeResumeModal);
  if (btnCloseResumeModal) btnCloseResumeModal.addEventListener('click', closeResumeModal);

  if (resumeModalOverlay) {
    resumeModalOverlay.addEventListener('click', (e) => {
      if (e.target === resumeModalOverlay) {
        closeResumeModal();
      }
    });
  }

  // Generates and triggers actual downloadable Resume file
  function handleDownloadResume() {
    const resumeTextContent = `===========================================================
MUTHULAKSHMI - RESUME
Aspiring AI and Machine Learning Engineer
===========================================================
Email: your.email@example.com (Editable)
LinkedIn: https://linkedin.com/in/your-profile-here
GitHub: https://github.com/your-username
Location: Tamil Nadu, India

-----------------------------------------------------------
CAREER OBJECTIVE
-----------------------------------------------------------
Ambitious and enthusiastic B.Sc. Computer Science graduate seeking
an entry-level AI & Machine Learning Engineer role. Eager to apply
skills in Python, Scikit-learn, Random Forest Regression, and responsive
web development to design intelligent and scalable solutions.

-----------------------------------------------------------
EDUCATION
-----------------------------------------------------------
Bachelor of Science in Computer Science (B.Sc. CS)
College / University: [Your College / University Name Here]
Graduation Year: [2026]
Relevant Coursework:
- Data Structures & Algorithms
- Object-Oriented Programming (Python)
- Database Management Systems (DBMS)
- Web Technologies
- Mathematics & Statistical Methods for Computing

-----------------------------------------------------------
TECHNICAL SKILLS
-----------------------------------------------------------
- Programming: Python, JavaScript, HTML5, CSS3
- Machine Learning: Scikit-learn, Random Forest Regression, Data Preprocessing, Feature Engineering
- Libraries & Tools: Pandas, NumPy, Canva, Git, GitHub, VS Code, Jupyter Notebook

-----------------------------------------------------------
INTERNSHIPS & PRACTICAL EXPERIENCE
-----------------------------------------------------------
1. AI & Machine Learning Intern - Swordnex
   - Trained and evaluated machine learning models using Python and Scikit-learn.
   - Handled dataset preprocessing, missing values, feature scaling, and performance analysis.

2. Web Development Intern - Vaagai Infotech
   - Developed responsive web interfaces using HTML5, CSS3, and JavaScript.
   - Focused on cross-device responsiveness, clean code, and user experience.

-----------------------------------------------------------
PROJECTS
-----------------------------------------------------------
1. Laptop Price Prediction (Python & Scikit-learn)
   - Built a supervised machine learning regression pipeline using Random Forest.
   - Accurately predicted laptop market prices based on hardware specifications.
   - Conducted feature importance analysis and model evaluation (MAE / RMSE).

2. ServEase - Home Service Booking Platform (HTML, CSS, JavaScript)
   - Designed a responsive domestic service booking portal.
   - Implemented real-time cost calculation, interactive scheduling, and form validation.

===========================================================
`;

    // Create a Blob and trigger a download
    const blob = new Blob([resumeTextContent], { type: 'text/plain;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadUrl;
    downloadLink.download = 'Muthulakshmi_Resume.txt';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadUrl);

    showToast("📄 Resume downloaded successfully! You can replace it with your PDF anytime.");
  }

  downloadResumeTriggers.forEach(btn => {
    btn.addEventListener('click', handleDownloadResume);
  });


  // --------------------------------------------------------
  // 8. CONTACT FORM VALIDATION & SUBMISSION
  // --------------------------------------------------------
  const contactForm = document.getElementById('portfolioContactForm');
  const senderName = document.getElementById('senderName');
  const senderEmail = document.getElementById('senderEmail');
  const senderMessage = document.getElementById('senderMessage');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formFeedback = document.getElementById('formFeedbackMessage');
  const submitBtn = document.getElementById('btnSubmitContact');

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear past errors
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      formFeedback.textContent = '';
      formFeedback.className = 'form-feedback-message';

      // Name validation
      if (!senderName.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        isValid = false;
      }

      // Email validation
      if (!senderEmail.value.trim()) {
        emailError.textContent = 'Please enter your email address.';
        isValid = false;
      } else if (!validateEmail(senderEmail.value.trim())) {
        emailError.textContent = 'Please provide a valid email format (e.g. name@domain.com).';
        isValid = false;
      }

      // Message validation
      if (!senderMessage.value.trim()) {
        messageError.textContent = 'Please write a brief message.';
        isValid = false;
      } else if (senderMessage.value.trim().length < 10) {
        messageError.textContent = 'Message should be at least 10 characters long.';
        isValid = false;
      }

      if (isValid) {
        // Show sending state
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Sending...</span>`;

        // Simulate successful dispatch
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;

          formFeedback.textContent = `Thank you, ${senderName.value.trim()}! Your message has been prepared. Muthulakshmi will reply soon.`;
          formFeedback.classList.add('success');

          showToast("✉️ Message sent successfully! Thank you for connecting.");

          // Reset inputs
          contactForm.reset();

          // Hide feedback after 6 seconds
          setTimeout(() => {
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback-message';
          }, 6000);
        }, 800);
      }
    });
  }


  // --------------------------------------------------------
  // 9. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // --------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-element');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }


  // --------------------------------------------------------
  // 10. REUSABLE TOAST NOTIFICATION
  // --------------------------------------------------------
  function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 4000);
  }

  // Escape key listener for closing modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeResumeModal();
      closeMobileMenu();
    }
  });

  // Profile image error fallback handler (ensures clean placeholder if assets/profile.jpg is missing)
  const heroProfileImg = document.getElementById('heroProfileImg');
  const profilePlaceholder = document.getElementById('profilePlaceholder');
  if (heroProfileImg && profilePlaceholder) {
    heroProfileImg.addEventListener('error', () => {
      heroProfileImg.style.display = 'none';
      profilePlaceholder.style.display = 'flex';
    });

    if (heroProfileImg.complete && heroProfileImg.naturalWidth === 0) {
      heroProfileImg.style.display = 'none';
      profilePlaceholder.style.display = 'flex';
    }
  }

  // Dynamic current year in footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
