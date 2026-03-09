
      const hamburger = document.querySelector(".hamburger");
      const navLinks = document.querySelector(".nav-links");

      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.innerHTML = navLinks.classList.contains("active")
          ? '<i class="fas fa-times"></i>'
          : '<i class="fas fa-bars"></i>';
      });

      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
          if (window.innerWidth <= 768) {
            navLinks.classList.remove("active");
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
          }
        });
      });

      const header = document.getElementById("header");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }, { passive: true });

      const backToTopBtn = document.getElementById("backToTop");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add("visible");
        } else {
          backToTopBtn.classList.remove("visible");
        }
      }, { passive: true });

      backToTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      const progressBar = document.getElementById("progressBar");
      window.addEventListener("scroll", () => {
        const windowHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + "%";
      }, { passive: true });

      const typedTextSpan = document.getElementById("typed-text");
      const textArray = [
        "Software Engineer",
        "Full-Stack Developer",
        "Penetration Tester",
        "Database Administrator",
        "Software Developer",
        "System Administrator",
        "ICT Technician",
        "Problem Solver",
        "Tech Innovator",
      ];
      const typingDelay = 100;
      const erasingDelay = 50;
      const newTextDelay = 1500;
      let textArrayIndex = 0;
      let charIndex = 0;

      function type() {
        if (charIndex < textArray[textArrayIndex].length) {
          typedTextSpan.textContent +=
            textArray[textArrayIndex].charAt(charIndex);
          charIndex++;
          setTimeout(type, typingDelay);
        } else {
          setTimeout(erase, newTextDelay);
        }
      }

      function erase() {
        if (charIndex > 0) {
          typedTextSpan.textContent = textArray[textArrayIndex].substring(
            0,
            charIndex - 1,
          );
          charIndex--;
          setTimeout(erase, erasingDelay);
        } else {
          textArrayIndex++;
          if (textArrayIndex >= textArray.length) textArrayIndex = 0;
          setTimeout(type, typingDelay + 500);
        }
      }

      document.addEventListener("DOMContentLoaded", function () {
        // Defer non-critical animations
        setTimeout(() => {
          if (textArray.length) setTimeout(type, newTextDelay + 250);
        }, 100);
      });

      const counters = document.querySelectorAll(".stat-number");
      const speed = 200;

      function animateCounters() {
        counters.forEach((counter) => {
          const target =
            +counter.getAttribute("data-target") || +counter.innerText;
          const count = +counter.innerText;
          const increment = Math.ceil(target / speed);

          if (count < target) {
            counter.innerText = count + increment;
            setTimeout(() => animateCounters(), 1);
          } else {
            counter.innerText = target;
          }
        });
      }

      const aboutSection = document.getElementById("about");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Use requestAnimationFrame for smoother animation
              requestAnimationFrame(() => {
                animateCounters();
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 },
      );

      observer.observe(aboutSection);

      document.getElementById("project-count").setAttribute("data-target", "4");
      document
        .getElementById("certificate-count")
        .setAttribute("data-target", "4");

      const skillsSection = document.getElementById("skills");
      const skillObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              document
                .querySelectorAll(".skill-progress-bar")
                .forEach((bar) => {
                  const width = bar.getAttribute("data-width");
                  bar.style.width = width + "%";
                });
              skillObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 },
      );

      skillObserver.observe(skillsSection);

      // Scroll-triggered animations
      const animationObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, animationObserverOptions);

      // Add animation classes to elements
      document.querySelectorAll('.testimonial-card, .project-card, .certification-card').forEach(card => {
        card.classList.add('fade-in');
        animationObserver.observe(card);
      });

      document.querySelectorAll('.skill-category').forEach(category => {
        category.classList.add('slide-in-left');
        animationObserver.observe(category);
      });

      const contactForm = document.getElementById("contactForm");
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");
      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const messageError = document.getElementById("messageError");
      const formSuccess = document.getElementById("formSuccess");
      const formLoading = document.getElementById("formLoading");

      function isValidEmail(email) {
        const re =
          /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        nameError.style.display = "none";
        emailError.style.display = "none";
        messageError.style.display = "none";

        if (!nameInput.value.trim()) {
          nameError.style.display = "block";
          isValid = false;
        }

        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
          emailError.style.display = "block";
          isValid = false;
        }

        if (!messageInput.value.trim()) {
          messageError.style.display = "block";
          isValid = false;
        }

        if (isValid) {
          formLoading.style.display = "block";

          setTimeout(() => {
            formLoading.style.display = "none";

            const name = nameInput.value;
            const email = emailInput.value;
            const message = messageInput.value;

            const subject = `Message from ${name} - Portfolio Contact Form`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

            window.location.href = `mailto:bafanamay585@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            formSuccess.style.display = "block";

            contactForm.reset();

            setTimeout(() => {
              formSuccess.style.display = "none";
            }, 5000);
          }, 1500);
        }
      });

      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: "smooth",
            });
          }
        });
      });

      document.querySelectorAll(".btn-cisco").forEach((button) => {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          const certType = this.getAttribute("href").substring(1);
          alert(
            `In a real implementation, this would show your ${certType.replace("-", " ")} certificate. For now, you can replace this with a link to your actual certificate.`,
          );
        });
      });

      const themeToggle = document.getElementById("themeToggle");
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );

      const currentTheme =
        localStorage.getItem("theme") ||
        (prefersDarkScheme.matches ? "dark" : "light");

      if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }

      themeToggle.addEventListener("click", () => {
        if (document.body.classList.contains("dark-theme")) {
          document.body.classList.remove("dark-theme");
          localStorage.setItem("theme", "light");
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
          document.body.classList.add("dark-theme");
          localStorage.setItem("theme", "dark");
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
      });
      // Performance monitoring
      window.addEventListener('load', () => {
        if ('performance' in window) {
          const perfData = performance.getEntriesByType('navigation')[0];
          const loadTime = perfData.loadEventEnd - perfData.fetchStart;
          console.log(`Page load time: ${loadTime}ms`);
        }

        // Register service worker with delay to not block initial load
        if ('serviceWorker' in navigator) {
          setTimeout(() => {
            navigator.serviceWorker.register('/sw.js')
              .then((registration) => {
                console.log('ServiceWorker registration successful');
              })
              .catch((error) => {
                console.log('ServiceWorker registration failed');
              });
          }, 2000);
        }
      });
