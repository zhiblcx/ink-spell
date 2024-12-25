<script setup lang="ts">
import { addAnnouncementMutation, updateAnnouncementMutation } from '@/features/system/mutation'
import { SystemType } from '@/shared/types/SystemType'
import { useTranslation } from 'i18next-vue'
import { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { ModelType, stateEnum } from './types'

const showModal = defineModel()
const selectAnnouncement = defineModel<SystemType>('announcement')
const { state } = defineProps<{ state: stateEnum }>()
const { t } = useTranslation(['COMMON', 'VALIDATION'])
const modelRef = ref<ModelType>({
  text: null
})

const formRef = ref<FormInst | null>(null)

const rules: FormRules = {
  text: [
    {
      validator(_: FormItemRule, value: string) {
        if (value == null) {
          return new Error(t('VALIDATION:please_input', { value: t('COMMON:announcement_text') }))
        }
        return true
      },
      trigger: ['blur', 'input']
    }
  ]
}

const { mutate: addAnnouncementMutate } = addAnnouncementMutation()
const { mutate: updateAnnouncementMutate } = updateAnnouncementMutation()

const handleAdd = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      showModal.value = false
      if (state === stateEnum.add) {
        addAnnouncementMutate(modelRef?.value.text as string)
      } else {
        updateAnnouncementMutate({ id: selectAnnouncement?.value?.id as number, text: modelRef?.value.text as string })
      }
    }
  })
}

watch(showModal, () => {
  modelRef.value = {
    text: selectAnnouncement?.value?.text ?? null
  }
})
</script>

<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card w-[80%] md:w-[30%]"
    preset="card"
    :title="(state === stateEnum.add ? t('COMMON:add') : t('COMMON:change')) + t('COMMON:announcement')"
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
        :label="t('COMMON:announcement_text')"
      >
        <n-input
          type="textarea"
          v-model:value="modelRef.text"
          :placeholder="t('please_input', { value: t('COMMON:announcement_text') })"
          @keydown.enter.prevent
          :autosize="{
            minRows: 3,
            maxRows: 5
          }"
        />
      </n-form-item>

      <div class="flex justify-center">
        <n-button
          round
          type="primary"
          class="w-[50%]"
          @click="handleAdd"
        >
          {{ (state === stateEnum.add ? t('COMMON:add') : t('COMMON:change')) + t('COMMON:announcement') }}
        </n-button>
      </div>
    </n-form>
  </n-modal>
</template>
