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
        centeredSlides: false,
        freeMode: true, 
    });
});

updateLinkText();
window.addEventListener('resize', updateLinkText);