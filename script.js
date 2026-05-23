const slidesContainer = document.querySelector(".slides");
const thumbsContainer = document.querySelector(".thumbnails");

const totalImages = 30;

let slidesHTML = "";
let thumbsHTML = "";

for (let i = 1; i <= totalImages; i++) {

  const src = `images/projects/work${i}.jpg`;

  slidesHTML += `
    <div class="slide-box">
      <img 
        src="${src}" 
        class="slide" 
        loading="lazy"
        alt="Проект ${i}"
      >
    </div>
  `;

  thumbsHTML += `
    <img 
      src="${src}" 
      class="thumb" 
      loading="lazy"
      alt="Миниатюра ${i}"
    >
  `;
}

slidesContainer.innerHTML = slidesHTML;
thumbsContainer.innerHTML = thumbsHTML;


const slides = document.querySelectorAll(".slide-box");
const thumbs = document.querySelectorAll(".thumb");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let current = 0;

function getVisibleSlides(){
  return window.innerWidth <= 768 ? 1 : 2;
}

const visibleThumbs = 5;

function normalizeIndex(index){
  const visibleSlides = getVisibleSlides();
  if(index < 0){
    return Math.max(slides.length - visibleSlides, 0);
  }

  if(index >= slides.length){
    return 0;
  }

  if(index > slides.length - visibleSlides){
    return Math.max(slides.length - visibleSlides, 0);
  }

  return index;
}

function updateGallery(){

  const visibleSlides = getVisibleSlides();
  current = normalizeIndex(current);

  slides.forEach((slide, index) => {
    slide.style.display = "none";

    if(index >= current && index < current + visibleSlides){
      slide.style.display = "block";
    }
  });

  thumbs.forEach((thumb) => {
    thumb.classList.remove("active-thumb");
    thumb.style.display = "none";
  });

  thumbs[current].classList.add("active-thumb");

if(getVisibleSlides() === 2 && thumbs[current + 1]){
  thumbs[current + 1].classList.add("active-thumb");
}

  let thumbStart = current - 2;
  let thumbEnd = current + 2;

  if(thumbStart < 0){
    thumbStart = 0;
    thumbEnd = visibleThumbs - 1;
  }

  if(thumbEnd >= thumbs.length){
    thumbEnd = thumbs.length - 1;
    thumbStart = Math.max(thumbs.length - visibleThumbs, 0);
  }

  for(let i = thumbStart; i <= thumbEnd; i++){
    thumbs[i].style.display = "block";
  }
}

nextBtn.addEventListener("click", () => {
  current += getVisibleSlides();
  updateGallery();
});

prevBtn.addEventListener("click", () => {
  current -= getVisibleSlides();
  updateGallery();
});

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    current = index;
    updateGallery();
  });
});

updateGallery();


const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

window.addEventListener("resize", updateGallery);

let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector(".slider");

slider.addEventListener("touchstart", (e) => {

  touchStartX = e.changedTouches[0].screenX;

});

slider.addEventListener("touchend", (e) => {

  touchEndX = e.changedTouches[0].screenX;

  handleSwipe();

});

function handleSwipe(){

  const swipeDistance = touchStartX - touchEndX;

  /* свайп влево */

  if(swipeDistance > 50){

    current += getVisibleSlides();

    updateGallery();

  }

  /* свайп вправо */

  if(swipeDistance < -50){

    current -= getVisibleSlides();

    updateGallery();

  }

}