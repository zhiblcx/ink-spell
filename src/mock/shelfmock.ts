interface dictype {
  id: number
  type: string
  type_name: string
  create_timer: string
}

interface dicvalue {
  id: number
  label: string
  value?: string
  dic_id: number
  create_timer: string
}

export const shelf_type_mock: dictype[] = [
  {
    id: 1,
    type: 'shelf',
    type_name: '我的书架',
    create_timer: '2023-01-01 00:00:00'
  },
  {
    id: 2,
    type: 'shelf',
    type_name: '别人的书架',
    create_timer: '2023-01-01 00:00:00'
  }
]

export const shelf_value_mock: dicvalue[] = [
  {
    id: 1,
    label: '修仙',
    dic_id: 1,
    create_timer: '2023-01-01 00:00:00'
  },
  {
    id: 2,
    label: '末世',
    dic_id: 1,
    create_timer: '2023-01-01 00:00:00'
  },
  {
    id: 3,
    label: '耽美',
    dic_id: 2,
    create_timer: '2023-01-01 00:00:00'
  }
]
