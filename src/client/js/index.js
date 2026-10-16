/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

import './components/password-app/index.js'
import './components/quiz-view/index.js'
import { QuizContent } from './logic/QuizContent.js'
import { QuizSession } from '/modules/QuizEngine-module/src/index.js'

const content = new QuizContent()
const session = new QuizSession(content.createQuiz())
document.querySelector('quiz-view').session = session
