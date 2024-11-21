export class EmojiUtils {
  static readonly #RECENTLY_EMOJI = "ink_spell_recently_emoji"
  /**
  * @example
  * ```ts
  * EmojiUtils.getRecentlyEmoji().split()
  * ```
  */
  static getRecentlyEmoji() {
    return localStorage.getItem(EmojiUtils.#RECENTLY_EMOJI)
  }

  /**
  * @example
  * ```ts
  * EmojiUtils.setRecentlyEmoji(emojis.join())
  * ```
  */
  static setRecentlyEmoji(emojis: string) {
    localStorage.setItem(EmojiUtils.#RECENTLY_EMOJI, emojis)
  }

  /**
  * @example
  * ```ts
  * EmojiUtils.clearRecentlyEmoji()
  * ```
  */
  static clearRecentlyEmoji() {
    localStorage.removeItem(EmojiUtils.#RECENTLY_EMOJI)
  }
}
