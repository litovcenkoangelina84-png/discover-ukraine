export class ThemeSwitcher {
  constructor() {
    this.btn = document.getElementById("theme-toggle");
    this.body = document.body;

    // 1. Перевіряємо збережену тему при завантаженні
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      this.enableDark(false);
    } else {
      this.disableDark(false);
    }

    // 2. Обробка кліку
    if (this.btn) {
      this.btn.onclick = () => {
        if (this.body.classList.contains("dark-theme")) {
          this.disableDark(true);
        } else {
          this.enableDark(true);
        }
      };
    }
  }

  enableDark(save = true) {
    this.body.classList.add("dark-theme");
    this.updateIcon("☀️"); // Змінюємо іконку на сонце
    if (save) localStorage.setItem("theme", "dark");
  }

  disableDark(save = true) {
    this.body.classList.remove("dark-theme");
    this.updateIcon("🌙"); // Змінюємо іконку на місяць
    if (save) localStorage.setItem("theme", "light");
  }

  updateIcon(symbol) {
    if (this.btn) {
      const span = this.btn.querySelector("span");
      if (span) {
        span.textContent = symbol;
      } else {
        this.btn.textContent = symbol;
      }
    }
  }
}
