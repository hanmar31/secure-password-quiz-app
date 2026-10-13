import { describe, it, expect } from 'vitest'
import { Question } from './Question.js'

describe('Question', () => {
  it('recognizes the correct answer', () => {
    const question = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo', 'Helsinki'], 0)

    expect(question.isCorrect(0)).toBe(true)
  })
  it('recognizes the incorrect answer', () => {
    const question = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo', 'Helsinki'], 0)

    expect(question.isCorrect(2)).toBe(false)
  })

  it('rejects empty question text', () => {
    expect(() => {
      new Question('', ['Stockholm', 'Oslo'], 0)
    }).toThrow()
  })
  it('rejects a question with fewer than two options', () => {
    expect(() => {
      new Question('What is the capital of Sweden?', ['Stockholm'], 0)
    }).toThrow('A question must have at least two answer options.')
  })
  it('rejects an empty options array', () => {
    expect(() => {
      new Question('What is the capital of Sweden?', [], 0)
    }).toThrow('A question must have at least two answer options.')
  })
  it('rejects a correct answer index outside the options', () => {
    expect(() => {
      new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 2)
    }).toThrow()
  })
  it('rejects an empty answer option', () => {
    expect(() => {
      new Question('What is the capital of Sweden?', ['Stockholm', ''], 0)
    }).toThrow('Each answer option must be a non-empty string.')
  })
  it('rejects a negative correct answer index', () => {
    expect(() => {
      new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], -1)
    }).toThrow('Correct answer index must refer to an existing option.')
  })

  it('rejects a decimal correct answer index', () => {
    expect(() => {
      new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0.5)
    }).toThrow('Correct answer index must refer to an existing option.')
  })
  it('rejects an answer index outside the options', () => {
    const question = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0)

    expect(() => question.isCorrect(2)).toThrow(RangeError)
  })
  it('stores a question category', () => {
    const question = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0, 'Geography')

    expect(question.getCategory()).toBe('Geography')
  })

  it('uses General when no category is provided', () => {
    const question = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0)

    expect(question.getCategory()).toBe('General')
  })
  it('stores a custom point value', () => {
    const question = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0, 'Geography', 3)

    expect(question.getPoints()).toBe(3)
  })

  it('defaults to one point', () => {
    const question = new Question('What is the capital of Sweden?', ['Stockholm', 'Oslo'], 0)

    expect(question.getPoints()).toBe(1)
  })
})
