const productCards = document.querySelectorAll('.product-card');
const productModal = document.getElementById('productModal');
const singleProductImg = document.getElementById('singleProductImg');
const singleProductTitle = document.getElementById('singleProductTitle');
const singleProductDetails = document.getElementById('singleProductDetails');
const productCloseBtn = productModal.querySelector('.modal-close');

function openSingleSizeModal(card) {
    if (!card.dataset.details) return;

    singleProductImg.src = card.dataset.img;
    singleProductImg.alt = card.dataset.title;
    singleProductTitle.innerText = card.dataset.title;

    const detailsArray = card.dataset.details.split('|');
    singleProductDetails.innerHTML = detailsArray.map(d => `<p>${d}</p>`).join('');
    
    productModal.style.display = 'flex';
}

productCloseBtn.addEventListener('click', () => productModal.style.display = 'none');

window.addEventListener('click', e => {
    if (e.target === productModal) productModal.style.display = 'none';
});


const ipadCards = document.querySelectorAll('.ipad-card');
const ipadModal = document.getElementById('ipadModal');
const modalSections = document.getElementById('modalSections');
const modalTabNavContainer = document.getElementById('modalTabNavContainer');
const allTabNavs = document.querySelectorAll('.tabnav-items');
const ipadCloseBtn = ipadModal.querySelector('.modal-close');

let currentProductData = {}; 

