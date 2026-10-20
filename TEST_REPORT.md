# Test Report

## Summary

*Briefly describe how you tested your application – manually through its interface, automatically,
or both – clearly enough that someone else could carry out the same tests. What was hardest to
test, and why?*


Answer:
The application was tested manually through its user interface, both locally and on the deployed version, to verify user flows, state transitions, and component behavior across all requirements, alongside automated code style checks via `npm run lint`. To carry out these tests either launch the app locally using `npm start` or launch the deployed application on https://secure-password-quiz-app.onrender.com/.


The hardest aspects to test were verifying random behavior (such as confirming that quiz questions appear in random order across sessions without manual repetition) and testing Shadow DOM Web Components. Because custom components encapsulate their styles and markup inside Shadow DOM, they cannot be queried directly from standard external test scripts without specific DOM traversal helpers. Consequently, logic classes like `RuleChecklist` were tested directly via browser console execution, while UI layout and event coordination were verified through systematic manual test cases. Furthermore, `npm run lint` only checks code syntax and formatting rules, meaning behavioral correctness had to be verified entirely through manual runtime inspection.

## Test Results


| Test case | Requirement | Input | Expected outcome | Actual outcome |
| --------- | ----------- | ----- | ---------------- | -------------- |
| Rule check evaluation| R-1          | Typed a partial password (Passwordddd) into the input field and clicked the *Confirm* button. | The app shows feedback detailing which rules that passed and which failed.   | ✅ As expected.                                                              |
|Password with forbidden spaces  |R-1  |Typed Password 123 (with an embedded space) and clicked Confirm. |The no-spaces rule shows ✗ and no rules after it are shown.|✅ As expected.  |
|Password missing special character  | R-1 |Typed Password123 (missing symbol) and clicked Confirm. | App shows composition rules passing except the symbol requirement. |✅ As expected.  |
|Clearing input text state  | R-1 |Cleared the input text field without clicking Confirm, then clicked Confirm on empty state. |No rules are shown.  |✅ As expected.  |
| Rule compliance & transition prompt          |   R-2          | Typed a password satisfying all composition rules (Password123.) and clicked *Confirm*      | The app confirms the rules are met, reveals that rule compliance does not equal to absolute safety, and shows a *Start the Quiz* button.                |✅ As expected.                |
|Randomized quiz presentation           |  R-3           |Completed rule check, clicked Start Quiz across 5 separate browser launches.       |Quiz presents questions one at a time in randomized order (at least two different first questions across attempts).               | ✅ As expected.               |
|Incorrect quiz answer feedback           |      R-4       |       Clicked a wrong answer option on an active quiz question.|  App displays immediate educational feedback explaining why the choice was wrong and provides the correct answer and explanation.|          ✅ As expected.     |
|Correct quiz answer feedback  | R-4 | Clicked the correct answer option on an active quiz question.|App displays immediate educational feedback confirming the correct choice.  |✅ As expected.  |
| Password generation & validation          |       R-5      |   Clicked the *Generate* button on the generator to create a password, pasted it into the validator, and clicked the *Validate* button   |                  The app first displays the generated password. Then shows the calculated score and strength label from the validation of the generated password.|          ✅ As expected.      |
|Validator generator empty state  | R-5 | Submitted validator with empty generator input or default state.| The app shows the message "Paste the generated password first". | ✅ As expected.  |
|Final safety evaluation           | R-6            |Reached the final question after validating a generated password and selected an option.       |The app asks if the generated password is guaranteed safe and explains why composition scores do not guarantee real-world security.                  |      ✅ As expected.          |


## Known Issues in Third-Party Modules


*List any flaws you found in the other student's module that affected your application, how they
show up, and how you handled them (e.g. a workaround, or a link to an issue you filed in the
module's repository). Write "None found" if there weren't any.*


Answer: The QuizEngine-module manages the question flow and the score, but its question classes do not store or expose explanations, sources, or the correct answer. To handle this without changing the external module, the app keeps its own data in quizData.js, where each answer option has its own text, a correct flag and an explanation. QuizContent builds the module’s Question objects from that data and stores the full data for each question in a Map, using the Question object as the key. When the user answers, quiz-view asks QuizContent for the details of the current question and shows the explanations from there. This means the correct answer exists in two places (in the module’s Question and in the app’s data), which I accept as a boundary between the module and the app, not a bug in the module.


