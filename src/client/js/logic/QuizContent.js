/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

import { Quiz, Question } from '/modules/QuizEngine-module/src/index.js'
import { quizData } from './quizData.js'

/**
 * Builds the quiz and keeps the explanations for each question.
 */
class QuizContent {
  #questionDetails = new Map()

  /**
   * Creates the quiz from the quiz data.
   *
   * @returns {Quiz} The quiz built from the quiz data.
   */
  createQuiz () {
    const quiz = new Quiz()
    for (const item of this.#shuffle(quizData)) {
      quiz.addQuestion(this.#createQuestion(item))
    }
    return quiz
  }

  /**
   * Creates oen question from a data iteam and keeps its details.
   *
   * @param {object} item - The question data, with text and options.
   * @returns {object} The created question.
   */
  #createQuestion (item) {
    const shuffledOptions = this.#shuffle(item.options)
    const optionTexts = shuffledOptions.map(option => option.text)
    const correctIndex = shuffledOptions.findIndex(option => option.correct)
    const question = new Question(item.text, optionTexts, correctIndex)
    const details = { ...item, options: shuffledOptions }
    this.#questionDetails.set(question, details)

    return question
  }

  /**
   * Gets the question details.
   *
   * @param {Question} question - The question to get details for.
   * @returns {object} The question details.
   */
  getDetails (question) {
    return this.#questionDetails.get(question)
  }

  /**
   * Creates a shuffled copy of the items.
   *
   * @param {Array} items - The items to shuffle.
   * @returns {Array} A shuffled copy of the items.
   */
  #shuffle (items) {
    const shuffled = [...items]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temporaryShuffle = shuffled[i]
      shuffled[i] = shuffled[j]
      shuffled[j] = temporaryShuffle
    }
    return shuffled
  }
}
export { QuizContent }
