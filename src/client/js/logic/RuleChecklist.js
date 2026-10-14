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
}

export { RuleChecklist }
