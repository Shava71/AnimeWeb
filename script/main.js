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

//Slider
const initSlider = ()=> {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButton = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;

      // Update thumb position by mouse move
      const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
        const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

        scrollbarThumb.style.left = `${boundedPosition}px`;
        imageList.scrollLeft = scrollPosition;
      }

      //Remove event listener on mouse up
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });

  slideButton.forEach(button =>{
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  })

  const handleSlideButton = () => {
    slideButton[0].style.display = imageList.scrollLeft <= 0? "none": "block";
    slideButton[1].style.display = imageList.scrollLeft >= maxScrollLeft? "none": "block";
  }

  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`; 
  }

  imageList.addEventListener("scroll", () =>{
    handleSlideButton();
    updateScrollThumbPosition();
  });

}
window.addEventListener("load", initSlider);


// Добавьте переменную, чтобы хранить текущий индекс слайда
let currentSlideIndex = 0;

// Функция для автоматического листания слайдов
const autoSlide = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");

  // Увеличиваем индекс слайда (или сбрасываем, если достигнут конец)
  currentSlideIndex = (currentSlideIndex + 1) % imageList.children.length;

  // Прокручиваем к следующему слайду
  imageList.scrollTo({
    left: currentSlideIndex * imageList.clientWidth,
    behavior: "smooth"
  });
};

// Устанавливаем интервал на 10 секунд
const slideInterval = setInterval(autoSlide, 15000);

// Останавливаем интервал при наведении курсора на слайдер
const sliderWrapper = document.querySelector(".slider-wrapper");
sliderWrapper.addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

// Запускаем интервал после выхода курсора из слайдера
sliderWrapper.addEventListener("mouseleave", () => {
  slideInterval = setInterval(autoSlide, 15000);
});