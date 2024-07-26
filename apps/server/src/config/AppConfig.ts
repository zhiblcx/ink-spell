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
}

const appConfig = Object.freeze<Readonly<AppConfig>>({
  APP_NAME: 'ink-spell',
  DESCRIPTION: '一个收藏的魔法网站',
  VERSION: '0.0.1',
});

export { appConfig, type AppConfig };
