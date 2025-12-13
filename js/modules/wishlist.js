import { StorageService } from "../services/storage.js";
export class Wishlist {
  constructor() {
    this.storage = new StorageService("favorites");
    this.items = this.storage.get();
    this.updateUI();
  }
  toggle(id) {
    id = parseInt(id);
    const idx = this.items.indexOf(id);
    idx === -1 ? this.items.push(id) : this.items.splice(idx, 1);
    this.storage.set(this.items);
    this.updateUI();
    return idx === -1;
  }
  has(id) {
    return this.items.includes(parseInt(id));
  }
  updateUI() {
    // Оновлюємо ВСІ лічильники на сторінці на випадок якщо їх декілька
    document
      .querySelectorAll("#wishlist-count")
      .forEach((el) => (el.textContent = this.items.length));
  }
}
