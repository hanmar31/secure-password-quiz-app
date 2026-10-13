import { Quiz } from './Quiz.js'

/**
 * Tracks one attempt at a quiz.
 */
export class QuizSession {
  #quiz
  #currentQuestionIndex = 0
  #score = 0
  #answers = []

  /**
   * Creates a session for a quiz.
   *
   * @param {import('./Quiz.js').Quiz} quiz - The quiz to attempt.
   */
  constructor(quiz) {
    this.#quiz = new Quiz()

    for (let index = 0; index < quiz.getQuestionCount(); index += 1) {
      this.#quiz.addQuestion(quiz.getQuestion(index))
    }
  }
  /**
   * Returns the current question.
   *
   * @returns {import('./Question.js').Question | import('./MultipleChoiceQuestion.js').MultipleChoiceQuestion | import('./TextQuestion.js').TextQuestion} The current question.
   */
  getCurrentQuestion() {
    return this.#quiz.getQuestion(this.#currentQuestionIndex)
  }

  /**
   * Returns the total points earned.
   *
   * @returns {number} The current score.
   */
  getScore() {
    return this.#score
  }
  /**
   * Checks whether all questions have been answered.
   *
   * @returns {boolean} Whether the session is complete.
   */
  isComplete() {
    return this.#currentQuestionIndex >= this.#quiz.getQuestionCount()
  }

  /**
   * Submits an answer and advances to the next question.
   *
   * @param {number | number[] | string} answer - The selected index, selected indexes, or typed answer.
   * @returns {boolean} Whether the answer was correct.
   * @throws {Error} If the session is already complete.
   */
  submitAnswer(answer) {
    if (this.isComplete()) {
      throw new Error('Cannot submit an answer after the quiz is complete.')
    }

    const question = this.getCurrentQuestion()
    const correct = question.isCorrect(answer)

    this.#answers.push({
      questionIndex: this.#currentQuestionIndex,
      answer: Array.isArray(answer) ? [...answer] : answer,
      correct,
    })

    if (correct) {
      this.#score += question.getPoints()
    }

    this.#currentQuestionIndex += 1

    return correct
  }
  /**
   * Returns the final quiz results.
   *
   * @returns {{ score: number, totalQuestions: number, maxScore: number  }} The results.
   * @throws {Error} If the session is not complete.
   */
  getResults() {
    if (!this.isComplete()) {
      throw new Error('Complete the quiz before requesting results.')
    }

    return {
      score: this.#score,
      totalQuestions: this.#quiz.getQuestionCount(),
      maxScore: this.#quiz.getTotalPoints(),
    }
  }
  /**
   * Returns copies of the recorded answers.
   *
   *  @returns {Array<{questionIndex: number, answer: number | number[] | string, correct: boolean}>}
   *   The submitted answer history.
   */
  getAnswerHistory() {
    const history = []

    for (const answer of this.#answers) {
      history.push({
        ...answer,
        answer: Array.isArray(answer.answer) ? [...answer.answer] : answer.answer,
      })
    }

    return history
  }
  /**
   * Creates a quiz containing incorrectly answered questions.
   *
   * @returns {Quiz} A quiz containing the mistakes.
   * @throws {Error} If the session is not complete.
   */
  createRetryQuiz() {
    if (!this.isComplete()) {
      throw new Error('Complete the quiz before retrying mistakes.')
    }

    const retryQuiz = new Quiz()

    for (const answer of this.#answers) {
      if (!answer.correct) {
        const question = this.#quiz.getQuestion(answer.questionIndex)
        retryQuiz.addQuestion(question)
      }
    }

    return retryQuiz
  }
}
