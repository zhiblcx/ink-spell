import { followUserByUserIdMutation } from '@/features/user'
import { User } from '@/shared/types'
import styles from './styles.module.scss'

interface PersonCardType {
  openFlag: boolean
  setOpenFlag: React.Dispatch<React.SetStateAction<boolean>>
  lookUser: User
}

export function PersonCard({ openFlag, lookUser, setOpenFlag }: PersonCardType) {
  const { t } = useTranslation(['COMMON', 'PROMPT'])
  const { mutate: followMutate } = followUserByUserIdMutation()

  return (
    <Modal
      maskClosable
      onCancel={() => {
        setOpenFlag(false)
      }}
      footer={null}
      title={t('COMMON:personal_information')}
      open={openFlag}
    >
      <div className="flex h-[580px] items-center justify-center">
        <div className={styles.card}>
          <div className={styles.imgBx}>
            <img src={import.meta.env.VITE_SERVER_URL + lookUser?.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.details}>
              <h2>
                {lookUser?.username}
                <br />
                <span>{lookUser?.email ?? t('PROMPT:no_email_currently_available')}</span>
              </h2>
              <div className={styles.data}>
                <h3>
                  {lookUser?.books}
                  <br />
                  <span>{t('COMMON:upload_book')}</span>
                </h3>
                <h3>
                  {lookUser?.followers}
                  <br />
                  <span>{t('followers')}</span>
                </h3>
                <h3>
                  {lookUser?.following}
                  <br />
                  <span>{t('COMMON:following')}</span>
                </h3>
              </div>
              <div>
                <Button
                  className="p-5"
                  onClick={() => followMutate(lookUser?.id as number)}
                >
                  {t('COMMON:follow')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
