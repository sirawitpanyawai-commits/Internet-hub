// iphone.js
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

const featureCards = document.querySelectorAll('.iphone-feature-card');
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
            <img id="productImg" src="${data.sizes[size]}" alt="${name} รุ่น ${size}" style="max-width:100%;">
        </div>
        <div class="apple-overlay-right">
            <h2 id="productTitle">${name} รุ่น ${size}</h2>
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

        let defaultSize = '';
        let tabKey = '';

        if (title.includes('Pro')) {
            defaultSize = '17 Pro';
            tabKey = 'tabnav-pro';
        } else if (title.includes('16')) {
            defaultSize = '16';
            tabKey = 'tabnav-air';
        } else {
            return; 
        }
        
        currentProductData = {
            sizes: JSON.parse(card.dataset.sizes),
            details: JSON.parse(card.dataset.details),
            features: JSON.parse(card.dataset.features),
            defaultSize: defaultSize 
        };

        modalTabNavContainer.style.display = 'flex';
        allTabNavs.forEach(nav => nav.style.display = 'none');
        
        const activeTabNav = document.getElementById(tabKey);
        
        if (activeTabNav) {
            activeTabNav.style.display = 'flex';

            const sizeButtons = activeTabNav.querySelectorAll('button');
            sizeButtons.forEach(b => {
                b.classList.remove('current');
                b.setAttribute('aria-checked', 'false');
            });

            const defaultButton = activeTabNav.querySelector(`button[data-size="${currentProductData.defaultSize}"]`);
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

featureCards.forEach(button => { 
    button.addEventListener('click', (e) => {
        e.stopPropagation();

        const card = e.target.closest('.iphone-feature-card'); 
        if (!card) return;

        modalTabNavContainer.style.display = 'none'; 
        modalSections.classList.remove('apple-overlay');

        const title = card.dataset.title || 'ทำความรู้จักกับ iPhone';
        const headline = card.dataset.headline || '';

        let modalContentHTML = `
            <div class="modal-header-section">
                <h1 class="modal-topic-label">${title}</h1>
                <h2 class="modal-headline">${headline}</h2>
            </div>
        `;

        for (let i = 1; i <= 5; i++) {
            const head = card.dataset[`section${i}Head`];
            const copy = card.dataset[`section${i}Copy`];
            const img = card.dataset[`section${i}Img`];

            if (head) {
                modalContentHTML += `
                    <div class="modal-content-section">
                        <div class="content-text-wrapper">
                            <p class="content-paragraph" style="font-size: 16px; font-weight: 400; color: #3c3c43;">
                                <strong>${head}</strong> ${copy || ''}
                            </p>
                        </div>
                        <div class="content-image-wrapper">
                            ${img ? `<img src="${img}" alt="${title} Image ${i}">` : ''}
                        </div>
                    </div>
                `;
            }
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


const accessoryDetailModal = document.getElementById('accessoryDetailModal');
const accessoryCards = document.querySelectorAll('.accessory-card');
const accessoryCloseBtn = accessoryDetailModal.querySelector('.accessory-modal-close');
const accessorySizeDropdown = document.getElementById('accessory-size');
const accessoryColorSwatches = document.getElementById('accessoryColorSwatches');
const accessoryImgDetail = document.getElementById('accessoryImgDetail');
const accessoryColorLabel = document.getElementById('accessoryColorLabel');
const accessoryThumbnails = document.getElementById('accessoryThumbnails');

let currentAccessoryData = {};

function updateAccessoryImage(selectedColorKey, selectedSize) {
    const colorData = currentAccessoryData.colors.find(c => c.key === selectedColorKey);
    if (colorData) accessoryImgDetail.src = colorData.img; 
    const selectedColor = colorData ? colorData.label : 'ไม่พบสี';
    accessoryColorLabel.innerText = `สี - ${selectedColor}`;
    accessoryColorSwatches.querySelectorAll('.color-dot').forEach(dot => {
        dot.classList.remove('selected-color');
        if (dot.dataset.color === selectedColorKey) dot.classList.add('selected-color');
    });
    accessoryThumbnails.querySelectorAll('.accessory-thumbnail').forEach(thumb => {
        thumb.classList.remove('selected-thumbnail');
        if (thumb.dataset.color === selectedColorKey) thumb.classList.add('selected-thumbnail');
    });
    const newHeadline = `${currentAccessoryData.title} สำหรับ ${selectedSize} - สี${selectedColor}`;
    document.getElementById('accessoryTitleDetail').innerText = newHeadline;
}

function renderAccessoryOptions(data) {
    accessorySizeDropdown.innerHTML = data.sizes.map(size => 
        `<option value="${size}" ${size === data.defaultSize ? 'selected' : ''}>${size}</option>`
    ).join('');
    accessoryColorSwatches.innerHTML = '';
    accessoryThumbnails.innerHTML = '';
    data.colors.forEach(color => {
        const dot = document.createElement('span');
        dot.classList.add('color-dot');
        dot.style.backgroundColor = color.hex;
        dot.dataset.color = color.key;
        dot.title = color.label;
        if (color.key === data.defaultColor) dot.classList.add('selected-color');
        dot.addEventListener('click', () => updateAccessoryImage(color.key, accessorySizeDropdown.value));
        accessoryColorSwatches.appendChild(dot);
        const thumb = document.createElement('img');
        thumb.src = color.img; 
        thumb.alt = color.label;
        thumb.classList.add('accessory-thumbnail');
        thumb.dataset.color = color.key;
        if (color.key === data.defaultColor) thumb.classList.add('selected-thumbnail'); 
        thumb.addEventListener('click', () => updateAccessoryImage(color.key, accessorySizeDropdown.value));
        accessoryThumbnails.appendChild(thumb);
    });
    const featuresContainer = document.getElementById('accessoryFeatures');
    featuresContainer.innerHTML = `<h4>คุณสมบัติหลัก</h4><ul class="feature-list">${data.features.map(f => `<li>${f}</li>`).join('')}</ul>`;
    accessorySizeDropdown.onchange = (e) => {
        const selectedColorKey = accessoryColorSwatches.querySelector('.selected-color').dataset.color;
        updateAccessoryImage(selectedColorKey, e.target.value);
    };
    updateAccessoryImage(data.defaultColor, data.defaultSize);
}

accessoryCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return; 
        currentAccessoryData = {
            title: card.dataset.title,
            headline: card.dataset.headline,
            price: card.dataset.price,
            defaultSize: card.dataset.defaultSize,
            defaultColor: card.dataset.defaultColor,
            colors: JSON.parse(card.dataset.colors),
            sizes: JSON.parse(card.dataset.sizes),
            features: JSON.parse(card.dataset.features)
        };
        document.getElementById('accessoryTagDetail').innerText = card.querySelector('.tag') ? card.querySelector('.tag').innerText : '';
        document.getElementById('accessoryPriceDetail').innerText = currentAccessoryData.price;
        renderAccessoryOptions(currentAccessoryData);
        accessoryDetailModal.style.display = 'flex';
    });
});

accessoryCloseBtn.addEventListener('click', () => accessoryDetailModal.style.display = 'none');
window.addEventListener('click', e => { 
    if (e.target === accessoryDetailModal) accessoryDetailModal.style.display = 'none'; 
});


document.querySelectorAll('.savings-card').forEach(card => {
    card.addEventListener('click', () => {
        modalTabNavContainer.style.display = 'none'; 
        modalSections.classList.remove('apple-overlay');

        const title = card.dataset.title; 
        const subtitle = card.dataset.subtitle; 
        
        let modalContentHTML = `
            <div class="modal-header-section" style="text-align: left; padding: 0 40px 20px 40px;">
                <h1 class="modal-headline" style="font-size: 40px; margin: 0; color: #1c1c1e;">${title}</h1>
            </div>
            <div class="modal-content-section" style="padding: 0 40px; border-bottom: none;">
                <p class="content-paragraph" style="color: #1c1c1e; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">${subtitle}</p>
            </div>
        `;
        
        modalSections.innerHTML = modalContentHTML;
        ipadModal.style.display = 'flex';
    });
});

function initializeGalleryPagination(gallerySelector, indicatorId) {
    const gallery = document.querySelector(gallerySelector);
    const indicator = document.getElementById(indicatorId);
    
    if (!gallery || !indicator) return;

    const cards = gallery.querySelectorAll('.iphone-feature-card, .iphone-accessory-card');
    const numCards = cards.length;
    
    
    const indicatorWidthFraction = 1 / numCards;
    indicator.style.width = `${indicatorWidthFraction * 100}%`;

    
    const updateProgress = () => {
        const scrollLeft = gallery.scrollLeft;
        
        if (numCards === 0) return;
        
        
        const maxScroll = gallery.scrollWidth - gallery.clientWidth; 
        
        if (maxScroll <= 0) {
            
            indicator.style.transform = `translateX(0%)`;
            return;
        }

        
        const scrollRatio = scrollLeft / maxScroll; 
        
        
        const maxTranslateX = 100 - (indicatorWidthFraction * 100);

        const translateX = scrollRatio * maxTranslateX;
        
        
        indicator.style.transform = `translateX(${translateX}%)`;
    };

    gallery.addEventListener('scroll', updateProgress);
    
    
    updateProgress();
}


function enableDragScroll(selector) {
    const container = document.querySelector(selector);
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    container.addEventListener('mousedown', (e) => {
        
        e.preventDefault();
        isDown = true;
        container.classList.add('dragging');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('dragging');
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('dragging');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.2; 
        container.scrollLeft = scrollLeft - walk;
    });

    
    let touchStartX = 0;
    let touchStartScroll = 0;

    container.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        touchStartX = t.pageX;
        touchStartScroll = container.scrollLeft;
    }, {passive: true});

    container.addEventListener('touchmove', (e) => {
        const t = e.touches[0];
        const move = t.pageX - touchStartX;
        container.scrollLeft = touchStartScroll - move;
    }, {passive: true});
}


