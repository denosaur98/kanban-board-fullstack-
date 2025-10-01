<template>
  <div class="base-popup-wrapper">
    <div class="base-overlay" @click="emit('close')"></div>
    <div class="base-popup">
      <h2 class="base-title">{{ props.type === 'create' ? 'Создать задачу' : 'Редактировать задачу' }}</h2>
      <input class="base-input" placeholder="Название задачи:" v-model="taskTitle">
      <textarea class="base-input area" placeholder="Описание задачи:" v-model="taskDescription"/>
      <div class="popup__dropdown-wrapper" ref="dropdownItem">
        <button
          :class="`base-button ${buttonStyles}`"
          :style="isDropdownOpen ? 'border-bottom-left-radius: 0; border-bottom-right-radius: 0; width: 200px;' : 'width: 200px;'"
          @click="toggleDropdown"
        >
          {{ chosenStatusTitle }}
        </button>
        <Transition name="fade">
          <div class="dropdown__content" v-if="isDropdownOpen">
            <button class="dropdown__button created" @click="chooseStatus('created', 'Создана')">Создана</button>
            <button class="dropdown__button inProgress" @click="chooseStatus('inProgress', 'В работе')">В работе</button>
            <button class="dropdown__button done" @click="chooseStatus('done', 'Готова')">Готова</button>
          </div>
        </Transition>
      </div>
      <div class="popup__actions-wrapper">
        <button
          :class="enabledButton ? 'base-button done' : 'base-button disabled'"
          :disabled="!enabledButton"
          style="width: 100%;"
          @click="props.type === 'create' ? createTask() : changeTask()"
        >
          {{ props.type === 'create' ? 'Создать' : 'Сохранить' }}
        </button>
        <button
          class="base-button remove"
          style="width: 100%;"
          v-if="props.type === 'change'"
          @click="removeTask"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, onMounted, watchEffect } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useBoardStore } from '@/store/board-store';

const props = defineProps({
  type: String,
  itemData: Object
})
const emit = defineEmits(['close'])

const chosenStatus = ref('created')
const chosenStatusTitle = ref('Создана')
const isDropdownOpen = ref(false)
const dropdownItem = ref(null)
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}
function closeDropdown() {
  isDropdownOpen.value = false
}
function chooseStatus(value: string, valueTitle: string) {
  chosenStatus.value = value
  chosenStatusTitle.value = valueTitle
  closeDropdown()
}
onClickOutside(dropdownItem, () => {
  closeDropdown()
})

const buttonStyles = computed(() => {
  if(chosenStatus.value === 'created') {
    return 'created'
  } else if(chosenStatus.value === 'inProgress') {
    return 'inProgress'
  } else if(chosenStatus.value === 'done') {
    return 'done'
  }
})

const store = useBoardStore()

const taskTitle = ref('')
const taskDescription = ref('')
const enabledButton = computed(() => {
  return taskTitle.value && taskTitle.value.trim() !== ''
})

function createTask() {
  store.createTask(taskTitle.value, taskDescription.value, chosenStatus.value)
  emit('close')
}
function changeTask() {
  store.changeTask(props.itemData.id, taskTitle.value, taskDescription.value, chosenStatus.value)
  emit('close')
}
function removeTask() {
  store.removeTask(props.itemData.id)
  emit('close')
}

onMounted(() => {
  taskTitle.value = props.itemData.title
  taskDescription.value = props.itemData.description
})
</script>

<style lang="scss" scoped>
.base-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--base-white);
  width: 500px;
  height: max-content;
  padding: 20px;
  border-radius: 5px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  @media (max-width: 900px) {
    width: 90%;
  }

  .popup__dropdown-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 200px;
    margin-right: auto;

    .dropdown__content {
      position: absolute;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      background: var(--base-white);
      border: none;
      width: 100%;
      top: 35px;

      .dropdown__button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 5px 10px;
        border: none;
        color: var(--base-black);
        font-weight: 400;
        transition: .5s;
        width: 100%;
        font-size: 20px;

        @media (hover:hover) {
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }

  .popup__actions-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
  }
}
</style>