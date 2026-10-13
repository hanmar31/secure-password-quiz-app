/**
 * @author Hanna Mårtensson
 * @version 1.0.0
 */

import { PasswordValidator } from './PasswordValidator.js'

/**
 * Generates passwords that meet requirements.
 */
class PasswordGenerator {
  #upperCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  #lowerCharacters = 'abcdefghijklmnopqrstuvwxyz'
  #numberCharacters = '1234567890'
  #specialCharacters = '!@#£$%/\\{([)]=}<?+~^*-_.:|>'
  #validator = new PasswordValidator()

  /**
   * Generates a password.
   *
   * @param {number} length - The desired password length.
   * @returns {string} The generated password.
   */
  generate (length) {
    this.#validateLength(length)

    const password = []
    const actualLength = Math.max(length, this.#validator.getMinimumPasswordLength())

    this.#addRequiredCharacters(password)

    this.#addRandomCharacters(password, actualLength)

    this.#shuffleGeneratedCharacters(password)

    return password.join('')
  }

  /**
   * Ensures the password contains at least one character from each required category, changing the array.
   *
   * @param {string[]} generatedCharacters - The characters collected so far.
   */
  #addRequiredCharacters (generatedCharacters) {
    const requiredPools = [this.#upperCharacters, this.#lowerCharacters, this.#numberCharacters, this.#specialCharacters]

    for (const pool of requiredPools) {
      generatedCharacters.push(this.getRandomChar(pool))
    }
  }

  /**
   * Adds random characters to the password array until the desired length is reached.
   *
   * @param {string[]} generatedCharacters - The characters collected so far.
   * @param {number} passwordLength - The desired password length.
   */
  #addRandomCharacters (generatedCharacters, passwordLength) {
    const allCharacters = this.#upperCharacters + this.#lowerCharacters + this.#numberCharacters + this.#specialCharacters

    while (generatedCharacters.length < passwordLength) {
      generatedCharacters.push(this.getRandomChar(allCharacters))
    }
  }

  /**
   * Shuffles the generated password characters, and changes the array order.
   *
   * @param {string[]} generatedCharacters - The characters to shuffle.
   */
  #shuffleGeneratedCharacters (generatedCharacters) {
    generatedCharacters.sort(() => Math.random() - 0.5)
  }

  /**
   * Returns a random character from a character pool.
   *
   * @param {string} characterPool - The character pool to pick from.
   * @returns {string} A random character from the pool.
   */
  getRandomChar (characterPool) {
    const randomIndex = Math.floor(Math.random() * characterPool.length)
    return characterPool[randomIndex]
  }

  /**
   * Validates that a generated password meets all requirements.
   *
   * @param {string} password - The password to validate.
   * @returns {boolean} True if the password meets all requirements.
   */
  isGeneratedPasswordValid (password) {
    return this.#validator.isValidPassword(password)
  }

  /**
   * Validates the password length.
   *
   * @param {number} length - The length to validate.
   * @throws {Error} If length is null, undefined, not a number, negative, or not finite.
   */
  #validateLength (length) {
    if (length == null) {
      throw new Error('Length cannot be null or undefined')
    }
    if (typeof length !== 'number') {
      throw new Error('Length must be a number')
    }
    if (length < 0) {
      throw new Error('Length cannot be negative')
    }
    if (!Number.isFinite(length)) {
      throw new Error('Length must be a finite number')
    }
  }
}

export { PasswordGenerator }
