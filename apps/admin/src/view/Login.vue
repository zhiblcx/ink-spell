<script setup lang="ts">
import { LoginBgDarkImg, LoginBgImg, LogoDarkImg, LogoLightImg } from '@/assets/images'
import { APP_NAME } from '@/shared/constants/app.ts'
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { useTranslation } from 'i18next-vue'
import { FormInst } from 'naive-ui'
const { t } = useTranslation('AUTH')

const themeStore = useThemeStore()
const formRef = ref<FormInst | null>(null)
const formValue = ref({
  account: '',
  password: ''
})

function handleLogin(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('登录')
    } else {
      console.log(errors)
    }
  })
}
</script>

<template>
  <span>{{ t('account') }}</span>
  <div class="gradient relative flex h-screen w-screen items-center justify-center">
    <img
      :src="themeStore.theme === ThemeEnum.DARK ? LoginBgDarkImg : LoginBgImg"
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
          :src="themeStore.theme === ThemeEnum.DARK ? LogoLightImg : LogoDarkImg"
          class="w-[200px]"
        />
        <div class="my-5">欢迎来到 {{ APP_NAME }} 后台登录👊</div>
        <n-form-item
          path="account"
          label="账号"
          require-mark-placement="left"
          :rule="{
            required: true,
            message: '请输入账号',
            trigger: ['input', 'blur']
          }"
        >
          <n-input
            style="width: 200px"
            placeholder="请输入账号"
            class="w-[200px]"
            v-model:value="formValue.account"
          />
        </n-form-item>

        <n-form-item
          path="password"
          label="密码"
          require-mark-placement="left"
          :rule="{
            required: true,
            message: '请输入密码',
            trigger: ['input', 'blur']
          }"
        >
          <n-input
            style="width: 200px"
            type="password"
            show-password-on="click"
            placeholder="请输入密码"
            v-model:value="formValue.password"
          />
        </n-form-item>
        <n-button
          round
          type="primary"
          class="mt-2 w-[50%]"
          @click="handleLogin"
        >
          登录
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
