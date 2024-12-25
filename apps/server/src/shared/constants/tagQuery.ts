export const nameChineseQuery = {
  type: String,
  example: "重生",
  description: "中文标签",
  name: "nameChinese",
  required: false
}

export const nameEnglishQuery = {
  type: String,
  example: "time loop",
  description: "英文标签",
  name: "nameEnglish",
  required: false
}

export const tagsIdQuery = {
  type: String,
  example: "1,2,3",
  description: "标签id",
  name: "tagsId",
  required: false
}

export const nameChineseArrayQuery = {
  type: Array<string>,
  example: "['重生']",
  description: "中文标签",
  name: "nameChinese",
  required: false
}


export const nameEnglishArrayQuery = {
  type: Array<string>,
  example: "['time loop']",
  description: "英文标签",
  name: "nameEnglish",
  required: false
}


export const bookshelfNameQuery = {
  type: String,
  example: "重生那些事",
  description: "书架名",
  name: "bookshelfName",
  required: false
}
