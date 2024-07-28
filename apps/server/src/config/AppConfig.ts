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
   *@default '/static/images/avatar.png''
   */
  DEFAULT_AVATAR: string;
}

const appConfig = Object.freeze<Readonly<AppConfig>>({
  APP_NAME: 'ink-spell',
  DESCRIPTION: '一个收藏的魔法网站',
  VERSION: '0.0.1',
  DEFAULT_AVATAR: '/static/images/avatar.png',
});

export { appConfig, type AppConfig };
