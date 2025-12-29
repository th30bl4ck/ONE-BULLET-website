(() => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Parallax (subtle) on hero background
  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onMove(e) {
    if (reduceMotion) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    parallaxEls.forEach(el => {
      const strength = Number(el.getAttribute("data-parallax") || "0.1");
      el.style.transform = `translate3d(${x * 18 * strength}px, ${y * 14 * strength}px, 0)`;
    });
  }
  window.addEventListener("mousemove", onMove);

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach(a => {
      a.addEventListener("click", () => {
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Trailer modal
  const modal = document.getElementById("trailerModal");
  const watchBtn = document.getElementById("watchTrailerBtn");

  function openModal() {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (watchBtn) watchBtn.addEventListener("click", openModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.getAttribute && target.getAttribute("data-close") === "true") {
        closeModal();
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  }

  // Smooth anchor offset (for sticky nav)
  const nav = document.querySelector(".nav-wrap");
  const navHeight = nav ? nav.offsetHeight : 64;

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
