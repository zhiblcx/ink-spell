export function ErrorPage() {
  const { t } = useTranslation(['COMMON', 'PROMPT'])

  return (
    <Result
      status="500"
      title={t('PROMPT:error_prompt')}
      subTitle={t('PROMPT:contact_admin_prompt')}
      extra={
        <Button type="primary">
          <Link to={'/'}>{t('COMMON:back_home')}</Link>
        </Button>
      }
    />
  )
}
