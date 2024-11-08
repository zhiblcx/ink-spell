export const Route = createLazyFileRoute('/404')({
  component: () => <Page />
})

const Page = () => {
  const { t } = useTranslation(['COMMON', 'PROMPT'])
  return (
    <Result
      className="overflow-hidden"
      status="404"
      title="404"
      subTitle={t('PROMPT:page_not_found')}
      extra={
        <Button type="primary">
          <Link to={'/'}>{t('COMMON:back_home')}</Link>
        </Button>
      }
    />
  )
}

export default Page
