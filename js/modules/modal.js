import { StorageService } from '../services/storage.js';
export class BookingModal {
    constructor() { this.storage = new StorageService('bookings'); }
    init() {
        document.body.insertAdjacentHTML('beforeend', `
            <div class="modal-overlay" id="bm"><div class="modal">
                <button class="modal__close" id="bmc">&times;</button>
                <h2>Бронювання</h2> <h3 id="bmt" style="color:var(--primary);margin-bottom:15px"></h3>
                <form id="bmf">
                    <div style="margin-bottom:15px">
                        <input class="search-input" style="width:100%" name="name" placeholder="Ім'я (тільки літери)" required>
                    </div>
                    <div style="margin-bottom:15px">
                        <input class="search-input" style="width:100%" name="phone" placeholder="+380..." required>
                    </div>
                    <button class="btn" style="width:100%">Підтвердити</button>
                </form>
            </div></div>`);
        this.el = document.getElementById('bm');
        this.form = document.getElementById('bmf');
        document.getElementById('bmc').onclick = () => this.close();
        this.form.onsubmit = e => this.submit(e);
    }
    open(title) {
        document.getElementById('bmt').textContent = title;
        this.form.name.value = localStorage.getItem('u_name') || '';
        this.form.phone.value = localStorage.getItem('u_phone') || '';
        this.el.classList.add('open');
    }
    close() { this.el.classList.remove('open'); }
    submit(e) {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(this.form));
        // Валідація
        if (!/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]+$/.test(d.name) || d.name.length < 2) return alert("Ім'я: тільки літери, мінімум 2 символи!");
        if (!/^\+380\d{9}$/.test(d.phone)) return alert("Телефон: +380XXXXXXXXX");

        localStorage.setItem('u_name', d.name); localStorage.setItem('u_phone', d.phone);
        this.storage.add({...d, tour: document.getElementById('bmt').textContent, date: new Date()});
        alert('Успішно!'); this.close(); this.form.reset();
    }
}