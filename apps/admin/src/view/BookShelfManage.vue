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
        <th>书架名</th>
        <th>书架状态</th>
        <th>书籍数量</th>
        <th>收藏人数</th>
        <th>书架详情</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>放弃</td>
        <td>1529088692@qq.com</td>
        <td>22</td>
        <td>33</td>
        <td>1h</td>
        <td>33</td>
        <td>修改</td>
      </tr>
    </tbody>
  </n-table>
</template>

<style scoped></style>
