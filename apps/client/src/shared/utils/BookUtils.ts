import { Ink } from '../types'
import { UrlUtils } from './UrlUtils'

export class BookUtils {
  static readonly #INK_SPELL_BOOKS = 'ink_spell_books'

  /**
   *
   * @example
   * ```ts
   * JSON.parse(BookUtils.getBooks() ?? '[]')
   * ```
   */
  static getBooks(): string | null {
    return localStorage.getItem(this.#INK_SPELL_BOOKS)
  }

  /**
   *
   * @example
   * ```ts
   *  BookUtils.setBooks(JSON.stringify(Array.from(map)))
   * ```
   */
  static setBooks(books: string) {
    return localStorage.setItem(this.#INK_SPELL_BOOKS, books)
  }

  static clearBooks() {
    localStorage.removeItem(this.#INK_SPELL_BOOKS)
  }

  static redirectToBookPage(book: Ink) {
    const localBooks = JSON.parse(BookUtils.getBooks() ?? '[]')
    let chapter = -1
    if (localBooks.length !== 0) {
      const ink = localBooks.find((item: Array<string>) => {
        return parseInt(item[0]) === book.id
      })
      if (ink !== undefined) {
        chapter = ink[1]
      }
    }
    window.open(
      `/book/${UrlUtils.encodeUrlById(book.id.toString())}?chapter=${chapter != -1 ? UrlUtils.encodeUrlById(chapter.toString()) : UrlUtils.encodeUrlById('1')}`,
      '_blank'
    )
  }
}
