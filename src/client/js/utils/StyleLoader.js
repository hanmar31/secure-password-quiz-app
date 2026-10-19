/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

/**
 * Loads and applies a CSS stylesheet to a shadow DOM.
 */
class StyleLoader {
  /**
   * Loads the components stylesheet and applies it to the shadow root.
   *
   * @param {ShadowRoot} shadowRoot - The shadow root to apply the stylesheet to.
   * @param {string} importMetaUrl - The URL used to locate the stylesheet.
   * @returns {Promise<void>} A promise that resolves when the stylesheet is applied.
   */
  async applyTo (shadowRoot, importMetaUrl) {
    const url = new URL('./css/styles.css', importMetaUrl)
    const response = await fetch(url)
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(await response.text())
    shadowRoot.adoptedStyleSheets = [sheet]
  }
}

export { StyleLoader }
