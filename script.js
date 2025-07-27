document.addEventListener("DOMContentLoaded", () => {
  // Wait for lucide to be available
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  } else {
    // Retry until lucide is available
    const interval = setInterval(() => {
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
        clearInterval(interval);
      }
    }, 50);
  }

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Newsletter form handling
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Submitting...";
      submitBtn.disabled = true;

      setTimeout(() => {
        alert(`Thank you! We'll be in touch at ${email}`);
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }

  // Scroll animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up");
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  document.querySelectorAll(".bg-gray-800").forEach(el => {
    observer.observe(el);
  });

  // Header scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("bg-gray-900");
    } else {
      header.classList.remove("bg-gray-900");
    }
  });

  // Mobile menu toggle (if you implement it)
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }
});

// Example contact handler (future use)
function handleContactForm(formData) {
  console.log("Contact form submitted:", formData);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, message: "Thank you for your message!" });
    }, 1000);
  });
}

// Simple event tracking
function trackEvent(eventName, properties = {}) {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", eventName, properties);
  }
  console.log("Event tracked:", eventName, properties);
}

document.addEventListener("click", (e) => {
  if (e.target.matches("button") || e.target.matches('a[href^="#"]')) {
    trackEvent("button_click", {
      button_text: e.target.textContent.trim(),
      button_location: e.target.closest("section")?.id || "unknown",
    });
  }
});
