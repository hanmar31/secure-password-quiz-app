import { describe, it, expect } from 'vitest'
import { TextQuestion } from './TextQuestion.js'

describe('TextQuestion', () => {
  it('accepts an answer regardless of capitalization and surrounding spaces', () => {
    const question = new TextQuestion('What is the capital of Sweden?', ['Stockholm'])

    expect(question.isCorrect('Stockholm')).toBe(true)
    expect(question.isCorrect('  stockholm  ')).toBe(true)
    expect(question.isCorrect('STOCKHOLM')).toBe(true)
  })

  it('accepts alternative answers and rejects incorrect answers', () => {
    const question = new TextQuestion('What is the common abbreviation for JavaScript?', ['JS', 'JavaScript'])

    expect(question.isCorrect('js')).toBe(true)
    expect(question.isCorrect('JavaScript')).toBe(true)
    expect(question.isCorrect('Java')).toBe(false)
  })
})
