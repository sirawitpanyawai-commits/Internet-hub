document.addEventListener('DOMContentLoaded', () => {
    
    const carousel = document.querySelector('.product-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const filterTabs = document.getElementById('mac-filter-tabs'); 
    const productCards = document.querySelectorAll('.product-card'); 
    
    if (!carousel || !prevBtn || !nextBtn || !filterTabs) {
        console.error("Carousel or filter elements not found.");
        return;
    }

    let scrollDistance = 0; 

    const updateScrollDistance = () => {
        const visibleCard = document.querySelector('.product-card[style*="display: block"], .product-card:not([style*="display: none"])');
        if (visibleCard) {
            const cardWidth = visibleCard.offsetWidth;
            const gap = 30; 
            scrollDistance = cardWidth + gap;
        } else {
            scrollDistance = 350; 
        }
    }
    updateScrollDistance(); 

    const checkScrollButtons = () => {
        prevBtn.disabled = carousel.scrollLeft <= 1; 
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        nextBtn.disabled = Math.ceil(carousel.scrollLeft) >= Math.ceil(maxScroll);
    };

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
    });

    carousel.addEventListener('scroll', checkScrollButtons);
    checkScrollButtons();

    window.addEventListener('resize', () => {
        updateScrollDistance();
        checkScrollButtons();
    });

    filterTabs.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        
        if (target.tagName === 'A') {
            const filterValue = target.getAttribute('data-filter');
            
            filterTabs.querySelectorAll('a').forEach(link => {
                link.classList.remove('active');
            });
            target.classList.add('active');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block'; 
                } else {
                    card.style.display = 'none';
                }
            });

            carousel.scrollTo({ left: 0, behavior: 'smooth' });
            updateScrollDistance();
            setTimeout(checkScrollButtons, 300); 
        }
    });


    
    const introCarousel = document.getElementById('intro-card-grid');
    const introPrevBtn = document.querySelector('.intro-prev-btn');
    const introNextBtn = document.querySelector('.intro-next-btn');
    const detailModal = document.getElementById('detail-modal');
    const detailContent = document.getElementById('detail-content');
    
    if (introCarousel && introPrevBtn && introNextBtn && detailModal) {
        
        let introScrollDistance = 0; 

        const updateIntroScrollDistance = () => {
            const card = introCarousel.querySelector('.intro-card');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = 15;
                introScrollDistance = cardWidth + gap;
            }
        }
        updateIntroScrollDistance(); 

        const checkIntroScrollButtons = () => {
            introPrevBtn.disabled = introCarousel.scrollLeft <= 1; 
            const maxScroll = introCarousel.scrollWidth - introCarousel.clientWidth;
            introNextBtn.disabled = Math.ceil(introCarousel.scrollLeft) >= Math.ceil(maxScroll);
        };

        introNextBtn.addEventListener('click', () => {
            introCarousel.scrollBy({ left: introScrollDistance, behavior: 'smooth' });
        });

        introPrevBtn.addEventListener('click', () => {
            introCarousel.scrollBy({ left: -introScrollDistance, behavior: 'smooth' });
        });

        introCarousel.addEventListener('scroll', checkIntroScrollButtons);
        window.addEventListener('resize', () => {
            updateIntroScrollDistance();
            checkIntroScrollButtons();
        });
        checkIntroScrollButtons();

        const openModal = (card) => {
            const detailId = card.getAttribute('data-detail-id');
            const template = document.getElementById(detailId); 
            
            if (template && template.content) {
                const clone = document.importNode(template.content, true);
                detailContent.innerHTML = '';
                detailContent.appendChild(clone);
                
                detailModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            } else {
                detailContent.innerHTML = `
                    <div class="detail-header">
                        <h2 class="detail-title">${card.querySelector('.card-title').textContent}</h2>
                        <button class="close-btn" aria-label="Close detail view">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                    <div class="detail-body">
                        <h3>อยู่ระหว่างการพัฒนา...</h3>
                        <p>ไม่มีรายละเอียดเพิ่มเติมสำหรับการ์ดนี้ กรุณาเพิ่มเนื้อหาในแท็ก &lt;template id="${detailId}"&gt; ในไฟล์ HTML</p>
                    </div>
                `;
                detailModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        };

        const closeModal = () => {
            detailModal.classList.remove('show');
            document.body.style.overflow = '';
        };

        introCarousel.addEventListener('click', (e) => {
            let card = e.target.closest('.intro-card');
            if (card) {
                openModal(card);
            }
        });

        detailModal.addEventListener('click', (e) => {
            if (e.target.closest('.close-btn') || e.target === detailModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && detailModal.classList.contains('show')) {
                closeModal();
            }
        });
    }

    
    const accordionItems = document.querySelectorAll('.ecosystem-accordion-wrapper .accordion-item');
    
    if (accordionItems.length > 0) {
        
        const switchImage = (ecosystemId) => {
            
            document.querySelectorAll('.ecosystem-image').forEach(img => {
                img.classList.remove('active');
            });
            
            const activeImage = document.getElementById(`image-${ecosystemId}`);
            if (activeImage) {
                activeImage.classList.add('active');
            }
        };

        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const ecosystemId = item.getAttribute('data-ecosystem-id');

            
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
                switchImage(ecosystemId);
            }

            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                
                accordionItems.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.accordion-content').style.maxHeight = null;
                });

                
                if (!isActive) {
                    item.classList.add('active');
                    
                    content.style.maxHeight = content.scrollHeight + "px"; 
                    switchImage(ecosystemId); 
                }
            });
            
            
            window.addEventListener('resize', () => {
                if (item.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }
    
});