function addScrollButtons(sectionSelector, scrollAmount = 400) {
    const section = document.querySelector(sectionSelector);
    if (!section) return;

    const gallery = section.querySelector('.iphone-gallery-wrap');
    if (!gallery) return;

    
    const leftBtn = document.createElement('button');
    const rightBtn = document.createElement('button');

    leftBtn.type = 'button';
    rightBtn.type = 'button';

    leftBtn.className = 'scroll-btn scroll-left';
    rightBtn.className = 'scroll-btn scroll-right';

    
    
    leftBtn.innerHTML = '‹'; /* อัปเดตเนื้อหาปุ่ม */
    rightBtn.innerHTML = '›'; /* อัปเดตเนื้อหาปุ่ม */

    
    
    section.style.position = section.style.position || 'relative';
    section.appendChild(leftBtn);
    section.appendChild(rightBtn);

    
    leftBtn.addEventListener('click', (e) => {
        e.preventDefault();
        gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', (e) => {
        e.preventDefault();
        gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    
    function updateButtonVisibility() {
        const maxScroll = gallery.scrollWidth - gallery.clientWidth;
        if (maxScroll <= 0) {
            leftBtn.style.display = 'none';
            rightBtn.style.display = 'none';
        } else {
            
            leftBtn.style.position = 'absolute';
            rightBtn.style.position = 'absolute';
            leftBtn.style.top = '50%';
            rightBtn.style.top = '50%';
            leftBtn.style.transform = 'translateY(-50%)';
            rightBtn.style.transform = 'translateY(-50%)';
            leftBtn.style.left = '10px';
            rightBtn.style.right = '10px';

            /* ปรับการตรวจสอบตำแหน่งการเลื่อนเล็กน้อย */
            leftBtn.style.display = gallery.scrollLeft <= 10 ? 'none' : 'block'; 
            rightBtn.style.display = gallery.scrollLeft >= maxScroll - 10 ? 'none' : 'block'; 
        }
    }
    
    gallery.addEventListener('scroll', updateButtonVisibility);
    window.addEventListener('resize', updateButtonVisibility);
    const ro = new MutationObserver(updateButtonVisibility);
    ro.observe(gallery, { childList: true, subtree: true, attributes: true });

    
    updateButtonVisibility();
}





const compareDetailModal = document.getElementById('compareDetailModal');
const showCompareDetailBtn = document.getElementById('showCompareDetailBtn'); 
const compareSpecsTableContainer = document.getElementById('compareSpecsTableContainer');
const compareDetailCloseBtn = compareDetailModal.querySelector('.modal-close');


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
    
    const data = compareData[selectedModel] || compareData['iphone-15-std']; 

    columnContent.dataset.model = selectedModel;
    
    renderColorDots(selectedModel, columnContent); 

    const priceDetails = columnContent.querySelector('.price-details');
    priceDetails.innerHTML = `
        ${data.tag ? `<p class="tag" style="color: #fa5019;">${data.tag}</p>` : ''}
        <p>เริ่มต้นที่ ${data.price}</p>
    `;
    
    const defaultColorKey = data.defaultColor;
    const initialColorKey = `${selectedModel}-${defaultColorKey}`;
    
    const initialData = colorImageMap[initialColorKey] || { img: 'image/Apple/compare-models/iphone/default-iphone.png', label: `ไม่พบสีเริ่มต้น (${defaultColorKey})` };

    if (initialData.img) {
        currentImg.src = initialData.img;
        currentImg.alt = initialData.label; 
        modelLabel.innerText = initialData.label;
    } else {
        currentImg.src = 'image/Apple/compare-models/iphone/default-iphone.png'; 
        currentImg.alt = 'iPhone Default Image';
        modelLabel.innerText = `ไม่พบรูปภาพ (${defaultColorKey})`;
    }
}

function handleColorDotClick(e) {
    const dot = e.target;
    const colorName = dot.dataset.color; 
    
    const columnContent = dot.closest('.compare-column').querySelector('.compare-product-content');
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
    
    // เนื่องจากตัวแปร compareData และโค้ดที่เกี่ยวข้องกับการเปรียบเทียบไม่ได้ถูกให้มา 
    // โค้ดส่วนนี้อาจทำงานไม่ได้ แต่จะคงไว้ตามเดิม
    if(document.querySelector('#iphone-compare-tool')){
        document.querySelector('#iphone-compare-tool').querySelectorAll('.compare-dropdown').forEach(dropdown => {
            // updateCompareColumn(dropdown);
        });
    }
});


