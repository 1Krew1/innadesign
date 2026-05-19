const slidesContainer = document.querySelector(".slides");
const thumbsContainer = document.querySelector(".thumbnails");

const totalImages = 587;

for(let i = 1; i <= totalImages; i++){

  slidesContainer.innerHTML += `
    <div class="slide-box">
      <img src="images/projects/work${i}.jpg" class="slide" loading="lazy">
    </div>
  `;

  thumbsContainer.innerHTML += `
    <img src="images/projects/work${i}.jpg" class="thumb" loading="lazy">
  `;

}


const slides = document.querySelectorAll(".slide-box");
const thumbs = document.querySelectorAll(".thumb");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let current = 0;
const visibleSlides = 2;
const visibleThumbs = 5;

function normalizeIndex(index){
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

  if(thumbs[current + 1]){
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
  current += visibleSlides;
  updateGallery();
});

prevBtn.addEventListener("click", () => {
  current -= visibleSlides;
  updateGallery();
});

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    current = index;
    updateGallery();
  });
});

updateGallery();