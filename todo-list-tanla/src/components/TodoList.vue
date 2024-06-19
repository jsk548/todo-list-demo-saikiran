<template>
 <header>
  <h1>TodoList</h1>
 </header>
 <main>
  <TodoItems :todo-list="todolist" @delete="deleteItem" @update="updateItem"/>
  <VaSelect
          v-model="filterName"
          :options="filterOptions"
          @update:modelValue="sortList"
        >Filter By:  </VaSelect>
  <VaButton class="create" @click="showModal = !showModal"> Create </VaButton>
  <VaModal
    v-model="showModal"
    :ok-text="submitButtonText"
    @ok="submitTodo"
    @cancel="cancelTodo"
  >
  <createTodo ref="todoform" :update-id="updateId" />
  </VaModal>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref} from 'vue';
import { uuid } from 'vue-uuid';
import TodoItems from './TodoItems.vue';
import createTodo from './createTodo.vue';
import { useTodoStore } from '../stores/todos';
import {Status, type TaskItem} from '../types';
import { storeToRefs } from 'pinia';

const store = useTodoStore();

const { todolist } = storeToRefs(store);

const { addTolist, deleteFromlist, updatelistItem } = store

const showModal = ref(false);

const todoform = ref(null);

const filterName = ref('TYPE');

const filterOptions = ['STATUS', 'TYPE', 'PRIORITY'];

const submitButtonText = computed(() => updateId.value ? 'Update': 'Create');

const updateId = ref('');

onMounted(()=> {
  if (localStorage.getItem('todo_items')) 
  todolist.value = JSON.parse(localStorage.getItem('todo_items'));
console.log("todo list", todolist.value);
});

function submitTodo() {
  console.log("print data submit");
  if(updateId.value) {
    updatelistItem(todoform.value.form);
  } else {
    addTolist({...(todoform.value.form), id: uuid.v1()});
  }
  cancelTodo();
}

function cancelTodo() {

}

function deleteItem(item: TaskItem) {
  deleteFromlist(item);
}

function updateItem(item: TaskItem) {
  console.log("print data update");
  updateId.value = item.id;
  showModal.value = true;

}

function sortList() {
  switch(filterName.value) {
    case 'TYPE':
    todolist.value = todolist.value.sort((a:any, b:any) => {
      if (a.type < b.type) {
        return -1;
      }
      if (a.type > b.type) {
        return 1;
      }
      return 0;
    });
    break;

    case 'STATUS':
    todolist.value = todolist.value.sort((a:any, b:any) => {
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
      return 0;
    });
    break;

    case 'PRIORITY':
    todolist.value = todolist.value.sort((a:any, b:any) => {
      if (a.priority < b.priority) {
        return -1;
      }
      if (a.priority > b.priority) {
        return 1;
      }
      return 0;
    });
    break;

    default:

    return;
  }
}
</script>

<style scoped>
.create {
  float: right;
}

.filter {
  float: left;
}
</style>