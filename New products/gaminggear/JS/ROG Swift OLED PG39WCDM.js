function openVideoModal() {
  const modal = document.getElementById('myVideoModal');
  const video = document.getElementById('promoVideo');
  if (modal && video) {
    modal.style.display = "flex";
    video.play();
  }
}

function closeVideoModal() {
  const modal = document.getElementById('myVideoModal');
  const video = document.getElementById('promoVideo');
  if (modal && video) {
    modal.style.display = "none";
    video.pause();
    video.currentTime = 0;
  }
}

window.onclick = function(event) {
  const modal = document.getElementById('myVideoModal');
  if (event.target == modal) {
    closeVideoModal();
  }
}

function openOledSlide(index) {
    let tabs = document.querySelectorAll('.oled-tab');
    let slides = document.querySelectorAll('.oled-slide-item');

    tabs.forEach(tab => tab.classList.remove('active'));
    slides.forEach(slide => slide.classList.remove('active'));

    if (tabs[index] && slides[index]) {
        tabs[index].classList.add('active');
        slides[index].classList.add('active');
    }
}

const uniformStates = {
    'on': {
        title: 'WITH UNIFORM BRIGHTNESS SETTING',
        desc: 'The innovative ROG Smart KVM feature allows you to control two devices connected to the monitor with just one keyboard and mouse, without the need for extra hardware. Just plug in and switch effortlessly between gaming and work on a single screen. You can even copy and paste or drag files across two devices via a USB 3.2 connection for ultrafast file transfers that are up to 10X faster USB 2.0.',
        imgSrc: 'image/ROG Swift OLED PG39WCDM/ad/kvm.jpg'
    },
    'off': {
        title: 'WITHOUT UNIFORM BRIGHTNESS SETTING',
        desc: 'Simplify your setup with USB-C®, the powerful port that can handle everything. Use it to display stunning visuals, provide up to 90W* of power, deliver crisp audio, and transfer data at blazing speeds. Whether you want to connect to your laptop, smartphone, or tablet, USB-C offers unmatched versatility.',
        imgSrc: 'image/ROG Swift OLED PG39WCDM/ad/usb-c.jpg'
    }
};

function toggleUniform(state) {
    const data = uniformStates[state];
    
    document.getElementById('uniform-img').src = data.imgSrc;
    document.getElementById('uniform-state-title').innerText = data.title;
    document.getElementById('uniform-state-desc').innerText = data.desc;

    document.getElementById('btn-on').classList.remove('active');
    document.getElementById('btn-off').classList.remove('active');
    document.getElementById(`btn-${state}`).classList.add('active');
}

let slideIndex = 0;
let slideTimer;

function showSlide(n) {
    let i;
    let slides = document.getElementsByClassName("smoothness-slide");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return;

    clearTimeout(slideTimer);

    if (n >= slides.length) {slideIndex = 0} 
    else if (n < 0) {slideIndex = slides.length - 1}
    else {slideIndex = n}

    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');

    slideTimer = setTimeout(autoAdvance, 5000); 
}

function autoAdvance() {
    showSlide(slideIndex + 1);
}

function currentSlide(n) {
    showSlide(n);
}

document.addEventListener('DOMContentLoaded', (event) => {
    if (document.querySelector('.slider-wrapper')) {
        showSlide(0);
    }
});