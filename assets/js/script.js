(function () {
  "use strict";

  function initNetVora() {

    /* =========================================================
       1. FEATHER ICONS
    ========================================================= */

    function renderIcons() {
      if (window.feather && typeof window.feather.replace === "function") {
        window.feather.replace();
      }
    }

    renderIcons();


    /* =========================================================
       2. AÑO AUTOMÁTICO
    ========================================================= */

    var year = document.getElementById("nvYear");

    if (year) {
      year.textContent = new Date().getFullYear();
    }


    /* =========================================================
       3. MENÚ MOBILE
    ========================================================= */

    var menuButton = document.getElementById("nvMobileMenu");
    var navLinks = document.getElementById("nvNavLinks");

    function closeMobileMenu() {
      if (!menuButton || !navLinks) return;

      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");

      menuButton.innerHTML = '<i data-feather="menu"></i>';

      renderIcons();
    }

    function openMobileMenu() {
      if (!menuButton || !navLinks) return;

      navLinks.classList.add("open");
      menuButton.setAttribute("aria-expanded", "true");

      menuButton.innerHTML = '<i data-feather="x"></i>';

      renderIcons();
    }

    if (menuButton && navLinks) {

      menuButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        var isOpen = navLinks.classList.contains("open");

        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });


      var mobileLinks = navLinks.querySelectorAll("a");

      mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          closeMobileMenu();
        });
      });


      document.addEventListener("click", function (event) {

        if (
          navLinks.classList.contains("open") &&
          !navLinks.contains(event.target) &&
          !menuButton.contains(event.target)
        ) {
          closeMobileMenu();
        }

      });


      window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {
          closeMobileMenu();
        }

      });

    }


    /* =========================================================
       4. FAQ
    ========================================================= */

    var faqItems = document.querySelectorAll(".nv-faq-item");

    faqItems.forEach(function (item) {

      var question = item.querySelector(".nv-faq-question");
      var answer = item.querySelector(".nv-faq-answer");

      if (!question || !answer) return;


      question.addEventListener("click", function () {

        var isOpen = item.classList.contains("open");


        /* CERRAR TODAS */
        faqItems.forEach(function (otherItem) {

          var otherQuestion =
            otherItem.querySelector(".nv-faq-question");

          var otherAnswer =
            otherItem.querySelector(".nv-faq-answer");


          otherItem.classList.remove("open");


          if (otherQuestion) {
            otherQuestion.setAttribute(
              "aria-expanded",
              "false"
            );
          }


          if (otherAnswer) {
            otherAnswer.style.maxHeight = "0px";
          }

        });


        /* ABRIR ACTUAL */
        if (!isOpen) {

          item.classList.add("open");

          question.setAttribute(
            "aria-expanded",
            "true"
          );

          answer.style.maxHeight =
            answer.scrollHeight + "px";
        }

      });

    });


    /* =========================================================
       5. SMOOTH SCROLL
    ========================================================= */

    var anchorLinks =
      document.querySelectorAll('a[href^="#"]');


    anchorLinks.forEach(function (link) {

      link.addEventListener("click", function (event) {

        var href = link.getAttribute("href");


        if (
          !href ||
          href === "#" ||
          href.length < 2
        ) {
          return;
        }


        var target;

        try {
          target = document.querySelector(href);
        } catch (error) {
          return;
        }


        if (!target) return;


        event.preventDefault();


        var nav =
          document.querySelector(".nv-nav");


        var navHeight =
          nav ? nav.offsetHeight : 0;


        var targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight -
          15;


        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });


        closeMobileMenu();

      });

    });


    /* =========================================================
       6. NAVBAR SOMBRA AL HACER SCROLL
    ========================================================= */

    var navbar =
      document.querySelector(".nv-nav");


    function updateNavbar() {

      if (!navbar) return;


      if (window.scrollY > 10) {

        navbar.classList.add(
          "nv-nav-scrolled"
        );

      } else {

        navbar.classList.remove(
          "nv-nav-scrolled"
        );

      }

    }


    updateNavbar();


    window.addEventListener(
      "scroll",
      updateNavbar,
      { passive: true }
    );


    /* =========================================================
       7. ANIMACIONES AL APARECER
    ========================================================= */

    var revealElements =
      document.querySelectorAll(".nv-reveal");


    /* SI EL NAVEGADOR NO SOPORTA OBSERVER */
    if (!("IntersectionObserver" in window)) {

      revealElements.forEach(function (element) {
        element.classList.add("is-visible");
      });

    } else {

      var observer =
        new IntersectionObserver(
          function (entries, observerInstance) {

            entries.forEach(function (entry) {

              if (entry.isIntersecting) {

                entry.target.classList.add(
                  "is-visible"
                );


                observerInstance.unobserve(
                  entry.target
                );

              }

            });

          },
          {
            threshold: 0.08,
            rootMargin:
              "0px 0px -40px 0px"
          }
        );


      revealElements.forEach(function (element) {
        observer.observe(element);
      });

    }


    /* =========================================================
       8. EVITAR QUE ELEMENTOS QUEDEN INVISIBLES
       SI HAY ALGÚN PROBLEMA CON OBSERVER
    ========================================================= */

    window.setTimeout(function () {

      revealElements.forEach(
        function (element) {

          var rect =
            element.getBoundingClientRect();


          if (
            rect.top <
            window.innerHeight + 150
          ) {

            element.classList.add(
              "is-visible"
            );

          }

        }
      );

    }, 500);


    /* =========================================================
       9. FAQ RECALCULAR ALTURA EN RESIZE
    ========================================================= */

    window.addEventListener(
      "resize",
      function () {

        faqItems.forEach(
          function (item) {

            if (
              !item.classList.contains(
                "open"
              )
            ) {
              return;
            }


            var answer =
              item.querySelector(
                ".nv-faq-answer"
              );


            if (answer) {

              answer.style.maxHeight =
                answer.scrollHeight +
                "px";

            }

          }
        );

      }
    );


    console.log(
      "NetVora landing inicializada correctamente."
    );

  }


  /* =========================================================
     INICIALIZACIÓN SEGURA
  ========================================================= */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initNetVora
    );

  } else {

    initNetVora();

  }

})();