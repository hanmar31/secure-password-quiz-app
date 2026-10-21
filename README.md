# Secure Password Quiz App


## Live Application
Live App URL: https://secure-password-quiz-app.onrender.com/


## Vision
The Secure Password Quiz App is an interactive educational web application designed to challenge the common misconception that a password is safe because it follows a website's rules. By combining a password rule checker with hands-on quizzes, it teaches users the difference between following a website's rules and a password actually being safe.


## Requirements
- **R-1:** The app should allow the user to type a password and after the user clicks the *Confirm* button, shows step by step which rules the password follows and which rule it still fails.
- **R-2:** The app should give the user a confirmation when a password follows all the rules, revealing that following the rules is not the same as being safe.
- **R-3:** The app should present quiz questions about what makes a password safe, one at a time and in random order.
- **R-4:** When the user answers a quiz question, the app should give immediate feedback explaining why the chosen answer is right or wrong.
- **R-5:** The app should allow the user to generate a password and see its score and strength label.
- **R-6:** After the user has generated a password and seen its score, the app should ask whether the password is guaranteed to be safe, and explain that it is not.


## How to Use the App (For Users)
1. Type a password.
    - Enter a password of your choice into the input field.
2. Confirm the written password.
    - Click the *Confirm* button to see step-by-step feedback on which rules your password follows and which it fails.
3. Take the Quiz.
    - Once your password follows all the rules, transition into the interactive quiz to test your password security knowledge.
4. Generate and Validate.
    - Use the generator to create a password, paste it into the validator, and review its score and strength label.
5. Final Question.
    - Answer the final evaluation question to complete the quiz.


## How to Run Locally (For Developers)


- Node Version: Node.js v18+ recommended.


- Setup Instructions:
    1. Clone the repository:  
        `git clone https://github.com/hanmar31/secure-password-quiz-app.git`
    2. Install dependencies:  
        `npm install`
    3. Start the development/production server:  
        `npm start` or `npm run dev`
    4. Open your browser at:  
        `http://localhost:3000`
    5. Run code linting:  
        `npm run lint`


## Modules & Architecture
-  Password Module: https://github.com/hanmar31/password-module
    - The central core module. The application uses `PasswordValidator` for rule checks and scoring, and `PasswordGenerator` for generating passwords. Module copied at commit hash: a63e850
 
- Quiz Engine Module: https://github.com/TatevikTadevosyan86/Laboration-2-QuizEngine
    - Manages the quiz flow and state. Copied at commit hash: ba648db.
- Integration:
    - Both external modules are copied into `src/modules` as separate, unchanged projects.


## Project Structure
```text
 secure-password-quiz-app/
├── src/
│   ├── client/
│   │   ├── css/                 # Global styling sheets
│   │   ├── js/
│   │   │   ├── components/      # Modular Web Components (password-app, quiz-view, etc.)
│   │   │   ├── logic/           # Domain classes & quiz datasets (RuleChecklist, QuizContent)
│   │   │   └── utils/           # Helper utilities (e.g., StyleLoader)
│   │   └── index.html
│   ├── modules/                 # External decoupled modules
│   │   ├── Password-module/
│   │   └── QuizEngine-module/
│   └── server/
│       └── server.js            # Express backend & static routing
├── package.json
├── README.md
└── TEST_REPORT.md
```


## Quiz Sources & Limitations
- **Sources:** Quiz content and security rationales are grounded in established industry guidelines:
    - **NIST Special Publication 800-63B** (*Digital Identity Guidelines*)
    - **UK National Cyber Security Centre (NCSC)** Password Guidance
    - **OWASP Top Ten** & **OWASP Cryptographic Storage Cheat Sheet**
    - **Have I Been Pwned** breach telemetry.
- **Honest Limitations:**
    - The password generator relies on standard pseudo-random functions (`Math.random()`) and is intended strictly as a demo, not for creating passwords for real accounts.
    - The validator checks static composition rules, not real-world security.
    - The quiz content is designed as an interactive learning aid to promote secure habits.


## Testing & Known Issues
- For detailed test cases, requirement verification, and results see [TEST_REPORT.md](./TEST_REPORT.md)
- Known Issues & Constraints:
    - The Quiz Engine module does not expose explanation strings, requiring the wrapper application to maintain its own decoupled copy of quiz feedback data.
    - The password generator relies on `Math.random()`, which is a standard pseudo-random number generator and is not cryptographically secure. It is intended strictly for educational demonstration purposes rather than generating production-grade, secure credentials.


