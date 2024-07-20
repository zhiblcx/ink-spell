import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/book/$bookId')({
  component: () => <div>Hello /book/$bookId!</div>
})
