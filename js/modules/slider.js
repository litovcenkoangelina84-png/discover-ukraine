export class TestimonialSlider {
  constructor() {
    this.track = document.getElementById("slider-track");
    this.prevBtn = document.querySelector(".prev");
    this.nextBtn = document.querySelector(".next");

    if (!this.track) return;

    this.index = 0;
    this.cards = [];

    // Ініціалізуємо після рендеру
    setTimeout(() => {
      this.cards = document.querySelectorAll(".review-card");
      this.total = this.cards.length;
      this.update();
    }, 100);

    if (this.prevBtn) this.prevBtn.onclick = () => this.prev();
    if (this.nextBtn) this.nextBtn.onclick = () => this.next();
  }

  next() {
    if (this.total === 0) return;
    this.index = (this.index + 1) % this.total;
    this.update();
  }

  prev() {
    if (this.total === 0) return;
    this.index = (this.index - 1 + this.total) % this.total;
    this.update();
  }

  update() {
    if (!this.track) return;
    // Зсув треку на ширину слайда (100%)
    this.track.style.transform = `translateX(-${this.index * 100}%)`;
  }
}
