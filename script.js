const grid = document.getElementById('image-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.getElementById('close-btn');
let currentImgIndex = 1;
const totalImages = 30;


function updateLightbox(index) {
  currentImgIndex = index;
  let fileName = currentImgIndex.toString().padStart(2, '0');
  lightboxImg.src = `landscapes/01-${fileName}.jpg`;
  lightboxCaption.innerText = `Landscape ${fileName}`;
}

for (let i = 1; i <= 30; i++) {
  let fileName = i.toString().padStart(2, '0');
  const img = document.createElement('img');

  img.src = `landscapes/01-${fileName}.jpg`;
  img.alt = `Landscape ${fileName}`;
  img.className = 'grid-item';

  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightboxImg.src = img.src;
    lightboxCaption.innerText = img.alt;
    updateLightbox(i);
  });

  grid.appendChild(img);
}

const showNext = () => {
  let next = currentImgIndex + 1;
  if (next > totalImages) next = 1;
  updateLightbox(next);
};
const showPrev = () => {
  let prev = currentImgIndex - 1;
  if (prev < 1) prev = totalImages; // Loop to end
  updateLightbox(prev);
};

document.getElementById('next-btn').onclick = showNext;
document.getElementById('prev-btn').onclick = showPrev;
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
    // Check if the thing actually clicked was the lightbox background
    // and NOT the image or the buttons inside it
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});