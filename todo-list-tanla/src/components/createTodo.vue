<template>
    <div>
        <VaForm  class="form">
    <VaInput
      v-model="form.name"
      label="Name"
    />

    <VaSelect
      v-model="form.type"
      :options="typeOptions"
      label="Type"
    />

    <VaSelect
      v-model="form.priority"
      :options="priorityOptions"
      label="Priority"
    />

    <VaSelect
      v-model="form.status"
      :options="statusOptions"
      label="Status"
    />

    <VaDateInput 
      v-model="form.dueDate"
      label="Due Date"
      manual-input
      clearable
    />
        </VaForm>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch, toRefs} from 'vue';
import { Type, Priority, Status} from '../types';
import { useTodoStore } from '../stores/todos';
import { storeToRefs } from 'pinia';

const store = useTodoStore();

const { todolist } = storeToRefs(store);

const props = defineProps({
    updateId: {
      required: true
    }
});

const propVals = toRefs(props);

const typeOptions = Object.keys(Type).filter((key: any) => isNaN(key));
const priorityOptions = Object.keys(Priority);
const statusOptions = Object.keys(Status);


let form = reactive({
    id: '',
    name: '',
    type: '',
    priority: '',
    status: '',
    dueDate: null as Date | null,
  });

  watch(propVals.updateId, () => {
    if(propVals.updateId.value) {
      const item = todolist.value.find((item) => item.id === propVals.updateId.value);
      form = {...item} as any;
    }
  },{immediate: true});

  defineExpose({
    form
  });


</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

</style>

