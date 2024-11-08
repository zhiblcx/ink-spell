import { Resolver } from 'unplugin-auto-import/types';

declare const clientComponentResolver: () => Resolver;

declare const clientEnumsResolver: () => Resolver;

declare const clientI18nResolver: () => Resolver;

export { clientComponentResolver, clientEnumsResolver, clientI18nResolver };
