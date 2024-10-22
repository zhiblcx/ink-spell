import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
export const Route = createLazyFileRoute('/404')({
  component: () => <Page />
})

const Page = () => {
  const { t } = useTranslation(['COMMON'])
  return (
    <Result
      className="overflow-hidden"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link to={'/'}>{t('COMMON:back_home')}</Link>
        </Button>
      }
    />
  )
}

export default Page
