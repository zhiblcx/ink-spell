import { Menu } from '../enums'
export class MenuUtils {
  static readonly #MENU_KEY = 'menu'

  static getMenu(): string | null {
    return localStorage.getItem(this.#MENU_KEY)
  }

  static setMenu(menu: Menu): void {
    localStorage.setItem(this.#MENU_KEY, menu)
  }

  static clearMenu(): void {
    localStorage.removeItem(this.#MENU_KEY)
  }
}
