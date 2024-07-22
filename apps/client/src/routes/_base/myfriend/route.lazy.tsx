import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_base/myfriend')({
  component: () => <div>Hello /_base/myfriend!</div>
})
