const grid = document.getElementById('image-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.getElementById('close-btn');
let currentImgIndex = 1;
const totalImages = 30;

const gallerySettings = {
  folder: document.body.getAttribute('data-folder') || 'landscapes',
  total: parseInt(document.body.getAttribute('data-total')) || 30,
  prefix: document.body.getAttribute('data-prefix') || '01-'
};

function updateLightbox(index) {
  currentImgIndex = index;
  let fileName = index.toString().padStart(2, '0');
  
  let fullPath = `${gallerySettings.folder}/${gallerySettings.prefix}${fileName}.jpg`;
  
  lightboxImg.src = fullPath;
  lightboxCaption.innerText = `${gallerySettings.folder} ${fileName}`;
}

if (grid) {
  for (let i = 1; i <= gallerySettings.total; i++) {
    let fileName = i.toString().padStart(2, '0');
    let fullPath = `${gallerySettings.folder}/${gallerySettings.prefix}${fileName}.jpg`;

    const img = document.createElement('img');
    img.src = fullPath;
    img.className = 'grid-item';

    img.addEventListener('click', () => {
      lightbox.classList.add('active');
      updateLightbox(i);
    });
    grid.appendChild(img);
  }
}
const showNext = () => {
  let next = currentImgIndex + 1;
  if (next > gallerySettings.total) next = 1;
  updateLightbox(next);
};

const showPrev = () => {
  let prev = currentImgIndex - 1;
  if (prev < 1) prev = gallerySettings.total;
  updateLightbox(prev);
};

document.getElementById('next-btn').onclick = (e) => { e.stopPropagation(); showNext(); };
document.getElementById('prev-btn').onclick = (e) => { e.stopPropagation(); showPrev(); };
closeBtn.onclick = () => lightbox.classList.remove('active');

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "Escape") lightbox.classList.remove('active');
});

closeBtn.onclick = () => {
  lightbox.classList.remove('active');
};

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

const bioImg = document.querySelector('section > img');
if (bioImg) {
    bioImg.style.opacity = '0';
    bioImg.style.transition = 'opacity 0.8s ease-in';
    
    bioImg.onload = () => {
        bioImg.style.opacity = '1';
    };
    
    // If the image is already cached by the browser
    if (bioImg.complete) {
        bioImg.style.opacity = '1';
    }
}