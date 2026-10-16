/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

/**
 * A component that displays the quiz.
 */
class QuizView extends HTMLElement {
  #session
  #questionContent

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
   * Sets the question content that holds each questions explanations.
   *
   * @param {object} questionContent - The question content.
   */
  set questionContent (questionContent) {
    this.#questionContent = questionContent
  }

  /**
   * Gets the question content.
   *
   * @returns {object} The question content.
   */
  get questionContent () {
    return this.#questionContent
  }

  /**
   * Renders the current question.
   */
  #render () {
    this.shadowRoot.replaceChildren()

    const currentQuestion = this.#session.getCurrentQuestion()

    const questionText = document.createElement('p')
    questionText.textContent = currentQuestion.getText()

    this.shadowRoot.appendChild(questionText)

    for (const [index, optionText] of currentQuestion.getOptions().entries()) {
      const optionButton = document.createElement('button')
      optionButton.textContent = optionText

      optionButton.addEventListener('click', () => {
        const correct = this.#session.submitAnswer(index)
        this.#renderFeedback(currentQuestion, index, correct)
      })

      this.shadowRoot.append(optionButton)
    }
  }

  /**
   * Renders feedback for the submitted answer.
   *
   * @param {object} currentQuestion - The question that was answered.
   * @param {number} index - The index of the selected option.
   * @param {boolean} correct - Whether the answer was correct.
   */
  #renderFeedback (currentQuestion, index, correct) {
    this.shadowRoot.replaceChildren()
    const feedbackHeader = document.createElement('h2')
    feedbackHeader.textContent = correct ? 'Correct!' : 'Incorrect!'
    this.shadowRoot.appendChild(feedbackHeader)
  }
}

customElements.define('quiz-view', QuizView)
