function changeImage(element) {
    document.getElementById('current-image').src = element.src;
    let thumbnails = document.querySelectorAll('.thumb');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    element.classList.add('active');
}

function selectColor(color) {
    let colorName = document.getElementById('color-name');
    let thumbnails = document.querySelectorAll('.thumb');
    let mainImage = document.getElementById('current-image');
    
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector(`.color-option.${color}`).classList.add('active'); 

    colorName.innerText = (color === 'white') ? 'สีดำ' : 'สีขาว';

    thumbnails.forEach((thumb, index) => {
        let newImageSrc = thumb.getAttribute(`data-${color}`);
        if (newImageSrc) { thumb.src = newImageSrc; }
        thumb.classList.remove('active');
        if (index === 0) {
            thumb.classList.add('active');
            mainImage.src = newImageSrc; 
        }
    });
}

function toggleAccordion(element) {
    element.classList.toggle('active');
    let content = element.nextElementSibling;
    if (content.style.maxHeight) { 
        content.style.maxHeight = null; 
    } else { 
        content.style.maxHeight = content.scrollHeight + "px"; 
    }
}

let isZoomMode = false;

function toggleZoom() {
    isZoomMode = !isZoomMode;
    const badge = document.querySelector('.ar-badge');
    const mainImage = document.getElementById('current-image');
    const container = document.querySelector('.main-image-box');

    if (isZoomMode) {
        badge.classList.add('active');
        badge.innerText = "X";
        container.style.cursor = "zoom-in";
    } else {
        badge.classList.remove('active');
        badge.innerText = "ซูม";
        container.style.cursor = "default";
        mainImage.style.transform = "scale(1)";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.main-image-box');
    const img = document.getElementById('current-image');

    container.addEventListener("mousemove", function(e) {
        if (!isZoomMode) return;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        img.style.transform = "scale(2)";
    });

    container.addEventListener("mouseleave", function() {
        if (isZoomMode) img.style.transform = "scale(1)";
    });
});


function openVideo(videoPath) {
    const modal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('local-video');
    
    if (videoPath) {
        videoPlayer.src = videoPath;
    }
    
    modal.classList.add('show');
    videoPlayer.play();
}

function closeVideo() {
    const modal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('local-video');
    
    modal.classList.remove('show');

    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    
    setTimeout(() => {
        videoPlayer.src = "";
    }, 300);
}

function closeVideoOutside(event) {
    if (event.target.id === 'video-modal') {
        closeVideo();
    }
}