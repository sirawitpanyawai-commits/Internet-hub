document.addEventListener("DOMContentLoaded", function () {
    const modalId = 'memorialModal';
    const hasSeenModal = sessionStorage.getItem(modalId);
    
    if (!hasSeenModal) {
        var myModal = new bootstrap.Modal(document.getElementById(modalId));
        myModal.show();
        
        sessionStorage.setItem(modalId, 'true'); // กำหนดค่าใน sessionStorage ว่าได้แสดงไปแล้ว
        
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            // ฟังเหตุการณ์เมื่อ Modal ถูกปิด เพื่อยืนยันว่าได้เซ็ตค่าแล้ว
            modalElement.addEventListener('hidden.bs.modal', function () {
                sessionStorage.setItem(modalId, 'true');
            });
        }
    }
});


function makeDraggable(element) {
  if (!element) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  
  element.querySelectorAll('img').forEach(img => {
      img.draggable = false;
  });

  element.addEventListener('mousedown', (e) => {
    isDown = true;
    element.classList.add('active-drag');
    startX = e.pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
    element.classList.remove('active-drag');
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - element.offsetLeft;
    const walk = (x - startX) * 2;
    element.scrollLeft = scrollLeft - walk;
  });
  
  element.addEventListener('mouseleave', () => {
    if (isDown) { 
        isDown = false;
        element.classList.remove('active-drag');
    }
  });
}


const sliderTrack = document.getElementById('sliderTrack');
if (sliderTrack) {
    makeDraggable(sliderTrack);
}

const gearTrack = document.getElementById('gearTrack');
if (gearTrack) {
    makeDraggable(gearTrack);
}

// ----------------------------------------------------
// 1. Slider Arrow Logic for #products
// ----------------------------------------------------

const productsSection = document.getElementById('products');
const productSlides = sliderTrack ? sliderTrack.querySelectorAll('.slide') : [];
let productLeft, productRight;

if (productsSection) {
  productLeft = productsSection.querySelector('.arrow-left');
  productRight = productsSection.querySelector('.arrow-right');
}

if (productRight && productLeft && productSlides.length > 0) {
  productRight.addEventListener('click', () => {
    const scrollAmount = sliderTrack.clientWidth * 0.75; 
    sliderTrack.scrollLeft += scrollAmount;
  });

  productLeft.addEventListener('click', () => {
    const scrollAmount = sliderTrack.clientWidth * 0.75;
    sliderTrack.scrollLeft -= scrollAmount;
  });
}

// ----------------------------------------------------
// 1.1 Gaming Gear Arrow Logic
// ----------------------------------------------------

const gamingGearSection = document.getElementById('gaminggear');
const gearSlides = gearTrack ? gearTrack.querySelectorAll('.slide') : [];
let gearLeft, gearRight;

if(gamingGearSection) {
  gearLeft = gamingGearSection.querySelector('.arrow-left');
  gearRight = gamingGearSection.querySelector('.arrow-right');
}

if (gearRight && gearLeft && gearSlides.length > 0) { 
  gearRight.addEventListener('click', () => {
    const slideWidth = gearSlides[0].offsetWidth;
    const gap = 20; 
    const slideSize = slideWidth + gap;
    
    gearTrack.scrollLeft += slideSize; 
  });
  
  gearLeft.addEventListener('click', () => {
    const slideWidth = gearSlides[0].offsetWidth;
    const gap = 20; 
    const slideSize = slideWidth + gap;
    
    gearTrack.scrollLeft -= slideSize;
  });
}

// ----------------------------------------------------
// 2. Carousel (ภาพสไลด์ใหญ่ด้านบน)
// ----------------------------------------------------

const slides = document.querySelectorAll('.carousel img');
let current = 0;

function showSlide(index) {
  
  slides.forEach(slide => {
    slide.classList.remove('active');
    slide.classList.remove('exiting');
  });
  
  const newSlide = slides[index];

  if (newSlide) {
      newSlide.classList.add('active'); 
  }

  current = index; 
}

if (slides.length > 0) {
    showSlide(0); 
    
    setInterval(() => {
      const next = (current + 1) % slides.length;
      showSlide(next);
    }, 3000);
}


// ----------------------------------------------------
// 3. Intersection Observer (Fade In on Scroll)
// ----------------------------------------------------

const slidesToAnimate = document.querySelectorAll('#products .slide, #gaminggear .slide');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
};

const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

slidesToAnimate.forEach(slide => {
  scrollObserver.observe(slide);
});


// ----------------------------------------------------
// 4. Product Click Logic (แก้ไขให้เปิดในหน้าเดิม)
// ----------------------------------------------------

const allSlides = document.querySelectorAll('#products .slide, #gaminggear .slide');

allSlides.forEach(slide => {
    slide.addEventListener('click', () => {
        const productLink = slide.dataset.link;
        // ตรวจสอบว่ามีลิงก์หรือไม่
        if (productLink) {
            // แก้ไข: ใช้ window.location.href เพื่อเปลี่ยนหน้าในแท็บเดิม
            window.location.href = productLink;
        }
    });
});


// ----------------------------------------------------
// 5. Banner Carousel Logic (แถบคู่)
// ----------------------------------------------------

function initializeCarousel(carouselIndex) {
  const carouselSlides = document.querySelectorAll(`.carousel-container:nth-child(${carouselIndex}) .carousel img`);
  const dots = document.querySelectorAll(`.carousel-container:nth-child(${carouselIndex}) .carousel-dots .dot`);
  
  let currentSlide = 0;

  function showSlide(index) {
    
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('dot-active');
        } else {
            dot.classList.remove('dot-active');
        }
    });

    carouselSlides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    currentSlide = index;
  }

  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          showSlide(index);
      });
  });

  if (carouselSlides.length > 0) {
    setInterval(() => {
      const next = (currentSlide + 1) % carouselSlides.length;
      showSlide(next);
    }, 3000);

    showSlide(0);
  }
}

initializeCarousel(1);
initializeCarousel(2);