document.addEventListener('DOMContentLoaded', () => {

    
    const airpodsMaxPhoto = document.getElementById('airpods-max-photo');
    const airpodsMaxHero = document.querySelector('.airpods-max-hero');
    
    const imageSources = [
        { src: 'image/Apple/AirPods/2/2.1.png',}, 
        { src: 'image/Apple/AirPods/2/2.2.png',}, 
        { src: 'image/Apple/AirPods/2/2.3.png',}, 
        { src: 'image/Apple/AirPods/2/2.4.png',}, 
        { src: 'image/Apple/AirPods/2/2.5.png',}  
    ];

    let currentIndex = 0;

    function changeAirPodsMaxImage() {
        if (!airpodsMaxPhoto || !airpodsMaxHero) return; 
        
        
        airpodsMaxPhoto.src = imageSources[currentIndex].src;
        airpodsMaxPhoto.alt = 'AirPods Max ' + imageSources[currentIndex].src.split('/').pop();
        airpodsMaxHero.style.backgroundColor = imageSources[currentIndex].color;
        
        currentIndex = (currentIndex + 1) % imageSources.length;
    }

    
    if (airpodsMaxPhoto) {
        changeAirPodsMaxImage(); 
        setInterval(changeAirPodsMaxImage, 1000);
    }

    
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        const toggleBtn = card.querySelector('.toggle-btn');
        const plusIcon = card.querySelector('.plus-icon');
        const closeIcon = card.querySelector('.close-icon');
        
        
        const toggleContent = () => {
            const isActive = card.classList.contains('active');
            
            
            featureCards.forEach(otherCard => {
                if (otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                    const otherBtn = otherCard.querySelector('.toggle-btn');
                    otherBtn.querySelector('.plus-icon').classList.remove('hidden');
                    otherBtn.querySelector('.close-icon').classList.add('hidden');
                    otherCard.querySelector('.toggle-btn').setAttribute('aria-expanded', 'false');
                }
            });

            
            if (!isActive) {
                
                card.classList.add('active');
                plusIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                toggleBtn.setAttribute('aria-expanded', 'true');
            } 
            
        };

        
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            toggleContent();
        });
        
        
        card.addEventListener('click', (event) => {
             
            if (event.target === card || event.target.closest('.card-header') && !event.target.closest('.toggle-btn')) {
                toggleContent();
            }
        });

    });
});