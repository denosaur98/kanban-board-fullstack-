<template>
  <div class="home-page">
    <BoardList/>
  </div>
</template>

<script setup lang="ts">
import BoardList from '@/components/BoardList.vue';

</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  background: var(--base-white);
  width: 100%;
  height: 100%;
  padding: 50px;
  min-height: 100vh;

  @media (max-width: 900px) {
    padding: 50px 20px;
  }
}
</style>