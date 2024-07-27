export class AuthUtils {
  static readonly #TOKEN_KEY = 'token'
  static readonly #REMEMBER_ACCOUNT_DATA = 'remember_account_data'
  static getToken(): string | null {
    return localStorage.getItem(this.#TOKEN_KEY)
  }

  static setToken(token: string): void {
    localStorage.setItem(this.#TOKEN_KEY, token)
  }

  static clearToken(): void {
    localStorage.removeItem(this.#TOKEN_KEY)
  }

  /**
   *
   * @example
   * ```ts
   * JSON.parse(AuthUtils.getRememberAccountData() ?? '')
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
