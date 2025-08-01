export const scrollToElement = (elementId: string, offset = 0) => {
  setTimeout(() => {
    try {
      const element = document.getElementById(elementId)
      if (element) {
        const top = element.offsetTop - offset
        window.scrollTo({ top, behavior: 'smooth' })

        setTimeout(() => {
          const currentTop = window.scrollY
          const targetTop = element.offsetTop - offset
          if (Math.abs(currentTop - targetTop) > 10) {
            window.scrollTo({ top: targetTop, behavior: 'auto' })
          }
        }, 500)
      }
    } catch (error) {
      console.error('Scroll to element failed:', error)
    }
  }, 100)
}

export const scrollToMovieList = () => {
  scrollToElement('movie-list-title', 80) // 偏移量以避免被 header 遮擋
}
