/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

/**
 * Checks the password rules and shows the result.
 */
class PasswordRuleChecker extends HTMLElement {
  /**
   *Creates the component and attaches a shadow DOM.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.#render()
  }

  /**
   * Renders the password inout field and confirm button.
   */
  #render () {
    const passwordInput = document.createElement('input')
    passwordInput.placeholder = 'New password...'

    const confirmButton = document.createElement('button')
    confirmButton.textContent = 'Confirm'

    this.shadowRoot.append(passwordInput, confirmButton)
  }
}

customElements.define('password-rule-checker', PasswordRuleChecker)
