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
  #continueButton

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

    const messageText = document.createElement('p')

    const validationButton = document.createElement('button')
    validationButton.textContent = 'Validate'

    validationButton.addEventListener('click', () => {
      this.#showValidationResult(validationInput, messageText)
    })

    validationDiv.append(validationHeader, validationInput, validationButton, messageText)

    return validationDiv
  }

  /**
   * Shows an error message or the score and label for the pasted password.
   *
   * @param {HTMLInputElement} input - The input holding the password.
   * @param {HTMLParagraphElement} messageText - The paragraph that shows messages and the result.
   */
  #showValidationResult (input, messageText) {
    const inputPassword = input.value.trim()
    const errorMessage = this.#getInputError(inputPassword)

    if (errorMessage !== '') {
      messageText.textContent = errorMessage
      input.value = ''
      return
    }

    messageText.textContent = this.#createResultText(inputPassword)

    this.#addContinueButton(messageText)
  }

  /**
   * Returns an error message if the input password is invalid.
   *
   * @param {string} inputPassword - The password entered by the user.
   * @returns {string} The error message, or an empty string if the input is valid.
   */
  #getInputError (inputPassword) {
    if (inputPassword.length === 0) {
      return 'Paste the generated password first'
    }
    if (inputPassword !== this.#generatedPassword) {
      return 'That is not the generated password. Please copy it exactly.'
    }
    return ''
  }

  /**
   * Creates a text description of the password validation result.
   *
   * @param {string} inputPassword - The password to validate.
   * @returns {string} The password score and strength label.
   */
  #createResultText (inputPassword) {
    const result = this.#validator.getStrength(inputPassword)
    return `Score: ${result.getScore()}, ${result.getLabel()}`
  }

  /**
   * Adds the continue button after the message if it does not already exist.
   *
   * @param {HTMLParagraphElement} messageText - The paragraph to place the button after.
   */
  #addContinueButton (messageText) {
    if (this.#continueButton === undefined) {
      this.#continueButton = this.#createContinueButton()
      messageText.after(this.#continueButton)
    }
  }

  /**
   * Creates a button that tells the app that the password has been tested.
   *
   * @returns {HTMLButtonElement} The continue button.
   */
  #createContinueButton () {
    const continueButton = document.createElement('button')
    continueButton.textContent = 'Continue'

    continueButton.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('password-tested', {
        bubbles: true,
        composed: true
      }))
    })
    return continueButton
  }
}
customElements.define('generate-step', GenerateStep)
