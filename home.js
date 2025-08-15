/* ================================
   home.js - Funcionalidades de la página principal
   Incluye:
   1. Contador regresivo en el banner
   2. Filtro de categorías (chips)
   3. Toggle de favoritos en productos
==================================*/

/* ====== 1. CONTADOR REGRESIVO DEL BANNER ====== */
// 📌 CAMBIAR: fecha objetivo para las promociones
const countdownElement = document.querySelector("[data-countdown]");
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 10); // +10 días desde hoy

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownElement.textContent = "00:00:00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // 📌 Mostramos días solo si hay más de 0
  if (days > 0) {
    countdownElement.textContent =
      `${days}d ${hours.toString().padStart(2, "0")}:` +
      `${minutes.toString().padStart(2, "0")}:` +
      `${seconds.toString().padStart(2, "0")}`;
  } else {
    countdownElement.textContent =
      `${hours.toString().padStart(2, "0")}:` +
      `${minutes.toString().padStart(2, "0")}:` +
      `${seconds.toString().padStart(2, "0")}`;
  }
}

// Inicia el contador
if (countdownElement) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ====== 2. FILTRO DE CATEGORÍAS ====== */
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    // Quitar estado activo de todos los chips
    chips.forEach((c) => {
      c.classList.remove("active");
      c.setAttribute("aria-pressed", "false");
    });

    // Activar el chip actual
    chip.classList.add("active");
    chip.setAttribute("aria-pressed", "true");

    const filter = chip.dataset.filter;

    // Filtrar productos
    cards.forEach((card) => {
      if (filter === "all" || card.dataset.card === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* ====== 3. TOGGLE DE FAVORITOS ====== */
const favButtons = document.querySelectorAll(".fav-btn");

favButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // Evita que el click siga el enlace

    const isPressed = btn.getAttribute("aria-pressed") === "true";
    btn.setAttribute("aria-pressed", !isPressed);

    // 📌 Cambiar el color o estilo según estado
    if (!isPressed) {
      btn.style.backgroundColor = "var(--primary)";
      btn.style.color = "var(--secondary)";
    } else {
      btn.style.backgroundColor = "var(--light)";
      btn.style.color = "var(--secondary)";
    }
  });
});
