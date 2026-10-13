/**
 * Represents a question with multiple correct options.
 */
export class MultipleChoiceQuestion {
  #text
  #options
  #correctAnswerIndexes
  #category
  #points

  /**
   * Creates a multiple-choice question.
   *
   * @param {string} text - The question text.
   * @param {string[]} options - The available options.
   * @param {number[]} correctAnswerIndexes - The correct option indexes.
   * @param {string} [category='General'] - The question's topic.
   * @param {number} [points=1] - Points for a fully correct answer.
   */
  constructor(text, options, correctAnswerIndexes, category = 'General', points = 1) {
    if (typeof text !== 'string' || text.trim() === '') {
      throw new TypeError('Question text must be a non-empty string.')
    }

    if (!Array.isArray(options) || options.length < 2) {
      throw new TypeError('A question must have at least two answer options.')
    }

    for (const option of options) {
      if (typeof option !== 'string' || option.trim() === '') {
        throw new TypeError('Each answer option must be a non-empty string.')
      }
    }

    if (typeof category !== 'string' || category.trim() === '') {
      throw new TypeError('Category must be a non-empty string.')
    }

    if (!Number.isInteger(points) || points < 1) {
      throw new RangeError('Points must be a positive integer.')
    }

    this.#options = [...options]
    this.#validateIndexes(correctAnswerIndexes)

    if (correctAnswerIndexes.length === 0) {
      throw new RangeError('At least one correct answer is required.')
    }

    this.#text = text
    this.#correctAnswerIndexes = [...correctAnswerIndexes]
    this.#category = category.trim()
    this.#points = points
  }

  /**
   * Validates option indexes and rejects duplicates.
   *
   * @param {number[]} indexes - The indexes to validate.
   */
  #validateIndexes(indexes) {
    if (!Array.isArray(indexes)) {
      throw new TypeError('Answer indexes must be an array.')
    }

    const seen = new Set()

    for (const index of indexes) {
      if (!Number.isInteger(index) || index < 0 || index >= this.#options.length) {
        throw new RangeError('Answer index must refer to an existing option.')
      }

      if (seen.has(index)) {
        throw new RangeError('Answer indexes must not contain duplicates.')
      }

      seen.add(index)
    }
  }

  /**
   * Returns the question text.
   *
   * @returns {string} The text.
   */
  getText() {
    return this.#text
  }

  /**
   * Returns a copy of the options.
   *
   * @returns {string[]} The options.
   */
  getOptions() {
    return [...this.#options]
  }

  /**
   * Returns the question category.
   *
   * @returns {string} The category.
   */
  getCategory() {
    return this.#category
  }

  /**
   * Returns the available points.
   *
   * @returns {number} The point value.
   */
  getPoints() {
    return this.#points
  }

  /**
   * Checks whether the selection contains exactly the correct options.
   *
   * @param {number[]} answerIndexes - The selected option indexes.
   * @returns {boolean} Whether the selection is fully correct.
   */
  isCorrect(answerIndexes) {
    this.#validateIndexes(answerIndexes)

    if (answerIndexes.length !== this.#correctAnswerIndexes.length) {
      return false
    }

    for (const index of this.#correctAnswerIndexes) {
      if (!answerIndexes.includes(index)) {
        return false
      }
    }

    return true
  }
}
