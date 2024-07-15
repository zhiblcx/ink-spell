import { createFileRoute } from '@tanstack/react-router'
import App from '@/features/layouts/App'

export const Route = createFileRoute('/')({
  component: () => <App />
})
