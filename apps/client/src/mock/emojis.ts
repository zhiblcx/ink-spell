
export type emojisType = {
  type: string,
  data: emojiType[]
}

export type emojiType = {
  id: number,
  emoji: string
}

export const emojis: emojisType[] =
  [
    // 笑脸
    {
      type: "smiley",
      data: [
        { id: 1, emoji: '😀' }, { id: 2, emoji: '😄' },
        { id: 3, emoji: '😁' }, { id: 4, emoji: '😆' },
        { id: 5, emoji: '😅' }, { id: 6, emoji: '🤣' },
        { id: 7, emoji: '😂' }, { id: 8, emoji: '🙂' },
        { id: 9, emoji: '🙃' }, { id: 10, emoji: '😉' },
        { id: 11, emoji: '😊' }, { id: 12, emoji: '😇' },
        { id: 13, emoji: '🙁' }, { id: 14, emoji: '😮' },
        { id: 15, emoji: '😲' }, { id: 16, emoji: '😳' },
        { id: 17, emoji: '🥺' }, { id: 18, emoji: '😨' },
        { id: 19, emoji: '😰' }, { id: 20, emoji: '😭' },
        { id: 21, emoji: '😱' }, { id: 22, emoji: '😖' },
        { id: 23, emoji: '😩' }, { id: 24, emoji: '😫' },
        { id: 25, emoji: '😤' }, { id: 26, emoji: '🙄' },
        { id: 27, emoji: '🥰' }, { id: 28, emoji: '😍' },
        { id: 29, emoji: '🤩' }, { id: 30, emoji: '😗' },
        { id: 31, emoji: '😋' }, { id: 32, emoji: '🤪' },
        { id: 33, emoji: '😝' }, { id: 34, emoji: '🤗' },
        { id: 35, emoji: '🤔' }, { id: 36, emoji: '🤓' },
        { id: 37, emoji: '😎' }, { id: 38, emoji: '🤮' },
        { id: 39, emoji: '🤠' }, { id: 40, emoji: '🤑' },
        { id: 41, emoji: '😡' }, { id: 42, emoji: '😈' },
        { id: 43, emoji: '👿' }, { id: 44, emoji: '💀' },
        { id: 45, emoji: '☠' }, { id: 46, emoji: '💩' },
        { id: 47, emoji: '🤡' }, { id: 48, emoji: '👹' },
        { id: 49, emoji: '👻' }, { id: 50, emoji: '👽' },
        { id: 51, emoji: '👾' }, { id: 52, emoji: '🤖' },
        { id: 53, emoji: '💖' }, { id: 54, emoji: '💗' },
        { id: 55, emoji: '💯' }, { id: 56, emoji: '💢' },
      ]
    },
    // 动物与自然
    {
      type: "animals_and_nature",
      data: [
        { id: 1, emoji: '🐥' }, { id: 2, emoji: '🐣' },
        { id: 3, emoji: '🦆' }, { id: 4, emoji: '🦅' },
        { id: 5, emoji: '🦉' }, { id: 6, emoji: '🐺' },
        { id: 7, emoji: '🐗' }, { id: 8, emoji: '😺' },
        { id: 9, emoji: '😽' }, { id: 10, emoji: '🐵' },
        { id: 11, emoji: '🙈' }, { id: 12, emoji: '🙉' },
        { id: 13, emoji: '🙊' }, { id: 14, emoji: '🐶' },
        { id: 15, emoji: '🐷' }, { id: 16, emoji: '🐮' },
        { id: 17, emoji: '🦄' }, { id: 18, emoji: '🐍' },
        { id: 19, emoji: '🐢' }, { id: 20, emoji: '🦎' },
        { id: 21, emoji: '🦖' }, { id: 22, emoji: '🐊' },
        { id: 23, emoji: '🦀' }, { id: 24, emoji: '🦞' },
        { id: 25, emoji: '🐎' }, { id: 26, emoji: '🐇' },
        { id: 27, emoji: '🐕' }, { id: 28, emoji: '🐀' },
        { id: 29, emoji: '🐾' }, { id: 30, emoji: '🎄' },
        { id: 31, emoji: '🍀' }, { id: 32, emoji: '🍁' },
        { id: 33, emoji: '🌷' }, { id: 34, emoji: '🌼' },
        { id: 35, emoji: '🌻' }, { id: 36, emoji: '🌞' },
        { id: 37, emoji: '🌝' }, { id: 38, emoji: '🌚' },
        { id: 39, emoji: '☀️' }, { id: 40, emoji: '✨' },
        { id: 41, emoji: '🌈' }, { id: 42, emoji: '🔥' },
        { id: 43, emoji: '⛄️' }, { id: 44, emoji: '❄️' },
        { id: 45, emoji: '💦' }, { id: 46, emoji: '🌊' },
      ]
    },
    // 食物与饮料
    {
      type: "food_and_drink",
      data: [
        { id: 1, emoji: '🍏' }, { id: 2, emoji: '🍎' },
        { id: 3, emoji: '🍐' }, { id: 4, emoji: '🍊' },
        { id: 5, emoji: '🍋' }, { id: 6, emoji: '🍌' },
        { id: 7, emoji: '🍉' }, { id: 8, emoji: '🍇' },
        { id: 9, emoji: '🍓' }, { id: 10, emoji: '🍈' },
        { id: 11, emoji: '🍒' }, { id: 12, emoji: '🍑' },
        { id: 13, emoji: '🍍' }, { id: 14, emoji: '🥭' },
        { id: 15, emoji: '🍅' }, { id: 16, emoji: '🍆' },
        { id: 17, emoji: '🥑' }, { id: 18, emoji: '🥝' },
        { id: 19, emoji: '🥦' }, { id: 20, emoji: '🌽' },
        { id: 21, emoji: '🥕' }, { id: 22, emoji: '🥔' },
        { id: 23, emoji: '🧀' }, { id: 24, emoji: '🍞' },
        { id: 25, emoji: '🍳' }, { id: 26, emoji: '🥩' },
        { id: 27, emoji: '🍗' }, { id: 28, emoji: '🍖' },
        { id: 29, emoji: '🦴' }, { id: 30, emoji: '🌭' },
        { id: 31, emoji: '🍔' }, { id: 32, emoji: '🍟' },
        { id: 33, emoji: '🍕' }, { id: 34, emoji: '🧆' },
        { id: 35, emoji: '🌮' }, { id: 36, emoji: '🌯' },
        { id: 37, emoji: '🥗' }, { id: 38, emoji: '🍜' },
        { id: 39, emoji: '🍛' }, { id: 40, emoji: '🍣' },
        { id: 41, emoji: '🍱' }, { id: 42, emoji: '🍚' },
        { id: 43, emoji: '🍢' }, { id: 44, emoji: '🍡' },
        { id: 45, emoji: '🍧' }, { id: 46, emoji: '🍭' },
        { id: 47, emoji: '🍰' }, { id: 48, emoji: '🧃' },
        { id: 49, emoji: '🥤' }, { id: 50, emoji: '☕️' },
        { id: 51, emoji: '🍼' }, { id: 52, emoji: '🥂' },
        { id: 53, emoji: '🍴' }, { id: 54, emoji: '🍽' },
        { id: 55, emoji: '🥢' },
      ]
    },
    // 手势和身体部位
    {
      type: "gestures_and_body_parts",
      data: [
        { id: 1, emoji: '👀' }, { id: 2, emoji: '👁' },
        { id: 3, emoji: '👅' }, { id: 4, emoji: '👋' },
        { id: 5, emoji: '👌' }, { id: 6, emoji: '🤏' },
        { id: 7, emoji: '✌' }, { id: 8, emoji: '🤙' },
        { id: 9, emoji: '👏' }, { id: 10, emoji: '👊' },
        { id: 11, emoji: '👍' }, { id: 12, emoji: '🤝' },
        { id: 13, emoji: '✍️' }, { id: 14, emoji: '🙏' },
        { id: 15, emoji: '🙌' }, { id: 16, emoji: '🤳' },
        { id: 17, emoji: '🤴' }, { id: 18, emoji: '👸' },
        { id: 19, emoji: '👳' }, { id: 20, emoji: '🧙' },
        { id: 21, emoji: '🧚' }, { id: 22, emoji: '🧚‍♂️' },
        { id: 23, emoji: '🧝' }, { id: 24, emoji: '🧜' },
        { id: 25, emoji: '🧞' }, { id: 26, emoji: '🧟' },
        { id: 27, emoji: '🚶' }, { id: 28, emoji: '🧎' },
        { id: 29, emoji: '🏃' }, { id: 30, emoji: '🛀🏻' },
        { id: 31, emoji: '🛌🏻' }, { id: 32, emoji: '🤦🏻‍♀️' },
        { id: 33, emoji: '🤦🏻‍♂️' }, { id: 34, emoji: '🙍🏻‍♀️' },
        { id: 35, emoji: '🙍🏻‍♂️' }, { id: 36, emoji: '💃🏻' },
        { id: 37, emoji: '🕺🏻' }, { id: 38, emoji: '👭' },
        { id: 39, emoji: '👫' }, { id: 40, emoji: '👬' },
        { id: 41, emoji: '👨‍👨‍👦' }, { id: 42, emoji: '👩‍👩‍👧' },
        { id: 43, emoji: '👨‍👩‍👧‍👦' }
      ]
    }
  ]


