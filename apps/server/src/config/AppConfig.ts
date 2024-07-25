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

declare const appConfig: Readonly<AppConfig>;

export { appConfig, type AppConfig };
