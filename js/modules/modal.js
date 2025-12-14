export class BookingModal {
  constructor() {
    this.overlay = document.getElementById("booking-modal");
    this.closeBtn = document.getElementById("modal-close");
    this.titleEl = document.getElementById("modal-tour-title");
    this.form = document.getElementById("booking-form");
  }

  init() {
    if (!this.overlay) return;

    this.closeBtn.onclick = () => this.close();

    // Закриття при кліку на фон
    this.overlay.onclick = (e) => {
      if (e.target === this.overlay) this.close();
    };

    if (this.form) {
      this.form.onsubmit = (e) => {
        e.preventDefault();
        alert(`Дякуємо! Тур "${this.tourTitle}" заброньовано.`);
        this.close();
        this.form.reset();
      };
    }
  }

  open(tourTitle) {
    if (!this.overlay) return;
    this.tourTitle = tourTitle;
    if (this.titleEl) this.titleEl.textContent = `Тур: ${tourTitle}`;
    this.overlay.classList.add("open");
  }

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove("open");
  }
}
