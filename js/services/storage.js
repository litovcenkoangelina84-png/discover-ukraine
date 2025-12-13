export class StorageService {
    constructor(key) {
        this.key = key;
    }
    get() {
        try {
            const data = localStorage.getItem(this.key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Storage Error:', e);
            return [];
        }
    }
    set(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }
    add(item) {
        const data = this.get();
        data.push(item);
        this.set(data);
    }
}