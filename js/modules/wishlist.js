export class Wishlist {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("wishlist")) || [];
    this.updateBadge();
  }

  add(id) {
    if (!this.items.includes(id)) {
      this.items.push(id);
      this.save();
    }
  }

  remove(id) {
    this.items = this.items.filter((item) => item != id); // != дозволяє порівнювати string і number
    this.save();
  }

  toggle(id) {
    id = Number(id);
    if (this.has(id)) {
      this.remove(id);
      return false;
    } else {
      this.add(id);
      return true;
    }
  }

  has(id) {
    return this.items.includes(Number(id));
  }

  save() {
    localStorage.setItem("wishlist", JSON.stringify(this.items));
    this.updateBadge();
  }

  updateBadge() {
    const badge = document.getElementById("wishlist-count");
    if (badge) {
      badge.textContent = this.items.length;
      // Ховаємо бейдж, якщо 0
      badge.style.display = this.items.length > 0 ? "inline-block" : "none";
    }
  }
}
