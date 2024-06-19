<template>
 <VaCard
    stripe
    v-for="(listItem, index) in todoList" :key="index" class="listItem" :stripe-color="getStatusCode(listItem.status)">
    <VaCardTitle>{{ listItem.type }}: {{ listItem.name }}</VaCardTitle>
    <VaCardContent>
      <div class="container">
        <div>
      <span class="subItem">
        <VaIcon name="arrow_forward" v-if="isReachingDeadline(listItem.dueDate)" color="#FF0000" />
        Due Date: {{getDate(listItem.dueDate) }}
      </span>
      <span class="subItem">Priority: {{ listItem.priority }}</span> 
      </div>
      <div>
        <VaButton
            icon="task_alt"
            preset="plain"
            class="subItem"
            @click="$emit('update', listItem)"
          />
          <VaButton
            preset="plain"
            icon="delete"
            icon-color="#ffA500"
            class="subItem"
            @click="$emit('delete', listItem)"
          />
      </div>
      </div>
    </VaCardContent>
  </VaCard>

</template>

<script setup lang="ts">
import {Status, type TaskItem} from "../types";

const props = defineProps({
    todoList: Array<TaskItem>
});

function getDate(date: any) {
  return new Date(date).toLocaleDateString();
}

function isReachingDeadline(date: any) {
  const dateNow = new Date();
  const datepassed = new Date(date);
  
  const diff = datepassed.getTime() - dateNow.getTime();   
    
  const daydiff = diff / (1000 * 60 * 60 * 24); 
  
  return daydiff <= 7;

}

function getStatusCode(status: string) {
  switch(status) {
    case 'INPROGRESS':
    return Status.INPROGRESS;
    case 'COMPLETED':
    return Status.COMPLETED;
    default:
    return Status.PENDING;
  }
}
</script>

<style scoped>
.listItem {
  margin-bottom: 24px;
}

.subItem {
  padding: 0 12px;
}
.container {
  display: flex;
  justify-content:space-between;
}

</style>




