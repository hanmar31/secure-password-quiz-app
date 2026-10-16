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
    this.shadowRoot.appendChild(passwordText)
    this.shadowRoot.appendChild(this.#createValidationBox())
  }

  /**
   * Creates box to validate a password.
   *
   * @returns {HTMLDivElement} The box with the input and Validate button.
   */
  #createValidationBox () {
    const validationDiv = document.createElement('div')

    const validationHeader = document.createElement('h2')
    validationHeader.textContent = 'Validate the generated password here:'

    const validationInput = document.createElement('input')
    validationInput.type = 'text'
    validationInput.setAttribute('aria-label', 'Generated Password')

    const validationButton = document.createElement('button')
    validationButton.textContent = 'Validate'

    validationDiv.append(validationHeader, validationInput, validationButton)

    return validationDiv
  }
}
customElements.define('generate-step', GenerateStep)
