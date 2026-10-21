/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */
import { QuizContent } from '../../logic/QuizContent.js'
import { QuizSession } from '/modules/QuizEngine-module/src/index.js'
import { StyleLoader } from '../../utils/StyleLoader.js'
import '../password-rule-checker/index.js'
import '../quiz-view/index.js'
import '../generate-step/index.js'

/**
 * Displays the password app.
 */
class PasswordApp extends HTMLElement {
  #questionContent = new QuizContent()

  /**
   * Creates the component and attaches a shadow DOM.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    new StyleLoader().applyTo(this.shadowRoot, import.meta.url)
      .then(() => this.#render())
  }

  /**
   * Renders the password app component.
   */
  #render () {
    this.shadowRoot.replaceChildren()

    const ruleChecker = document.createElement('password-rule-checker')

    ruleChecker.addEventListener('all-rules-passed', () => {
      this.#showReveal()
    })

    this.shadowRoot.append(ruleChecker)
  }

  /**
   * Shows the reveal message with a button that starts the quiz.
   */
  #showReveal () {
    this.shadowRoot.replaceChildren()
    const revealMessage = document.createElement('p')
    revealMessage.textContent = 'Great Work! You created a password that follows all rules on the website. But how much do you really know about safe passwords?'

    this.shadowRoot.append(revealMessage, this.#createStartQuizButton())
  }

  /**
   * Creates the start quiz button.
   *
   * @returns {HTMLButtonElement} The start quiz button.
   */
  #createStartQuizButton () {
    const startQuizButton = document.createElement('button')
    startQuizButton.textContent = 'Start the Quiz!'

    startQuizButton.addEventListener('click', () => {
      this.#showQuiz()
    })

    return startQuizButton
  }

  /**
   * Starts the quiz.
   */
  #showQuiz () {
    this.shadowRoot.replaceChildren()
    const session = new QuizSession(this.#questionContent.createQuiz())

    const quizView = document.createElement('quiz-view')
    quizView.questionContent = this.#questionContent
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

    const generateStep = document.createElement('generate-step')

    generateStep.addEventListener('password-tested', () => {
      this.#showFinalQuestion()
    })

    this.shadowRoot.appendChild(generateStep)
  }

  /**
   * Starts the final quiz question.
   */
  #showFinalQuestion () {
    this.shadowRoot.replaceChildren()
    const session = new QuizSession(this.#questionContent.createFinalQuiz())

    const finalQuestion = document.createElement('quiz-view')
    finalQuestion.questionContent = this.#questionContent
    finalQuestion.session = session

    finalQuestion.addEventListener('quiz-finished', () => {
      this.#showEndScreen()
    })

    this.shadowRoot.appendChild(finalQuestion)
  }

  /**
   * Displays the end screen with a message with a start over button when the quiz is finished.
   */
  #showEndScreen () {
    this.shadowRoot.replaceChildren()
    const endScreenTitle = document.createElement('h2')
    endScreenTitle.textContent = 'You made it! Quiz completed!'

    const endScreenParagraph = document.createElement('p')
    endScreenParagraph.textContent = 'Hopefully now you know a little bit more about password security and what to keep in mind when you create a password. And remember a password that follows rules on a website are not guaranteed to be safe.'

    this.shadowRoot.append(endScreenTitle, endScreenParagraph, this.#createStartOverButton())
  }

  /**
   * Creates a start over button.
   *
   * @returns {HTMLButtonElement} The start over button.
   */
  #createStartOverButton () {
    const startOverButton = document.createElement('button')
    startOverButton.textContent = 'Start Over'

    startOverButton.addEventListener('click', () => {
      this.#render()
    })

    return startOverButton
  }
}
customElements.define('password-app', PasswordApp)
