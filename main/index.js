import partners from '../data/partnersList.js';

class SlideShow {

    constructor(idContainer, time) {
        this.appContainer = document.getElementById(idContainer);
        this.btnLeft = document.getElementById('btnLeft');
        this.btnRight = document.getElementById('btnRight');
        this.currentXscroll = 0;
        this.itemWidth = 0;
        this.length = partners.length;
        this.imagesWrap = document.getElementById('images-wrap');
        this.imagesList = partners.sort((a, b) => b.order - a.order);
        this.autoSlide = setInterval(this.scrollLeft, time);
        this.time = time;

        this.renderImages();
    }

    template = partner => `<figure class="image"><a href="${partner.url}" target="_blank"><img src="${partner.filePath}"></a></figure>`;

    renderImages = () => {
        this.imagesList.forEach(partner => {
            this.imagesWrap.innerHTML = this.imagesWrap.innerHTML + this.template(partner);
        });
        this.itemWidth = document.querySelector('.image').scrollWidth;
        return;
    };

    setCurrentScrollX = () => {
        this.currentXscroll = this.appContainer.scrollLeft;
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
