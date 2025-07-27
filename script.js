// Import Lucide icons library
const lucide = window.lucide;

// Import Google Analytics gtag function (if using Google Analytics)
// window.gtag = function() { /* Your gtag implementation here */ };

// Initialize Lucide icons
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons()

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Newsletter form submission
  const newsletterForm = document.getElementById("newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value

      // Add loading state
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Submitting..."
      submitBtn.disabled = true

      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        alert(`Thank you! We'll be in touch at ${email}`)
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 1000)
    })
  }

  // Add scroll-based animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up")
      }
    })
  }, observerOptions)

  // Observe service cards and other elements
  document.querySelectorAll(".bg-gray-800").forEach((el) => {
    observer.observe(el)
  })

  // Header background on scroll
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("bg-gray-900")
    } else {
      header.classList.remove("bg-gray-900")
    }
  })

  // Mobile menu toggle (for future expansion)
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  }
})

// Contact form handling (if you add a contact form later)
function handleContactForm(formData) {
  // This would typically send data to a backend service
  console.log("Contact form submitted:", formData)

  // For GitHub Pages, you might want to integrate with:
  // - Formspree (https://formspree.io/)
  // - Netlify Forms
  // - EmailJS (https://www.emailjs.com/)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Thank you for your message!" })
    }, 1000)
  })
}

// Analytics tracking (replace with your preferred analytics)
function trackEvent(eventName, properties = {}) {
  // Example: Google Analytics 4
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", eventName, properties)
  }

  // Example: Custom analytics
  console.log("Event tracked:", eventName, properties)
}

// Track button clicks
document.addEventListener("click", (e) => {
  if (e.target.matches("button") || e.target.matches('a[href^="#"]')) {
    trackEvent("button_click", {
      button_text: e.target.textContent.trim(),
      button_location: e.target.closest("section")?.id || "unknown",
    })
  }
})
