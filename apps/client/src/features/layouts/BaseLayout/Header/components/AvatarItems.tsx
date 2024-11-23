import { LOGOUT, MY_FAVORITES, PERSON_INFO } from '@/shared/constants'
import { AuthUtils } from '@/shared/utils'
import type { MenuProps } from 'antd'

interface AvatarItemsType {
  setOpenFlag: React.Dispatch<React.SetStateAction<boolean>>
  avatar: string
}

export function AvatarItems({ setOpenFlag, avatar }: AvatarItemsType) {
  const navigate = useNavigate()
  const { t } = useTranslation(['AUTH', 'COMMON'])
  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div onClick={() => navigate({ to: PERSON_INFO.URL })}>
          {t('COMMON:profile', { context: PERSON_INFO.label })}
        </div>
      )
    },
    {
      key: 2,
      label: (
        <div onClick={() => navigate({ to: MY_FAVORITES.URL })}>
          {t('COMMON:profile', { context: MY_FAVORITES.label })}
        </div>
      )
    },
    {
      key: 3,
      label: <div onClick={() => setOpenFlag(true)}>{t('AUTH:profile_reset_password')}</div>
    },
    {
      key: 4,
      label: (
        <div
          onClick={() => {
            AuthUtils.clearAccessToken()
            AuthUtils.clearFreshToken()
            navigate({ to: LOGOUT.URL, replace: true })
          }}
        >
          {t('AUTH:profile', { context: LOGOUT.label })}
        </div>
      )
    }
  ]
  return (
    <Dropdown
      menu={{ items }}
      placement="bottomLeft"
    >
      <Avatar
        src={import.meta.env.VITE_SERVER_URL + avatar}
        size={34}
      />
    </Dropdown>
  )
}
