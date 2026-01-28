// Icons
if (window.feather) feather.replace();

// Smooth scroll
try {
  new SmoothScroll('a[href*="#"]', { speed: 650, speedAsDuration: true });
} catch (e) {}

// Mobile nav toggle
(function () {
  const triggers = document.querySelectorAll('[data-toggle="toggle-nav"]');
  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSel = btn.getAttribute('data-target');
      const target = document.querySelector(targetSel);
      if (!target) return;
      target.classList.toggle('hidden');
    });
  });
})();

// Slick slider
$(document).ready(function () {
  if ($("#slider-1").length) {
    $("#slider-1").slick({
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 4500,
      adaptiveHeight: true,
      pauseOnHover: true,
      infinite: true
    });

    $(".prev").on("click", function () {
      $("#slider-1").slick("slickPrev");
    });

    $(".next").on("click", function () {
      $("#slider-1").slick("slickNext");
    });
  }
});

// Footer year ✅ (esto era lo que pegaste)
(function () {
  const el = document.getElementById("nv-year");
  if (el) el.textContent = String(new Date().getFullYear());
})();
