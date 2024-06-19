import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TaskItem } from '@/types'

export const useTodoStore = defineStore('todos', () => {
  const todolist = ref<Array<TaskItem>>([]);

  function addTolist(data: TaskItem) {
    todolist.value.push(data);
    setDataToStorage();
  }

  function deleteFromlist(data: TaskItem) {
    todolist.value = todolist.value.filter((item) => item.id !== data.id);
    setDataToStorage();
  }

  function updatelistItem(data: TaskItem) {
    const index = todolist.value.findIndex((item) => item.id === data.id);
    todolist.value[index] = data;
    setDataToStorage();
  }

  function setDataToStorage() {
    localStorage.setItem('todo_items', JSON.stringify(todolist.value));
  }

  return { todolist, addTolist, deleteFromlist,  updatelistItem}
})
