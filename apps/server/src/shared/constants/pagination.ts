export const pageQuery = {
  name: "page",
  type: Number,
  example: 1,
  description: "页码"
}

export const limitQuery = {
  name: "limit",
  type: Number,
  example: 10,
  description: "查询的条目"
}

export const usernameQuery = {
  name: "username",
  type: String,
  required: false,
}

export const bookshelfNameQuery = {
  name: "bookshelfName",
  type: String,
  required: false
}
