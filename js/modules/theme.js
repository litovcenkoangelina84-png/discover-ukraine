export class ThemeSwitcher {
  constructor() {
    this.btn = document.getElementById("theme-toggle");
    this.body = document.body;

    // 1. Перевірка при старті
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      this.enableDark(false);
    } else {
      this.disableDark(false);
    }

    // 2. Клік
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
    this.updateIcon("☀️"); // Змінюємо на Сонце
    if (save) localStorage.setItem("theme", "dark");
  }

  disableDark(save = true) {
    this.body.classList.remove("dark-theme");
    this.updateIcon("🌙"); // Змінюємо на Місяць
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
