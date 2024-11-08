import { DirectoryModeEnum } from '../enums'

export type SetUp = {
  fontSize: number
  brightness: number
  openDirectory: boolean
  lineHeight: number
  directoryMode: DirectoryModeEnum
  readerBackground: { background: string | undefined; typeFont: string | undefined } | undefined
}
