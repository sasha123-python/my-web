"use strict";

/* ===============================
   Smooth Scroll Navigation
================================= */
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


/* ===============================
   Navbar shrink on scroll
================================= */
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.style.padding = "12px 60px";
    nav.style.background = "rgba(0,0,0,0.85)";
  } else {
    nav.style.padding = "20px 60px";
    nav.style.background = "rgba(0,0,0,0.6)";
  }
});


/* ===============================
   Reveal animation on scroll
================================= */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".fade").forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});


/* ===============================
   Button hover glow effect
================================= */
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btn.style.background =
      `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3), transparent 40%)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.background = "";
  });
});


/* ===============================
   Image Lightbox (Portfolio)
================================= */
const images = document.querySelectorAll(".gallery img");

const lightbox = document.createElement("div");
lightbox.style.position = "fixed";
lightbox.style.inset = "0";
lightbox.style.background = "rgba(0,0,0,0.9)";
lightbox.style.display = "none";
lightbox.style.alignItems = "center";
lightbox.style.justifyContent = "center";
lightbox.style.zIndex = "2000";

const lightboxImg = document.createElement("img");
lightboxImg.style.maxWidth = "90%";
lightboxImg.style.maxHeight = "90%";
lightboxImg.style.borderRadius = "10px";

lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

/* Close on ESC */
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && lightboxOpen) {
    closeLightbox();
    history.back();
  }
});
