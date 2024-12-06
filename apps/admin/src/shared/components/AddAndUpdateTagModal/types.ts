import { TagVo } from "@/features/tag"

export interface ModelType {
  nameChinese: string | null
  nameEnglish: string | null
}

export enum stateEnum {
  add = 'add',
  update = 'update'
}
export interface AddAndUpdateTagProps {
  selectTag?: Ref<TagVo | null>
}

