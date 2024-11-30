<script setup lang="ts">
import { updatePasswordMutation } from '@/features/user/mutation'
import { useTranslation } from 'i18next-vue'
import { FormInst, FormItemInst, FormItemRule, FormRules } from 'naive-ui'
import { ModelType } from './types'

const showModal = defineModel()
const { t } = useTranslation(['COMMON', 'VALIDATION'])
const formRef = ref<FormInst | null>(null)
const confirmPassword = ref<FormItemInst | null>(null)
const modelRef = ref<ModelType>({
  password: null,
  newPassword: null,
  reenteredPassword: null
})

const { mutate: updatePasswordMutate } = updatePasswordMutation(showModal, modelRef)

const rules: FormRules = {
  password: [
    {
      validator(_: FormItemRule, value: string) {
        if (value == null) {
          return new Error(t('please_input', { value: t('COMMON:old_password') }))
        }
        if (value.length < 6 || value.length > 16) {
          return new Error(
            t('VALIDATION:must_be_length_characters_long', { value: t('COMMON:old_password'), length: '6-16' })
          )
        }
        return true
      },
      trigger: ['blur', 'input']
    }
  ],
  newPassword: [
    {
      validator(_: FormItemRule, value: string) {
        if (value == null) {
          return new Error(t('please_input', { value: t('COMMON:new_password') }))
        }
        if (value.length < 6 || value.length > 16) {
          return new Error(
            t('VALIDATION:must_be_length_characters_long', { value: t('COMMON:new_password'), length: '6-16' })
          )
        }
        return true
      },
      trigger: ['blur', 'input']
    }
  ],
  reenteredPassword: [
    {
      validator(_: FormItemRule, value: string) {
        if (value == null) {
          return new Error(t('please_input', { value: t('COMMON:confirm_password') }))
        }
        if (value.length < 6 || value.length > 16) {
          return new Error(
            t('VALIDATION:must_be_length_characters_long', { value: t('COMMON:confirm_password'), length: '6-16' })
          )
        }
        if (modelRef.value.newPassword != value) {
          return new Error(t('VALIDATION:password_mismatch'))
        }
        return true
      },
      trigger: ['blur', 'input', 'password-input']
    }
  ]
}

function handleUpdatePassword(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      updatePasswordMutate({
        password: modelRef.value.password as string,
        newPassword: modelRef.value.newPassword as string
      })
    }
  })
}

function handlePasswordInput() {
  if (modelRef.value.reenteredPassword) {
    confirmPassword.value?.validate({ trigger: 'password-input' })
  }
}
</script>

<template>
  <n-modal
    v-model:show="showModal"
    style="width: 600px"
    class="custom-card"
    preset="card"
    :title="t('COMMON:change_password')"
    :bordered="false"
    size="huge"
  >
    <n-form
      ref="formRef"
      :model="modelRef"
      :rules="rules"
    >
      <n-form-item
        path="password"
        :label="t('COMMON:old_password')"
      >
        <n-input
          v-model:value="modelRef.password"
          type="password"
          :placeholder="t('please_input', { value: t('COMMON:old_password') })"
          @keydown.enter.prevent
        />
      </n-form-item>

      <n-form-item
        path="newPassword"
        :label="t('COMMON:new_password')"
        @input="handlePasswordInput"
      >
        <n-input
          v-model:value="modelRef.newPassword"
          type="password"
          :placeholder="t('please_input', { value: t('COMMON:new_password') })"
          @keydown.enter.prevent
        />
      </n-form-item>

      <n-form-item
        ref="confirmPassword"
        path="reenteredPassword"
        :label="t('COMMON:confirm_password')"
      >
        <n-input
          v-model:value="modelRef.reenteredPassword"
          type="password"
          :placeholder="t('please_input', { value: t('COMMON:confirm_password') })"
          @keydown.enter.prevent
        />
      </n-form-item>
      <div class="flex justify-center">
        <n-button
          round
          type="primary"
          class="w-[50%]"
          @click="handleUpdatePassword"
        >
          {{ t('COMMON:change_password') }}
        </n-button>
      </div>
    </n-form>
  </n-modal>
</template>
