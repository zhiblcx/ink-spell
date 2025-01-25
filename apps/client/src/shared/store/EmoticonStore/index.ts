import { create } from 'zustand'

type EmoticonStoreType = {
  emoticon: string | null,
  setEmoticon: (emoticon: string | null) => void
}

export const useEmoticonStore = create<EmoticonStoreType>((set) => ({
  emoticon: null,
  setEmoticon: (emoticon) => set({ emoticon })
}))
