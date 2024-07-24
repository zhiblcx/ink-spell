interface dicvalue {
  id: number
  label: string
  dic_id: number
  create_timer: Date
}

export const shelf_value_mock: dicvalue[] = [
  {
    id: 1,
    label: '修仙',
    dic_id: 1,
    create_timer: new Date('2023-01-01 00:00:00')
  },
  {
    id: 2,
    label: '末世',
    dic_id: 1,
    create_timer: new Date('2023-01-01 00:00:00')
  },
  {
    id: 3,
    label: '耽美',
    dic_id: 2,
    create_timer: new Date('2023-01-01 00:00:00')
  }
]
