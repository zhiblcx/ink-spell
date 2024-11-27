export type echartsProps = {
  height: string,
  data: Array<chartsDataProps>,
  dark?: boolean,
  width?: string,
  title?: string,
  color?: string
  label?: boolean
  options?: Object,
  downloadImg?: boolean,
  name?: string
  subtext?: string
  relyVariable?: any
}


export type chartsDataProps = {
  label: string,
  value: number
}
