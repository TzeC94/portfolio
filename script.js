const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));


// Work profile timed slideshow
const profileSlider = document.querySelector(".profile-slider");
if (profileSlider) {
  const tabs = Array.from(profileSlider.querySelectorAll(".profile-slide-tabs button"));
  const slides = Array.from(profileSlider.querySelectorAll(".profile-slide"));
  let activeProfileSlide = 0;
  let profileSlideTimer = null;

  const showProfileSlide = (index) => {
    activeProfileSlide = (index + slides.length) % slides.length;
    tabs.forEach((tab, i) => tab.classList.toggle("active", i === activeProfileSlide));
    slides.forEach((slide, i) => slide.classList.toggle("active", i === activeProfileSlide));
  };

  const startProfileTimer = () => {
    window.clearInterval(profileSlideTimer);
    profileSlideTimer = window.setInterval(() => {
      showProfileSlide(activeProfileSlide + 1);
    }, 6500);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      showProfileSlide(index);
      startProfileTimer();
    });
  });

  showProfileSlide(0);
  startProfileTimer();
}


// Homepage project-card external links
document.querySelectorAll(".external-project-link[data-url]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(link.dataset.url, "_blank", "noopener,noreferrer");
  });
});
