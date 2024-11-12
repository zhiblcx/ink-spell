import { Resolver } from 'unplugin-auto-import/types';

declare const clientComponentResolver: () => Resolver;

declare const clientEnumsResolver: () => Resolver;

declare const clientI18nResolver: () => Resolver;

declare const adminIconsResolver: () => Resolver;

export { adminIconsResolver, clientComponentResolver, clientEnumsResolver, clientI18nResolver };
