/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

const quizData = [
  {
    text: 'Consider a password like P@ssword12. It is 10 characters long, contains lowercase letters, uppercase letters, a number and a symbol. Does that mean this password is safe and secure?',
    options: [
      { text: 'Yes, because it satisfies every standard complexity rule enforced by websites.', correct: false, explanation: 'Following the rules shows you did what the site asked, not that the password is hard to guess. Automated cracking tools can still crack it.' },
      { text: 'No, because it relies on predictable patterns and common words that hackers expect.', correct: true, explanation: 'Basic rule compliance only proves you followed instructions, not that the password is strong. Attackers use dictionaries enriched with common substitutions, so P@ssword12 is among the first guesses attackers will try.' },
      { text: 'Yes, the password is safe and secure as long as it is changed every 30 days.', correct: false, explanation: 'Current NIST guidance advises against forced periodic changes, as frequent resets often lead users to pick weaker, slightly modified variations of their old password.' }
    ],
    source: 'NIST Special Publication 800-63B & NCSC Password Guidance.'
  }
]

export { quizData }
