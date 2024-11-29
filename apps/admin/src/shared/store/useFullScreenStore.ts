import { defineStore } from "pinia";
import { beFull, exitFull } from 'be-full';

export const useFullScreenStore = defineStore("full-screen", () => {
  const isFullScreen = ref(false);

  function handleFullScreen() {
    isFullScreen.value = true
    beFull()
  }

  function handleFullScreenExit() {
    isFullScreen.value = false
    exitFull()
  }

  return { isFullScreen, handleFullScreen, handleFullScreenExit }
})
