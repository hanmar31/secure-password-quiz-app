/**
 * Holds a collection of quiz questions.
 */
export class Quiz {
  #questions = []
  /**
   * Adds a question to the quiz.
   *
   * @param {import('./Question.js').Question | import('./MultipleChoiceQuestion.js').MultipleChoiceQuestion | import('./TextQuestion.js').TextQuestion} question - The question to add.
   */
  addQuestion(question) {
    this.#questions.push(question)
  }
  /**
   * Returns the number of questions.
   *
   * @returns {number} The question count.
   */
  getQuestionCount() {
    return this.#questions.length
  }
  /**
   * Returns the question at the given index.
   *
   * @param {number} index - The question's position, starting at zero.
   * @returns {import('./Question.js').Question | import('./MultipleChoiceQuestion.js').MultipleChoiceQuestion | import('./TextQuestion.js').TextQuestion} The requested question.
   * @throws {RangeError} If the index is invalid.
   */
  getQuestion(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.#questions.length) {
      throw new RangeError('Question index must refer to an existing question.')
    }

    return this.#questions[index]
  }
  /**
   * Creates a quiz containing questions from the given category.
   *
   * @param {string} category - The category to select.
   * @returns {Quiz} A new quiz containing matching questions.
   */
  filterByCategory(category) {
    if (typeof category !== 'string' || category.trim() === '') {
      throw new TypeError('Category must be a non-empty string.')
    }

    const filteredQuiz = new Quiz()
    const selectedCategory = category.trim()

    for (const question of this.#questions) {
      if (question.getCategory() === selectedCategory) {
        filteredQuiz.addQuestion(question)
      }
    }

    return filteredQuiz
  }
  /**
   * Returns the total points available in the quiz.
   *
   * @returns {number} The maximum possible score.
   */
  getTotalPoints() {
    let totalPoints = 0

    for (const question of this.#questions) {
      totalPoints += question.getPoints()
    }

    return totalPoints
  }
}
