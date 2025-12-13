export class TestimonialSlider {
    constructor() {
        this.track = document.querySelector('.slider-track');
        if (!this.track) return;
        
        this.items = document.querySelectorAll('.review-card');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.index = 0;

        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.move(1));
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.move(-1));
    }

    move(direction) {
        this.index = (this.index + direction + this.items.length) % this.items.length;
        this.track.style.transform = `translateX(-${this.index * 100}%)`;
    }
}