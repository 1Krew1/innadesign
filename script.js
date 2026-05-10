const slides = document.querySelectorAll(".slide");

const thumbs = document.querySelectorAll(".thumb");

const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

let current = 0;

function updateGallery(){

  slides.forEach((slide, index) => {

    slide.style.display = "none";

    if(index === current || index === current + 1){

      slide.style.display = "block";

    }

  });

 thumbs.forEach(thumb => {

  thumb.classList.remove("active-thumb");

});

thumbs[current].classList.add("active-thumb");

if(current + 1 < thumbs.length){

  thumbs[current + 1].classList.add("active-thumb");

}

}

nextBtn.addEventListener("click", () => {

  current += 2;

  if(current >= slides.length){

    current = 0;

  }

  updateGallery();

});

prevBtn.addEventListener("click", () => {

  current -= 2;

  if(current < 0){

    current = slides.length - 2;

  }

  updateGallery();

});

thumbs.forEach((thumb, index) => {

  thumb.addEventListener("click", () => {

    current = index;

    updateGallery();

  });

});

updateGallery();