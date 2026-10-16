/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

/**
 * A component that displays the quiz.
 */
class QuizView extends HTMLElement {
  #session

  /**
   * Creates the component and attaches a shadow DOM.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  /**
   * Sets the quiz session and renders the component.
   *
   * @param {object} session - The quiz session to display.
   */
  set session (session) {
    this.#session = session
    this.#render()
  }

  /**
   * Gets the current quiz session.
   *
   * @returns {object} The quiz session.
   */
  get session () {
    return this.#session
  }

  /**
   * Renders the current question.
   */
  #render () {
    this.shadowRoot.replaceChildren()

    const currentQuestion = document.createElement('p')
    currentQuestion.textContent = this.#session.getCurrentQuestion().getText()

    this.shadowRoot.append(currentQuestion)
  }
}

customElements.define('quiz-view', QuizView)
