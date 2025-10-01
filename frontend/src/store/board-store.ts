import { defineStore } from 'pinia'
import axios from 'axios';

interface Task {
  title: String,
  description: String,
  status: String,
}

export const useBoardStore = defineStore('board', {

  state: () => {
    return {
      tasksList: []
    }
  },

  actions: {
    async fetchAllTasks() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`)

        this.tasksList = response.data

        return response.data
      } catch(error) {
        console.error(`Ошибка при загрузке: ${error}`)
      }
    },

    async createTask(title: string, description: string, status: string) {
      try {
        const newTask: Task = {
          title: title,
          description: description,
          status: status,
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, newTask)

        this.fetchAllTasks()

        return response.data
      } catch(error) {
        console.error(`Ошибка при создании: ${error}`)
      }
    },

    async changeTask(id: number, title: string, description: string, status: string) {
      try {
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
          title: title,
          description: description,
          status: status
        })

        this.fetchAllTasks()

        return response.data
      } catch(error) {
        console.error(`Ошибка при обновлении: ${error}`)
      }
    },

    async removeTask(id: number) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`)

        this.fetchAllTasks()

        return response.data
      } catch(error) {
        console.error(`Ошибка при удалении: ${error}`)
      }
    }
  }
})