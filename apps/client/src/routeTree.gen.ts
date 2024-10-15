/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicRouteImport } from './routes/_public/route'
import { Route as BaseRouteImport } from './routes/_base/route'
import { Route as SplatRouteImport } from './routes/$/route'
import { Route as PublicBookBookIdRouteImport } from './routes/_public/book/$bookId/route'

// Create Virtual Routes

const R404RouteLazyImport = createFileRoute('/404')()
const PublicSignupRouteLazyImport = createFileRoute('/_public/signup')()
const PublicSigninRouteLazyImport = createFileRoute('/_public/signin')()
const BaseProfileRouteLazyImport = createFileRoute('/_base/profile')()
const BaseMyfriendRouteLazyImport = createFileRoute('/_base/myfriend')()
const BaseFavoritesRouteLazyImport = createFileRoute('/_base/favorites')()
const BaseChatroomRouteLazyImport = createFileRoute('/_base/chatroom')()
const BaseIndexRouteLazyImport = createFileRoute('/_base/')()
const BaseOtherbookshelfUserIdRouteLazyImport = createFileRoute(
  '/_base/otherbookshelf/$userId',
)()
const BaseBookshelfBookIdRouteLazyImport = createFileRoute(
  '/_base/bookshelf/$bookId',
)()
const BaseBookshelfShowBookShelfIdRouteLazyImport = createFileRoute(
  '/_base/bookshelf/show/$bookShelfId',
)()

// Create/Update Routes

