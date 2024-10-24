import { LOGOUT, MY_FAVORITES, PERSON_INFO } from '@/shared/constants'
import { AuthUtils } from '@/shared/utils'
import { useNavigate } from '@tanstack/react-router'
import type { MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'

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
      label: <div onClick={() => navigate({ to: PERSON_INFO.URL })}>{t('COMMON:person_info')}</div>
    },
    {
      key: 2,
      label: <div onClick={() => navigate({ to: MY_FAVORITES.URL })}>{t('COMMON:my_favorites')}</div>
    },
    {
      key: 3,
      label: <div onClick={() => setOpenFlag(true)}>{t('AUTH:reset_password')}</div>
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
          {t('AUTH:logout')}
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
