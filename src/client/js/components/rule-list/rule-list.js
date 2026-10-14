/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

/**
 * Displays the password rules.
 */
class RuleList extends HTMLElement {
  /**
   * Creates the component and attaches a shadow DOM.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }
}
customElements.define('rule-list', RuleList)
