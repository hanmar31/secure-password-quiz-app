/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

import { PasswordGenerator, PasswordValidator } from '/modules/Password-module/src/index.js'

/**
 * A component that allows the user to generate a password.
 */
class GenerateStep extends HTMLElement {
  #generator = new PasswordGenerator()
  #validator = new PasswordValidator()
  #generatedPassword

  /**
   * Creates the component and attaches a shadow DOM.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.#renderGenerateStage()
  }

  /**
   * Renders the generate heading and button.
   */
  #renderGenerateStage () {
    const generateHeader = document.createElement('h2')
    generateHeader.textContent = 'Generate a password'

    const generateButton = document.createElement('button')
    generateButton.textContent = 'Generate'

    generateButton.addEventListener('click', () => {
      this.#showGeneratedPassword()
      generateButton.remove()
    })

    this.shadowRoot.append(generateHeader, generateButton)
  }

  /**
   * Generates a password and shows it.
   */
  #showGeneratedPassword () {
    this.#generatedPassword = this.#generator.generate(this.#validator.getMinimumPasswordLength())

    const passwordText = document.createElement('p')
    passwordText.textContent = this.#generatedPassword
    this.shadowRoot.append(passwordText)
  }
}
customElements.define('generate-step', GenerateStep)
