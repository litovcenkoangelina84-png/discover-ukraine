import { toursData } from "./data/tours.js";
import { reviewsData } from "./data/reviews.js";
import { Wishlist } from "./modules/wishlist.js";
import { FilterService } from "./modules/filters.js";
import { BookingModal } from "./modules/modal.js";
import { ThemeSwitcher } from "./modules/theme.js";
import { TestimonialSlider } from "./modules/slider.js";
import { Accordion } from "./modules/accordion.js";
import { createCard, renderReviews } from "./modules/render.js";

document.addEventListener("DOMContentLoaded", () => {
  // СЛАЙДЕР ВІДГУКІВ
  const sliderTrack = document.getElementById("slider-track");
  if (sliderTrack) renderReviews(sliderTrack, reviewsData);

  // ІНІЦІАЛІЗАЦІЯ МОДУЛІВ
  const wishlist = new Wishlist();
  const filters = new FilterService();
  const modal = new BookingModal();
  new ThemeSwitcher();
  new TestimonialSlider();
  new Accordion();
  modal.init();

  // КНОПКА "ВГОРУ"
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top";
  scrollTopBtn.innerHTML = "&#8679;";
  document.body.appendChild(scrollTopBtn);
  const header = document.getElementById("header");

  window.onscroll = () => {
    if (header)
      header.classList.toggle("header--scrolled", window.scrollY > 50);
    scrollTopBtn.classList.toggle("show", window.scrollY > 300);
  };
  scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // БУРГЕР МЕНЮ
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  if (burger && nav) {
    burger.onclick = () => {
      nav.classList.toggle("active");
      burger.classList.toggle("active"); // Запуск анімації
    };

    nav.querySelectorAll("a").forEach((link) => {
      link.onclick = () => {
        nav.classList.remove("active");
        burger.classList.remove("active");
      };
    });
  }

  // КАТАЛОГ
  const container = document.getElementById("tours-container");
  const updateView = () => {
    if (!container) return;
    const data = filters.process(toursData);
    container.innerHTML = data.length
      ? data.map((t) => createCard(t, wishlist.has(t.id))).join("")
      : '<p style="grid-column:1/-1;text-align:center">Нічого не знайдено</p>';
  };

  if (container && !window.location.pathname.includes("wishlist.html")) {
    updateView();
    container.onclick = (e) => {
      const btn = e.target.closest(".card__wishlist");
      if (btn) {
        e.preventDefault();
        const isLiked = wishlist.toggle(btn.dataset.id);
        btn.classList.toggle("active", isLiked);
      }
    };
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.onclick = () => {
        document
          .querySelector(".filter-btn.active")
          ?.classList.remove("active");
        btn.classList.add("active");
        filters.setFilter(btn.dataset.filter);
        updateView();
      };
    });
    const search = document.getElementById("search-input");
    if (search)
      search.oninput = (e) => {
        filters.setSearch(e.target.value);
        updateView();
      };
    const sort = document.getElementById("sort-select");
    if (sort)
      sort.onchange = (e) => {
        filters.setSort(e.target.value);
        updateView();
      };
  }

  // СТОРІНКА ОБРАНОГО
  if (window.location.pathname.includes("wishlist.html") && container) {
    const liked = toursData.filter((t) => wishlist.has(t.id));
    container.innerHTML = liked.length
      ? liked.map((t) => createCard(t, true)).join("")
      : '<p style="grid-column:1/-1;text-align:center">Пусто</p>';
    container.onclick = (e) => {
      const btn = e.target.closest(".card__wishlist");
      if (btn) {
        e.preventDefault();
        wishlist.toggle(btn.dataset.id);
        btn.closest(".card").remove();
      }
    };
  }

  // ДЕТАЛІ ТУРУ (З УКРАЇНСЬКОЮ ДАТОЮ)
  const detail = document.getElementById("tour-detail");
  if (detail) {
    const id = new URLSearchParams(window.location.search).get("id");
    const tour = toursData.find((t) => t.id == id);
    if (tour) {
      const formattedDates =
        tour.dates && tour.dates.length
          ? tour.dates
              .map((d) => {
                // Перетворення YYYY-MM-DD -> DD.MM.YYYY
                const ukrDate = d.split("-").reverse().join(".");
                return `<span class="date-badge">📅 ${ukrDate}</span>`;
              })
              .join(" ")
          : "Уточнюється";

      const images = tour.gallery || [tour.img];

      detail.innerHTML = `
                <div class="tour-page__grid">
                    <div class="gallery">
                        <img src="${
                          images[0]
                        }" id="main-img" class="gallery__main" alt="${
        tour.title
      }">
                        <div class="gallery__thumbs">
                            ${images
                              .map(
                                (src, i) =>
                                  `<img src="${src}" class="gallery__thumb ${
                                    i === 0 ? "active" : ""
                                  }" onclick="changeTourImage('${src}', this)" alt="фото">`
                              )
                              .join("")}
                        </div>
                    </div>
                    <div class="tour-page__info">
                        <h1>${tour.title}</h1>
                        <p class="tour-price">${tour.price} грн <span>/ ${
        tour.duration
      }</span></p>
                        <div style="margin-bottom:20px; line-height:1.8; color:var(--text-main);">
                            ${tour.description}
                        </div>
                        <div style="margin-bottom:30px">
                            <h3>Дати виїзду:</h3>
                            <div style="margin-top:10px; display:flex; flex-wrap:wrap; gap:5px;">
                                ${formattedDates}
                            </div>
                        </div>
                        <div class="tour-actions">
                            <button id="bookBtn" class="btn">Забронювати</button>
                            <button id="likeBtn" class="btn btn--outline">
                                ${
                                  wishlist.has(tour.id)
                                    ? "❤️ В обраному"
                                    : "🤍 Додати в обране"
                                }
                            </button>
                        </div>
                    </div>
                </div>`;

      document.getElementById("bookBtn").onclick = () => modal.open(tour.title);
      document.getElementById("likeBtn").onclick = function () {
        const isLiked = wishlist.toggle(tour.id);
        this.innerHTML = isLiked ? "❤️ В обраному" : "🤍 Додати в обране";
      };
      window.changeTourImage = (src, thumb) => {
        document.getElementById("main-img").src = src;
        document
          .querySelectorAll(".gallery__thumb")
          .forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
      };
    }
  }

  // ФОРМИ
  const form = document.getElementById("feedback-form");
  if (form)
    form.onsubmit = (e) => {
      e.preventDefault();
      alert("Відправлено!");
      form.reset();
    };
  const subForm = document.getElementById("sub-form");
  if (subForm)
    subForm.onsubmit = (e) => {
      e.preventDefault();
      alert("Дякуємо за підписку!");
      subForm.reset();
    };
});
