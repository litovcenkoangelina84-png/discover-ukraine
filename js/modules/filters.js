export class FilterService {
  constructor() {
    this.searchText = "";
    this.category = "all";
    this.sortType = "default";
  }

  setSearch(text) {
    this.searchText = text.toLowerCase();
  }

  setFilter(category) {
    this.category = category;
  }

  setSort(type) {
    this.sortType = type;
  }

  process(data) {
    let result = [...data];

    // 1. Пошук
    if (this.searchText) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(this.searchText)
      );
    }

    // 2. Категорія (тривалість)
    if (this.category !== "all") {
      result = result.filter((item) => item.duration === this.category);
    }

    // 3. Сортування
    if (this.sortType === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortType === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }
}
