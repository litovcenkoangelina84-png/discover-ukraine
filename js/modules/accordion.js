export class Accordion {
    constructor() {
        this.headers = document.querySelectorAll('.accordion__header');
        this.init();
    }

    init() {
        this.headers.forEach(header => {
            header.addEventListener('click', () => {
                header.classList.toggle('active');
                const content = header.nextElementSibling;
                if (header.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = 0;
                }
            });
        });
    }
}