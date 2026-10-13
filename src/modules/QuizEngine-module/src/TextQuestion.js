/**
 * Represents a question answered with text.
 */
export class TextQuestion {
  #text
  #acceptedAnswers = []
  #category
  #points

  /**
   * Creates a text question.
   *
   * @param {string} text - The question text.
   * @param {string[]} acceptedAnswers - The accepted answers.
   * @param {string} [category='General'] - The question's topic.
   * @param {number} [points=1] - Points for a correct answer.
   */
  constructor(text, acceptedAnswers, category = 'General', points = 1) {
    if (typeof text !== 'string' || text.trim() === '') {
      throw new TypeError('Question text must be a non-empty string.')
    }

    if (!Array.isArray(acceptedAnswers) || acceptedAnswers.length === 0) {
      throw new TypeError('At least one accepted answer is required.')
    }

    for (const answer of acceptedAnswers) {
      if (typeof answer !== 'string' || answer.trim() === '') {
        throw new TypeError('Each accepted answer must be a non-empty string.')
      }

      this.#acceptedAnswers.push(this.#normalizeAnswer(answer))
    }

    if (typeof category !== 'string' || category.trim() === '') {
      throw new TypeError('Category must be a non-empty string.')
    }

    if (!Number.isInteger(points) || points < 1) {
      throw new RangeError('Points must be a positive integer.')
    }

    this.#text = text
    this.#category = category.trim()
    this.#points = points
  }

  /**
   * Normalizes text for answer comparison.
   *
   * @param {string} answer - The answer to normalize.
   * @returns {string} The normalized answer.
   */
  #normalizeAnswer(answer) {
    return answer.trim().toLowerCase()
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
   * Checks whether the text matches an accepted answer.
   *
   * @param {string} answer - The submitted text.
   * @returns {boolean} Whether the answer is correct.
   */
  isCorrect(answer) {
    if (typeof answer !== 'string') {
      throw new TypeError('Answer must be a string.')
    }

    const normalizedAnswer = this.#normalizeAnswer(answer)

    for (const acceptedAnswer of this.#acceptedAnswers) {
      if (normalizedAnswer === acceptedAnswer) {
        return true
      }
    }

    return false
  }
}
