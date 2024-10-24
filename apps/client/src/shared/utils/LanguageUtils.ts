import { LanguageEnums } from '../enums'
export class LanguageUtils {
  static readonly #LANGUAGE_KEY = 'ink_spell_language'

  static getLanguage(): string | null {
    return localStorage.getItem(this.#LANGUAGE_KEY)
  }

  static setLanguage(language: LanguageEnums): void {
    localStorage.setItem(this.#LANGUAGE_KEY, language)
  }

  static clearLanguage(): void {
    localStorage.removeItem(this.#LANGUAGE_KEY)
  }
}
