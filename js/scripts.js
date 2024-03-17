function updateLinkText() {
    var doc = document.querySelector(".link .document");
    var logo = document.getElementById('logo');
    if (window.innerWidth <= 700) {
        logo.textContent = "DS";
        doc.textContent = 'Docs';
    } else {
        logo.textContent = "Data Structure";
        doc.textContent = "Go to Docs";
    }
}

document.addEventListener('DOMContentLoaded', function() {

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: true,
        freeMode: true, 
        
        on: {
            slideChange: function () {
                var slides = this.slides;
                for (var i = 0; i<slides.length; i++) {
                    slides[i].style.opacity = 1;
                    slides[i].style.filter = 'none';

                }
                var activeIndex = this.activeIndex;
                slides.forEach(function (slide, index) {
                    if (index !== activeIndex) {
                        slide.style.opacity = 0.5;
                        slide.style.filter = 'blur(99px)';
                    }
                });
            }
        }
    });
});


updateLinkText();
window.addEventListener('resize', updateLinkText);