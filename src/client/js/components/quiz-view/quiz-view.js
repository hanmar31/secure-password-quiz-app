/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

import { ElementBuilder } from '../../utils/ElementBuilder.js'
import { StyleLoader } from '../../utils/StyleLoader.js'

/**
 * A component that displays the quiz.
 */
class QuizView extends HTMLElement {
  #session
  #questionContent
  #stylesReady
  #elements = new ElementBuilder()

  /**
   * Creates the component and attaches a shadow DOM.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.#stylesReady = new StyleLoader().applyTo(this.shadowRoot, import.meta.url)
  }

  /**
   * Sets the quiz session and renders the component.
   *
   * @param {object} session - The quiz session to display.
   */
  set session (session) {
    this.#session = session
    this.#stylesReady.then(() => this.#render())
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
   * Renders the current question with the option buttons.
   */
  #render () {
    this.shadowRoot.replaceChildren()

    const currentQuestion = this.#session.getCurrentQuestion()

    const questionText = this.#elements.createTextElement('p', currentQuestion.getText())

    this.shadowRoot.appendChild(questionText)

    for (const [index, optionText] of currentQuestion.getOptions().entries()) {
      this.shadowRoot.append(this.#createOptionButton(currentQuestion, index, optionText))
    }
  }

  /**
   * Creates a button for one answer option that submits the answer when clicked.
   *
   * @param {object} currentQuestion - The question being answered.
   * @param {number} index - The position of the option.
   * @param {string} optionText - The text shown on the button.
   * @returns {HTMLButtonElement} The option button.
   */
  #createOptionButton (currentQuestion, index, optionText) {
    const optionButton = document.createElement('button')
    optionButton.textContent = optionText

    optionButton.addEventListener('click', () => {
      const correct = this.#session.submitAnswer(index)
      this.#renderFeedback(currentQuestion, index, correct)
    })

    return optionButton
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
    const feedbackHeader = this.#elements.createTextElement('h2', correct ? 'Correct!' : 'Incorrect!')

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
