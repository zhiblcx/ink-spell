import { deleteBookMarkMutation, insertBookMarkMutation } from '@/features/book'
import { BookmarkMinus, BookmarkPlus, List, LucideProps, Settings } from 'lucide-react'
import { ClickSetupEnum } from '../enums/ClickSetupEnum'

interface IconProps {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
}

function Icon_28({ Icon }: IconProps) {
  return <Icon size={28} />
}

interface SetupButtomProps {
  bookId: number
  encodeChapter: number
  clickSetUp: ClickSetupEnum
  setClickSetUp: React.Dispatch<React.SetStateAction<ClickSetupEnum>>
  bookmark: boolean
  setBookMark: React.Dispatch<React.SetStateAction<boolean>>
}

export function SetupBottom({
  bookId,
  encodeChapter,
  clickSetUp,
  setClickSetUp,
  bookmark,
  setBookMark
}: SetupButtomProps) {
  const { t } = useTranslation(['COMMON'])
  const { showDirectoryFlag, updateShowSetUpFlag, updateShowDirectoryFlag } = useActionBookStore()
  const { theme } = useThemeStore()
  const queryClient = useQueryClient()
  const queryClientFunction = () =>
    queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.BOOK_MARK_KEY] })

  const { mutate: collectBookMarkMutation } = insertBookMarkMutation(queryClientFunction)
  const { mutate: cancelCollectBookMarkMutation } = deleteBookMarkMutation(queryClientFunction)

  const operateBookMark = () => {
    if (bookmark) {
      // 取消书签
      cancelCollectBookMarkMutation({ bookId, chapter: encodeChapter })
      setBookMark(false)
    } else {
      // 添加书签
      collectBookMarkMutation({ bookId, chapter: encodeChapter })
      setBookMark(true)
    }
  }

  return (
    <ul className="flex justify-around text-xs">
      <li
        className="flex cursor-pointer flex-col items-center space-y-1"
        onClick={() => {
          updateShowDirectoryFlag(!showDirectoryFlag)
          updateShowSetUpFlag(false)
        }}
      >
        <Icon_28 Icon={List} />
        <p>{t('COMMON:catalog')}</p>
      </li>
      <li className="flex cursor-pointer flex-col items-center space-y-1">
        <ThemeToggle size={28} />
        <p>{theme === ThemeEnum.DARK ? t('COMMON:light_mode') : t('COMMON:dark_mode')} </p>
      </li>
      <li
        className="flex cursor-pointer flex-col items-center space-y-1"
        onClick={operateBookMark}
      >
        <Icon_28 Icon={!bookmark ? BookmarkPlus : BookmarkMinus} />
        <p>{!bookmark ? t('COMMON:add_bookmark') : t('COMMON:remove_bookmark')}</p>
      </li>
      <li
        className="flex cursor-pointer flex-col items-center space-y-1"
        onClick={() =>
          clickSetUp === ClickSetupEnum.DEFAULT
            ? setClickSetUp(ClickSetupEnum.SETUP)
            : setClickSetUp(ClickSetupEnum.DEFAULT)
        }
      >
        <Icon_28 Icon={Settings} />
        <p>{t('COMMON:settings')}</p>
      </li>
    </ul>
  )
}
