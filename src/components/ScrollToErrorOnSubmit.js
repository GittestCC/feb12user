import { Component } from 'react'

class ScrollToErrorOnSubmit extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollToError) {
      const errorMessage = document.querySelector('.error-message')
      if (errorMessage) {
        errorMessage.scrollIntoView(true)
        // a slight offset if the scrollbar is not scrolled to bottom
        if (window.innerHeight + window.scrollY < document.body.offsetHeight) {
          window.scrollBy(0, -200) // Adjust scrolling with a negative value here
        }
      }
    }
  }
  render() {
    return null
  }
}

export default ScrollToErrorOnSubmit
