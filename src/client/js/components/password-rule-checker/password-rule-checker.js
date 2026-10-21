/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

import { RuleChecklist } from '../../logic/RuleChecklist.js'
import '../rule-list/index.js'
import { StyleLoader } from '../../utils/StyleLoader.js'

/**
 * Checks the password rules and shows the result.
 */
class PasswordRuleChecker extends HTMLElement {
  #ruleList = document.createElement('rule-list')
  #ruleChecklist = new RuleChecklist()

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
   * Renders the password input field, confirm button and the password rule checklist.
   */
  #render () {
    const inputContainer = document.createElement('div')
    inputContainer.classList.add('input-container')

    const passwordInput = document.createElement('input')
    passwordInput.placeholder = 'New password...'
    passwordInput.type = 'text'
    passwordInput.setAttribute('aria-label', 'Password')

    inputContainer.append(passwordInput, this.#createConfirmButton(passwordInput))
    this.shadowRoot.append(inputContainer, this.#ruleList)
  }

  /**
   * Creates the confirm button that checks the typed password against the rules.
   *
   * @param {HTMLInputElement} passwordInput - The input holding the password to check.
   * @returns {HTMLButtonElement} The confirm button.
   */
  #createConfirmButton (passwordInput) {
    const confirmButton = document.createElement('button')
    confirmButton.textContent = 'Confirm'

    confirmButton.addEventListener('click', () => {
      const password = passwordInput.value
      const visibleRules = this.#ruleChecklist.getVisibleRules(password)
      this.#ruleList.rules = visibleRules
      if (this.#ruleChecklist.allRulesPassed(visibleRules)) {
        this.dispatchEvent(new CustomEvent('all-rules-passed', {
          bubbles: true,
          composed: true
        }))
      }
    })

    return confirmButton
  }
}

customElements.define('password-rule-checker', PasswordRuleChecker)
