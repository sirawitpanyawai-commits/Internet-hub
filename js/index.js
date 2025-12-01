/**
 * ฟังก์ชันสำหรับเลื่อนหน้าไปยัง Section ที่ต้องการ
 * ผูกไว้กับปุ่ม GO เพื่อเลื่อนลงไปดูเนื้อหา
 * @param {string} id - id ของ element ที่ต้องการเลื่อนไป
 */
function goToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        // เลื่อนแบบ smooth scroll เพื่อให้ดูดีขึ้น
        element.scrollIntoView({ behavior: 'smooth' });
    }
}