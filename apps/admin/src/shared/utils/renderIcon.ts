import { NIcon } from "naive-ui"

export const renderIcon = (icon: Component, width?: string, height?: string) =>
  () => {
    return h(NIcon, null, {
      default: () =>
        h(icon, {
          style: {
            width: width,
            height: height
          }
        })
    })
  }
