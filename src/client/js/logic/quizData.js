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
  },
  {
    text: 'Which of the following options would take a brute-force tool longer to break?',
    options: [
      { text: 'A short complex password like Tr4r&3 (6 characters with both symbols and numbers)', correct: false, explanation: 'Symbols help, but human-chosen complexity rules usually result in shorter lengths because human brains struggle to remember truly random short strings.' },
      { text: 'A longer passphrase of random words like horse-lollipop-stapler-library(30 characters)', correct: true, explanation: 'Length is actually more important than random symbols. A long passphrase of truly random words provieds randomness, making it mathematically impractical to guess through brute force.' },
      { text: 'Both take the same amount of time because they combine the compexity of both symbols and letters', correct: false, explanation: 'Symbols do not automatically make a password secure if it is short. Computers evaluate total combinations and length scales that numbers faster.' }
    ],
    source: 'NCSC Guidance (Three Random Words) & General Information Theory (Shannon Entropy'
  },
  {
    text: 'Why is reusing the exact same strong password across five different online accounts a major security risk?',
    options: [
      { text: 'It slows down your web browser performance when being logged in to multiple websites at once.', correct: false, explanation: ' Password reuse has no impact on browser loading speeds or network performance.' },
      { text: 'It violates standard HTTPS encryption protocols. ', correct: false, explanation: 'Website encryptions (HTTPS) protects data in transit between your browser and the server, but it cannot protect credentials, if a database is stolen from a compromised backend server.' },
      { text: 'If one website suffers a data breach, attackers can use those credentials to break into your other accounts', correct: true, explanation: 'This is known as credential stuffing. Hackers regularly buy leaked password databases from minor websites and automatically test those exact credentials on major platforms.' }
    ],
    source: 'OWASP Top Ten & Have I Been Pwned (Troy Hunt)'
  },
  {
    text: 'In the context of password generation, what does it mean for a password generator to be cryptographically secure?',
    options: [
      { text: 'It uses a pseudo-random number generator backed by system randomness so that passwords cannot be predicted by an attacker', correct: true, explanation: 'A cryptographically secure system draws on unpredictable sources of system randomness so that even if an attacker knows the algorithm, they cannot forecast what password  will be generated next.' },
      { text: 'It uses rules like requiring at least two uppercase letters and a symbol, making the password more complex.', correct: false, explanation: 'Complexity rules dictate what characters must be used by a human, but they have nothing to do with cryptographic randomness and predictability.' },
      { text: 'It automatically encrypts your password text every time you type it.', correct: false, explanation: 'Hashing happens on a server and is a different thing from random generation' }
    ],
    source: 'OWASP Cryptographic Storage Cheat Sheet'
  },
  {
    text: 'The common rule requiring at least 8 characters and 4 character types (uppercase, lowercase, numbers, and symbols) was widely taught. Is it still considered a secure standard today?',
    options: [
      { text: 'It is not useful today because short minimums and complex rules make users create predictable patterns', correct: true, explanation: 'In practice, this traditional rule trained users to pick weak, easily guessable passwords (like P@ssw0r1 ). Modern security guidelines prioritize length and randomness.' },
      { text: 'It remains the gold standard because symbols make passwords unguessable by computers.', correct: false, explanation: 'While the rule did require 8 characters and 4 types, assuming it is unguessable is an old myth. A predictable 8-character password can be brute-forced in seconds by modern hardware' },
      { text: 'It is useful because it completely guarantees a password can never be hacked.', correct: false, explanation: 'No password can ever be guaranteed to never be hacked. Security is about making cracking time-consuming and expensive' }
    ],
    source: 'NIST Password Guidelines'
  },
  {
    text: 'When creating a secure password, what is one major practice you should always avoid doing?',
    options: [
      { text: 'Use common words or personal details', correct: true, explanation: ' Personal details and common dictionary words are the first thing attackers test. If it can be found on social media or guessed from your life, it is not secure.' },
      { text: 'Use long strings of random letters, numbers, and symbols that do not form a dictionary word or spell out a sentence.', correct: false, explanation: 'Using random, non dictionary strings of characters is actually good practice, because it creates randomness and prevents dictionary attacks.' },
      { text: 'Use a password manager to generate and store a unique, complex string for every single online account you own.', correct: false, explanation: 'Using a password manager to generate and store unique credentials is the standard in todays cybersecurity.It prevents credential reuse and ensures your accounts stay secure even if one site is breached.' }
    ],
    source: 'NCSC Password Guidance'
  },
  {
    text: 'What is one simple way you can add an extra layer of security to your accounts?',
    options: [
      { text: 'Type your password twice whenever you log in to prove you made no typos the first time.', correct: false, explanation: 'Typing the same password twice only checks for typing mistakes during setup; it does not stop unauthorized access if someone steals your credentials.' },
      { text: 'Change your password every single week, adding a new number to the end each time.', correct: false, explanation: 'Changing your password frequently often leads to simple, predictable patterns, especially if you only increment a number at the end. ' },
      { text: 'Use an authenticator app to generate a temporary login code on your phone', correct: true, explanation: 'This is called Two-Factor Authentication (2FA). Even if a password is stolen, attackers still cannot log in without the physical device generating your unique code (making takeover much harder, though phishing remains a risk)' }
    ],
    source: 'NIST guidance & NCSC Password Guidance'
  }
]

export { quizData }
