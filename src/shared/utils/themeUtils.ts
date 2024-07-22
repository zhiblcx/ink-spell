import { Theme } from '../enums'
export class ThemeUtils {
  static readonly #THEME_KEY = 'theme'

  static getTheme(): string | null {
    return localStorage.getItem(this.#THEME_KEY)
  }

  static setTheme(theme: Theme): void {
    localStorage.setItem(this.#THEME_KEY, theme)
  }

  static clearTheme(): void {
    localStorage.removeItem(this.#THEME_KEY)
  }

  static changeTheme(theme: Theme) {
    if (theme === Theme.DARK || theme === Theme.LIGHT) {
      document.documentElement.setAttribute('data-theme', theme)
      ThemeUtils.setTheme(theme)
    }
    if (theme === Theme.DARK) {
      document.documentElement.classList.add(Theme.DARK)
    } else if (theme === Theme.LIGHT) {
      document.documentElement.classList.remove(Theme.DARK)
    }
  }
}
