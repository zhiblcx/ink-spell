import { Resolver } from 'unplugin-auto-import/types';

declare const clientComponentResolver: () => Resolver;

declare const clientEnumsResolver: () => Resolver;

export { clientComponentResolver, clientEnumsResolver };