function renderFeatures(featuresArray){
    return `
        <h3>คุณสมบัติหลัก</h3>
        <ul class="feature-list">
            ${featuresArray.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;
}

function updateMultiSizeModal(size, name){
    const data = currentProductData;
    
    if (!data || !data.sizes || !data.details || !data.features || !data.sizes[size]) return;

    modalSections.classList.add('apple-overlay');

    modalSections.innerHTML = `
        <div class="apple-overlay-left">
            <img id="productImg" src="${data.sizes[size]}" alt="${name} รุ่น ${size} นิ้ว" style="max-width:100%;">
        </div>
        <div class="apple-overlay-right">
            <h2 id="productTitle">${name} รุ่น ${size} นิ้ว</h2>
            <p id="productDetails">${data.details[size]}</p>
            ${renderFeatures(data.features[size])}
        </div>
    `;
}

productCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.buy-btn')) return;

        const productType = e.target.closest('.buy-btn').dataset.productType;

        if (productType === 'single-size') {
            openSingleSizeModal(card);
            return;
        }

        const title = card.dataset.title;
        
        modalSections.classList.remove('apple-overlay');

        currentProductData = {
            sizes: JSON.parse(card.dataset.sizes),
            details: JSON.parse(card.dataset.details),
            features: JSON.parse(card.dataset.features),
            defaultSize: '11' 
        };

        modalTabNavContainer.style.display = 'flex';
        allTabNavs.forEach(nav => nav.style.display = 'none');
        const activeTabNav = document.querySelector(`.tabnav-items[data-product="${title}"]`);
        
        if (activeTabNav) {
            activeTabNav.style.display = 'flex';

            const sizeButtons = activeTabNav.querySelectorAll('button');
            sizeButtons.forEach(b => {
                b.classList.remove('current');
                b.setAttribute('aria-checked', 'false');
            });
            const defaultButton = activeTabNav.querySelector('button[data-size="11"]');
            if(defaultButton){
                defaultButton.classList.add('current');
                defaultButton.setAttribute('aria-checked', 'true');
            }

            updateMultiSizeModal(currentProductData.defaultSize, title);
        }

        ipadModal.style.display = 'flex'; 
    });
});

modalTabNavContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.closest('.tabnav-items')) {
        const btn = e.target;
        const navGroup = btn.closest('.tabnav-items');
        const size = btn.dataset.size;
        const name = navGroup.dataset.product;

        navGroup.querySelectorAll('button').forEach(b => {
            b.classList.remove('current');
            b.setAttribute('aria-checked', 'false');
        });
        
        btn.classList.add('current');
        btn.setAttribute('aria-checked', 'true');
        
        updateMultiSizeModal(size, name);
    }
});


document.querySelectorAll('.card-control').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();

        const card = e.target.closest('.ipad-card');
        if (!card) return;

        modalTabNavContainer.style.display = 'none'; 
        
        modalSections.classList.remove('apple-overlay');

        const title = card.dataset.title || 'ทำความรู้จักกับ iPad';
        const headline = card.dataset.headline || '';

        let modalContentHTML = `
            <div class="modal-header-section">
                <h1 class="modal-topic-label">${title}</h1>
                <h2 class="modal-headline">${headline}</h2>
            </div>
        `;

        let hasMultiSectionData = false;
        
        for (let i = 1; i <= 5; i++) {
            const head = card.dataset[`section${i}Head`];
            const copy = card.dataset[`section${i}Copy`];
            const img = card.dataset[`section${i}Img`];

            if (head) {
                hasMultiSectionData = true;
                modalContentHTML += `
                    <div class="modal-content-section">
                        <div class="content-text-wrapper">
                            <h3 class="content-heading">${head}</h3>
                            <p class="content-paragraph">${copy || ''}</p>
                        </div>
                        <div class="content-image-wrapper">
                            ${img ? `<img src="${img}" alt="${title} Image ${i}">` : ''}
                        </div>
                    </div>
                `;
            }
        }
        
        if (!hasMultiSectionData) {
            const subtitle = card.dataset.subtitle || '';
            const desc = card.dataset.desc || '';
            const img = card.dataset.img || '';

            const subParts = subtitle.split('|');
            const subHead = subParts[0] || 'ข้อมูลเพิ่มเติม:';
            const subText = subParts.length > 1 ? subParts[1] : subtitle;

            modalContentHTML += `
                <div class="modal-content-section">
                    <div class="content-text-wrapper">
                        <h3 class="content-heading">${subHead}</h3>
                        <p class="content-paragraph">${subText}</p>
                    </div>
                    <div class="content-image-wrapper">
                        <img src="${img}" alt="${title} Image 1">
                    </div>
                </div>
            `;

            const descParts = desc.split('|');
            const descHead = descParts[0] || 'ข้อมูลเชิงลึก:';
            const descText = descParts.length > 1 ? descParts[1] : desc;

            modalContentHTML += `
                <div class="modal-content-section">
                    <div class="content-text-wrapper">
                        <h3 class="content-heading">${descHead}</h3>
                        <p class="content-paragraph">${descText}</p>
                    </div>
                    <div class="content-image-wrapper">
                        <img src="${img}" alt="${title} Image 2" style="filter: brightness(0.9);">
                    </div>
                </div>
            `;
        }
        
        modalSections.innerHTML = modalContentHTML;
        ipadModal.style.display = 'flex';
    });
});


function closeIpadModal() {
    ipadModal.style.display = 'none';
    modalSections.classList.remove('apple-overlay'); 
}

ipadCloseBtn.addEventListener('click', closeIpadModal);
window.addEventListener('click', e => { 
    if (e.target === ipadModal) closeIpadModal(); 
});


const colorOptionsMap = {
    'pro-m5': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spaceblack', hex: '#1c1c1e', label: 'สีสเปซแบล็ค' }],
    'pro-m4': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spaceblack', hex: '#1c1c1e', label: 'สีสเปซแบล็ค' }],
    'pro129-6rd': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
    'pro129-5rd': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
    'pro129-4rd': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
    'pro129-3rd': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
    'pro129-2rd': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }, { key: 'gold', hex: '#f0e5c9', label: 'สีทอง' }, { key: 'rosegold', hex: '#e8c7c9', label: 'สีโรสโกลด์' }],

    'pro11-6rd': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
    'pro11-5rd': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
    'pro11-4rd': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
    'pro11-3rd': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
    'pro11-2rd': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }, { key: 'gold', hex: '#f0e5c9', label: 'สีทอง' }, { key: 'rosegold', hex: '#e8c7c9', label: 'สีโรสโกลด์' }],

    'air-7th': [{ key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }, { key: 'starlight', hex: '#f0ede4', label: 'สีสตาร์ไลท์' }, { key: 'blue', hex: '#3b88c3', label: 'สีฟ้า' }, { key: 'purple', hex: '#b0a4c2', label: 'สีม่วง' }],
    'air-6th': [{ key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }, { key: 'starlight', hex: '#f0ede4', label: 'สีสตาร์ไลท์' }, { key: 'blue', hex: '#3b88c3', label: 'สีฟ้า' }, { key: 'purple', hex: '#b0a4c2', label: 'สีม่วง' }],
    'air-5th': [{ key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }, { key: 'starlight', hex: '#f0ede4', label: 'สีสตาร์ไลท์' }, { key: 'pink', hex: '#e4b6b6', label: 'สีชมพู' }, { key: 'purple', hex: '#b0a4c2', label: 'สีม่วง' }, { key: 'blue', hex: '#3b88c3', label: 'สีฟ้า' }],
    'air-4th': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }, { key: 'rosegold', hex: '#e8c7c9', label: 'สีโรสโกลด์' }, { key: 'green', hex: '#a6bf84', label: 'สีเขียว' }, { key: 'skyblue', hex: '#87c6db', label: 'สีสกายบลู' }],
    'air-3rd': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }, { key: 'gold', hex: '#f0e5c9', label: 'สีทอง' }],
    'air-2': [{ key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }, { key: 'gold', hex: '#f0e5c9', label: 'สีทอง' }],
    'air-1st': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],

    'ipad-11th': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'blue', hex: '#3b88c3', label: 'สีฟ้า' }, { key: 'pink', hex: '#fa19c9ff', label: 'สีชมพู' }, { key: 'yellow', hex: '#fce849', label: 'สีเหลือง' }],
    'ipad-10th': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'blue', hex: '#3b88c3', label: 'สีฟ้า' }, { key: 'pink', hex: '#fa199cff', label: 'สีชมพู' }, { key: 'yellow', hex: '#fce849', label: 'สีเหลือง' }],
    'ipad-9th': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
    'ipad-8th': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'gold', hex: '#f0e5c9', label: 'สีทอง' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
    'ipad-7th': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'gold', hex: '#f0e5c9', label: 'สีทอง' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
    'ipad-6th': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'gold', hex: '#f0e5c9', label: 'สีทอง' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
    'ipad-5th': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'gold', hex: '#f0e5c9', label: 'สีทอง' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
    
    'mini-7th': [{ key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }, { key: 'starlight', hex: '#f0ede4', label: 'สีสตาร์ไลท์' }, { key: 'blue', hex: '#3b88c3', label: 'สีฟ้า' }, { key: 'purple', hex: '#b0a4c2', label: 'สีม่วง' }],
    'mini-6th': [{ key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }, { key: 'starlight', hex: '#f0ede4', label: 'สีสตาร์ไลท์' }, { key: 'pink', hex: '#e4b6b6', label: 'สีชมพู' }, { key: 'purple', hex: '#b0a4c2', label: 'สีม่วง' }],
    'mini-5th': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }, { key: 'gold', hex: '#f0e5c9', label: 'สีทอง' }],
    'mini-4': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }, { key: 'gold', hex: '#f0e5c9', label: 'สีทอง' }],
    'mini-3': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }, { key: 'gold', hex: '#f0e5c9', label: 'สีทอง' }],
    'mini-2': [{ key: 'silver', hex: '#d2d3d4', label: 'สีเงิน' }, { key: 'spacegray', hex: '#6d6d71', label: 'สีสเปซเกรย์' }],
};


const compareData = {
    'pro-m5': { priceWifi: '฿35,900', priceCellular: '฿42,900', tag: 'ใหม่', defaultColor: 'spaceblack' }, 
    'pro-m4': { priceWifi: '฿35,900', priceCellular: '฿41,900', tag: 'ใหม่', defaultColor: 'spaceblack', },
    'air-7th': { priceWifi: '฿21,900', priceCellular: '฿27,900', tag: 'ใหม่', defaultColor: 'spacegray' }, 
    'air-6th': { priceWifi: '฿21,900', priceCellular: '฿25,900', tag: 'ใหม่', defaultColor: 'spacegray' }, 
    'ipad-11th': { priceWifi: '฿12,900', priceCellular: '฿18,900', tag: 'ใหม่', defaultColor: 'blue' }, 
    'ipad-10th': { priceWifi: '฿12,900', priceCellular: '฿18,900', tag: null, defaultColor: 'blue' }, 
    'mini-7th': { priceWifi: '฿17,900', priceCellular: '฿23,900', tag: 'ใหม่', defaultColor: 'purple' }, 
    
    'pro129-6rd': { priceWifi: '฿24,900+', priceCellular: '฿28,900+', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'pro129-5rd': { priceWifi: '฿17,900+', priceCellular: '฿23,900+', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'pro129-4rd': { priceWifi: '฿17,900+', priceCellular: '฿18,500+', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'pro129-3rd': { priceWifi: '฿17,000+', priceCellular: '฿21,900+', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'pro129-2rd': { priceWifi: '฿7,000+', priceCellular: '฿10,000+', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'air-5th': { priceWifi: '฿19,900', priceCellular: '฿24,900', tag: 'รุ่นเก่า', defaultColor: 'blue' },
    'air-4th': { priceWifi: '฿17,900', priceCellular: '฿22,900', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'air-3rd': { priceWifi: '฿15,900', priceCellular: '฿20,900', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'air-2': { priceWifi: '฿14,900', priceCellular: '฿19,900', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'air-1st': { priceWifi: '฿12,900', priceCellular: '฿17,900', tag: 'รุ่นเก่า', defaultColor: 'silver' },
    'ipad-9th': { priceWifi: '฿10,900', priceCellular: '฿15,900', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'ipad-8th': { priceWifi: '฿10,000', priceCellular: '฿15,000', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'ipad-7th': { priceWifi: '฿9,900', priceCellular: '฿14,900', tag: 'รุ่นเก่า', defaultColor: 'silver' },
    'ipad-6th': { priceWifi: '฿9,000', priceCellular: '฿14,000', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'ipad-5th': { priceWifi: '฿8,500', priceCellular: '฿13,500', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'mini-6th': { priceWifi: '฿15,900', priceCellular: '฿21,900', tag: 'รุ่นเก่า', defaultColor: 'purple' },
    'mini-5th': { priceWifi: '฿15,900', priceCellular: '฿20,900', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'mini-4': { priceWifi: '฿14,900', priceCellular: '฿19,900', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'mini-3': { priceWifi: '฿13,900', priceCellular: '฿18,900', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
    'mini-2': { priceWifi: '฿10,900', priceCellular: '฿15,900', tag: 'รุ่นเก่า', defaultColor: 'spacegray' },
};

const colorImageMap = {
    // แก้ไข/คืนรูปภาพให้ตรงกับชื่อไฟล์ที่คุณมี
    'pro-m5-spaceblack': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/pro-m5-spaceblack.jpg', label: 'สีสเปซแบล็ค' }, // ใช้รูปภาพที่มีอยู่
    'pro-m5-silver': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/pro-m5-silver.jpg', label: 'สีเงิน' },
    'pro-m4-spaceblack': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/pro-m4-spaceblack.jpg', label: 'สีสเปซแบล็ค' }, 
    'pro-m4-silver': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/pro-m4-silver.jpg', label: 'สีเงิน' },

    'pro129-6rd-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/pro129-6rd-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'pro129-6rd-silver': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/pro129-6rd-silver.jpg', label: 'สีเงิน' },
    
    'air-6th-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/air-6th-spacegray.jpg', label: 'สีสเปซเกรย์' }, 
    'air-6th-starlight': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/air-6th-starlight.jpg', label: 'สีสตาร์ไลท์' }, 
    'air-6th-blue': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/air-6th-blue.jpg', label: 'สีฟ้า' }, 
    'air-6th-purple': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/air-6th-purple.jpg', label: 'สีม่วง' }, 

    'ipad-10th-silver': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-10th-silver.jpg', label: 'สีเงิน' },
    'ipad-10th-blue': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-10th-blue.jpg', label: 'สีฟ้า' }, 
    'ipad-10th-pink': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-10th-pink.jpg', label: 'สีชมพู' },
    'ipad-10th-yellow': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-10th-yellow.jpg', label: 'สีเหลือง' },

    'pro129-5rd-silver': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/pro129-5rd-silver.jpg', label: 'สีเงิน' },
    'pro129-5rd-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/pro129-5rd-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'pro129-4rd-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/ipadpro4/pro129-4rd-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'pro129-4rd-silver': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/ipadpro4/pro129-4rd-silver.jpg', label: 'สีเงิน' },
    'pro129-3rd-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/ipadpro4/ipadpro3/pro129-3rd-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'pro129-3rd-silver': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/ipadpro4/ipadpro3/pro129-3rd-silver.jpg', label: 'สีเงิน' },
    'pro129-2rd-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/ipadpro4/ipadpro3/ipadpro2/pro129-2rd-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'pro129-2rd-silver': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/ipadpro4/ipadpro3/ipadpro2/pro129-2rd-silver.jpg', label: 'สีเงิน' },
    'pro129-2rd-rosegold': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/ipadpro4/ipadpro3/ipadpro2/pro129-2rd-rosegold.jpg', label: 'สีโรสโกลด์' },
    'pro129-2rd-gold': { img: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/ipadpro4/ipadpro3/ipadpro2/pro129-2rd-gold.jpg', label: 'สีทอง' },

 
    'air-7th-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipan-air/air-7th-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'air-7th-starlight': { img: 'image/Apple/เปรียบเทียบ/ipan-air/air-7th-starlight.jpg', label: 'สีสตาร์ไลท์' },
    'air-7th-blue': { img: 'image/Apple/เปรียบเทียบ/ipan-air/air-7th-blue.jpg', label: 'สีฟ้า' },
    'air-7th-purple': { img: 'image/Apple/เปรียบเทียบ/ipan-air/air-7th-purple.jpg', label: 'สีม่วง' },

    'air-5th-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/air-5th-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'air-5th-starlight': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/air-5th-starlight.jpg', label: 'สีสตาร์ไลท์' },
    'air-5th-pink': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/air-5th-pink.jpg', label: 'สีชมพู' },
    'air-5th-purple': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/air-5th-purple.jpg', label: 'สีม่วง' },
    'air-5th-blue': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/air-5th-blue.jpg', label: 'สีฟ้า' },

    'air-4th-silver': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/air-4th-silver.jpg', label: 'สีเงิน' },
    'air-4th-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/air-4th-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'air-4th-rosegold': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/air-4th-rosegold.jpg', label: 'สีโรสโกลด์' },
    'air-4th-green': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/air-4th-green.jpg', label: 'สีเขียว' },
    'air-4th-skyblue': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/air-4th-skyblue.jpg', label: 'สีสกายบลู' },

    'air-3rd-silver': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/ipad-air3/air-3rd-silver.jpg', label: 'สีเงิน' },
    'air-3rd-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/ipad-air3/air-3rd-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'air-3rd-gold': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/ipad-air3/air-3rd-gold.jpg', label: 'สีทอง' },

    'air-2-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/ipad-air3/ipad-air2/air-2-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'air-2-gold': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/ipad-air3/ipad-air2/air-2-gold.jpg', label: 'สีทอง' },
    'air-1st-silver': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/ipad-air3/ipad-air2/ipan-air1/air-1st-silver.jpg', label: 'สีเงิน' },
    'air-1st-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/ipad-air3/ipad-air2/ipan-air1/air-1st-spacegray.jpg', label: 'สีสเปซเกรย์' },
    
    'ipad-11th-silver': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-11th-silver.jpg', label: 'สีเงิน' },
    'ipad-11th-blue': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-11th-blue.jpg', label: 'สีฟ้า' },
    'ipad-11th-pink': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-11th-pink.jpg', label: 'สีชมพู' },
    'ipad-11th-yellow': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-11th-yellow.jpg', label: 'สีเหลือง' },

    'ipad-9th-silver': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-9th-silver.jpg', label: 'สีเงิน' },
    'ipad-9th-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-9th-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'ipad-8th-silver': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipad-8th-silver.jpg', label: 'สีเงิน' },
    'ipad-8th-gold': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipad-8th-gold.jpg', label: 'สีทอง' },
    'ipad-8th-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipad-8th-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'ipad-7th-silver': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipan-gen-7/ipad-7th-silver.jpg', label: 'สีเงิน' },
    'ipad-7th-gold': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipan-gen-7/ipad-7th-gold.jpg', label: 'สีทอง' },
    'ipad-7th-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipan-gen-7/ipad-7th-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'ipad-6th-silver': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipan-gen-7/ipad-gen-6/ipad-5th-silver.jpg', label: 'สีเงิน' },
    'ipad-6th-gold': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipan-gen-7/ipad-gen-6/ipad-6th-gold.jpg', label: 'สีทอง' },
    'ipad-6th-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipan-gen-7/ipad-gen-6/ipad-6th-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'ipad-5th-silver': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipan-gen-7/ipad-gen-6/ipan-gen-5/ipad-5th-silver.jpg', label: 'สีเงิน' },
    'ipad-5th-gold': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipan-gen-7/ipad-gen-6/ipan-gen-5/ipad-5th-gold.jpg', label: 'สีทอง' },
    'ipad-5th-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipan-gen-7/ipad-gen-6/ipan-gen-5/ipad-5th-spacegray.jpg', label: 'สีสเปซเกรย์' },
    
    'mini-7th-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/mini-7th-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'mini-7th-starlight': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/mini-7th-starlight.jpg', label: 'สีสตาร์ไลท์' },
    'mini-7th-blue': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/mini-7th-blue.jpg', label: 'สีฟ้า' },
    'mini-7th-purple': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/mini-7th-purple.jpg', label: 'สีม่วง' },
    'mini-6th-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/mini-6th-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'mini-6th-starlight': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/mini-6th-starlight.jpg', label: 'สีสตาร์ไลท์' },
    'mini-6th-pink': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/mini-6th-pink.jpg', label: 'สีชมพู' },
    'mini-6th-purple': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/mini-6th-purple.jpg', label: 'สีม่วง' },

    'mini-5th-silver': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/mini-5th-silver.jpg', label: 'สีเงิน' },
    'mini-5th-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/mini-5th-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'mini-5th-gold': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/mini-5th-gold.jpg', label: 'สีทอง' },
    'mini-4-silver': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/ipadmini4/mini-4-silver.jpg', label: 'สีเงิน' },
    'mini-4-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/ipadmini4/mini-4-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'mini-4-gold': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/ipadmini4/mini-4-gold.jpg', label: 'สีทอง' },
    'mini-3-silver': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/ipadmini4/ipadmini3/mini-3-silver.jpg', label: 'สีเงิน' },
    'mini-3-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/ipadmini4/ipadmini3/mini-3-spacegray.jpg', label: 'สีสเปซเกรย์' },
    'mini-3-gold': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/ipadmini4/ipadmini3/mini-3-gold.jpg', label: 'สีทอง' },
    'mini-2-silver': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/ipadmini4/ipadmini3/ipadmini2/mini-2-silver.jpg', label: 'สีเงิน' },
    'mini-2-spacegray': { img: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/ipadmini4/ipadmini3/ipadmini2/mini-2-spacegray.jpg', label: 'สีสเปซเกรย์' },    
};


function renderColorDots(modelKey, columnContent) {
    const colors = colorOptionsMap[modelKey];
    const defaultColorKey = compareData[modelKey] ? compareData[modelKey].defaultColor : (colors ? colors[0].key : null);
    
    const colorOptionsContainer = columnContent.querySelector('.color-options');
    colorOptionsContainer.innerHTML = '';

    if (colors && colors.length > 0) {
        colors.forEach(color => {
            const dot = document.createElement('span');
            dot.classList.add('color-dot');
            dot.style.backgroundColor = color.hex;
            dot.dataset.model = modelKey;
            dot.dataset.color = color.key;
            dot.title = color.label;
            
            // ใช้ Class แทนการกำหนด style.border โดยตรง
            if (color.key === defaultColorKey) {
                dot.classList.add('selected-color'); 
            }
            
            dot.addEventListener('click', handleColorDotClick);
            colorOptionsContainer.appendChild(dot);
        });
    }
}


function updateCompareColumn(selectElement) {
    const selectedModel = selectElement.value; 
    const columnContent = selectElement.closest('.compare-column').querySelector('.compare-product-content');
    const currentImg = columnContent.querySelector('img');
    const modelLabel = columnContent.querySelector('.model-label');
    
    const data = compareData[selectedModel] || compareData['ipad-10th']; 

    columnContent.dataset.model = selectedModel;
    
    // ต้องเรียก renderColorDots ก่อนเพื่อสร้างปุ่มสี
    renderColorDots(selectedModel, columnContent); 

    const priceDetails = columnContent.querySelector('.price-details');
    priceDetails.innerHTML = `
        ${data.tag ? `<p class="tag" style="color: #fa5019;">${data.tag}</p>` : ''}
        <p>รุ่น Wi-Fi</p>
        <p>เริ่มต้นที่ ${data.priceWifi}</p>
        ${data.priceCellular ? `<p class="cellular">รุ่น Wi-Fi + Cellular</p><p>เริ่มต้นที่ ${data.priceCellular}</p>` : ''}
    `;
    
    const defaultColorKey = data.defaultColor;
    const initialColorKey = `${selectedModel}-${defaultColorKey}`;
    const initialData = colorImageMap[initialColorKey];

    if (initialData) {
        currentImg.src = initialData.img;
        currentImg.alt = initialData.label; 
        modelLabel.innerText = initialData.label;
    } else {
        currentImg.src = 'image/Apple/compare-models/default-ipad.png'; 
        currentImg.alt = 'iPad Default Image';
        modelLabel.innerText = `ไม่พบสีเริ่มต้น (${defaultColorKey})`;
    }
}

function handleColorDotClick(e) {
    const dot = e.target;
    const colorName = dot.dataset.color; 
    
    const columnContent = dot.closest('.compare-product-content');
    const modelName = columnContent.dataset.model;
    
    const key = `${modelName}-${colorName}`; 
    const colorData = colorImageMap[key];
    
    const colorOptions = dot.closest('.color-options');

    colorOptions.querySelectorAll('.color-dot').forEach(d => {
        d.classList.remove('selected-color');
    });
    dot.classList.add('selected-color');
    
    if (colorData) {
        const imgElement = columnContent.querySelector('img');
        imgElement.src = colorData.img;
        imgElement.alt = colorData.label;
        
        const labelElement = columnContent.querySelector('.model-label');
        if (labelElement) {
            labelElement.innerText = colorData.label;
        }
    } 
}


document.querySelectorAll('.compare-dropdown').forEach(dropdown => {
    dropdown.addEventListener('change', (e) => {
        updateCompareColumn(e.target);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.compare-dropdown').forEach(dropdown => {
        updateCompareColumn(dropdown);
    });
});


// --- ส่วนใหม่สำหรับเปรียบเทียบสเปค (ตาราง) ---

const compareDetailModal = document.getElementById('compareDetailModal');
const showCompareDetailBtn = document.getElementById('showCompareDetailBtn');
const compareSpecsTableContainer = document.getElementById('compareSpecsTableContainer');
const compareDetailCloseBtn = compareDetailModal.querySelector('.modal-close');


const ipadSpecsData = {
    // iPad Pro รุ่นใหม่
    'pro-m5': {
        name: 'iPad Pro (M5)',
        tag: 'ใหม่มาก',
        price: '฿35,900',
        image: 'image/Apple/compare-models/ipad-pro-13-spaceblack.png',
        chip: 'Apple M5',
        display: 'Ultra Retina XDR (OLED) 11" / 13", ProMotion',
        camera_rear: 'ไวด์ 12MP + LiDAR (4K Video, ProRes)',
        camera_front: 'อัลตร้าไวด์ 12MP (แนวนอน) / Face ID',
        unlock: 'Face ID',
        pencil_support: 'Apple Pencil Pro / USB-C',
        keyboard_support: 'Magic Keyboard สำหรับ iPad Pro',
        storage_options: '256GB, 512GB, 1TB, 2TB',
    },
    'pro-m4': {
        name: 'iPad Pro (M4)',
        tag: 'ใหม่',
        price: '฿35,900',
        image: 'image/Apple/compare-models/ipad-pro-13-spaceblack.png',
        chip: 'Apple M4',
        display: 'Ultra Retina XDR (OLED) 11" / 13", ProMotion',
        camera_rear: 'ไวด์ 12MP + LiDAR (4K Video, ProRes)',
        camera_front: 'อัลตร้าไวด์ 12MP (แนวนอน) / Face ID',
        unlock: 'Face ID',
        pencil_support: 'Apple Pencil Pro / USB-C',
        keyboard_support: 'Magic Keyboard สำหรับ iPad Pro',
        storage_options: '256GB, 512GB, 1TB, 2TB',
    },
    // iPad Pro รุ่นเก่า
    'pro129-6rd': {
        name: 'iPad Pro 12.9" (รุ่น 6)',
        tag: 'รุ่นเก่า',
        price: '฿24,900+',
        image: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/pro129-6rd-spacegray.jpg',
        chip: 'Apple M2',
        display: 'Liquid Retina XDR 12.9", ProMotion',
        camera_rear: 'ไวด์ 12MP + อัลตร้าไวด์ 10MP + LiDAR',
        camera_front: 'อัลตร้าไวด์ 12MP / Face ID',
        unlock: 'Face ID',
        pencil_support: 'Apple Pencil (รุ่น 2)',
        keyboard_support: 'Magic Keyboard / Smart Keyboard Folio',
        storage_options: '128GB, 256GB, 512GB, 1TB, 2TB',
    },
    'pro129-5rd': {
        name: 'iPad Pro 12.9" (รุ่น 5)',
        tag: 'รุ่นเก่า',
        price: '฿17,900+',
        image: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/pro129-5rd-spacegray.jpg',
        chip: 'Apple M1',
        display: 'Liquid Retina XDR 12.9", ProMotion',
        camera_rear: 'ไวด์ 12MP + อัลตร้าไวด์ 10MP + LiDAR',
        camera_front: 'อัลตร้าไวด์ 12MP / Face ID',
        unlock: 'Face ID',
        pencil_support: 'Apple Pencil (รุ่น 2)',
        keyboard_support: 'Magic Keyboard / Smart Keyboard Folio',
        storage_options: '128GB, 256GB, 512GB, 1TB, 2TB',
    },
    'pro129-4rd': {
        name: 'iPad Pro 12.9" (รุ่น 4)',
        tag: 'รุ่นเก่า',
        price: '฿17,900+',
        image: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/ipadpro4/pro129-4rd-spacegray.jpg',
        chip: 'Apple A12Z Bionic',
        display: 'Liquid Retina 12.9", ProMotion',
        camera_rear: 'ไวด์ 12MP + อัลตร้าไวด์ 10MP + LiDAR',
        camera_front: 'TrueDepth 7MP / Face ID',
        unlock: 'Face ID',
        pencil_support: 'Apple Pencil (รุ่น 2)',
        keyboard_support: 'Magic Keyboard / Smart Keyboard Folio',
        storage_options: '128GB, 256GB, 512GB, 1TB',
    },
    'pro129-3rd': {
        name: 'iPad Pro 12.9" (รุ่น 3)',
        tag: 'รุ่นเก่า',
        price: '฿17,000+',
        image: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/ipadpro4/ipadpro3/pro129-3rd-spacegray.jpg',
        chip: 'Apple A12X Bionic',
        display: 'Liquid Retina 12.9", ProMotion',
        camera_rear: 'ไวด์ 12MP',
        camera_front: 'TrueDepth 7MP / Face ID',
        unlock: 'Face ID',
        pencil_support: 'Apple Pencil (รุ่น 2)',
        keyboard_support: 'Smart Keyboard Folio',
        storage_options: '64GB, 256GB, 512GB, 1TB',
    },
    'pro129-2rd': {
        name: 'iPad Pro 12.9" (รุ่น 2)',
        tag: 'รุ่นเก่า',
        price: '฿7,000+',
        image: 'image/Apple/เปรียบเทียบ/ipad-Pro/ipad-m4/ipadpro6/ipadpro5/ipadpro4/ipadpro3/ipadpro2/pro129-2rd-spacegray.jpg',
        chip: 'Apple A10X Fusion',
        display: 'Retina 12.9", ProMotion',
        camera_rear: 'ไวด์ 12MP',
        camera_front: '7MP',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil (รุ่น 1)',
        keyboard_support: 'Smart Keyboard',
        storage_options: '64GB, 256GB, 512GB',
    },
    
    // iPad Air
    'air-7th': {
        name: 'iPad Air (รุ่น 7)',
        tag: 'ใหม่',
        price: '฿21,900',
        image: 'image/Apple/compare-models/ipad-air-13-spacegray.png',
        chip: 'Apple M2',
        display: 'Liquid Retina 11" / 13"',
        camera_rear: 'ไวด์ 12MP (4K Video)',
        camera_front: 'อัลตร้าไวด์ 12MP (แนวนอน)',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil Pro / USB-C',
        keyboard_support: 'Magic Keyboard / Smart Keyboard Folio',
        storage_options: '128GB, 256GB, 512GB, 1TB',
    },
    'air-6th': {
        name: 'iPad Air (รุ่น 6)',
        tag: 'ใหม่',
        price: '฿21,900',
        image: 'image/Apple/compare-models/ipad-air-13-spacegray.png',
        chip: 'Apple M2',
        display: 'Liquid Retina 11" / 13"',
        camera_rear: 'ไวด์ 12MP (4K Video)',
        camera_front: 'อัลตร้าไวด์ 12MP (แนวนอน)',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil Pro / USB-C',
        keyboard_support: 'Magic Keyboard / Smart Keyboard Folio',
        storage_options: '128GB, 256GB, 512GB, 1TB',
    },
    'air-5th': {
        name: 'iPad Air (รุ่น 5)',
        tag: 'รุ่นเก่า',
        price: '฿19,900',
        image: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/air-5th-blue.jpg',
        chip: 'Apple M1',
        display: 'Liquid Retina 10.9"',
        camera_rear: 'ไวด์ 12MP (4K Video)',
        camera_front: 'อัลตร้าไวด์ 12MP',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil (รุ่น 2)',
        keyboard_support: 'Magic Keyboard / Smart Keyboard Folio',
        storage_options: '64GB, 256GB',
    },
    'air-4th': {
        name: 'iPad Air (รุ่น 4)',
        tag: 'รุ่นเก่า',
        price: '฿17,900',
        image: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/air-4th-spacegray.jpg',
        chip: 'Apple A14 Bionic',
        display: 'Liquid Retina 10.9"',
        camera_rear: 'ไวด์ 12MP (4K Video)',
        camera_front: '7MP',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil (รุ่น 2)',
        keyboard_support: 'Magic Keyboard / Smart Keyboard Folio',
        storage_options: '64GB, 256GB',
    },
    'air-3rd': {
        name: 'iPad Air (รุ่น 3)',
        tag: 'รุ่นเก่า',
        price: '฿15,900',
        image: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/ipad-air3/air-3rd-spacegray.jpg',
        chip: 'Apple A12 Bionic',
        display: 'Retina 10.5"',
        camera_rear: 'ไวด์ 8MP',
        camera_front: '7MP',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil (รุ่น 1)',
        keyboard_support: 'Smart Keyboard',
        storage_options: '64GB, 256GB',
    },
    'air-2': {
        name: 'iPad Air 2',
        tag: 'รุ่นเก่ามาก',
        price: '฿14,900',
        image: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/ipad-air3/ipad-air2/air-2-spacegray.jpg',
        chip: 'Apple A8X',
        display: 'Retina 9.7"',
        camera_rear: 'ไวด์ 8MP',
        camera_front: '1.2MP',
        unlock: 'Touch ID',
        pencil_support: '-',
        keyboard_support: '-',
        storage_options: '16GB, 32GB, 64GB, 128GB',
    },
    'air-1st': {
        name: 'iPad Air (รุ่น 1)',
        tag: 'รุ่นเก่ามาก',
        price: '฿12,900',
        image: 'image/Apple/เปรียบเทียบ/ipan-air/ipadAir6/ipad5/ipadair4/ipad-air3/ipad-air2/ipan-air1/air-1st-spacegray.jpg',
        chip: 'Apple A7',
        display: 'Retina 9.7"',
        camera_rear: 'ไวด์ 5MP',
        camera_front: '1.2MP',
        unlock: '-',
        pencil_support: '-',
        keyboard_support: '-',
        storage_options: '16GB, 32GB, 64GB, 128GB',
    },

    // iPad รุ่นพื้นฐาน
    'ipad-11th': {
        name: 'iPad (รุ่น 11)',
        tag: 'ใหม่',
        price: '฿12,900',
        image: 'image/Apple/compare-models/ipad-10-blue.png',
        chip: 'Apple A16 Bionic',
        display: 'Liquid Retina 10.9"',
        camera_rear: 'ไวด์ 12MP (4K Video)',
        camera_front: 'อัลตร้าไวด์ 12MP (แนวนอน)',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil (รุ่น 1) / USB-C',
        keyboard_support: 'Magic Keyboard Folio',
        storage_options: '64GB, 256GB',
    },
    'ipad-10th': {
        name: 'iPad (รุ่น 10)',
        tag: null,
        price: '฿12,90        0',
        image: 'image/Apple/compare-models/ipad-10-blue.png',
        chip: 'Apple A14 Bionic',
        display: 'Liquid Retina 10.9 นิ้ว',
        camera_rear: 'ไวด์ 12MP (4K Video)',
        camera_front: 'อัลตร้าไวด์ 12MP (แนวนอน)',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil (รุ่น 1) / USB-C',
        keyboard_support: 'Magic Keyboard Folio',
        storage_options: '64GB, 256GB',
    },
    'ipad-9th': {
        name: 'iPad (รุ่น 9)',
        tag: 'รุ่นเก่า',
        price: '฿10,900',
        image: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-9th-spacegray.jpg',
        chip: 'Apple A13 Bionic',
        display: 'Retina 10.2 นิ้ว',
        camera_rear: 'ไวด์ 8MP',
        camera_front: 'อัลตร้าไวด์ 12MP',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil (รุ่น 1)',
        keyboard_support: 'Smart Keyboard',
        storage_options: '64GB, 256GB',
    },
    'ipad-8th': {
        name: 'iPad (รุ่น 8)',
        tag: 'รุ่นเก่า',
        price: '฿10,000',
        image: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipan-gen-7/ipad-8th-spacegray.jpg',
        chip: 'Apple A12 Bionic',
        display: 'Retina 10.2 นิ้ว',
        camera_rear: 'ไวด์ 8MP',
        camera_front: '1.2MP',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil (รุ่น 1)',
        keyboard_support: 'Smart Keyboard',
        storage_options: '32GB, 128GB',
    },
    'ipad-7th': {
        name: 'iPad (รุ่น 7)',
        tag: 'รุ่นเก่า',
        price: '฿9,900',
        image: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipan-gen-7/ipad-7th-spacegray.jpg',
        chip: 'Apple A10 Fusion',
        display: 'Retina 10.2 นิ้ว',
        camera_rear: 'ไวด์ 8MP',
        camera_front: '1.2MP',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil (รุ่น 1)',
        keyboard_support: 'Smart Keyboard',
        storage_options: '32GB, 128GB',
    },
    'ipad-6th': {
        name: 'iPad (รุ่น 6)',
        tag: 'รุ่นเก่า',
        price: '฿9,000',
        image: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipan-gen-7/ipad-gen-6/ipad-6th-spacegray.jpg',
        chip: 'Apple A10 Fusion',
        display: 'Retina 9.7 นิ้ว',
        camera_rear: 'ไวด์ 8MP',
        camera_front: '1.2MP',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil (รุ่น 1)',
        keyboard_support: '-',
        storage_options: '32GB, 128GB',
    },
    'ipad-5th': {
        name: 'iPad (รุ่น 5)',
        tag: 'รุ่นเก่า',
        price: '฿8,500',
        image: 'image/Apple/เปรียบเทียบ/ipad/ipad-Gen-10/ipad-gen-9/ipad-Gen-8/ipan-gen-7/ipad-gen-6/ipan-gen-5/ipad-5th-spacegray.jpg',
        chip: 'Apple A9',
        display: 'Retina 9.7 นิ้ว',
        camera_rear: 'ไวด์ 8MP',
        camera_front: '1.2MP',
        unlock: 'Touch ID',
        pencil_support: '-',
        keyboard_support: '-',
        storage_options: '32GB, 128GB',
    },

    // iPad mini
    'mini-7th': {
        name: 'iPad mini 7',
        tag: 'ใหม่',
        price: '฿17,900',
        image: 'image/Apple/เปรียบเทียบ/ipad-mini/mini-7th-purple.jpg',
        chip: 'Apple A17 Bionic',
        display: 'Liquid Retina 8.3 นิ้ว',
        camera_rear: 'ไวด์ 12MP (4K Video)',
        camera_front: 'อัลตร้าไวด์ 12MP',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil (รุ่น 2) / USB-C',
        keyboard_support: '-',
        storage_options: '128GB, 256GB, 512GB',
    },
    'mini-6th': {
        name: 'iPad mini 6',
        tag: 'รุ่นเก่า',
        price: '฿15,900',
        image: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/mini-6th-purple.jpg',
        chip: 'Apple A15 Bionic',
        display: 'Liquid Retina 8.3 นิ้ว',
        camera_rear: 'ไวด์ 12MP (4K Video)',
        camera_front: 'อัลตร้าไวด์ 12MP',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil (รุ่น 2) / USB-C',
        keyboard_support: '-',
        storage_options: '64GB, 256GB',
    },
    'mini-5th': {
        name: 'iPad mini 5',
        tag: 'รุ่นเก่า',
        price: '฿15,900',
        image: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/mini-5th-spacegray.jpg',
        chip: 'Apple A12 Bionic',
        display: 'Retina 7.9 นิ้ว',
        camera_rear: 'ไวด์ 8MP',
        camera_front: '7MP',
        unlock: 'Touch ID',
        pencil_support: 'Apple Pencil (รุ่น 1)',
        keyboard_support: '-',
        storage_options: '64GB, 256GB',
    },
    'mini-4': {
        name: 'iPad mini 4',
        tag: 'รุ่นเก่า',
        price: '฿14,900',
        image: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/ipadmini4/mini-4-spacegray.jpg',
        chip: 'Apple A8',
        display: 'Retina 7.9 นิ้ว',
        camera_rear: 'ไวด์ 8MP',
        camera_front: '1.2MP',
        unlock: 'Touch ID',
        pencil_support: '-',
        keyboard_support: '-',
        storage_options: '16GB, 32GB, 64GB, 128GB',
    },
    'mini-3': {
        name: 'iPad mini 3',
        tag: 'รุ่นเก่า',
        price: '฿13,900',
        image: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/ipadmini4/ipadmini3/mini-3-spacegray.jpg',
        chip: 'Apple A7',
        display: 'Retina 7.9 นิ้ว',
        camera_rear: 'ไวด์ 5MP',
        camera_front: '1.2MP',
        unlock: 'Touch ID',
        pencil_support: '-',
        keyboard_support: '-',
        storage_options: '16GB, 64GB, 128GB',
    },
    'mini-2': {
        name: 'iPad mini 2',
        tag: 'รุ่นเก่า',
        price: '฿10,900',
        image: 'image/Apple/เปรียบเทียบ/ipad-mini/ipadmini6/ipadmini5/ipadmini4/ipadmini3/ipadmini2/mini-2-spacegray.jpg',
        chip: 'Apple A7',
        display: 'Retina 7.9 นิ้ว',
        camera_rear: 'ไวด์ 5MP',
        camera_front: '1.2MP',
        unlock: '-',
        pencil_support: '-',
        keyboard_support: '-',
        storage_options: '16GB, 32GB, 64GB, 128GB',
    },
};


function generateCompareTable(models) {
    // จำกัดให้แสดงผลแค่ 2 รุ่นแรกเท่านั้น
    const modelsToCompare = models.slice(0, 2); 

    if (modelsToCompare.length < 2) {
        return '<p style="text-align: center; color: #3c3c43;">กรุณาเลือกรุ่น iPad เพื่อเปรียบเทียบ 2 รุ่น</p>';
    }

    const categories = {
        'chip': 'ชิป',
        'display': 'จอภาพ',
        'camera_rear': 'กล้องหลัง',
        'camera_front': 'กล้องหน้า',
        'unlock': 'การปลดล็อค',
        'pencil_support': 'การรองรับ Apple Pencil',
        'keyboard_support': 'การรองรับคีย์บอร์ด',
        'storage_options': 'ตัวเลือกพื้นที่จัดเก็บข้อมูล'
    };

    let tableHTML = `<table class="compare-specs-table"><thead><tr>`;
    tableHTML += `<th class="specs-header-cell">คุณสมบัติ</th>`;

    // ส่วนหัวของตาราง (ชื่อสินค้าและรูปภาพ)
    modelsToCompare.forEach(modelKey => {
        const data = ipadSpecsData[modelKey];
        // ดึงรูปภาพที่ผู้ใช้เลือกสีล่าสุด
        let imgSource = data.image;
        const currentContent = document.querySelector(`.compare-product-content[data-model="${modelKey}"]`);
        if(currentContent){
            const selectedColor = currentContent.querySelector('.color-dot.selected-color');
            if(selectedColor){
                const colorKey = `${modelKey}-${selectedColor.dataset.color}`;
                if(colorImageMap[colorKey]){
                    imgSource = colorImageMap[colorKey].img;
                }
            }
        }
        
        const price = data.price || 'ราคาเริ่มต้น';

        tableHTML += `
            <th class="specs-header-cell">
                <img src="${imgSource}" alt="${data.name}" style="width: 100px; height: auto; margin-bottom: 10px; background-color: white;">
                <span class="product-compare-tag">${data.tag || ''}</span>
                <p class="product-compare-name">${data.name}</p>
                <p class="product-compare-price">เริ่มต้นที่ ${price}</p>
            </th>
        `;
    });
    tableHTML += `</tr></thead><tbody>`;

    // ส่วนเนื้อหาของตาราง (ข้อมูลจำเพาะ)
    for (const key in categories) {
        tableHTML += `<tr><th style="text-align: left; background-color: #f0f0f5;">${categories[key]}</th>`;
        
        modelsToCompare.forEach(modelKey => {
            const data = ipadSpecsData[modelKey];
            tableHTML += `<td>${data[key] || '-'}</td>`;
        });
        tableHTML += `</tr>`;
    }

    tableHTML += `</tbody></table>`;
    return tableHTML;
}


function getSelectedModels() {
    // ดึงค่าจาก selector 2 ตัวแรกเท่านั้น
    const selector1 = document.getElementById('compare-selector-1').value;
    const selector2 = document.getElementById('compare-selector-2').value;
    
    // ใช้ Set เพื่อให้แน่ใจว่ารุ่นไม่ซ้ำกัน และกรองเอาเฉพาะรุ่นที่มีข้อมูลใน ipadSpecsData
    return [...new Set([selector1, selector2])].filter(model => ipadSpecsData[model]);
}


showCompareDetailBtn.addEventListener('click', () => {
    const selectedModels = getSelectedModels();
    compareSpecsTableContainer.innerHTML = generateCompareTable(selectedModels);
    compareDetailModal.style.display = 'flex';
});

compareDetailCloseBtn.addEventListener('click', () => compareDetailModal.style.display = 'none');

window.addEventListener('click', e => {
    if (e.target === compareDetailModal) compareDetailModal.style.display = 'none';
});