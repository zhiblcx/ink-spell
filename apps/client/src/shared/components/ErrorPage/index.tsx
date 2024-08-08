import { Link } from '@tanstack/react-router'

function ErrorPage() {
  return (
    <Result
      status="500"
      title="啊哦，出错了"
      subTitle="请联系管理员试试吧！"
      extra={
        <Button type="primary">
          <Link to={'/'}>Back Home</Link>
        </Button>
      }
    />
  )
}

export default ErrorPage
