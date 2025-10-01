<template>
  <div :class="'board-column ' + columnColor">
    <h2 class="column__title" v-if="props.columnData">{{ props.columnData.title }}</h2>
    <div class="column__tasks-list">
      <TaskItem
        v-if="filteredTasks.length > 0"
        v-for="task in filteredTasks"
        :key="task.id"
        :taskData="task"
      />
      <p v-else class="list-empty">Пусто</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, onMounted } from 'vue';
import TaskItem from './TaskItem.vue';
import { useBoardStore } from '@/store/board-store';

const props = defineProps({
  columnData: Object,
  searchedValue: String
})

const store = useBoardStore()

const filteredTasks = computed(() => {
  return store.tasksList.filter(t => (t.status === props.columnData.status) && (t.title.toLowerCase().includes(props.searchedValue.toLowerCase())))
})
const columnColor = computed(() => {
  if(props.columnData.status === 'created') {
    return 'created'
  } else if(props.columnData.status === 'inProgress') {
    return 'inProgress'
  } else {
    return 'done'
  }
})

onMounted(async () => {
  await store.fetchAllTasks()
})
</script>

<style lang="scss" scoped>
.board-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid var(--base-grey);
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px 1px var(--base-grey);

  .column__title {
    font-size: 30px;
    font-weight: 600;
    color: var(--base-black);
    margin-bottom: 50px;
  }

  .column__tasks-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 10px;

    .list-empty {
      font-size: 20px;
      color: var(--base-black);
      font-weight: 400;
      text-align: center;
      width: 100%;
    }
  }
}
</style>