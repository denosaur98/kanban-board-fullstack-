<template>
  <button class="task-item" @click="openPopup('change')">
    <h2 class="item__title">{{ props.taskData.title }}</h2>
    <div class="item__description-wrapper">
      <p class="item__description">{{ props.taskData.description }}</p>
    </div>
    <span class="item__date">{{ useDateFormat(props.taskData.createdAt, 'DD.MM.YYYY HH:MM:ss') }}</span>
  </button>
  <Transition name="fade">
    <BasePopup
      v-if="isPopupOpen"
      :type="popupType"
      :itemData="props.taskData"
      @close="closePopup"
    />
  </Transition>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useDateFormat } from '@vueuse/core';
import BasePopup from './BasePopup.vue';

const props = defineProps({
  taskData: Object
})

const isPopupOpen = ref(false)
const popupType = ref('')
function openPopup(value: string) {
  isPopupOpen.value = true
  popupType.value = value
}
function closePopup() {
  isPopupOpen.value = false
  popupType.value = ''
}
</script>

<style lang="scss" scoped>
.task-item {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--base-white);
  padding: 10px 10px 20px;
  border-radius: 5px;
  width: 100%;
  gap: 10px;
  transition: .3s;

  @media (hover:hover) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 1px 1px 10px 1px var(--base-white);
    }
  }

  .item__title {
    font-size: 25px;
    font-weight: 600;
    color: var(--base-black);
    margin-bottom: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    text-align: left;

    @media (max-width: 900px) {
      font-size: 20px;
    }
  }

  .item__description-wrapper {
    width: 100%;
    max-height: 200px;
    overflow: auto;

    .item__description {
      font-size: 15px;
      font-weight: 600;
      color: var(--base-black);
      text-align: left;
      word-break: break-all;

      @media (max-width: 900px) {
        font-size: 13px;
      }
    }
  }

  .item__date {
    position: absolute;
    right: 10px;
    bottom: 5px;
    font-size: 10px;
    font-weight: 400;
    color: var(--base-grey);
  }
}
</style>