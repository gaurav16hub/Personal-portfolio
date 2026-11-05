// =====================================
// 1. EMAILJS INITIALIZATION
// =====================================

if (typeof emailjs !== "undefined") {
  emailjs.init({
    publicKey: "gMgznHbUsZLdMdU_g"
  });
} else {
  console.error("EmailJS library not loaded.");
}


// =====================================
// 2. MOBILE NAVIGATION MENU
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

  });

  document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");

    });

  });

}


// =====================================
// 3. ACTIVE NAVIGATION LINK
// =====================================

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {

  let currentSection = "home";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      currentSection = section.id;
    }

  });

  navigationLinks.forEach(link => {

    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + currentSection
    );

  });

}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();


// =====================================
// 4. ANIMATED INTRODUCTION
// =====================================

const typingText = document.getElementById("typingText");

if (typingText) {

  const roles = [
    "Web Developer",
    "Software Developer",
    "CSE Student",
    "Programmer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {

    const currentRole = roles[roleIndex];

    typingText.textContent = currentRole.substring(0, charIndex);

    if (!deleting) {

      charIndex++;

      if (charIndex > currentRole.length) {

        deleting = true;
        setTimeout(typeEffect, 1200);
        return;

      }

    } else {

      charIndex--;

      if (charIndex < 0) {

        deleting = false;
        charIndex = 0;
        roleIndex = (roleIndex + 1) % roles.length;

      }

    }

    setTimeout(typeEffect, deleting ? 55 : 100);

  }

  typeEffect();

}


// =====================================
// 5. DARK / LIGHT MODE
// =====================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

  const savedTheme = localStorage.getItem("portfolioTheme");

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  function updateThemeButton() {

    const isLight = document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "🌙" : "☀️";

    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );

  }

  updateThemeButton();

  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";

    localStorage.setItem("portfolioTheme", theme);

    updateThemeButton();

  });

}


// =====================================
// 6. AUTOMATIC CURRENT YEAR
// =====================================

const yearElement = document.getElementById("year");

if (yearElement) {

  yearElement.textContent = new Date().getFullYear();

}


// =====================================
// 7. CONTACT FORM WITH EMAILJS
// =====================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

  contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const button = document.getElementById("submitBtn");

    // Name validation

    if (name.length < 2) {

      formMessage.textContent = "Please enter a valid name.";
      return;

    }

    // Email validation

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

      formMessage.textContent = "Please enter a valid email address.";
      return;

    }

    // Message validation

    if (message.length < 10) {

      formMessage.textContent =
        "Message must contain at least 10 characters.";

      return;

    }

    // Check EmailJS

    if (typeof emailjs === "undefined") {

      formMessage.textContent =
        "Email service is not available. Please refresh the page.";

      return;

    }

    const originalButtonText = button.innerHTML;

    button.disabled = true;
    button.textContent = "Sending...";

    formMessage.textContent = "Sending your message...";

    try {

      // Send message through EmailJS

      await emailjs.sendForm(
        "service_u4p9r7i",
        "template_ssdqa7o",
        contactForm
      );

      formMessage.textContent =
        "Message sent successfully! Thank you for contacting me.";

      contactForm.reset();

    } catch (error) {

      console.error("EmailJS Error:", error);

      formMessage.textContent =
        "Error : " + (error.text || error.message || "Unknown error");

    } finally {

      button.disabled = false;
      button.innerHTML = originalButtonText;

    }

  });

}


// =====================================
// 8. BUTTON HOVER INTERACTION
// =====================================

document.querySelectorAll(".button").forEach(button => {

  button.addEventListener("mouseenter", () => {

    button.style.transition = "0.3s ease";

  });

});


// =====================================
// 9. CONSOLE MESSAGE
// =====================================

console.log("Welcome to Gaurav Kumar's Portfolio!");
console.log("Portfolio JavaScript loaded successfully.");