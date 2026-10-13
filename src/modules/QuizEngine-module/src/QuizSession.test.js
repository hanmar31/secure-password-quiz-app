import { describe, it, expect } from 'vitest'
import { Question } from './Question.js'
import { Quiz } from './Quiz.js'
import { QuizSession } from './QuizSession.js'
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion.js'
import { TextQuestion } from './TextQuestion.js'

describe('QuizSession', () => {
  it('starts at the first question with a score of zero', () => {
    const question = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0)
    const quiz = new Quiz()
    quiz.addQuestion(question)

    const session = new QuizSession(quiz)

    expect(session.getCurrentQuestion()).toBe(question)
    expect(session.getScore()).toBe(0)
  })
  it('scores a correct answer and completes a one-question quiz', () => {
    const quiz = new Quiz()
    quiz.addQuestion(new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0))
    const session = new QuizSession(quiz)

    expect(session.isComplete()).toBe(false)
    expect(session.submitAnswer(0)).toBe(true)
    expect(session.getScore()).toBe(1)
    expect(session.isComplete()).toBe(true)
  })
  it('advances through questions and scores only correct answers', () => {
    const firstQuestion = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0)
    const secondQuestion = new Question('What is the capital of Norway?', ['Stockholm', 'Oslo'], 1)

    const quiz = new Quiz()
    quiz.addQuestion(firstQuestion)
    quiz.addQuestion(secondQuestion)

    const session = new QuizSession(quiz)

    expect(session.submitAnswer(0)).toBe(true)
    expect(session.getScore()).toBe(1)
    expect(session.getCurrentQuestion()).toBe(secondQuestion)
    expect(session.isComplete()).toBe(false)

    expect(session.submitAnswer(0)).toBe(false)
    expect(session.getScore()).toBe(1)
    expect(session.isComplete()).toBe(true)
    expect(session.getResults()).toEqual({
      score: 1,
      totalQuestions: 2,
      maxScore: 2,
    })
  })
  it('rejects results before the quiz is complete', () => {
    const quiz = new Quiz()
    quiz.addQuestion(new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0))
    const session = new QuizSession(quiz)

    expect(() => session.getResults()).toThrow('Complete the quiz before requesting results.')
  })
  it('records submitted answers in order', () => {
    const quiz = new Quiz()
    quiz.addQuestion(new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0))
    quiz.addQuestion(new Question('What is the capital of Norway?', ['Stockholm', 'Oslo'], 1))
    const session = new QuizSession(quiz)

    session.submitAnswer(0)
    session.submitAnswer(0)

    expect(session.getAnswerHistory()).toEqual([
      { questionIndex: 0, answer: 0, correct: true },
      { questionIndex: 1, answer: 0, correct: false },
    ])
  })
  it('creates a retry quiz containing only mistakes', () => {
    const firstQuestion = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0)
    const secondQuestion = new Question('What is the capital of Norway?', ['Stockholm', 'Oslo'], 1)
    const quiz = new Quiz()
    quiz.addQuestion(firstQuestion)
    quiz.addQuestion(secondQuestion)

    const session = new QuizSession(quiz)
    session.submitAnswer(0)
    session.submitAnswer(0)

    const retryQuiz = session.createRetryQuiz()

    expect(retryQuiz.getQuestionCount()).toBe(1)
    expect(retryQuiz.getQuestion(0)).toBe(secondQuestion)

    const retrySession = new QuizSession(retryQuiz)

    expect(retrySession.getScore()).toBe(0)
    expect(retrySession.submitAnswer(1)).toBe(true)
    expect(retrySession.getScore()).toBe(1)
  })
  it('awards weighted points only for correct answers', () => {
    const quiz = new Quiz()
    quiz.addQuestion(new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0, 'Geography', 3))
    quiz.addQuestion(new Question('What is the capital of Norway?', ['Stockholm', 'Oslo'], 1, 'Geography', 5))

    const session = new QuizSession(quiz)

    session.submitAnswer(0)
    expect(session.getScore()).toBe(3)

    session.submitAnswer(0)
    expect(session.getScore()).toBe(3)
    expect(session.getResults()).toEqual({
      score: 3,
      totalQuestions: 2,
      maxScore: 8,
    })
  })
  it('protects submitted selections from outside changes', () => {
    const quiz = new Quiz()
    quiz.addQuestion(new MultipleChoiceQuestion('Which numbers are even?', ['2', '3', '4'], [0, 2]))
    const session = new QuizSession(quiz)
    const selection = [0, 2]

    expect(session.submitAnswer(selection)).toBe(true)

    selection[0] = 1

    const history = session.getAnswerHistory()
    expect(history[0].answer).toEqual([0, 2])

    history[0].answer[0] = 1

    expect(session.getAnswerHistory()[0].answer).toEqual([0, 2])
  })
  it('supports text answers, weighted scoring, history, and retries', () => {
    const question = new TextQuestion('What is the capital of Sweden?', ['Stockholm'], 'Geography', 3)
    const quiz = new Quiz()
    quiz.addQuestion(question)

    const session = new QuizSession(quiz)

    expect(session.submitAnswer('Oslo')).toBe(false)
    expect(session.getResults()).toEqual({
      score: 0,
      totalQuestions: 1,
      maxScore: 3,
    })
    expect(session.getAnswerHistory()).toEqual([{ questionIndex: 0, answer: 'Oslo', correct: false }])

    const retrySession = new QuizSession(session.createRetryQuiz())

    expect(retrySession.submitAnswer('  STOCKHOLM  ')).toBe(true)
    expect(retrySession.getScore()).toBe(3)
    expect(retrySession.isComplete()).toBe(true)
  })
  it('keeps its original questions when the quiz is extended', () => {
    const quiz = new Quiz()
    quiz.addQuestion(new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0))

    const session = new QuizSession(quiz)

    quiz.addQuestion(new Question('What is the capital of Norway?', ['Stockholm', 'Oslo'], 1))

    session.submitAnswer(0)

    expect(quiz.getQuestionCount()).toBe(2)
    expect(session.isComplete()).toBe(true)
    expect(session.getResults()).toEqual({
      score: 1,
      totalQuestions: 1,
      maxScore: 1,
    })
  })
  it('rejects another answer after completion without changing results', () => {
    const quiz = new Quiz()
    quiz.addQuestion(new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0))
    const session = new QuizSession(quiz)

    session.submitAnswer(0)

    expect(() => session.submitAnswer(0)).toThrow('Cannot submit an answer after the quiz is complete.')
    expect(session.getScore()).toBe(1)
    expect(session.getAnswerHistory()).toHaveLength(1)
  })
  it('keeps the session unchanged when an answer is invalid', () => {
    const question = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0)
    const quiz = new Quiz()
    quiz.addQuestion(question)

    const session = new QuizSession(quiz)

    expect(() => session.submitAnswer(5)).toThrow(RangeError)

    expect(session.getCurrentQuestion()).toBe(question)
    expect(session.getScore()).toBe(0)
    expect(session.getAnswerHistory()).toEqual([])
    expect(session.isComplete()).toBe(false)

    expect(session.submitAnswer(0)).toBe(true)
    expect(session.isComplete()).toBe(true)
  })
  it('creates an empty retry quiz when every answer is correct', () => {
    const quiz = new Quiz()
    quiz.addQuestion(new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0))

    const session = new QuizSession(quiz)
    session.submitAnswer(0)

    const retryQuiz = session.createRetryQuiz()

    expect(retryQuiz.getQuestionCount()).toBe(0)
    expect(retryQuiz.getTotalPoints()).toBe(0)
  })
})
