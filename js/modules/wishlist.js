export class Wishlist {
  constructor(findTourCallback) {
    this.items = JSON.parse(localStorage.getItem("wishlist")) || [];
    this.findTourCallback = findTourCallback;
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

  /**
   * Асинхронно експортує список обраного у текстовий файл (.txt).
   * Демонструє використання Промісів.
   * @returns {Promise<Blob>} Проміс, який повертає об'єкт Blob з текстовим контентом.
   */
  exportToTextFile() {
    return new Promise((resolve, reject) => {
      if (this.items.length === 0) {
        // Випадок REJECTED: список порожній
        reject(new Error("Список обраного порожній. Додайте тури!"));
        return;
      }

      let textContent = "--- Список Обраних Турів DiscoverUA ---\n\n";
      let totalCost = 0;

      this.items.forEach((id, index) => {
        // Використовуємо збережену функцію для отримання деталей
        const tour = this.findTourCallback(id);

        if (tour) {
          textContent += `${index + 1}. ${tour.title}\n`;
          textContent += `   Ціна: ${tour.price} UAH\n`;
          textContent += `   Тривалість: ${tour.duration} \n\n`;
          totalCost += tour.price;
        }
      });

      textContent += "--------------------------------------\n";
      textContent += `Загальна вартість обраних турів: ${totalCost} UAH\n`;

      // Створюємо об'єкт Blob (контейнер для файлу)
      const blob = new Blob([textContent], {
        type: "text/plain;charset=utf-8",
      });

      // Імітуємо невелику затримку
      setTimeout(() => {
        // Випадок FULFILLED: повертаємо готовий Blob
        resolve(blob);
      }, 150);
    });
  }
}
