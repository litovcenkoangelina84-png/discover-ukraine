// Імпортуємо дані та модулі
import { toursData } from './data/tours.js';
import { reviewsData } from './data/reviews.js'; 
import { Wishlist } from './modules/wishlist.js';
import { FilterService } from './modules/filters.js';
import { BookingModal } from './modules/modal.js';
import { ThemeSwitcher } from './modules/theme.js';
import { TestimonialSlider } from './modules/slider.js';
import { Accordion } from './modules/accordion.js';
import { createCard, renderReviews } from './modules/render.js';

// Запуск коду після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. РЕНДЕР ВІДГУКІВ (Слайдер)
    const sliderTrack = document.getElementById('slider-track');
    if (sliderTrack) renderReviews(sliderTrack, reviewsData);

    // 2. ІНІЦІАЛІЗАЦІЯ МОДУЛІВ
    const wishlist = new Wishlist(); // Логіка обраного
    const filters = new FilterService(); // Логіка фільтрів
    const modal = new BookingModal(); // Модальне вікно
    new ThemeSwitcher();      // Перемикач теми
    new TestimonialSlider();  // Слайдер
    new Accordion();          // Випадаючі списки (FAQ)
    modal.init();             

    // 3. КНОПКА "ВГОРУ"
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '&#8679;'; 
    document.body.appendChild(scrollTopBtn);
    const header = document.getElementById('header');
    
    window.onscroll = () => {
        if (header) header.classList.toggle('header--scrolled', window.scrollY > 50);
        scrollTopBtn.classList.toggle('show', window.scrollY > 300);
    };
    scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // 4. БУРГЕР МЕНЮ
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    
    if (burger && nav) {
        burger.onclick = () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active'); 
        };
        
        // Закриваємо меню при кліку на будь-яке посилання
        nav.querySelectorAll('a').forEach(link => {
            link.onclick = () => {
                nav.classList.remove('active');
                burger.classList.remove('active');
            };
        });
    }

    // 5. КАТАЛОГ ТУРІВ
    const container = document.getElementById('tours-container');
    
    // Функція оновлення списку турів (після фільтрації)
    const updateView = () => {
        if (!container) return;
        const data = filters.process(toursData);
        // Генеруємо HTML карток або показуємо повідомлення, що нічого не знайдено
        container.innerHTML = data.length ? data.map(t => createCard(t, wishlist.has(t.id))).join('') : '<p style="grid-column:1/-1;text-align:center">Нічого не знайдено</p>';
    };

    // Якщо ми на сторінці каталогу
    if (container && !window.location.pathname.includes('wishlist.html')) {
        updateView();
        
        // Обробка кліку по сердечку
        container.onclick = (e) => {
            const btn = e.target.closest('.card__wishlist');
            if (btn) {
                e.preventDefault();
                const isLiked = wishlist.toggle(btn.dataset.id);
                btn.classList.toggle('active', isLiked);
            }
        };

        // Підключення фільтрів та сортування
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelector('.filter-btn.active')?.classList.remove('active');
                btn.classList.add('active');
                filters.setFilter(btn.dataset.filter);
                updateView();
            };
        });
        const search = document.getElementById('search-input');
        if (search) search.oninput = (e) => { filters.setSearch(e.target.value); updateView(); };
        const sort = document.getElementById('sort-select');
        if (sort) sort.onchange = (e) => { filters.setSort(e.target.value); updateView(); };
    }

    // 6. СТОРІНКА ОБРАНОГО
    if (window.location.pathname.includes('wishlist.html') && container) {
        // Фільтруємо тури, які є в localStorage
        const liked = toursData.filter(t => wishlist.has(t.id));
        container.innerHTML = liked.length ? liked.map(t => createCard(t, true)).join('') : '<p style="grid-column:1/-1;text-align:center">Пусто</p>';
        
        container.onclick = (e) => {
            const btn = e.target.closest('.card__wishlist');
            if (btn) {
                e.preventDefault();
                wishlist.toggle(btn.dataset.id);
                btn.closest('.card').remove();
            }
        };
    }

    // 7. СТОРІНКА ДЕТАЛЕЙ ТУРУ
    const detail = document.getElementById('tour-detail');
    if (detail) {
        const id = new URLSearchParams(window.location.search).get('id');
        const tour = toursData.find(t => t.id == id);
        
        if (tour) {
            // ФОРМАТУВАННЯ ДАТИ: 2025-12-13 -> 13.12.2025
            const formattedDates = tour.dates && tour.dates.length 
                ? tour.dates.map(d => {
                    const ukrDate = d.split('-').reverse().join('.');
                    return `<span class="date-badge">📅 ${ukrDate}</span>`;
                }).join(' ') 
                : 'Уточнюється';
            
            const images = tour.gallery || [tour.img];
            
            // Заповнення HTML
            detail.innerHTML = `
                <div class="tour-page__grid">
                    <div class="gallery">
                        <img src="${images[0]}" id="main-img" class="gallery__main" alt="${tour.title}">
                        <div class="gallery__thumbs">
                            ${images.map((src, i) => `<img src="${src}" class="gallery__thumb ${i===0?'active':''}" onclick="changeTourImage('${src}', this)" alt="фото">`).join('')}
                        </div>
                    </div>
                    <div class="tour-page__info">
                        <h1>${tour.title}</h1>
                        <p class="tour-price">${tour.price} грн <span>/ ${tour.duration}</span></p>
                        
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
                                ${wishlist.has(tour.id) ? '❤️ В обраному' : '🤍 Додати в обране'}
                            </button>
                        </div>
                    </div>
                </div>`;
            
            // Логіка кнопок на сторінці туру
            document.getElementById('bookBtn').onclick = () => modal.open(tour.title);
            document.getElementById('likeBtn').onclick = function() {
                const isLiked = wishlist.toggle(tour.id);
                this.innerHTML = isLiked ? '❤️ В обраному' : '🤍 Додати в обране';
            };
            // Глобальна функція для зміни фото (через onclick в HTML)
            window.changeTourImage = (src, thumb) => {
                document.getElementById('main-img').src = src;
                document.querySelectorAll('.gallery__thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            };
        }
    }
    
    // 8. ОБРОБКА ФОРМ
    const form = document.getElementById('feedback-form');
    if(form) form.onsubmit = (e) => { e.preventDefault(); alert('Повідомлення відправлено!'); form.reset(); };
    const subForm = document.getElementById('sub-form');
    if(subForm) subForm.onsubmit = (e) => { e.preventDefault(); alert('Дякуємо за підписку!'); subForm.reset(); };
});