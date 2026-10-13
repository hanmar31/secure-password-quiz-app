/**
 * Represents a quiz question with one correct answer.
 */
export class Question {
  #text
  #options
  #correctAnswerIndex
  #category
  #points

  /**
   * Creates a quiz question.
   *
   * @param {string} text - The question text.
   * @param {string[]} options - The available answer options.
   * @param {number} correctAnswerIndex - The index of the correct option.
   * @param {string} category - The category of the question.
   * @param {number} points - The number of points the question is worth.
   */
  constructor(text, options, correctAnswerIndex, category = 'General', points = 1) {
    if (typeof category !== 'string' || category.trim() === '') {
      throw new TypeError('Category must be a non-empty string.')
    }
    if (typeof text !== 'string' || text.trim() === '') {
      throw new TypeError('Question text must be a non-empty string.')
    }
    if (!Array.isArray(options) || options.length < 2) {
      throw new TypeError('A question must have at least two answer options.')
    }
    if (!Number.isInteger(correctAnswerIndex) || correctAnswerIndex < 0 || correctAnswerIndex >= options.length) {
      throw new RangeError('Correct answer index must refer to an existing option.')
    }
    if (!Number.isInteger(points) || points < 1) {
      throw new RangeError('Points must be a positive integer.')
    }
    for (const option of options) {
      if (typeof option !== 'string' || option.trim() === '') {
        throw new TypeError('Each answer option must be a non-empty string.')
      }
    }
    this.#text = text
    this.#options = [...options]
    this.#correctAnswerIndex = correctAnswerIndex
    this.#category = category.trim()
    this.#points = points
  }
  /**
   * Returns the question text.
   *
   * @returns {string} The question text.
   */
  getText() {
    return this.#text
  }

  /**
   * Returns a copy of the answer options.
   *
   * @returns {string[]} The answer options.
   */
  getOptions() {
    return [...this.#options]
  }

  /**
   * Checks whether the selected answer is correct.
   *
   * @param {number} answerIndex - The selected option's index.
   * @returns {boolean} Whether the answer is correct.
   */
  isCorrect(answerIndex) {
    if (!Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= this.#options.length) {
      throw new RangeError('Answer index must refer to an existing option.')
    }
    return answerIndex === this.#correctAnswerIndex
  }
  /**
   * Returns the question's category.
   *
   * @returns {string} The category.
   */
  getCategory() {
    return this.#category
  }
  /**
   * Returns the points available for this question.
   *
   * @returns {number} The point value.
   */
  getPoints() {
    return this.#points
  }
}
