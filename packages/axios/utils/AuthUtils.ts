export class AuthUtils {
  static readonly #ACCESS_TOKEN_KEY = 'ink_spell_access_token'
  static readonly #REFRESH_TOKEN_KEY = 'ink_spell_refresh_token'
  static readonly #REMEMBER_ACCOUNT_DATA = 'ink_spell_remember_account_data'

  static getAccessToken(): string | null {
    return localStorage.getItem(this.#ACCESS_TOKEN_KEY)
  }

  static setAccessToken(access_token: string): void {
    localStorage.setItem(this.#ACCESS_TOKEN_KEY, access_token)
  }

  static clearAccessToken(): void {
    localStorage.removeItem(this.#ACCESS_TOKEN_KEY)
  }

  static getFreshToken(): string | null {
    return localStorage.getItem(this.#REFRESH_TOKEN_KEY)
  }

  static setFreshToken(refresh_token: string): void {
    localStorage.setItem(this.#REFRESH_TOKEN_KEY, refresh_token)
  }

  static clearFreshToken(): void {
    localStorage.removeItem(this.#REFRESH_TOKEN_KEY)
  }

  /**
   *
   * @example
   * ```ts
   * JSON.parse(AuthUtils.getRememberAccountData() ?? 'null')
   * ```
   */
  static getRememberAccountData(): string | null {
    return localStorage.getItem(this.#REMEMBER_ACCOUNT_DATA)
  }

  /**
   *
   * @example
   * ```ts
   * AuthUtils.setRememberAccountData(JSON.stringify({
   * account: 'user',
   * password: 'password'
   *  }))
   * ```
   */
  static setRememberAccountData(data: string): void {
    localStorage.setItem(this.#REMEMBER_ACCOUNT_DATA, data)
  }

  static clearRememberAccountData(): void {
    localStorage.removeItem(this.#REMEMBER_ACCOUNT_DATA)
  }
}
