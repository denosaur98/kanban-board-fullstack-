<template>
  <div class="board-list">
    <input
      :value="props.modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      class="base-input"
      placeholder="Введите название задачи:"
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

</script>

<style lang="scss" scoped>
.board-list {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 50px;
}
</style>