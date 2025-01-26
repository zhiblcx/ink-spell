import { Resolver } from 'unplugin-auto-import/types';

declare const clientComponentResolver: () => Resolver;

declare const clientEnumsResolver: () => Resolver;

declare const clientI18nResolver: () => Resolver;

declare const clientStoreResolver: () => Resolver;

declare const serverNestCommonResolver: () => Resolver;

declare const serverSwaggerResolver: () => Resolver;

export { clientComponentResolver, clientEnumsResolver, clientI18nResolver, clientStoreResolver, serverNestCommonResolver, serverSwaggerResolver };
