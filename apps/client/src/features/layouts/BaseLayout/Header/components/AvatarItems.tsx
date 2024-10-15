import { LOGOUT, MY_FAVORITES, PERSON_INFO, RESET_PASSWORD } from '@/shared/constants'
import { AuthUtils } from '@/shared/utils'
import { useNavigate } from '@tanstack/react-router'
import type { MenuProps } from 'antd'

interface AvatarItemsType {
  setOpenFlag: React.Dispatch<React.SetStateAction<boolean>>
  avatar: string
}

export function AvatarItems({ setOpenFlag, avatar }: AvatarItemsType) {
  const navigate = useNavigate()
  const items: MenuProps['items'] = [
    {
      key: 1,
      label: <div onClick={() => navigate({ to: PERSON_INFO.URL })}>{PERSON_INFO.NAME}</div>
    },
    {
      key: 2,
      label: <div onClick={() => navigate({ to: PERSON_INFO.URL })}>{MY_FAVORITES.NAME}</div>
    },
    {
      key: 3,
      label: <div onClick={() => setOpenFlag(true)}>{RESET_PASSWORD}</div>
    },
    {
      key: 4,
      label: (
        <div
          onClick={() => {
            AuthUtils.clearToken()
            navigate({ to: LOGOUT.URL, replace: true })
          }}
        >
          {LOGOUT.NAME}
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
