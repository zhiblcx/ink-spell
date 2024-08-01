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
}
