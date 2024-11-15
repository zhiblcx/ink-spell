export type echartsProps = {
  height: string,
  data: Array<chartsDataProps>,
  width?: string,
  title?: string,
  color?: string
  label?: boolean
  options?: Object,
  downloadImg?: boolean,
  name?: string
  subtext?: string
}


export type chartsDataProps = {
  label: string,
  value: number
}