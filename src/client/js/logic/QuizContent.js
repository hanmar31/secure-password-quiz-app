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
    for (const item of quizData) {
      const optionTexts = item.options.map(option => option.text)
      const correctIndex = item.options.findIndex(option => option.correct)
      const question = new Question(item.text, optionTexts, correctIndex)
      this.#questionDetails.set(question, item)
      quiz.addQuestion(question)
    }
    return quiz
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
