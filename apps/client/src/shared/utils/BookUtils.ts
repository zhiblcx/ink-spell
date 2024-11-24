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
   * JSON.parse(BookUtils.getReaderBackground() ?? '[]')
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
    * 创建阅读书籍信息
    * @param {number} bookId - 书籍的唯一标识符。
    * @param {{ currentChapter: number, allChapter: number, page?: string | null }} options - 包含书籍信息的对象。
    * @example
    * ```ts
    *  BookUtils.createBookById(bookId,{ currentChapter, allChapter, page })
    * ```
    */
  static createBookById(bookId: number,
    { currentChapter, allChapter, page }:
      { currentChapter: number, allChapter: number, page?: string | null }) {
    const localBooks = JSON.parse(BookUtils.getBooks() ?? '[]')

    const localBook = new Map()
    localBook.set(bookId, {
      currentChapter: currentChapter + 1,
      allChapter: allChapter,
      page: page === undefined ? page : null
    })

    localBooks.push(...Array.from(localBook))
    BookUtils.setBooks(JSON.stringify(localBooks))
  }

  /**
   * 更新阅读书籍信息
   * @param {number} bookId - 书籍的唯一标识符。
   * @param {{ currentChapter: number, allChapter: number, page?: string | null }} options - 包含书籍信息的对象。
   * @example
   * ```ts
   *  BookUtils.updateBooksById(bookId,{ currentChapter, allChapter, page})
   * ```
   */
  static updateBooksById(bookId: number,
    { currentChapter, allChapter, page }:
      { currentChapter?: string, allChapter?: string, page?: string | null }) {
    const localBooks = JSON.parse(BookUtils.getBooks() ?? '[]')
    const localBookIndex = localBooks.findIndex(
      (item: Array<string>) => parseInt(item[0]) == bookId
    )

    if (localBookIndex != -1) {
      if (currentChapter != undefined) {
        localBooks[localBookIndex][1]['currentChapter'] = currentChapter
      }

      if (allChapter != undefined) {
        localBooks[localBookIndex][1]['allChapter'] = allChapter
      }

      if (page !== undefined) {
        localBooks[localBookIndex][1]['page'] = page
      }

      BookUtils.setBooks(JSON.stringify(localBooks))
    }
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
   * BookUtils.setReaderBackground(JSON.stringify(Array.from(map)))
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
   * BookUtils.clearReaderBackground()
   * ```
   */
  static clearReaderBackground() {
    localStorage.removeItem(this.#INK_SPELL_READER_BACKGROUND)
  }

  /**
   * 打开相对应的书籍页面
   * @param {Ink} book - 书籍信息
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

  /**
  * 获取书籍的阅读进度
  * @param {number} id - 书籍的唯一标识符。
  * @example
  * ```ts
  * BookUtils.acquireBookSchedule(id)
  * ```
  */
  static acquireBookSchedule(id: number) {
    const localBooks = JSON.parse(BookUtils.getBooks() ?? '[]')
    const history = localBooks.find((i: Array<number>) => i[0] == id)
    return history
      ? ((history[1].currentChapter / history[1].allChapter) * 100).toFixed(1) + '%'
      : '0.0%'
  }
}
