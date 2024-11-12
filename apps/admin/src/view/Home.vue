<template>
  <div class="sm:space-y-3 md:flex md:justify-around md:space-x-3">
    <n-card
      title="注册用户"
      hoverable
    >
      <n-statistic>
        <template #prefix>
          <n-icon>
            <div class="i-mingcute:user-3-line w-1em h-1em" />
          </n-icon>
        </template>
        <n-number-animation
          ref="numberAnimationInstRef"
          :from="0"
          :to="12039"
        />
      </n-statistic>
    </n-card>

    <n-card
      title="书籍数量"
      hoverable
    >
      <n-statistic>
        <template #prefix>
          <n-icon>
            <div class="i-mingcute:book-2-line w-1em h-1em" />
          </n-icon>
        </template>
        <n-number-animation
          ref="numberAnimationInstRef"
          :from="0"
          :to="12039"
      /></n-statistic>
    </n-card>

    <n-card
      title="注册用户"
      hoverable
    >
      <n-statistic>
        <template #prefix>
          <n-icon>
            <div class="i-mingcute:user-3-line w-1em h-1em" />
          </n-icon>
        </template>
        <n-number-animation
          ref="numberAnimationInstRef"
          :from="0"
          :to="12039"
        />
      </n-statistic>
    </n-card>
  </div>
</template>
