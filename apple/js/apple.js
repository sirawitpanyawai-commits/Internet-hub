document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.querySelector(".tv-carousel-container")
  if (!carouselContainer) return

  const wrapper = carouselContainer.querySelector(".carousel-wrapper")
  const items = carouselContainer.querySelectorAll(".carousel-item")
  const dots = carouselContainer.querySelectorAll(".dot")

  let currentIndex = 0

  function goToSlide(index) {
    const itemWidth = items[0] ? items[0].offsetWidth : 0
    if (!itemWidth) return

    const targetTranslate = -index * itemWidth
    wrapper.style.transform = `translateX(${targetTranslate}px)`
    currentIndex = index

    updateActiveState(index)
  }

  function updateActiveState(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index)
    })

    items.forEach((item, i) => {
      item.classList.toggle("active", i === index)
    })
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index)
    })
  })

  function autoSlide() {
    let nextIndex = currentIndex + 1
    if (nextIndex >= items.length) {
      nextIndex = 0
    }
    goToSlide(nextIndex)
  }

  goToSlide(0)

  setInterval(autoSlide, 6000)
})
