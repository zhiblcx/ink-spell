import { EmojiUtils } from "@/shared/utils";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type EmojiStoreType = {
  emojis: string[],
  setEmojis: (emojis: string[]) => void,
  clickEmoji: { emoji: string | undefined, timer: string | undefined },
}

export const useEmojiStore = create<EmojiStoreType>()(
  subscribeWithSelector(set => ({
    emojis: EmojiUtils.getRecentlyEmoji()?.split(',') ?? [],
    setEmojis: (emojis: string[]) => {
      // 去重，截取前两个
      const uniqueEmoji = Array.from(new Set(emojis)).slice(0, 20)
      set({ emojis: uniqueEmoji, clickEmoji: { emoji: uniqueEmoji[0], timer: new Date().getTime().toString() } })
      EmojiUtils.setRecentlyEmoji(uniqueEmoji.join())
    },
    clickEmoji: { emoji: undefined, timer: undefined },
  }))
)
