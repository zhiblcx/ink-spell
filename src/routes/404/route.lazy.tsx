import { createLazyFileRoute } from '@tanstack/react-router'
import { Button, Result } from 'antd'
export const Route = createLazyFileRoute('/404')({
  component: () => <Page />
})

const Page = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
)
