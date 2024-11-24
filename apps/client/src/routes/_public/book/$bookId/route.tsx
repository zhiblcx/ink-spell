export const Route = createFileRoute('/_public/book/$bookId')({
  beforeLoad: async ({ search }) => {
    const flag = (search as { chapter?: number }).chapter !== undefined
    if (!flag) {
      redirect({ to: '/404', throw: true })
    }
  }
})
