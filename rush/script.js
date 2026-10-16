// RTAF Fighter Aircraft — JavaScript interactions
// 1) Mobile navigation opens/closes and closes after a link is selected.
// 2) Aircraft cards reveal quick facts when their buttons are clicked.
// 3) The active navigation link updates as the reader scrolls.
// 4) The footer year updates automatically.

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const navItems = document.querySelectorAll(".nav-links a");

// Toggle the mobile menu.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after selecting a section.
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Expand/collapse the extra facts on each aircraft card.
document.querySelectorAll(".details-button").forEach((button) => {
  button.addEventListener("click", () => {
    const aircraftId = button.dataset.aircraft;
    const details = document.querySelector(`#details-${aircraftId}`);
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isExpanded));
    details.hidden = isExpanded;
    button.querySelector("span").textContent = isExpanded ? "＋" : "−";
    button.firstChild.textContent = isExpanded ? "Read quick facts " : "Hide quick facts ";
  });
});

// Highlight the nav item for the section currently in view.
const observedSections = document.querySelectorAll("#overview, #aircraft, #mission");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((link) => {
        const matches = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", matches);
      });
    }
  });
}, { rootMargin: "-30% 0px -55% 0px" });

observedSections.forEach((section) => sectionObserver.observe(section));

// Keep the footer's copyright year current without manual edits.
document.querySelector("#year").textContent = new Date().getFullYear();
