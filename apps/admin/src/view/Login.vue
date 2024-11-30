<script setup lang="ts">
import { LoginBgDarkImg, LoginBgImg, LogoDarkImg, LogoLightImg } from '@/assets/images'
import { loginMutation } from '@/features/auth/mutation'
import { APP_NAME } from '@/shared/constants/app.ts'
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { useTranslation } from 'i18next-vue'
import { FormInst } from 'naive-ui'

const themeStore = useThemeStore()
const formRef = ref<FormInst | null>(null)
const { t } = useTranslation(['AUTH', 'COMMON', 'VALIDATION'])
const { mutate: loginMutate } = loginMutation()
const formValue = ref({
  account: '',
  password: ''
})

function handleLogin(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      loginMutate({ ...formValue.value })
    }
  })
}
</script>

<template>
  <div class="gradient relative flex h-screen w-screen items-center justify-center">
    <img
      :src="themeStore.currentTheme === ThemeEnum.DARK ? LoginBgDarkImg : LoginBgImg"
      class="absolute h-[85vh] w-[70vw] rounded-xl object-cover object-center"
    />
    <img
      src="@/assets/images/login_bg_phone.png"
      class="ssm:hidden absolute h-screen w-screen object-cover object-bottom"
    />

    <div class="ssm:h-[85vh] ssm:w-[70vw] ssm:block relative z-10 flex h-full w-full items-center justify-center">
      <n-form
        ref="formRef"
        :model="formValue"
        label-placement="left"
        label-width="auto"
        class="ssm:absolute ssm:right-4 ssm:w-[30vw] ssm:bg-transparent ssm:h-[90%] flex h-[60%] flex-col items-center justify-center rounded-lg bg-white p-6 dark:bg-[#18181c]"
      >
        <img
          :src="themeStore.currentTheme === ThemeEnum.DARK ? LogoLightImg : LogoDarkImg"
          class="w-[200px]"
        />
        <div class="my-6">{{ t('COMMON:welcome_message', { APP_NAME: APP_NAME }) }}</div>
        <n-form-item
          path="account"
          :label="t('account')"
          require-mark-placement="left"
          :rule="{
            required: true,
            message: t('VALIDATION:prompt_account'),
            trigger: ['input', 'blur']
          }"
        >
          <n-input
            style="width: 200px"
            :placeholder="t('VALIDATION:input_account')"
            class="w-[200px]"
            v-model:value="formValue.account"
          />
        </n-form-item>

        <n-form-item
          path="password"
          :label="t('AUTH:password')"
          require-mark-placement="left"
          :rule="{
            required: true,
            message: t('VALIDATION:prompt_password'),
            trigger: ['input', 'blur']
          }"
        >
          <n-input
            style="width: 200px"
            type="password"
            show-password-on="click"
            :placeholder="t('VALIDATION:input_password')"
            v-model:value="formValue.password"
          />
        </n-form-item>
        <n-button
          round
          type="primary"
          class="mt-2 w-[50%]"
          @click="handleLogin"
        >
          {{ t('login') }}
        </n-button>
      </n-form>
    </div>
  </div>
</template>

<style scoped>
.gradient {
  background: linear-gradient(125deg, #2c3e50, #27ae60, #2980b9, #e74c3c, #8e44ad);
  background-size: 500%;
  animation: bgAnimation 20s linear infinite;
}

@keyframes bgAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
