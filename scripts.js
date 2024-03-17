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

updateLinkText();
window.addEventListener('resize', updateLinkText);