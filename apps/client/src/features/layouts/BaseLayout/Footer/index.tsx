import clsx from 'clsx'
import { CircleX } from 'lucide-react'

function Footer() {
  const { t } = useTranslation(['COMMON', 'PROMPT'])
  const router = useRouter()
  const bookShelfId = router.latestLocation.href.split('/')[2]
  const showFooterReg = /^\/$|^\/bookshelf\/(?!show\/).*$/
  const [modal, contextHolder] = Modal.useModal()
  const { menu } = useMenuStore()
  const {
    cancelFlag,
    allSelectBookFlag,
    showShelfFlag,
    isOtherBookShelfFlag,
    updateCancelFlag,
    updateAllSelectFlag,
    updateDeleteBookFlag,
    updateDeleteShelfFlag,
    updateBookToBookShelfFlag,
    updateModifyBookShelfFlag
  } = useActionBookStore()

  const handlerDeleteBook = () => {
    modal.confirm({
      title: t('COMMON:delete_book'),
      icon: <CircleX className="mr-2 text-red-500" />,
      content: t('PROMPT:confirm_delete_book'),
      okText: t('COMMON:confirm'),
      cancelText: t('COMMON:cancel'),
      maskClosable: true,
      onOk: () => {
        updateDeleteBookFlag(true)
      }
    })
  }

  const handlerDeleteBookShelf = () => {
    modal.confirm({
      title: t('COMMON:delete_bookshelf'),
      icon: <CircleX className="mr-2 text-red-500" />,
      content: t('PROMPT:confirm_delete_bookshelf'),
      okText: t('COMMON:confirm'),
      cancelText: t('COMMON:cancel'),
      maskClosable: true,
      onOk: () => {
        updateDeleteShelfFlag(true)
      }
    })
  }

  return (
    <>
      {!isOtherBookShelfFlag && showFooterReg.test(router.latestLocation.pathname) ? (
        <ul
          className={clsx(
            'absolute bottom-4 flex space-x-3',
            menu === MenuEnum.EXTEND ? 'min-[375px]:flex' : 'min-[375px]:hidden',
            !showShelfFlag && cancelFlag ? 'md:hidden' : 'md:flex'
          )}
        >
          <li
            className="cursor-pointer min-[375px]:hidden md:block"
            onClick={() => {
              updateCancelFlag(!cancelFlag)
            }}
          >
            {showShelfFlag ? t('COMMON:show') + '/' + t('COMMON:hide') : t('COMMON:cancel')}
          </li>

          <li
            className="min-[375px]:auto cursor-pointer md:hidden"
            onClick={() => {
              updateCancelFlag(!cancelFlag)
            }}
          >
            {cancelFlag ? t('COMMON:show') : t('COMMON:hide')}
          </li>

          <li
            className="cursor-pointer"
            onClick={() => {
              updateBookToBookShelfFlag(true)
            }}
          >
            {t('COMMON:add_to_bookshelf')}
          </li>

          {showShelfFlag ? (
            <li
              className="cursor-pointer"
              onClick={() => {
                updateModifyBookShelfFlag(true)
              }}
            >
              {t('COMMON:edit_bookshelf')}
            </li>
          ) : null}

          <li
            className="cursor-pointer"
            onClick={() => {
              updateAllSelectFlag(
                allSelectBookFlag == AllSelectBookEnum.NOT_ALL_SELECT_FLAG
                  ? AllSelectBookEnum.ALL_SELECT_FLAG
                  : AllSelectBookEnum.NOT_ALL_SELECT_FLAG
              )
            }}
          >
            {allSelectBookFlag == AllSelectBookEnum.NOT_ALL_SELECT_FLAG
              ? t('COMMON:deselect_all')
              : t('COMMON:select_all')}
          </li>

          <li
            className="cursor-pointer text-red-500"
            onClick={handlerDeleteBook}
          >
            {t('COMMON:delete')}
          </li>
          {showShelfFlag ? (
            <>
              <li
                className="cursor-pointer text-red-500"
                onClick={handlerDeleteBookShelf}
              >
                {t('COMMON:delete_bookshelf')}
              </li>
              <li
                className="cursor-pointer"
                onClick={() => window.open(`/bookshelf/show/${bookShelfId}`, '_blank')}
              >
                {t('COMMON:view_notes')}
              </li>
            </>
          ) : null}
        </ul>
      ) : null}

      {contextHolder}
    </>
  )
}

export default Footer
