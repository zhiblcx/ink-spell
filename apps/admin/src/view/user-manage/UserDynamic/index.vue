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
        <th>最后一次上线时间</th>
        <th>最近阅读书籍</th>
        <th>上传书架</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>放弃</td>
        <td>1529088692@qq.com</td>
        <td>查看</td>
        <td>查看</td>
        <td>
          <span>强制下线 </span>
          <span>重置密码</span>
        </td>
      </tr>
    </tbody>
  </n-table>
</template>

<style></style>
