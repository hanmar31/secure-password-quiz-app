/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

import { StyleLoader } from '../../utils/StyleLoader.js'

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
    new StyleLoader().applyTo(this.shadowRoot, import.meta.url)
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

    const details = this.#questionContent.getDetails(currentQuestion)
    const correctOption = details.options.find(option => option.correct)

    this.shadowRoot.appendChild(feedbackHeader)

    if (!correct) {
      const chosenOption = details.options[index]
      const wrongOptionText = this.#createFeedbackBox(`Your answer: ${chosenOption.text}`, 'incorrect-box')
      const wrongOptionExplanation = this.#createFeedbackBox(chosenOption.explanation, 'incorrect-box')
      this.shadowRoot.append(wrongOptionText, wrongOptionExplanation)
    }

    const correctOptionText = this.#createFeedbackBox(`Correct answer: ${correctOption.text}`, 'correct-box')
    const correctOptionExplanation = this.#createFeedbackBox(correctOption.explanation, 'correct-box')

    this.shadowRoot.append(correctOptionText, correctOptionExplanation, this.#createNextButton())
  }

  /**
   * Creates a styled feedback box element with the given text and class.
   *
   * @param {string} text The text to display.
   * @param {string} className The CSS class for styling (correct-box or incorrect-box).
   * @returns {HTMLDivElement} The feedback box element.
   */
  #createFeedbackBox (text, className) {
    const box = document.createElement('div')
    box.textContent = text
    box.classList.add('feedback-box', className)
    return box
  }

  /**
   * Creates a button to display the next question or finish the quiz.
   *
   * @returns {HTMLButtonElement} The next question button.
   */
  #createNextButton () {
    const nextButton = document.createElement('button')
    nextButton.classList.add('next-button')
    nextButton.textContent = this.#session.isComplete() ? 'Finish quiz' : 'Next Question'
    nextButton.addEventListener('click', () => {
      if (this.#session.isComplete()) {
        this.dispatchEvent(new CustomEvent('quiz-finished', {
          bubbles: true,
          composed: true
        }))
        return
      }
      this.#render()
    })

    return nextButton
  }
}

customElements.define('quiz-view', QuizView)
