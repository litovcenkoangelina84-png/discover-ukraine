export function createCard(tour, isLiked) {
  return `
    <article class="card">
        <div class="card__img" style="background-image: url('${tour.img}')">
            <button class="card__wishlist ${
              isLiked ? "active" : ""
            }" data-id="${tour.id}" title="Обране">♥</button>
        </div>
        <div class="card__content">
            <div style="font-size:0.9rem; color:var(--text-light)">📅 ${
              tour.duration
            }</div>
            <h3 style="margin:10px 0">${tour.title}</h3>
            <div class="card__price">${tour.price} грн</div>
            <div class="card__actions">
                <a href="tour.html?id=${tour.id}" class="btn">Деталі</a>
            </div>
        </div>
    </article>`;
}

export function createReviewCard(review) {
  return `
    <div class="review-card">
        <p class="review-text">"${review.text}"</p>
        <p class="review-author">— ${review.author}</p>
    </div>`;
}

export function renderReviews(container, data) {
  if (!container) return;
  container.innerHTML = data.map((r) => createReviewCard(r)).join("");
}
