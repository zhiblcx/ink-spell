import { MenuEnum } from '../enums'
export class MenuUtils {
  static readonly #MENU_KEY = 'ink_spell_menu'

  static getMenu(): string | null {
    return localStorage.getItem(this.#MENU_KEY)
  }

  static setMenu(menu: MenuEnum): void {
    localStorage.setItem(this.#MENU_KEY, menu)
  }

  static clearMenu(): void {
    localStorage.removeItem(this.#MENU_KEY)
  }
}
