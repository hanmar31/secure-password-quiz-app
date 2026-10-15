/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */
import '../password-rule-checker/index.js'
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

    this.shadowRoot.append(revealMessage, startQuizButton)
  }
}
customElements.define('password-app', PasswordApp)
