document.addEventListener('DOMContentLoaded', () => {
    const featureGrid = document.querySelector('.feature-grid');
    const prevButton = document.getElementById('prev-card');
    const nextButton = document.getElementById('next-card');
    const cardWidth = 320; 

    const updateButtonState = () => {
        prevButton.disabled = featureGrid.scrollLeft === 0;

        const maxScrollLeft = featureGrid.scrollWidth - featureGrid.clientWidth;
        nextButton.disabled = featureGrid.scrollLeft >= maxScrollLeft - 1; 
    };

    nextButton.addEventListener('click', () => {
        featureGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevButton.addEventListener('click', () => {
        featureGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    featureGrid.addEventListener('scroll', updateButtonState);

    updateButtonState();


    const featureCards = document.querySelectorAll('.feature-card');
    const modal = document.getElementById('feature-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');

    const modalContentData = {
        'health': {
            title: 'สุขภาพ รู้ลึกเรื่องคุณทั้งภายในและภายนอก',
            image: '',
            body: `
                <h4>งานนี้ใครหลับก่อน ชนะ คะแนนการนอนหลับแบบใหม่หมดช่วยให้คุณติดตามและเข้าใจคุณภาพการนอนหลับของคุณเพื่อการฟื้นฟูร่างกายที่ดียิ่งขึ้น นอกจากนี้คุณยังใช้แอปนอนหลับตั้งค่ากิจวัตรการเข้านอน ด้วยการเตือนให้เตรียมเข้านอนได้อีกด้วย</h4>
                <img src="image/Apple/Apple Watch/2/2.1/2.1.1.jpg">
                <h4>ไม่พลาดซักจังหวะ แอปอัตราการเต้นของหัวใจจะเตือนคุณเมื่ออัตราการเต้นของหัวใจเร็วหรือช้า</h4>
                <img src="image/Apple/Apple Watch/2/2.1/2.1.2.jpg">
                <h4>เข้าใจสถานะสุขภาพในแต่ละวันของคุณได้ดียิ่งขึ้น แอปสัญญาณชีพช่วยให้คุณระบุความเปลี่ยนแปลงในด้านสุขภาพของตัวเองได้2 โดยคุณจะเห็นตัวชี้วัดหลักๆ ด้านสุขภาพในตอนกลางคืนได้อย่างรวดเร็วจากข้อมือของคุณ ซึ่งรวมถึงอัตราการเต้นของหัวใจ อัตราการหายใจ อุณหภูมิข้อมือ3 ออกซิเจนในเลือด และระยะเวลานอนหลับ</h4>
                <img src="image/Apple/Apple Watch/2/2.1/2.1.3.jpg">
                <h4>ติดตามข้อมูลรอบเดือนคุณอย่างใกล้ชิด Apple Watch มาพร้อมเซ็นเซอร์นวัตกรรมสุดล้ำที่จะติดตามอุณหภูมิของคุณในขณะนอนหลับ3 โดยการติดตามรอบเดือนจะใช้ข้อมูลนี้ในการคาดคะเนแนวโน้มว่าไข่ของคุณจะตกเมื่อไหร่จากข้อมูลย้อนหลัง ซึ่งอาจเป็นประโยชน์สำหรับการวางแผนครอบครัว4 ยิ่งไปกว่านั้นอุณหภูมิข้อมือยังสามารถใช้เพื่อปรับปรุงการคาดคะเนการมีประจำเดือนให้แม่นยำยิ่งขึ้นได้อีกด้วย</h4>
                <img src="image/Apple/Apple Watch/2/2.1/2.1.4.jpg">
            `
        },
        'mind': {
            title: 'ความฟิต แรงบันดาลใจล้นข้อมือ',
            image: '',
            body: `
                <h4>ปิดวงแหวนของคุณ วงแหวน 3 วงจะแสดงทุกความแอ็คทีฟของคุณ และช่วยให้คุณไปถึงเป้าหมายการเคลื่อนไหว การออกกำลังกาย และการยืนในทุกวัน</h4>
                <img src="image/Apple/Apple Watch/2/2.2/2.2.1.jpg">
                <h4>เหมาะกับทุกการออกกำลังกายของคุณ คุณสามารถออกกำลังกายที่ดีต่อสุขภาพได้มากมายหลายวิธี ตั้งแต่วิ่ง ไปจนถึง HIIT หรือโยคะ และสามารถติดตามตัวชี้วัดต่างๆ ที่คุณอยากเห็นมากที่สุดได้อย่างแม่นยำ</h4>
                <img src="image/Apple/Apple Watch/2/2.2/2.2.2.jpg">
                <h4>วิ่งอย่างมีเป้าหมาย Apple Watch มีทุกอย่างที่คุณต้องการสำหรับการวิ่ง โดยคุณสามารถใช้มุมมองอย่างโซนอัตราการเต้นของหัวใจ กำหนดเวลาเป้าหมายที่ต้องการด้วยตัวคุมเพซ หรือฝึกซ้อมแบบสลับช้าเร็วด้วยการออกกำลังกายแบบกำหนดเอง</h4>
                <img src="image/Apple/Apple Watch/2/2.2/2.2.3.jpg">
                <h4>จะขึ้นเขา หรือลงห้วย ก็ไปให้สุด Apple Watch ทนน้ำ5 ทนฝุ่น6 และทนการแตกร้าว คุณจึงสามารถว่ายน้ำ เดินเขา หรือทำอะไรก็ได้แบบหมดห่วง</h4>
                <img src="image/Apple/Apple Watch/2/2.2/2.2.4.jpg">
            `
        },
        'safety': {
            title: 'ความปลอดภัย ความช่วยเหลืออยู่ใกล้ๆ มือนี่เอง',
            image: '',
            body: `
                <h4>บริการช่วยเหลือฉุกเฉินในเวลาที่คุณต้องการ Apple Watch สามารถตรวจจับเมื่อคุณล้มอย่างรุนแรงหรือประสบเหตุรถชนอย่างรุนแรง และจะช่วยติดต่อขอความช่วยเหลือให้คุณ บอกตำแหน่งของคุณ พร้อมกับแจ้งเตือนผู้ที่อยู่ในรายชื่อติดต่อฉุกเฉินโดยอัตโนมัติ7</h4>
                <img src="image/Apple/Apple Watch/2/2.3/2.3.1.jpg">
                <h4>ความอุ่นใจบนข้อมือคุณ คุณสมบัติเช็คอินสามารถแจ้งให้คนอื่นรู้เมื่อคุณเดินทางถึงที่หมาย และถ้าคุณจะออกไปวิ่งตอนกลางคืน คุณก็สามารถเริ่มเช็คอินตามระยะเวลาของการออกกำลังกายได้เลย แล้วเพื่อนของคุณจะได้รับแจ้งโดยอัตโนมัติเมื่อคุณออกกำลังกายเสร็จ</h4>
                <img src="image/Apple/Apple Watch/2/2.3/2.3.2.jpg">
                <h4>หาเจอได้ง่ายๆ ด้วย "ค้นหาของฉัน" แอปค้นหาของฉันช่วยให้คุณหาเพื่อนเจอได้ง่ายๆ แม้จะอยู่ในบริเวณที่คนพลุกพล่าน หรือแชร์ตำแหน่งของคุณเพื่อให้คุณต่อติดกับเพื่อนๆ ได้เสมอ และคุณยังสามารถระบุตำแหน่งอุปกรณ์ที่ทำหายหรือถูกขโมยไปก็ได้เช่นกัน</h4>
                <img src="image/Apple/Apple Watch/2/2.3/2.3.3.jpg">
                <h4>ส่งเสียงขอความช่วยเหลือ คุณสามารถส่งเสียงเตือนคนที่อยู่ใกล้ๆ ว่าต้องการความช่วยเหลือได้อย่างรวดเร็วด้วยเสียงไซเรนบน Apple Watch Ultra เพียงแค่กดปุ่มแอ็คชั่นค้างไว้แล้วรอให้นาฬิกานับถอยหลัง</h4>
                <img src="image/Apple/Apple Watch/2/2.3/2.3.4.jpg">
            `
        },
        'ultra3': {
            title: 'Apple Watch Ultra 3 นาฬิกาสปอร์ตและการผจญภัยที่เหนือชั้น',
            image: '',
            body: `
                <h4>จอภาพที่สว่างสดใส จอภาพ Apple Watch ที่ใหญ่และล้ำหน้าที่สุดของเราเปล่งแสงได้มากขึ้นในมุมที่กว้างกว่า8 จึงสว่างยิ่งขึ้นและอ่านสิ่งต่างๆ ได้ง่ายกว่าเดิม เช่น ดูตัวชี้วัดแบบเรียลไทม์ในตอนที่คุณกำลังวิ่ง เดินเขา ดำน้ำ หรือออกไปสำรวจโลก</h4>
                <img src="image/Apple/Apple Watch/2/2.4/2.4.1.jpg">
                <h4>ไปได้ไกลขึ้น อยู่ได้นานขึ้น Apple Watch Ultra 3 ใช้งานได้สูงสุด 42 ชั่วโมงเมื่อใช้งานปกติ และสูงสุด 72 ชั่วโมงเมื่อเปิดโหมดประหยัดพลังงาน9 ซึ่งนานเกินพอสำหรับลงวิ่งมาราธอนหรือไตรกีฬา</h4>
                <img src="image/Apple/Apple Watch/2/2.4/2.4.2.jpg">
                <h4>GPS ที่แม่นยำ Apple Watch Ultra 3 มาพร้อม GPS ความถี่คู่ที่แม่นยำ10</h4>
                <img src="image/Apple/Apple Watch/2/2.4/2.4.3.jpg">
                <h4>แอ็คชั่นจัดเต็ม เพียงกดเร็วๆ แค่ครั้งเดียวบนปุ่มแอ็คชั่น คุณก็ควบคุมฟังก์ชั่นที่ปรับแต่งได้หลากหลายอย่างแม่นยำ ไม่ว่าจะเริ่มออกกำลังกาย เปิดไฟฉาย ปักหมุดจุดอ้างอิงบนเข็มทิศ หรือเริ่มการดำน้ำ</h4>
                <img src="image/Apple/Apple Watch/2/2.4/2.4.4.jpg">
            `
        },
        'communication': {
            title: 'การเชื่อมต่อ วิธีที่ใช่ในการต่อติดถึงกัน',
            image: '',
            body: `
                <h4>ต่อติดกับทุกเรื่องอยู่เสมอด้วย 5G ไม่ว่าจะโทร รับส่งข้อความ ฟังเพลง และอื่นๆ อีกมากมาย บอกเลยว่า Apple Watch ช่วยให้คุณทำทั้งหมดนี้ได้ง่ายๆ ไม่ว่าจะอยู่ที่ไหน และตอนนี้ยังมาพร้อมแผนเซลลูลาร์ที่รองรับ 5G คุณจึงเชื่อมต่อได้เร็วยิ่งขึ้นกว่าเดิมแม้ไม่มี iPhone อยู่กับตัว11</h4>
                <img src="image/Apple/Apple Watch/2/2.5/2.5.1.jpg">
                <h4>เพลงและพ็อดคาสท์ดีๆ ที่เข้าหู สตรีมกว่า 100 ล้านเพลงด้วย Apple Music12 ดาวน์โหลดพ็อดคาสท์และเพลย์ลิสต์มาไว้บนนาฬิกาได้เร็วขึ้นกว่าที่เคยด้วย 5G11 และฟังทั้งหมดนี้ได้ผ่าน AirPods หรือลำโพงในตัวบน Apple Watch ของคุณ</h4>
                <img src="image/Apple/Apple Watch/2/2.5/2.5.2.jpg">
                <h4>จัดเก็บ สแกน จบ เข้าถึงตั๋วหรือบัตรผ่านขึ้นเครื่องได้อย่างรวดเร็วจาก Apple Watch ของคุณ13</h4>
                <img src="image/Apple/Apple Watch/2/2.5/2.5.3.jpg">
            `
        },
        'customize': {
            title: 'ปรับแต่งให้เป็นคุณ ทำให้เป็นคุณ',
            image: '',
            body: `
                <h4>สายสวยๆ ในสไตล์ที่ใช่ สายนาฬิกามีสีสัน สไตล์ และวัสดุให้เลือกมากมาย จึงสามารถสลับลุคให้เข้ากับอารมณ์ของคุณได้ง่ายๆ</h4>
                <img src="image/Apple/Apple Watch/2/2.6/2.6.1.jpg">
                <h4>เปลี่ยนหน้าปัดได้ไม่ซ้ำหน้า คุณสามารถสร้างสรรค์การจับคู่หน้าปัดได้มากมายแบบไม่รู้จบบน Apple Watch ทั้งหน้าปัดรูปภาพ หน้าปัดสนูปี้ ไปจนถึงหน้าปัด Nike และยังสามารถปรับแต่งให้ถูกใจ เลือกกลไกหน้าปัด หรือจะแชร์กับเพื่อนก็ยังได้</h4>
                <img src="image/Apple/Apple Watch/2/2.6/2.6.2.jpg">
                <h4>App Store เปิดโอกาสให้ทุกความเป็นไปได้ App Store บน Apple Watch ให้คุณเข้าถึงแอปหลายหมื่นแอปได้ทันทีจากข้อมือคุณ เช่น Strava, Waterllama และ SwingVision และยังให้คุณปรับแต่งนาฬิกาให้เหมาะกับทุกกิจกรรมที่คุณชอบทำได้ด้วย</h4>
                <img src="image/Apple/Apple Watch/2/2.6/2.6.3.jpg">
            `
        },
        'family': {
            title: 'Apple Watch สำหรับลูกๆ ของคุณ อิสระสำหรับเด็กๆ ความอุ่นใจสำหรับคุณ',
            image: '',
            body: `
                <h4>คอนเนกชั่นดีๆ ในครอบครัว เด็กๆ สามารถเล่นสนุก เชื่อมต่อ และติดตามกิจกรรมด้วย Apple Watch ได้แม้จะยังไม่มี iPhone เป็นของตัวเอง14</h4>
                <img src="image/Apple/Apple Watch/2/2.7/2.7.1.jpg">
                <h4>คุยกันได้ทุกคน ตั้งค่าและจัดการนาฬิกาสำหรับเด็กๆ ด้วย iPhone ของคุณเพื่อให้พวกเขาสามารถโทรออกและส่งข้อความด้วยหมายเลขโทรศัพท์และบัญชี Apple ของตัวเอง ซึ่งคุณเองก็สามารถอนุมัติได้ด้วยว่าจะให้พวกเขาติดต่อใครได้บ้าง</h4>
                <img src="image/Apple/Apple Watch/2/2.7/2.7.2.jpg">
                <h4>ตามดูอย่างใกล้ชิด เด็กๆ สามารถแชร์ตำแหน่งของตัวเองบน Apple Watch เพื่อให้คุณได้รับการเตือนเมื่อพวกเขาเดินทางถึงที่หมายหรือกลับถึงบ้าน</h4>
                <img src="image/Apple/Apple Watch/2/2.7/2.7.3.jpg">
            `
        },
        'companion': {
            title: 'Apple Watch + iPhone คู่หูที่ทรงพลัง',
            image: '',
            body: `
                <h4>ของหาย ก็ให้ส่งเสียง ส่งสัญญาณหา iPhone ที่อยู่ใกล้ๆ เพื่อฟังว่าแอบอยู่ตรงไหน ซึ่งคุณสมบัติค้นหาตำแหน่งที่ตั้งจริงสามารถพาคุณไปเจอ iPhone ของตัวเองได้ด้วยการบอกทิศทางและระยะห่างคร่าวๆ15</h4>
                <img src="image/Apple/Apple Watch/2/2.8/2.8.1.jpg">
                <h4>แสงพร้อม กล้องพร้อม รีโมทพร้อม จัดเฟรมเพื่อถ่ายภาพหมู่บน iPhone แล้วใช้นาฬิกาเพื่อดูและถ่ายภาพนั้นได้เลยหรือจะนับถอยหลังก่อนถ่ายก็ได้ ซึ่งเหมาะสำหรับเวลาที่อยากควบคุมกล้องจากระยะไกล</h4>
                <img src="image/Apple/Apple Watch/2/2.8/2.8.2.jpg">
                <h4>ให้ข้อมือนำทางไป แอปแผนที่สามารถแสดงเส้นทางแบบเลี้ยวต่อเลี้ยวพร้อมสะกิดเตือนบนข้อมือเมื่อถึงเวลาที่ต้องเลี้ยว ซึ่งเหมาะสำหรับเวลาที่คุณเดินอยู่บนถนนที่พลุกพล่านหรือปั่นจักรยานในเส้นทางใหม่ที่ไม่คุ้นเคย ยิ่งไปกว่านั้นคุณยังสามารถสร้างเส้นทางแบบกำหนดเองบน iPhone แล้วดาวน์โหลดมาไว้บนนาฬิกาก็ยังได้</h4>
                <img src="image/Apple/Apple Watch/2/2.8/2.8.3.jpg">
            `
        }
    };

    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardId = card.getAttribute('data-card-id');
            const data = modalContentData[cardId];

            if (data) {
                modalTitle.textContent = data.title;
                modalBody.innerHTML = data.body;
                modal.classList.add('active');
            }
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const cohesionImage = document.getElementById('cohesion-main-image');

    const imageMap = {
        'iphone': 'image/Apple/Apple Watch/4/4.1.jpg',
        'airpods': 'image/Apple/Apple Watch/4/4.2.jpg',
    };
    
    cohesionImage.src = imageMap['iphone'];

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const targetId = header.getAttribute('data-target');
            const currentBody = document.getElementById(`body-${targetId}`);

            accordionHeaders.forEach(h => {
                if (h !== header) {
                    h.classList.remove('active');
                    const otherBody = document.getElementById(`body-${h.getAttribute('data-target')}`);
                    if (otherBody) otherBody.classList.remove('active');
                }
            });

            header.classList.toggle('active');
            if (currentBody) {
                currentBody.classList.toggle('active');
            }

            if (header.classList.contains('active')) {
                cohesionImage.src = imageMap[targetId] || imageMap['iphone'];
                cohesionImage.alt = `Apple Watch และ ${targetId}`;
            } else {
                cohesionImage.src = imageMap['iphone'];
                cohesionImage.alt = 'Apple Watch และ iPhone';
            }
        });
    });

});