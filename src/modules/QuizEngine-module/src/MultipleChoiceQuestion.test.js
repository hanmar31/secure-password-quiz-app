import { describe, it, expect } from 'vitest'
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion.js'

describe('MultipleChoiceQuestion', () => {
  it('accepts all correct options in either order', () => {
    const question = new MultipleChoiceQuestion('Which numbers are even?', ['2', '3', '4'], [0, 2])

    expect(question.isCorrect([0, 2])).toBe(true)
    expect(question.isCorrect([2, 0])).toBe(true)
  })

  it('rejects incomplete selections and extra wrong options', () => {
    const question = new MultipleChoiceQuestion('Which numbers are even?', ['2', '3', '4'], [0, 2])

    expect(question.isCorrect([0])).toBe(false)
    expect(question.isCorrect([0, 1, 2])).toBe(false)
  })
})
