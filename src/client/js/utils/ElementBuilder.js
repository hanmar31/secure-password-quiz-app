/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

/**
 * Creates simple DOM elements with text and an optional class.
 */
class ElementBuilder {
  /**
   * Creates an element with text.
   *
   * @param {string} tagName - The tag to create, for example 'h2' or 'p'.
   * @param {string} text - The text shown in the element.
   * @param {string} [className] - An optional CSS class.
   * @returns {HTMLElement} The new element.
   */
  createTextElement (tagName, text, className) {
    const element = document.createElement(tagName)
    element.textContent = text
    if (className) element.classList.add(className)
    return element
  }
}

export { ElementBuilder }
