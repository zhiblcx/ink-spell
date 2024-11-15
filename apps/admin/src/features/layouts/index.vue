<script lang="ts" setup>
import { Content, Footer, Header, Sidebar } from './index'
</script>

<template>
  <Header />
  <n-layout
    has-sider
    position="absolute"
    style="top: 60px; bottom: 30px"
  >
    <Sidebar />
    <Content />
  </n-layout>
  <Footer />
</template>
