import { defineStore } from "pinia"

export const useChartsStore = defineStore('charts', () => {
  const chartsRelyVariation = ref<boolean>(false)

  function changeChartsRelyVariation() {
    chartsRelyVariation.value = !chartsRelyVariation.value
  }

  return { chartsRelyVariation, changeChartsRelyVariation }
})