function generateCompareTable(models) {
    const modelsToCompare = models.slice(0, 2); 

    if (modelsToCompare.length < 2) {
        return '<p style="text-align: center; color: #3c3c43;">กรุณาเลือกรุ่น iPhone เพื่อเปรียบเทียบ 2 รุ่น</p>';
    }

    const categories = {
        'chip': 'ชิป',
        'display': 'จอภาพ',
        'camera_rear': 'กล้องหลัง',
        'camera_front': 'กล้องหน้า',
        'unlock': 'การปลดล็อค',
        'battery': 'แบตเตอรี่ (เล่นวิดีโอ)',
        'material': 'วัสดุตัวเครื่อง',
        'storage_options': 'ตัวเลือกพื้นที่จัดเก็บข้อมูล'
    };
    
    // const specsData = iphoneSpecsData; // ตัวแปรนี้ไม่ได้ถูกให้มา

    let tableHTML = `<table class="compare-specs-table"><thead><tr>`;
    tableHTML += `<th class="specs-header-cell">คุณสมบัติ</th>`;

    
    modelsToCompare.forEach(modelKey => {
        // const data = specsData[modelKey]; // ตัวแปรนี้ไม่ได้ถูกให้มา
        const data = { name: modelKey, price: 'N/A' }; // Placeholder
        
        let imgSource = 'image/Apple/compare-models/iphone/default-iphone.png';
        
        const price = data.price || 'ราคาเริ่มต้น';

        tableHTML += `
            <th class="specs-header-cell">
                <img src="${imgSource}" alt="${data.name}" style="width: 80px; height: auto; margin-bottom: 10px; background-color: white; border-radius: 8px;">
                <span class="product-compare-tag">${data.tag || ''}</span>
                <p class="product-compare-name">${data.name}</p>
                <p class="product-compare-price">เริ่มต้นที่ ${price}</p>
            </th>
        `;
    });
    tableHTML += `</tr></thead><tbody>`;

    
    for (const key in categories) {
        tableHTML += `<tr><th style="text-align: left; background-color: #f0f0f5;">${categories[key]}</th>`;
        
        modelsToCompare.forEach(modelKey => {
            // const data = specsData[modelKey]; // ตัวแปรนี้ไม่ได้ถูกให้มา
            const data = { [key]: 'ข้อมูลไม่พร้อมใช้งาน' }; // Placeholder
            tableHTML += `<td>${data[key] || '-'}</td>`;
        });
        tableHTML += `</tr>`;
    }

    tableHTML += `</tbody></table>`;
    return tableHTML;
}


