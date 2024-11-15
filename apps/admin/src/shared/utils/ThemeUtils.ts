import { ThemeEnum } from "../enums/ThemeEnum";

export class ThemeUtils {
  static readonly #THEME_ADMIN_KEY = "ink_spell_admin_theme"


  /**
  * @example
  * ```ts
  * ThemeUtils.getTheme() // => 'dark' | 'light' | null
  * ```
  */
  static getTheme(): string | null {
    return localStorage.getItem(this.#THEME_ADMIN_KEY)
  }

  /**
  * @example
  * ```ts
  * ThemeUtils.setTheme(theme) // =>  'dark' | 'light'
  * ```
  */
  static setTheme(theme: ThemeEnum) {
    localStorage.setItem(this.#THEME_ADMIN_KEY, theme)
  }

  /**
  * @example
  * ```ts
  * ThemeUtils.clearTheme()
  * ```
  */
  static clearTheme() {
    localStorage.removeItem(this.#THEME_ADMIN_KEY)
  }
}
