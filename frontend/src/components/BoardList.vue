<template>
  <div class="board-list-wrapper">
    <div class="list__actions">
      <BaseSearch v-model="searchedValue"/>
      <button class="actions__create-button" @click="openPopup('create')">+</button>
    </div>
    <div class="board-list">
      <BoardColumn
        v-for="(column, index) in columnItems"
        :key="index"
        :columnData="column"
        :searchedValue="searchedValue"
      />
    </div>
    <Transition name="fade">
      <BasePopup
        v-if="isPopupOpen"
        :type="popupType"
        :itemData="{
          title: '',
          description: '',
          status: ''
        }"
        @close="closePopup"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BoardColumn from './BoardColumn.vue';
import BaseSearch from './BaseSearch.vue';
import BasePopup from './BasePopup.vue';

const columnItems = ref([
  {
    title: 'Созданы',
    status: 'created'
  },
  {
    title: 'В работе',
    status: 'inProgress'
  },
  {
    title: 'Выполнены',
    status: 'done'
  },
])
const searchedValue = ref('')

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
.board-list-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;

  .list__actions {
    display: flex;
    align-items: center;
    gap: 10px;

    .actions__create-button {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--base-green);
      color: var(--base-black);
      border: 1px solid var(--base-green);
      height: 33px;
      width: 50px;
      border-radius: 5px;
      color: var(--base-white);
      font-size: 25px;
      font-weight: 600;
    }
  }

  .board-list {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    gap: 20px;

    @media (max-width: 900px) {
      flex-direction: column;
    }
  }
}
</style>