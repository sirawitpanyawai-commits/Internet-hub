function changeImage(element) {
    var mainImg = document.getElementById('mainProductImage');
    mainImg.src = element.src;
    
    var thumbnails = document.querySelectorAll('.thumbnail-list img');
    thumbnails.forEach(function(img) {
        img.classList.remove('active-thumb');
    });
    
    element.classList.add('active-thumb');
}

function openTab(event, tabName) {
    var tabContents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
        tabContents[i].classList.remove('active-content');
    }

    var tabItems = document.getElementsByClassName('tab-item');
    for (var i = 0; i < tabItems.length; i++) {
        tabItems[i].classList.remove('active');
    }

    document.getElementById(tabName).style.display = 'block';
    
    event.currentTarget.classList.add('active');
}

function expandDetails() {
    var wrapper = document.getElementById('detailWrapper');
    var overlay = document.getElementById('readMoreOverlay');

    wrapper.classList.add('expanded');
    
    if (overlay) {
        overlay.style.display = 'none';
    }
}