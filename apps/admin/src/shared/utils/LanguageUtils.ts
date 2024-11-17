import { LanguageEnum } from "../enums/LanguageEnum"

export class LanguageUtils {
  static readonly #INK_SPELL_ADMIN_LANGUAGE_KEY = "ink_spell_admin_language_key"

  /**
  * @example
  * ```ts
  * LanguageUtils.getLanguage() // => string | null
  * ```
  */
  static getLanguage() {
    localStorage.getItem(this.#INK_SPELL_ADMIN_LANGUAGE_KEY)
  }

  /**
  * @example
  * ```ts
  * LanguageUtils.setLanguage("English")
  * ```
  */
  static setLanguage(language: LanguageEnum) {
    localStorage.setItem(this.#INK_SPELL_ADMIN_LANGUAGE_KEY, language)
  }

  /**
  * @example
  * ```ts
  * LanguageUtils.clearLanguage()
  * ```
  */
  static clearLanguage() {
    localStorage.removeItem(this.#INK_SPELL_ADMIN_LANGUAGE_KEY)
  }
}
