import { LanguageEnum } from "../enums/LanguageEnum"

export class LanguageUtils {
  static readonly #LANGUAGE_KEY = 'ink_spell_language'

  /**
  * @example
  * ```ts
  * LanguageUtils.getLanguage() // => string | null
  * ```
  */
  static getLanguage(): string | null {
    return localStorage.getItem(this.#LANGUAGE_KEY)
  }

  /**
  * @example
  * ```ts
  * LanguageUtils.setLanguage("en-US")
  * ```
  */
  static setLanguage(language: LanguageEnum) {
    localStorage.setItem(this.#LANGUAGE_KEY, language)
  }

  /**
  * @example
  * ```ts
  * LanguageUtils.clearLanguage()
  * ```
  */
  static clearLanguage() {
    localStorage.removeItem(this.#LANGUAGE_KEY)
  }
}
