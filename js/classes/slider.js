class Slider {
    constructor(id, imgs, title, text) {
        this.slider = id;
        this.imgs = imgs;
        this.title = title;
        this.text = text;
        this.domSlide = document.getElementById(this.slider);
        this.domImg = slider.querySelector("img");
        this.domTitle = slider.querySelector("div .slider__content-title");
        this.domText = slider.querySelector("div .slider__content-text");
        this.domPrev = slider.querySelector("div .slider__controls--prev-button");
        this.domNext = slider.querySelector("div .slider__controls--next-button");
        this.domPause = slider.querySelector("div .slider__controls--pause-button");
        this.timer = null;
        this.imgNumber = 0;
        this.titleNumber = 0;
        this.textNumber = 0;
        this.domPrev.addEventListener('click', this.prevImage.bind(this));
        this.domNext.addEventListener('click', this.nextImage.bind(this));
        this.domPause.addEventListener('click', this.playPause.bind(this));
        this.playPause();
        this.eventKeyboard();
    }
    prevImage() {
        this.imgNumber--;
        if (this.imgNumber < 0) {
            this.imgNumber = this.imgs.length - 1;
        }
        this.domImg.src = this.imgs[this.imgNumber];

        this.titleNumber--;
        if (this.titleNumber < 0) {
            this.titleNumber = this.title.length - 1;
        }
        this.domTitle.innerHTML = this.title[this.titleNumber];

        this.textNumber--;
        if (this.textNumber < 0) {
            this.textNumber = this.text.length - 1;
        }
        this.domText.innerHTML = this.text[this.textNumber];
    }
    nextImage() {
        this.imgNumber++;
        if (this.imgNumber > (this.imgs.length - 1)) {
            this.imgNumber = 0;
        }
        this.domImg.src = this.imgs[this.imgNumber];

        this.titleNumber++;
        if (this.titleNumber > (this.title.length - 1)) {
            this.titleNumber = 0;
        }
        this.domTitle.innerHTML = this.title[this.titleNumber];

        this.textNumber++;
        if (this.textNumber > (this.text.length - 1)) {
            this.textNumber = 0;
        }
        this.domText.innerHTML = this.text[this.textNumber];
    }
    playPause() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            this.domPause.className = "slider__controls--play-button";
        } else {
            this.timer = setInterval(this.nextImage.bind(this), 5000);
            this.domPause.className = "slider__controls--pause-button";
        }
    }
    eventKeyboard() {
        let self = this;

        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 37: // left
                    self.nextImage();
                    break;
                case 39: // right
                    self.prevImage();
                    break;
                case 32: // space (or any key)
                    e.preventDefault();
                    self.playPause();
                    break;
            }
        })
    }
}
