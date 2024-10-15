import { deleteBookMarkMutation, insertBookMarkMutation } from '@/features/book'
import { ClickSetupEnum, QueryKeys, Theme } from '@/shared/enums'
import { useActionBookStore, useThemeStore } from '@/shared/store'
import { useQueryClient } from '@tanstack/react-query'
import { BookmarkMinus, BookmarkPlus, List, LucideProps, Settings } from 'lucide-react'
import ThemeToggle from '../../ThemeToggle'
import { SetupTitleEnum } from '../Enums/SetupTitleEnum'

interface IconProps {
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
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
  const { showDirectoryFlag, updateShowSetUpFlag, updateShowDirectoryFlag } = useActionBookStore()
  const { theme } = useThemeStore()
  const queryClient = useQueryClient()
  const queryClientFunction = () => queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOK_MARK_KEY] })

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
        <p>{SetupTitleEnum.CATALOG}</p>
      </li>

      <li className="flex cursor-pointer flex-col items-center space-y-1">
        <ThemeToggle size={28} />
        <p>{theme === Theme.DARK ? SetupTitleEnum.DARK_MODE : SetupTitleEnum.LIGHT_MODE}</p>
      </li>

      <li
        className="flex cursor-pointer flex-col items-center space-y-1"
        onClick={operateBookMark}
      >
        <Icon_28 Icon={!bookmark ? BookmarkPlus : BookmarkMinus} />
        <p>{!bookmark ? SetupTitleEnum.COLLECT_BOOKMARK : SetupTitleEnum.CANCEL_COLLECT_BOOKMARK}</p>
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
        <p>{SetupTitleEnum.SETUP}</p>
      </li>
    </ul>
  )
}
