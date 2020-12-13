import partners from '../data/partnersList.js';

class SlideShow extends HTMLElement {

    constructor() {
        super();
        this.appContainer = undefined;
        this.itemWidth = 0;
        this.length = partners.length;
        this.imagesWrap = undefined;
        this.imagesList = partners.sort((a, b) => a.order - b.order);
        this.time = undefined;
    }

    connectedCallback() {
        const idContainer = this.getAttribute('idContainer');
        const time = this.getAttribute('time');

        this.innerHTML = `
            <main id="partners-wrap">
                <section id="${idContainer}">
                    <div id="images-wrap"></div>
                </section>
            </main>
        `;

        this.appContainer = document.getElementById(idContainer);
        this.time = time;
        this.imagesWrap = document.getElementById('images-wrap');
        this.renderImages();
    }

    autoSlide = () => setInterval(this.scrollLeft, this.time);

    template = partner => `<figure class="image"><a href="${partner.url}" target="_blank"><img src="${partner.filePath}"></a></figure>`;

    renderImages = () => {
        this.imagesList.forEach(partner => {
            this.imagesWrap.innerHTML = this.imagesWrap.innerHTML + this.template(partner);
        });
        this.itemWidth = document.querySelector('.image').scrollWidth;
        this.autoSlide();
        return;
    };

    moveFirstToEnd = () => {
        let firstSlide = this.imagesWrap.firstChild;
        this.imagesWrap.insertBefore(firstSlide, null);
    }

    scrollLeft = () => {

        this.imagesWrap.animate([
            { transform: 'translateX(0px)' },
            { transform: `translateX(${-this.imagesWrap.scrollWidth}px)` }
        ], {
            // timing options
            duration: this.time * this.length,
            iterations: Infinity
        });

        setTimeout(this.moveFirstToEnd, this.time);

    };

}

export { SlideShow as default }