const R404RouteLazyRoute = R404RouteLazyImport.update({
  path: '/404',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/404/route.lazy').then((d) => d.Route))

const PublicRouteRoute = PublicRouteImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/_public/route.lazy').then((d) => d.Route))

const BaseRouteRoute = BaseRouteImport.update({
  id: '/_base',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/_base/route.lazy').then((d) => d.Route))

const SplatRouteRoute = SplatRouteImport.update({
  path: '/$',
  getParentRoute: () => rootRoute,
} as any)

const PublicSignupRouteLazyRoute = PublicSignupRouteLazyImport.update({
  path: '/signup',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() =>
  import('./routes/_public/signup/route.lazy').then((d) => d.Route),
)

const PublicSigninRouteLazyRoute = PublicSigninRouteLazyImport.update({
  path: '/signin',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() =>
  import('./routes/_public/signin/route.lazy').then((d) => d.Route),
)

const BaseProfileRouteLazyRoute = BaseProfileRouteLazyImport.update({
  path: '/profile',
  getParentRoute: () => BaseRouteRoute,
} as any).lazy(() =>
  import('./routes/_base/profile/route.lazy').then((d) => d.Route),
)

const BaseMyfriendRouteLazyRoute = BaseMyfriendRouteLazyImport.update({
  path: '/myfriend',
  getParentRoute: () => BaseRouteRoute,
} as any).lazy(() =>
  import('./routes/_base/myfriend/route.lazy').then((d) => d.Route),
)

const BaseFavoritesRouteLazyRoute = BaseFavoritesRouteLazyImport.update({
  path: '/favorites',
  getParentRoute: () => BaseRouteRoute,
} as any).lazy(() =>
  import('./routes/_base/favorites/route.lazy').then((d) => d.Route),
)

const BaseChatroomRouteLazyRoute = BaseChatroomRouteLazyImport.update({
  path: '/chatroom',
  getParentRoute: () => BaseRouteRoute,
} as any).lazy(() =>
  import('./routes/_base/chatroom/route.lazy').then((d) => d.Route),
)

const BaseIndexRouteLazyRoute = BaseIndexRouteLazyImport.update({
  path: '/',
  getParentRoute: () => BaseRouteRoute,
} as any).lazy(() =>
  import('./routes/_base/index/route.lazy').then((d) => d.Route),
)

const BaseOtherbookshelfUserIdRouteLazyRoute =
  BaseOtherbookshelfUserIdRouteLazyImport.update({
    path: '/otherbookshelf/$userId',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import('./routes/_base/otherbookshelf/$userId/route.lazy').then(
      (d) => d.Route,
    ),
  )

const BaseBookshelfBookIdRouteLazyRoute =
  BaseBookshelfBookIdRouteLazyImport.update({
    path: '/bookshelf/$bookId',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import('./routes/_base/bookshelf/$bookId/route.lazy').then((d) => d.Route),
  )

const PublicBookBookIdRouteRoute = PublicBookBookIdRouteImport.update({
  path: '/book/$bookId',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() =>
  import('./routes/_public/book/$bookId/route.lazy').then((d) => d.Route),
)

const BaseBookshelfShowBookShelfIdRouteLazyRoute =
  BaseBookshelfShowBookShelfIdRouteLazyImport.update({
    path: '/bookshelf/show/$bookShelfId',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import('./routes/_base/bookshelf/show/$bookShelfId/route.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/$': {
      id: '/$'
      path: '/$'
      fullPath: '/$'
      preLoaderRoute: typeof SplatRouteImport
      parentRoute: typeof rootRoute
    }
    '/_base': {
      id: '/_base'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof BaseRouteImport
      parentRoute: typeof rootRoute
    }
    '/_public': {
      id: '/_public'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicRouteImport
      parentRoute: typeof rootRoute
    }
    '/404': {
      id: '/404'
      path: '/404'
      fullPath: '/404'
      preLoaderRoute: typeof R404RouteLazyImport
      parentRoute: typeof rootRoute
    }
    '/_base/': {
      id: '/_base/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof BaseIndexRouteLazyImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/chatroom': {
      id: '/_base/chatroom'
      path: '/chatroom'
      fullPath: '/chatroom'
      preLoaderRoute: typeof BaseChatroomRouteLazyImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/favorites': {
      id: '/_base/favorites'
      path: '/favorites'
      fullPath: '/favorites'
      preLoaderRoute: typeof BaseFavoritesRouteLazyImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/myfriend': {
      id: '/_base/myfriend'
      path: '/myfriend'
      fullPath: '/myfriend'
      preLoaderRoute: typeof BaseMyfriendRouteLazyImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/profile': {
      id: '/_base/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof BaseProfileRouteLazyImport
      parentRoute: typeof BaseRouteImport
    }
    '/_public/signin': {
      id: '/_public/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof PublicSigninRouteLazyImport
      parentRoute: typeof PublicRouteImport
    }
    '/_public/signup': {
      id: '/_public/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof PublicSignupRouteLazyImport
      parentRoute: typeof PublicRouteImport
    }
    '/_public/book/$bookId': {
      id: '/_public/book/$bookId'
      path: '/book/$bookId'
      fullPath: '/book/$bookId'
      preLoaderRoute: typeof PublicBookBookIdRouteImport
      parentRoute: typeof PublicRouteImport
    }
    '/_base/bookshelf/$bookId': {
      id: '/_base/bookshelf/$bookId'
      path: '/bookshelf/$bookId'
      fullPath: '/bookshelf/$bookId'
      preLoaderRoute: typeof BaseBookshelfBookIdRouteLazyImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/otherbookshelf/$userId': {
      id: '/_base/otherbookshelf/$userId'
      path: '/otherbookshelf/$userId'
      fullPath: '/otherbookshelf/$userId'
      preLoaderRoute: typeof BaseOtherbookshelfUserIdRouteLazyImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/bookshelf/show/$bookShelfId': {
      id: '/_base/bookshelf/show/$bookShelfId'
      path: '/bookshelf/show/$bookShelfId'
      fullPath: '/bookshelf/show/$bookShelfId'
      preLoaderRoute: typeof BaseBookshelfShowBookShelfIdRouteLazyImport
      parentRoute: typeof BaseRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  SplatRouteRoute,
  BaseRouteRoute: BaseRouteRoute.addChildren({
    BaseIndexRouteLazyRoute,
    BaseChatroomRouteLazyRoute,
    BaseFavoritesRouteLazyRoute,
    BaseMyfriendRouteLazyRoute,
    BaseProfileRouteLazyRoute,
    BaseBookshelfBookIdRouteLazyRoute,
    BaseOtherbookshelfUserIdRouteLazyRoute,
    BaseBookshelfShowBookShelfIdRouteLazyRoute,
  }),
  PublicRouteRoute: PublicRouteRoute.addChildren({
    PublicSigninRouteLazyRoute,
    PublicSignupRouteLazyRoute,
    PublicBookBookIdRouteRoute,
  }),
  R404RouteLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/$",
        "/_base",
        "/_public",
        "/404"
      ]
    },
    "/$": {
      "filePath": "$/route.tsx"
    },
    "/_base": {
      "filePath": "_base/route.tsx",
      "children": [
        "/_base/",
        "/_base/chatroom",
        "/_base/favorites",
        "/_base/myfriend",
        "/_base/profile",
        "/_base/bookshelf/$bookId",
        "/_base/otherbookshelf/$userId",
        "/_base/bookshelf/show/$bookShelfId"
      ]
    },
    "/_public": {
      "filePath": "_public/route.tsx",
      "children": [
        "/_public/signin",
        "/_public/signup",
        "/_public/book/$bookId"
      ]
    },
    "/404": {
      "filePath": "404/route.lazy.tsx"
    },
    "/_base/": {
      "filePath": "_base/index/route.lazy.tsx",
      "parent": "/_base"
    },
    "/_base/chatroom": {
      "filePath": "_base/chatroom/route.lazy.tsx",
      "parent": "/_base"
    },
    "/_base/favorites": {
      "filePath": "_base/favorites/route.lazy.tsx",
      "parent": "/_base"
    },
    "/_base/myfriend": {
      "filePath": "_base/myfriend/route.lazy.tsx",
      "parent": "/_base"
    },
    "/_base/profile": {
      "filePath": "_base/profile/route.lazy.tsx",
      "parent": "/_base"
    },
    "/_public/signin": {
      "filePath": "_public/signin/route.lazy.tsx",
      "parent": "/_public"
    },
    "/_public/signup": {
      "filePath": "_public/signup/route.lazy.tsx",
      "parent": "/_public"
    },
    "/_public/book/$bookId": {
      "filePath": "_public/book/$bookId/route.tsx",
      "parent": "/_public"
    },
    "/_base/bookshelf/$bookId": {
      "filePath": "_base/bookshelf/$bookId/route.lazy.tsx",
      "parent": "/_base"
    },
    "/_base/otherbookshelf/$userId": {
      "filePath": "_base/otherbookshelf/$userId/route.lazy.tsx",
      "parent": "/_base"
    },
    "/_base/bookshelf/show/$bookShelfId": {
      "filePath": "_base/bookshelf/show/$bookShelfId/route.lazy.tsx",
      "parent": "/_base"
    }
  }
}
ROUTE_MANIFEST_END */
