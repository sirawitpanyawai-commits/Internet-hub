document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('introVideo');
    const image = document.getElementById('endImage');

    if (video && image) {
        video.addEventListener('ended', function() {
            video.style.display = 'none';      
            image.classList.remove('hidden');  
        });
    }
});

const dialData = {
    'brightness': {
        video: 'image/Razer BlackWidow V4 Pro/icons/Keyboard Brightness.mp4',
        title: 'Keyboard Brightness',
        desc: 'Adjust the level of Razer™ Chroma RGB lighting.'
    },
    'zoom': {
        video: 'image/Razer BlackWidow V4 Pro/icons/Zoom.mp4',
        title: 'Zoom',
        desc: 'Zoom in on documents, browser windows, or creative canvases.'
    },
    'apps': {
        video: 'image/Razer BlackWidow V4 Pro/icons/Switch Apps.mp4',
        title: 'Switch Apps',
        desc: 'Instantly switch screens between different programs'
    },
    'tabs': {
        video: 'image/Razer BlackWidow V4 Pro/icons/Switch Browser Tabs.mp4',
        title: 'Switch Browser Tabs',
        desc: 'Hop from tab to tab on your browser.'
    },
    'jogging': {
        video: 'image/Razer BlackWidow V4 Pro/icons/Track Jogging.mp4',
        title: 'Track Jogging',
        desc: 'Go forward or rewind in 5-second intervals.'
    },
    'selector': {
        video: 'image/Razer BlackWidow V4 Pro/icons/Track Selector.mp4',
        title: 'Track Selector',
        desc: 'Navigate through your playlist effortlessly.'
    },
    'h-scroll': {
        video: 'image/Razer BlackWidow V4 Pro/icons/Horizontal Scroll.mp4',
        title: 'Horizontal Scroll',
        desc: 'Easily scroll across wide documents, browser windows, or creative canvases.'
    },
    'v-scroll': {
        video: 'image/Razer BlackWidow V4 Pro/icons/Vertical Scroll.mp4',
        title: 'Vertical Scroll',
        desc: 'Easily scroll through long documents, browser windows, or creative canvases.'
    }
};

function changeMode(modeKey) {
    const data = dialData[modeKey];
    if (!data) return;

    const videoElement = document.getElementById('dialVideo');
    if (videoElement) {
        videoElement.src = data.video;
        videoElement.play();
    }

    const titleEl = document.getElementById('modeTitle');
    const descEl = document.getElementById('modeDesc');
    if (titleEl) titleEl.innerText = data.title;
    if (descEl) descEl.innerText = data.desc;

    const allItems = document.querySelectorAll('.menu-item');
    allItems.forEach(item => item.classList.remove('active'));

    const activeItem = document.querySelector(`.menu-item[onclick="changeMode('${modeKey}')"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

function switchMainTab(tabName, btnElement) {
    const contents = document.querySelectorAll('.main-tab-content');
    contents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });

    const selectedContent = document.getElementById('content-' + tabName);
    if (selectedContent) {
        selectedContent.style.display = 'block';
        setTimeout(() => selectedContent.classList.add('active'), 10);

        if (tabName === 'default') {
            const v = document.getElementById('dialVideo');
            if(v) v.play();
        }
    }

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (btnElement) {
        btnElement.classList.add('active');
    }
}