function getSelectedModels() {
    
    const selector1 = document.getElementById('compare-selector-1');
    const selector2 = document.getElementById('compare-selector-2');
    
    if(!selector1 || !selector2) return [];

    const models = [selector1.value, selector2.value];
    
    
    // return [...new Set(models)].filter(model => iphoneSpecsData[model]); // ตัวแปรนี้ไม่ได้ถูกให้มา
    return [...new Set(models)].filter(model => model); // แก้ไขให้ใช้ได้โดยไม่มีตัวแปรนั้น
}




document.addEventListener('DOMContentLoaded', () => {
    
    initializeGalleryPagination('#get-to-know .iphone-gallery-wrap', 'get-to-know-indicator');
    initializeGalleryPagination('#accessory-section .iphone-gallery-wrap', 'accessory-indicator');

    
    enableDragScroll('#get-to-know .iphone-gallery-wrap');
    enableDragScroll('#accessory-section .iphone-gallery-wrap');


    
    if(document.querySelector('#iphone-compare-tool')){
        document.querySelector('#iphone-compare-tool').querySelectorAll('.compare-dropdown').forEach(dropdown => {
        });
    }
});



const pairingDetails = document.querySelector('.pairing-details');
const pairingImage = document.getElementById('pairingImage');


const pairingImagesMap = {
    
    'iPhone และ Mac': 'image/Apple/iphone/HAV/1.jpg',
    'iPhone และ Apple Watch': 'image/Apple/iphone/HAV/2.jpg',
    'iPhone และ AirPods': 'image/Apple/iphone/HAV/3.jpg',
};

if (pairingDetails && pairingImage) {
    pairingDetails.querySelectorAll('summary').forEach(summary => {
        summary.addEventListener('click', (e) => {
            
            
            pairingDetails.querySelectorAll('details').forEach(detail => {
                
                if (detail.querySelector('summary') !== summary) {
                    detail.open = false;
                }
            });

            
            
            setTimeout(() => {
                const parentDetail = summary.closest('details');
                
                if (parentDetail && parentDetail.open) { 
                    const title = summary.textContent.trim();
                    const imageUrl = pairingImagesMap[title];
                    
                    if (imageUrl) {
                        pairingImage.src = imageUrl;
                        pairingImage.alt = title;
                    }
                }
            }, 0); 
        });
    });

    
    const initialSummary = pairingDetails.querySelector('details[open] summary');
    if (initialSummary) {
        const initialTitle = initialSummary.textContent.trim();
        const initialImageUrl = pairingImagesMap[initialTitle];
        if (initialImageUrl) {
            pairingImage.src = initialImageUrl;
            pairingImage.alt = initialTitle;
        }
    }
}