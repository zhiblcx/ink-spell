import { Ink } from '../types'
import { UrlUtils } from './UrlUtils'

export class BookUtils {
  static readonly #INK_SPELL_BOOKS = 'ink_spell_books'
  static readonly #INK_SPELL_SETUP = 'ink_spell_setup'
  static readonly #INK_SPELL_READER_BACKGROUND = 'ink_spell_reader_background'

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
   * @example
   * ```ts
   * JSON.parse(BookUtils.getBooks() ?? '[]')
   * ```
   */
  static getSetup(): string {
    if (localStorage.getItem(this.#INK_SPELL_SETUP) === null) {
      return JSON.stringify({ fontSize: 16, brightness: 1, lineHeight: 1.5 })
    }
    return localStorage.getItem(this.#INK_SPELL_SETUP) as string
  }

  /**
   * @example
   * ```ts
   * JSON.parse(BookUtils.getBooks() ?? '[]')
   * ```
   */
  static getReaderBackground(): string | null {
    return localStorage.getItem(this.#INK_SPELL_READER_BACKGROUND)
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

  /**
   * @example
   * ```ts
   * BookUtils.setSetup(JSON.stringify(Array.from(map)))
   * ```
   */
  static setSetup(setup: string) {
    return localStorage.setItem(this.#INK_SPELL_SETUP, setup)
  }

  /**
   * @example
   * ```ts
   * BookUtils.setSetup(JSON.stringify(Array.from(map)))
   * ```
   */
  static setReaderBackground(readerBackground: string) {
    return localStorage.setItem(this.#INK_SPELL_READER_BACKGROUND, readerBackground)
  }

  /**
   * @example
   * ```ts
   * BookUtils.clearBooks()
   * ```
   */
  static clearBooks() {
    localStorage.removeItem(this.#INK_SPELL_BOOKS)
  }

  /**
   * @example
   * ```ts
   * BookUtils.clearSetup()
   * ```
   */
  static clearSetup() {
    localStorage.removeItem(this.#INK_SPELL_SETUP)
  }

  /**
   * @example
   * ```ts
   * BookUtils.clearSetup()
   * ```
   */
  static clearReaderBackground() {
    localStorage.removeItem(this.#INK_SPELL_READER_BACKGROUND)
  }

  /**
   *
   * @param book
   * @example
   * ```ts
   * BookUtils.redirectToBookPage(book)
   * ```
   */
  static redirectToBookPage(book: Ink) {
    const localBooks = JSON.parse(BookUtils.getBooks() ?? '[]')
    let chapter = -1
    if (localBooks.length !== 0) {
      const ink = localBooks.find((item: Array<string>) => parseInt(item[0]) === book.id)
      if (ink !== undefined) {
        chapter = ink[1].currentChapter
      }
    }
    window.open(
      `/book/${UrlUtils.encodeUrlById(book.id.toString())}?chapter=${chapter != -1 ? UrlUtils.encodeUrlById(chapter.toString()) : UrlUtils.encodeUrlById('1')}`,
      '_blank'
    )
  }
}
