interface AppConfig {
  /**
   * the name of the application
   * @default 'ink-spell''
   */
  APP_NAME: string;

  /**
   * the description of the application
   * @default '一个收藏的魔法网站'
   */
  DESCRIPTION: string;

  /**
   * the version of the application
   * @default '0.0.1'
   */
  VERSION: string;

  /**
   * the default avatar url
   *@default '/static/images/avatar.jpg'
   */
  DEFAULT_AVATAR: string;

  /**
   * the default bookShelf cover url
   * @default '/static/images/cover.png'
   */
  DEFAULT_BOOK_SHELF_COVER;

  /**
   * the default book cover url
   * @default '/static/images/cover.png'
   */
  DEFAULT_BOOK_COVER: string;

  /**
   * the default book cover url
   * @default 'public/cover'
   */
  BOOK_COVER_URL: string;

  /**
   * the default notes url
   * @default 'public/notes'
   */
  DEFAULT_NOTES_URL: string;

  /**
   * the default book file url
   * @default 'public/book_file'
   */
  BOOK_FILE_URL: string;

  /**
   * the max size of cover file
   * @default 500 * 1024
   */
  COVER_MAX_FILE_SIZE: number;

  /**
   * the max size of book file
   * @default 5 * 1024 * 1024
   */
  FILE_MAX_FILE_SIZE: number;

  /**
   * the support suffix of book file
   * @default /\.(txt)$/
   */
  BOOK_FILE_SUFFIX: RegExp;
  /**
   * the support suffix of image file
   * @default /\.(jpg|jpeg|png)$/
   */
  IMAGE_SUPPORT_SUFFIX: RegExp;

  /**
  * the oauth register default avatar download path
  * @default "./public/cover/"
  */
  OAUTH_REGISTER_AVATAR: string;

  /**
  * default password and reset password
  * @default "123456"
  */
  DEFAULT_PASSWORD: string
}

const appConfig = Object.freeze<Readonly<AppConfig>>({
  APP_NAME: 'ink-spell',
  DESCRIPTION: '一个收藏的魔法网站',
  VERSION: '0.0.1',
  DEFAULT_AVATAR: '/static/images/avatar.jpg',
  DEFAULT_BOOK_SHELF_COVER: '/static/images/cover.png',
  DEFAULT_BOOK_COVER: '/static/images/cover.png',
  DEFAULT_NOTES_URL: 'public/notes/',
  BOOK_COVER_URL: 'public/cover',
  BOOK_FILE_URL: 'public/book_file',
  COVER_MAX_FILE_SIZE: 500 * 1024,
  FILE_MAX_FILE_SIZE: 5 * 1024 * 1024,
  BOOK_FILE_SUFFIX: /\.(txt)$/,
  IMAGE_SUPPORT_SUFFIX: /\.(jpg|jpeg|png)$/,
  OAUTH_REGISTER_AVATAR: "./public/cover/",
  DEFAULT_PASSWORD: "123456"
});

export { appConfig, type AppConfig };
