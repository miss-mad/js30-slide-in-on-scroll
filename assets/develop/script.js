function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const slidingImages = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  // loop over every image and figure out where the image needs to be shown
  // when scrolling down to the point of 50% into the image's height, the picture should appear and start moving into the image space
  slidingImages.forEach((slidingImage) => {
    // determines how far we've scrolled down measured in pixels
    const slideInAt =
      window.scrollY + window.innerHeight - slidingImage.height / 2;
    // slide the images back out when they are not in the visible window
    const imageBottom = slidingImage.offsetTop + slidingImage.height;

    // ensures the slideIn value is greater than the top of the actual image
    const isHalfShown = slideInAt > slidingImage.offsetTop;
    // ensure we aren't scrolled all the way past the image and if so, we need to slide the image out again
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      slidingImage.classList.add("active");
    } else {
      slidingImage.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
