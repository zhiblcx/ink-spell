interface User {
  id: number
  username: string
  password: string
  email: string
  dic_id: number
}

export const user_mock: User = {
  id: 1,
  username: 'admin',
  password: '123456',
  email: 'admin@163.com',
  dic_id: 1
}
