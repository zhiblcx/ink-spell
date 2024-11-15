<script setup lang="ts"></script>

<template>
  <n-input-group class="mb-4">
    <n-input
      :style="{ width: '200px' }"
      placeholder="请输入要搜索的用户名"
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
        <th>邮箱</th>
        <th>粉丝人数</th>
        <th>关注人数</th>
        <th>书籍数量</th>
        <th>书架数量</th>
        <th>阅读总时长</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>放弃</td>
        <td>1529088692@qq.com</td>
        <td>22</td>
        <td>33</td>
        <td>1h</td>
      </tr>
    </tbody>
  </n-table>
</template>

<style></style>
