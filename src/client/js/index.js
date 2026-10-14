/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

import { PasswordValidator } from '/modules/Password-module/src/index.js'
import { Quiz } from '/modules/QuizEngine-module/src/index.js'
import './components/rule-list/index.js'

const validator = new PasswordValidator()
console.log(validator.getMinimumPasswordLength())

const quiz = new Quiz()
console.log(quiz.getQuestionCount())
