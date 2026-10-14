/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

import { PasswordValidator } from '/modules/Password-module/src/index.js'

/**
 * Creates a checklist for the password rules.
 */
class RuleChecklist {
  #validator = new PasswordValidator()
  #passwordRules = this.#createRules()

  /**
   * Creates the rules for the checklist, in the order they are checked.
   *
   * @returns {object[]} The rules, each with a label and a test function.
   */
  #createRules () {
    return [
      this.#createLengthRule(),
      this.#createNoSpacesRule(),
      this.#createUppercaseRule(),
      this.#createLowercaseRule(),
      this.#createNumberRule(),
      this.#createSpecialCharacterRule()
    ]
  }

  /**
   * Creates the password length rule.
   *
   * @returns {object} The password length rule.
   */
  #createLengthRule () {
    return {
      label: `Use at least ${this.#validator.getMinimumPasswordLength()} characters`,
      /**
       * Checks that the password is long enough.
       *
       * @param {string} password - The password to check.
       * @returns {boolean} True if the password is long enough, otherwise false.
       */
      test: password => this.#validator.hasMinLength(password, this.#validator.getMinimumPasswordLength())
    }
  }

  /**
   * Creates the no spaces in password rule.
   *
   * @returns {object} The no spaces in password rule.
   */
  #createNoSpacesRule () {
    return {
      label: 'No spaces allowed',
      /**
       * Checks that the password has no spaces.
       *
       * @param {string} password - The password to check.
       * @returns {boolean} True if the password has no spaces, otherwise false.
       */
      test: password => this.#validator.hasNoSpaces(password)
    }
  }

  /**
   * Creates the upper case character rule.
   *
   * @returns {object} The upper case rule.
   */
  #createUppercaseRule () {
    return {
      label: 'Use at least one upper case character',
      /**
       * Checks that the password contains at least one upper case character.
       *
       * @param {string} password - The password to check.
       * @returns {boolean} True if the password contains at least one upper case character.
       */
      test: password => this.#validator.hasUpperCase(password)
    }
  }

  /**
   * Creates the lower case rule.
   *
   * @returns {object} The lower case rule.
   */
  #createLowercaseRule () {
    return {
      label: 'Use at least one lower case character',
      /**
       * Checks that the password contains at least one lower case character.
       *
       * @param {string} password - The password to check.
       * @returns {boolean} True if the password contains at least one lower case character.
       */
      test: password => this.#validator.hasLowerCase(password)
    }
  }

  /**
   * Creates the number rule.
   *
   * @returns {object} The number rule.
   */
  #createNumberRule () {
    return {
      label: 'Use at least one number',
      /**
       * Checks that the password contains at least one number.
       *
       * @param {string} password - The password to check.
       * @returns {boolean} True if the password contains at least one number.
       */
      test: password => this.#validator.hasNumber(password)
    }
  }

  /**
   * Creates the special character rule.
   *
   * @returns {object} The special character rule.
   */
  #createSpecialCharacterRule () {
    return {
      label: 'Use at least one special character',
      /**
       * Checks that the password contains at least one special character.
       *
       * @param {string} password - The password to check.
       * @returns {boolean} True if the password contains at least one special character.
       */
      test: password => this.#validator.hasSpecialChars(password)
    }
  }

  /**
   * Gets the rules for the password.
   *
   * @param {string} password - The password to check.
   * @returns {object[]} A list of rules with a label and passed value for the password.
   * @throws {Error} If the password is null, undefined, or not a string.
   */
  getVisibleRules (password) {
    this.#validateInput(password)
    if (password.length === 0) {
      return []
    }
    const rulesList = []

    for (const rule of this.#passwordRules) {
      const passed = rule.test(password)
      rulesList.push({ label: rule.label, passed })

      if (!passed) {
        break
      }
    }
    return rulesList
  }

  /**
   * Validates the password input.
   *
   * @param {string} password - The password to validate.
   * @throws {Error} If the password is null, undefined, or not a string.
   */
  #validateInput (password) {
    if (password === null || password === undefined) {
      throw new Error('Password cannot be null or undefined')
    }
    if (typeof password !== 'string') {
      throw new Error('Password must be a string')
    }
  }
}

export { RuleChecklist }
