/**
 * @author Hanna Mårtensson
 * @version 1.0.0
 */

/**
 * Validates the password based on the score.
 */
class ValidationResult {
  /**
   * Creates a new validation result.
   *
   * @param {number} score - The password score.
   * @param {string[]} suggestions - Suggestions for improving the password.
   */
  constructor (score, suggestions) {
    this.score = score
    this.suggestions = suggestions
  }

  /**
   * Returns a label based on the password score.
   *
   * @returns {string} The password strength label.
   */
  getLabel () {
    if (this.score <= 2) return 'weak password'
    if (this.score <= 4) return 'medium password'
    return 'strong password'
  }

  /**
   * Checks if there are any suggestions for improving the password.
   *
   * @returns {boolean} True if there are suggestions, otherwise false.
   */
  hasSuggestions () {
    return this.suggestions.length > 0
  }

  /**
   * Returns the password strength score.
   *
   * @returns {number} The password strength score between 0 and 5.
   */
  getScore () {
    return this.score
  }
}

export { ValidationResult }
