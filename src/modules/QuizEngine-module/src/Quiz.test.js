import { describe, it, expect } from 'vitest'
import { Quiz } from './Quiz.js'
import { Question } from './Question.js'

describe('Quiz', () => {
  it('starts with no questions', () => {
    const quiz = new Quiz()

    expect(quiz.getQuestionCount()).toBe(0)
  })

  it('counts an added question', () => {
    const quiz = new Quiz()
    const question = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0)

    quiz.addQuestion(question)

    expect(quiz.getQuestionCount()).toBe(1)
  })
  it('retrieves an added question', () => {
    const quiz = new Quiz()
    const question = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0)

    quiz.addQuestion(question)

    expect(quiz.getQuestion(0)).toBe(question)
  })
  it('creates a quiz containing only the selected category', () => {
    const geographyQuestion = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0, 'Geography')
    const programmingQuestion = new Question(
      'Which keyword declares a class in JavaScript?',
      ['class', 'function'],
      0,
      'Programming'
    )

    const quiz = new Quiz()
    quiz.addQuestion(geographyQuestion)
    quiz.addQuestion(programmingQuestion)

    const geographyQuiz = quiz.filterByCategory('Geography')

    expect(geographyQuiz.getQuestionCount()).toBe(1)
    expect(geographyQuiz.getQuestion(0)).toBe(geographyQuestion)
    expect(quiz.getQuestionCount()).toBe(2)
  })
})
