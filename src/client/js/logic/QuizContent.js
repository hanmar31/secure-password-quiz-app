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
  /**
   * Creates the quiz from the quiz data.
   *
   * @returns {Quiz} The quiz build from the quiz data.
   */
  createQuiz () {
    const quiz = new Quiz()
    for (const item of quizData) {
      const optionsText = item.options.map(options => options.text)
      const correctIndex = item.options.findIndex(option => option.correct)
      const question = new Question(item.text, optionsText, correctIndex)
      quiz.addQuestion(question)
    }
    return quiz
  }
}
export { QuizContent }
