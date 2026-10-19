/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */
import { QuizContent } from '../../logic/QuizContent.js'
import { QuizSession } from '/modules/QuizEngine-module/src/index.js'
import '../password-rule-checker/index.js'
import '../quiz-view/index.js'

/**
 * Displays the password app.
 */
class PasswordApp extends HTMLElement {
  /**
   * Creates the component and attaches a shadow DOM.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.#render()
  }

  /**
   * Renders the password app component.
   */
  #render () {
    const ruleChecker = document.createElement('password-rule-checker')

    ruleChecker.addEventListener('all-rules-passed', () => {
      this.#showReveal()
    })

    this.shadowRoot.append(ruleChecker)
  }

  /**
   * Displays a success message and a button to start the quiz.
   */
  #showReveal () {
    this.shadowRoot.replaceChildren()
    const revealMessage = document.createElement('p')
    revealMessage.textContent = 'Great Work! You created a password that follows all rules on the website. But how much do you really know about safe passwords?'

    const startQuizButton = document.createElement('button')
    startQuizButton.textContent = 'Start the Quiz!'

    startQuizButton.addEventListener('click', () => {
      this.#showQuiz()
    })

    this.shadowRoot.append(revealMessage, startQuizButton)
  }

  /**
   * Starts the quiz.
   */
  #showQuiz () {
    this.shadowRoot.replaceChildren()
    const questionContent = new QuizContent()
    const session = new QuizSession(questionContent.createQuiz())

    const quizView = document.createElement('quiz-view')
    quizView.questionContent = questionContent
    quizView.session = session

    this.shadowRoot.appendChild(quizView)

    quizView.addEventListener('quiz-finished', () => {
      this.#showGenerateStep()
    })
  }

  /**
   * Shows the generate step.
   */
  #showGenerateStep () {
    this.shadowRoot.replaceChildren()
    const placeholder = document.createElement('p')
    placeholder.textContent = 'Generate step coming soon'
    this.shadowRoot.appendChild(placeholder)
  }
}
customElements.define('password-app', PasswordApp)
