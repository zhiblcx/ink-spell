import { ALL_BOOK, CHAR_ROOM, MY_FRIEND } from '@/shared/constants'
import { BookText, Bot, Users } from 'lucide-react'

export const menuList = [
  {
    label: ALL_BOOK.URL,
    value: ALL_BOOK.NAME,
    Icon: BookText
  },
  {
    label: MY_FRIEND.URL,
    value: MY_FRIEND.NAME,
    Icon: Users
  },
  {
    label: CHAR_ROOM.URL,
    value: CHAR_ROOM.NAME,
    Icon: Bot
  }
]
