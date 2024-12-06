export interface TagDto {
  id?: number
  nameChinese: string,
  nameEnglish: string,
  [key: string]: string | number | undefined
}

export interface TagVo {
  id?: number
  nameChinese: string,
  nameEnglish: string,
  createTimer: string,
  _count: {
    useFrequency: number
  }
  [key: string]: string | number | undefined | Object
}
