/**
 * @author Hanna Mårtensson
 * @version 1.0.0
 */

import { ValidationResult } from './ValidationResult.js'

/**
 * Validates passwords based on various rules.
 */
class PasswordValidator {
  #minimumPasswordLength = 10

  /**
   * Gets the minimum length a password must have to be valid.
   *
   * @returns {number} The minimum password length.
   */
  getMinimumPasswordLength () {
    return this.#minimumPasswordLength
  }

  /**
   * Checks the password against the minimum length required.
   *
   * @param {string} password - The password to check.
   * @param {number} minLength - The minimum required password length.
   * @returns {boolean} True if password meets required minimum length, otherwise false.
   */
  hasMinLength (password, minLength) {
    this.#validateInput(password)
    return password.length >= minLength
  }

  /**
   * Checks if the password contains a uppercase character.
   *
   * @param {string} password - The password to check.
   * @returns {boolean} True if the password contains a uppercase character.
   */
  hasUpperCase (password) {
    this.#validateInput(password)
    for (const letter of password) {
      if (letter === letter.toUpperCase() && letter !== letter.toLowerCase()) {
        return true
      }
    }
    return false
  }

  /**
   * Checks if the password contains a lowercase character.
   *
   * @param {string} password - The password to check.
   * @returns {boolean} True if the password contains a lowercase character.
   */
  hasLowerCase (password) {
    this.#validateInput(password)
    for (const letter of password) {
      if (letter === letter.toLowerCase() && letter !== letter.toUpperCase()) {
        return true
      }
    }
    return false
  }

  /**
   * Checks if the password contains a number.
   *
   * @param {string} password - The password to check.
   * @returns {boolean} True if the password contains a number.
   */
  hasNumber (password) {
    this.#validateInput(password)
    for (const character of password) {
      if (character >= '0' && character <= '9') {
        return true
      }
    }
    return false
  }

  /**
   * Checks if the password contains an allowed special character.
   *
   * @param {string} password - The password to check.
   * @returns {boolean} True if the password contains an allowed special character.
   */
  hasSpecialChars (password) {
    this.#validateInput(password)
    const specialCharacters = '!@#£$%/\\{([)]=}<?+~^*-_.:|>'
    for (const character of password) {
      if (specialCharacters.includes(character)) {
        return true
      }
    }
    return false
  }

  /**
   * Checks if the password contains spaces.
   *
   * @param {string} password - The password to check.
   * @returns {boolean} False if password contains at least one space, otherwise true.
   */
  hasNoSpaces (password) {
    this.#validateInput(password)
    return !password.includes(' ')
  }

  /**
   * Checks the strength of a password.
   *
   * @param {string} password - The password to check.
   * @returns {ValidationResult} The password strength.
   */
  getStrength (password) {
    this.#validateInput(password)
    const checks = [
      this.hasMinLength(password, this.#minimumPasswordLength),
      this.hasUpperCase(password),
      this.hasLowerCase(password),
      this.hasNumber(password),
      this.hasSpecialChars(password)
    ]

    const totalScore = checks.filter(check => check).length
    const suggestions = this.getSuggestions(password)

    return new ValidationResult(totalScore, suggestions)
  }

  /**
   * Returns suggestions for how to improve the password.
   *
   * @param {string} password - The password to check.
   * @returns {string[]} Suggestions for improving the password.
   */
  getSuggestions (password) {
    this.#validateInput(password)
    const suggestions = []
    if (!this.hasMinLength(password, this.#minimumPasswordLength)) suggestions.push(`Use at least ${this.#minimumPasswordLength} characters.`)
    if (!this.hasUpperCase(password)) suggestions.push('Add at least one uppercase letter')
    if (!this.hasLowerCase(password)) suggestions.push('Add at least one lowercase letter')
    if (!this.hasNumber(password)) suggestions.push('Add at least one number')
    if (!this.hasSpecialChars(password)) suggestions.push('Add at least one special character')
    if (!this.hasNoSpaces(password)) suggestions.push('Remove spaces from the password')
    return suggestions
  }

  /**
   * Checks if the password meets all validation requirements.
   *
   * @param {string} password - The password to check.
   * @returns {boolean} True if the password meets all requirements.
   */
  isValidPassword (password) {
    this.#validateInput(password)
    return this.hasMinLength(password, this.#minimumPasswordLength) &&
      this.hasUpperCase(password) &&
      this.hasLowerCase(password) &&
      this.hasNumber(password) &&
      this.hasSpecialChars(password) &&
      this.hasNoSpaces(password)
  }

  /**
   * Validates the password input.
   *
   * @param {string} password - The password to validate.
   * @throws {Error} If the password is null, undefined, not a string, or empty.
   */
  #validateInput (password) {
    if (password === null || password === undefined) {
      throw new Error('Password cannot be null or undefined')
    }
    if (typeof password !== 'string') {
      throw new Error('Password must be a string')
    }
    if (password.length === 0) {
      throw new Error('Password cannot be empty')
    }
  }
}

export { PasswordValidator }
