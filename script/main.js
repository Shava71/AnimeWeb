//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

document.getElementById("fold").addEventListener("click", function () {
  var sidenav = document.querySelector(".sidenav");
  sidenav.classList.toggle("sidenav-closed");
});


function changeBackground(image){
    document.body.style.backgroundImage = "url("+image+")";
}



document.addEventListener("DOMContentLoaded", function() {
  const slidesContainer = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  const visibleSlides = 4; // Количество видимых слайдов

  let currentIndex = 0;

  function updateSlider() {
    const firstVisibleIndex = currentIndex;
    const lastVisibleIndex = (currentIndex + visibleSlides - 1) % totalSlides;

    slides.forEach((slide, index) => {
      if (index >= firstVisibleIndex && index <= lastVisibleIndex) {
        slide.style.display = "block";
      } else {
        slide.style.display = "none";
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  // Добавим кнопки для переключения
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Инициализация слайдера
  updateSlider();

  // Add event listener to handle continuous loop
  slidesContainer.addEventListener("transitionend", function() {
    if (currentIndex === totalSlides) {
      currentIndex = 0;
      updateSlider();
    }
  });
});

