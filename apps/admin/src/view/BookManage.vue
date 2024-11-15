<script setup lang="ts">
const selectOptions = ref([
  { label: '书架名', value: '书架名' },
  { label: '用户名', value: '用户名' }
])
</script>

<template>
  <n-input-group class="mb-4">
    <n-select
      :style="{ width: '100px' }"
      :options="selectOptions"
      :placeholder="selectOptions[0].value"
    />
    <n-input
      :style="{ width: '200px' }"
      placeholder="请输入搜索的关键字"
    />
    <n-button type="primary"> 搜索 </n-button>
  </n-input-group>

  <n-table
    :bordered="false"
    :single-line="false"
  >
    <thead>
      <tr>
        <th>用户名</th>
        <th>书籍名</th>
        <th>所属书架</th>
        <th>书籍详情</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>放弃</td>
        <td>1529088692@qq.com</td>
        <td>1529088692@qq.com</td>
        <td>1529088692@qq.com</td>
        <td class="space-x-2">
          <span>修改</span>
          <span>删除</span>
        </td>
      </tr>
    </tbody>
  </n-table>
</template>

<style></style>
