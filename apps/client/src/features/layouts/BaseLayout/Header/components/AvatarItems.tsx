import {
  LOGOUT,
  MY_FAVORITES,
  PERSON_INFO,
  RECENTLY_READ,
  RESET_PASSWORD,
  REVIEW_BOOKSHELF
} from '@/shared/constants'
import { AuthUtils } from '@/shared/utils'
import type { MenuProps } from 'antd'
import { AnnouncementModal, RecentlyRead, SystemFeedback, SystemRate } from './'
import { ReviewBookshelfModal } from './ReviewBookshelfModal'

interface AvatarItemsType {
  setOpenFlag: React.Dispatch<React.SetStateAction<boolean>>
  avatar: string
}

export function AvatarItems({ setOpenFlag, avatar }: AvatarItemsType) {
  const navigate = useNavigate()
  const { t } = useTranslation(['AUTH', 'COMMON'])
  const [open, setOpen] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [rateOpen, setRateOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [announcementOpen, setAnnouncementOpen] = useState(false)
  const items: MenuProps['items'] = [
    {
      key: 'announcement',
      label: <div onClick={() => setAnnouncementOpen(true)}>{t('COMMON:announcement')}</div>
    },
    {
      key: PERSON_INFO.label,
      label: (
        <div onClick={() => navigate({ to: PERSON_INFO.URL })}>
          {t('COMMON:profile', { context: PERSON_INFO.label })}
        </div>
      )
    },
    {
      key: MY_FAVORITES.label,
      label: (
        <div onClick={() => navigate({ to: MY_FAVORITES.URL })}>
          {t('COMMON:profile', { context: MY_FAVORITES.label })}
        </div>
      )
    },
    {
      key: RECENTLY_READ.label,
      label: (
        <div onClick={() => setOpen(true)}>
          {t('COMMON:profile', { context: RECENTLY_READ.label })}
        </div>
      )
    },
    {
      key: REVIEW_BOOKSHELF.label,
      label: (
        <div onClick={() => setReviewOpen(true)}>
          {t('AUTH:profile', { context: REVIEW_BOOKSHELF.label })}
        </div>
      )
    },
    {
      key: RESET_PASSWORD.label,
      label: (
        <div onClick={() => setOpenFlag(true)}>
          {t('AUTH:profile', { context: RESET_PASSWORD.label })}
        </div>
      )
    },
    {
      key: 'rate',
      label: <div onClick={() => setRateOpen(true)}>{t('COMMON:system_rating')}</div>
    },
    {
      key: 'feedback',
      label: <div onClick={() => setFeedbackOpen(true)}>{t('COMMON:system_feedback')}</div>
    },
    {
      key: LOGOUT.label,
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
    <>
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
      >
        <Avatar
          src={import.meta.env.VITE_SERVER_URL + avatar}
          size={34}
        />
      </Dropdown>

      <AnnouncementModal
        open={announcementOpen}
        setOpen={setAnnouncementOpen}
      />

      <RecentlyRead
        open={open}
        setOpen={setOpen}
      />

      <ReviewBookshelfModal
        open={reviewOpen}
        setOpen={setReviewOpen}
      />

      <SystemFeedback
        open={feedbackOpen}
        setOpen={setFeedbackOpen}
      />

      <SystemRate
        open={rateOpen}
        setOpen={setRateOpen}
      />
    </>
  )
}
