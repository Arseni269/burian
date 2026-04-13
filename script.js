const grid = document.getElementById('image-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.getElementById('close-btn');

let currentImgIndex = 1;

const gallerySettings = {
  folder: document.body.getAttribute('data-folder'),
  total: parseInt(document.body.getAttribute('data-total')),
  prefix: document.body.getAttribute('data-prefix') || '01-'
};
const navLinks = document.querySelectorAll('.nav-link');
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split("/").pop();


  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});

function updateLightbox(index) {
  currentImgIndex = index;
  let fileName = index.toString().padStart(2, '0');

  let fullPath = `${gallerySettings.folder}/${gallerySettings.prefix}${fileName}.jpg`;

  lightboxImg.src = fullPath;
}

if (grid) {
  for (let i = 1; i <= gallerySettings.total; i++) {
    let fileName = i.toString().padStart(2, '0');
    let fullPath = `${gallerySettings.folder}/${gallerySettings.prefix}${fileName}.jpg`;

    const img = document.createElement('img');
    img.src = fullPath;
    img.className = 'grid-item';

    img.onload = () => {
      img.classList.add('loaded');
    };

    if (img.complete) {
      img.classList.add('loaded');
    }

    img.addEventListener('click', () => {
      if (window.innerWidth > 1150) {
        lightbox.classList.add('active');
        updateLightbox(i);
      }
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

document.getElementById('next-btn').onclick = showNext;
document.getElementById('prev-btn').onclick = showPrev;
closeBtn.onclick = () => lightbox.classList.remove('active');

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "Escape") lightbox.classList.remove('active');
});

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

  if (bioImg.complete) {
    bioImg.style.opacity = '1';
  }
}

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

  if (distanceFromBottom < 800 && scrollTop > 200) {
    backToTopBtn.style.opacity = "1";
    backToTopBtn.style.visibility = "visible";
  } else {
    backToTopBtn.style.opacity = "0";
    backToTopBtn.style.visibility = "hidden";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const navbar = document.querySelector('nav');
const headerImage = document.querySelector('.signature-logo');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}, {
  threshold: 0,
  rootMargin: "-50px 0px 0px 0px"
});

scrollObserver.observe(headerImage);