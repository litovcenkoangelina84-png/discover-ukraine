export class FilterService {
  constructor() {
    this.filter = "all";
    this.sort = "default";
    this.search = "";
  }

  setFilter(val) {
    this.filter = val;
  }
  setSort(val) {
    this.sort = val;
  }
  setSearch(val) {
    this.search = val.toLowerCase().trim();
  }

  process(data) {
    let res = [...data];

    // 1. Пошук
    if (this.search) {
      res = res.filter((item) =>
        item.title.toLowerCase().includes(this.search)
      );
    }

    // 2. Категорія
    if (this.filter !== "all") {
      res = res.filter((item) => item.category === this.filter);
    }

    // 3. Сортування
    if (this.sort === "price-asc") res.sort((a, b) => a.price - b.price);
    if (this.sort === "price-desc") res.sort((a, b) => b.price - a.price);

    return res;
  }
}
