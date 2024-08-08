import { createLazyFileRoute } from '@tanstack/react-router'
import { Link } from 'lucide-react'

export const Route = createLazyFileRoute('/500')({
  component: () => <Page />
})

const Page = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary">
          <Link to={'/'}>Back Home</Link>
        </Button>
      }
    />
  )
}

export default Page
