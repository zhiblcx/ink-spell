<script setup lang="ts">
import { addTagMutation, TagVo, updateTagMutation } from '@/features/tag'
import { useTranslation } from 'i18next-vue'
import { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { ModelType, stateEnum } from './types'

const { state } = defineProps<{ state: stateEnum }>()
const selectTag = defineModel<TagVo>('selectTag')
const showModal = defineModel()
const { t } = useTranslation(['COMMON', 'VALIDATION'])

const modelRef = ref<ModelType>({
  nameChinese: selectTag?.value?.nameChinese ?? null,
  nameEnglish: selectTag?.value?.nameEnglish ?? null
})

const formRef = ref<FormInst | null>(null)

watch(showModal, () => {
  modelRef.value = {
    nameChinese: selectTag?.value?.nameChinese ?? null,
    nameEnglish: selectTag?.value?.nameEnglish ?? null
  }
})

const rules: FormRules = {
  nameChinese: [
    {
      validator(_: FormItemRule, value: string) {
        if (value == null) {
          return new Error(t('VALIDATION:please_input', { value: t('COMMON:tag') + t('COMMON:chinese_name') }))
        }
        return true
      },
      trigger: ['blur', 'input']
    }
  ],
  nameEnglish: [
    {
      validator(_: FormItemRule, value: string) {
        if (value == null) {
          return new Error(t('VALIDATION:please_input', { value: t('COMMON:tag') + t('COMMON:english_name') }))
        }
        return true
      },
      trigger: ['blur', 'input']
    }
  ]
}

const { mutate: addTagMutate } = addTagMutation()
const { mutate: updateTagMutate } = updateTagMutation()

const handleAdd = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      showModal.value = false
      if (state === stateEnum.add) {
        addTagMutate({
          nameChinese: modelRef?.value?.nameChinese as string,
          nameEnglish: modelRef?.value?.nameEnglish as string
        })
      } else {
        updateTagMutate({
          id: selectTag?.value?.id,
          nameChinese: modelRef?.value?.nameChinese as string,
          nameEnglish: modelRef?.value?.nameEnglish as string
        })
      }
    }
  })
}
</script>

<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card w-[80%] md:w-[25%]"
    preset="card"
    :title="(state === stateEnum.add ? t('COMMON:add') : t('COMMON:change')) + t('COMMON:tag')"
    size="medium"
    :bordered="false"
  >
    <n-form
      ref="formRef"
      :model="modelRef"
      :rules="rules"
    >
      <n-form-item
        path="nameChinese"
        :label="t('COMMON:tag') + t('COMMON:chinese_name')"
      >
        <n-input
          v-model:value="modelRef.nameChinese"
          type="nameChinese"
          :placeholder="t('please_input', { value: t('COMMON:tag') + t('COMMON:chinese_name') })"
          @keydown.enter.prevent
        />
      </n-form-item>

      <n-form-item
        path="nameEnglish"
        :label="t('COMMON:tag') + t('COMMON:english_name')"
      >
        <n-input
          v-model:value="modelRef.nameEnglish"
          type="nameEnglish"
          :placeholder="t('please_input', { value: t('COMMON:tag') + t('COMMON:english_name') })"
          @keydown.enter.prevent
        />
      </n-form-item>

      <div class="flex justify-center">
        <n-button
          round
          type="primary"
          class="w-[50%]"
          @click="handleAdd"
        >
          {{ (state === stateEnum.add ? t('COMMON:add') : t('COMMON:change')) + t('COMMON:tag') }}
        </n-button>
      </div>
    </n-form>
  </n-modal>
</template>
