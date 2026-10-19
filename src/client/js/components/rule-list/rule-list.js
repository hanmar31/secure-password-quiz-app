/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */
import { StyleLoader } from '../../utils/StyleLoader.js'
/**
 * Displays the password rules.
 */
class RuleList extends HTMLElement {
  #rules = []

  /**
   * Creates the component and attaches a shadow DOM.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    new StyleLoader().applyTo(this.shadowRoot, import.meta.url)
  }

  /**
   * Sets the rule list and renders the list.
   *
   * @param {object[]} rules - The rules to show, each with a label and a passed value.
   */
  set rules (rules) {
    this.#rules = rules
    this.#render()
  }

  /**
   * Gets the rules list.
   *
   * @returns {object[]} The rules currently shown.
   */
  get rules () {
    return [...this.#rules]
  }

  /**
   * Draws the rules as a list, replacing what was shown before.
   */
  #render () {
    this.shadowRoot.replaceChildren()
    const ruleList = document.createElement('ul')

    this.#rules.forEach(rule => {
      const li = document.createElement('li')
      li.textContent = `${rule.passed ? '✓' : '✗'} ${rule.label}`
      ruleList.appendChild(li)
    })
    this.shadowRoot.appendChild(ruleList)
  }
}
customElements.define('rule-list', RuleList)
