import { ThemeEnum } from '../enums'
export class ThemeUtils {
  static readonly #THEME_KEY = 'ink_spell_theme'

  /**
   * @example
   * ```ts
   * ThemeUtils.getTheme() // => 'dark' | 'light' | null
   * ```
   */
  static getTheme(): string | null {
    return localStorage.getItem(this.#THEME_KEY)
  }

  /**
   * @example
   * ```ts
   * ThemeUtils.setTheme(theme) // => 'dark' | 'light'
   * ```
   */
  static setTheme(theme: ThemeEnum): void {
    localStorage.setItem(this.#THEME_KEY, theme)
  }

  /**
  * @example
  * ```ts
  * ThemeUtils.clearTheme()
  * ```
  */
  static clearTheme(): void {
    localStorage.removeItem(this.#THEME_KEY)
  }

  /**
  * @example
  * ```ts
  * ThemeUtils.changeTheme(theme) // => 'dark' | 'light'
  * ```
  */
  static changeTheme(theme: ThemeEnum) {
    if (theme === ThemeEnum.DARK || theme === ThemeEnum.LIGHT) {
      document.documentElement.setAttribute('data-theme', theme)
      this.setTheme(theme)
    }
    if (theme === ThemeEnum.DARK) {
      document.documentElement.classList.add(ThemeEnum.DARK)
    } else if (theme === ThemeEnum.LIGHT) {
      document.documentElement.classList.remove(ThemeEnum.DARK)
    }
  }
}
