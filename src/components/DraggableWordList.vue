<template>
  <Draggable
    tag="ul"
    v-model="modelValue"
    class="word-list"
    handle=".handle"
    ghost-class="ghost"
    @start="emit('dragStart')"
    @end="emit('dragEnd')"
  >
    <template #item="{ element, index }">
      <WordCard
        :key="`${element}-${index}`"
        :word="element"
        :is-editing="editingIndex === index"
        @start-edit="handleStartEdit(index)"
        @finish-edit="newWord => handleFinishEdit(index, newWord)"
        @cancel-edit="handleCancelEdit"
        @remove="handleRemove(index)"
      />
    </template>
  </Draggable>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Draggable from "vuedraggable";
import WordCard from "./cards/WordCard.vue";

interface Props {
  modelValue: string[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [words: string[]];
  dragStart: [];
  dragEnd: [];
}>();

const editingIndex = ref<number | null>(null);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: string[]) => emit("update:modelValue", value),
});

const handleStartEdit = (index: number) => {
  editingIndex.value = index;
};

const handleFinishEdit = (index: number, newWord: string) => {
  if (newWord) {
    const newWords = [...props.modelValue];
    newWords[index] = newWord;
    emit("update:modelValue", newWords);
  }
  editingIndex.value = null;
};

const handleCancelEdit = () => {
  editingIndex.value = null;
};

const handleRemove = (index: number) => {
  const newWords = [...props.modelValue];
  newWords.splice(index, 1);
  emit("update:modelValue", newWords);
};
</script>

<style scoped>
.word-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

.ghost {
  opacity: 0.5;
  transform: rotate(5deg);
}
</style>
