import i18next from 'i18next'

export const RECOVER = '恢复'
export const IMPORT_BOOK = i18next.t('COMMON:import_book')
export const SHOW_BOOKSHELF = '查看书架'
export const NO_EMAIL_CURRENTLY_AVAILABLE = '暂无邮箱'
export const CUSTOMIZE = '自定义'
export const LANGUAGE = [
  { value: 'Chinese', label: '简体中文' },
  { value: 'English', label: 'English' }
]

export const PERSON_INFO = {
  NAME: i18next.t('AUTH:person_info'),
  URL: '/profile'
}

export const MY_FAVORITES = {
  NAME: i18next.t('COMMON:my_favorites'),
  URL: '/favorites'
}

export const LOGOUT = {
  NAME: i18next.t('AUTH:logout'),
  URL: '/signin'
}

export const ALL_BOOK = {
  NAME: i18next.t('COMMON:all_book'),
  URL: '/'
}

export const MY_FRIEND = {
  NAME: i18next.t('COMMON:my_friend'),
  URL: '/myfriend'
}

export const CHAR_ROOM = {
  NAME: i18next.t('COMMON:chat_room'),
  URL: '/chatroom'
}
