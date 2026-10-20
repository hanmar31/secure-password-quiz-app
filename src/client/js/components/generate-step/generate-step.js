/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

import { PasswordGenerator, PasswordValidator } from '/modules/Password-module/src/index.js'
import { StyleLoader } from '../../utils/StyleLoader.js'

/**
 * A component that allows the user to generate a password.
 */
class GenerateStep extends HTMLElement {
  #generator = new PasswordGenerator()
  #validator = new PasswordValidator()
  #generatedPassword
  #continueButton
  #passwordDisplay

  /**
   * Creates the component and attaches a shadow DOM.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    new StyleLoader().applyTo(this.shadowRoot, import.meta.url)

    this.#render()
  }

  /**
   * Renders the outer slot machine layout container.
   */
  #render () {
    this.shadowRoot.replaceChildren()

    const slotsContainer = document.createElement('div')
    slotsContainer.classList.add('slots-container')

    slotsContainer.append(
      this.#renderGenerateStage(),
      this.#createValidationBox()
    )

    this.shadowRoot.appendChild(slotsContainer)
  }

  /**
   * Renders the generate heading and button inside a machine box.
   *
   * @returns {HTMLDivElement} The generator box.
   */
  #renderGenerateStage () {
    const generatorBox = document.createElement('div')
    generatorBox.classList.add('machine-box')

    const generateHeader = document.createElement('h2')
    generateHeader.textContent = '1. Generate Password'

    const generateButton = document.createElement('button')
    generateButton.textContent = 'Generate'

    this.#passwordDisplay = document.createElement('p')
    this.#passwordDisplay.classList.add('display-box')
    this.#passwordDisplay.textContent = 'Click generate...'

    generateButton.addEventListener('click', () => {
      this.#showGeneratedPassword()
    })

    generatorBox.append(generateHeader, generateButton, this.#passwordDisplay)
    return generatorBox
  }

  /**
   * Generates a password and shows it.
   */
  #showGeneratedPassword () {
    this.#generatedPassword = this.#generator.generate(this.#validator.getMinimumPasswordLength())
    this.#passwordDisplay.textContent = this.#generatedPassword
  }

  /**
   * Creates box to validate a password.
   *
   * @returns {HTMLDivElement} The box with the input and Validate button.
   */
  #createValidationBox () {
    const validationDiv = document.createElement('div')
    validationDiv.classList.add('machine-box')

    const validationHeader = document.createElement('h2')
    validationHeader.textContent = '2. Validate Password'

    const validationInput = document.createElement('input')
    validationInput.type = 'text'
    validationInput.placeholder = 'Paste password here...'
    validationInput.setAttribute('aria-label', 'Generated Password')

    const messageText = document.createElement('p')
    messageText.classList.add('message-display')

    const validationButton = document.createElement('button')
    validationButton.textContent = 'Validate'

    validationButton.addEventListener('click', () => {
      this.#showValidationResult(validationInput, messageText, validationDiv)
    })

    validationDiv.append(validationHeader, validationInput, validationButton, messageText)

    return validationDiv
  }

  /**
   * Shows an error message or the score and label for the pasted password.
   *
   * @param {HTMLInputElement} input The input holding the password.
   * @param {HTMLParagraphElement} messageText The paragraph that shows messages and the result.
   * @param {HTMLDivElement} validationDiv The parent box to attach the continue button to.
   */
  #showValidationResult (input, messageText, validationDiv) {
    const inputPassword = input.value.trim()
    const errorMessage = this.#getInputError(inputPassword)

    if (errorMessage !== '') {
      messageText.textContent = errorMessage
      input.value = ''
      return
    }

    messageText.textContent = this.#createResultText(inputPassword)

    this.#addContinueButton(messageText, validationDiv)
  }

  /**
   * Returns an error message if the input password is invalid.
   *
   * @param {string} inputPassword The password entered by the user.
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
   * @param {string} inputPassword The password to validate.
   * @returns {string} The password score and strength label.
   */
  #createResultText (inputPassword) {
    const result = this.#validator.getStrength(inputPassword)
    return `Score: ${result.getScore()}, ${result.getLabel()}`
  }

  /**
   * Adds the continue button after the message if it does not already exist.
   *
   * @param {HTMLParagraphElement} messageText The paragraph to place the button after.
   * @param {HTMLDivElement} validationDiv The box to append the button to.
   */
  #addContinueButton (messageText, validationDiv) {
    if (this.#continueButton === undefined) {
      this.#continueButton = this.#createContinueButton()
      validationDiv.appendChild(this.#continueButton)
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
    continueButton.classList.add('continue-button')

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
