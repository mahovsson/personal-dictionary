<script setup lang="ts">
import { ref, onMounted } from "vue";
import Draggable from "vuedraggable";
import AddWordInput from "./AddWordInput.vue";
import WordCard from "./WordCard.vue";
import SkeletonLoader from "./SkeletonLoader.vue";
import EmptyMessage from "./EmptyMessage.vue";
import { useGenerateWords } from "../composables/useGenerateWords";
import { DEFAULT_WORD_COUNT, LOCAL_STORAGE_KEY } from "../constants";
import { setItemToLocalStorage } from "../utils/localStorage";

const { isLoading, error, reloadWords, loadWords } = useGenerateWords({
  count: DEFAULT_WORD_COUNT,
  delay: DEFAULT_WORD_COUNT,
});

const dictionaryWords = ref<string[]>([]);

const dragging = ref(false);

const editingIndex = ref<number | null>(null);

const addWordToDictionary = (word: string) => {
  if (dictionaryWords.value) {
    dictionaryWords.value.push(word);
    setItemToLocalStorage(LOCAL_STORAGE_KEY, dictionaryWords.value || []);
  }
};

const onDragStart = () => {
  dragging.value = true;
};

const onDragEnd = () => {
  dragging.value = false;
  setItemToLocalStorage(LOCAL_STORAGE_KEY, dictionaryWords.value || []);
};

const onStartEdit = (index: number) => {
  editingIndex.value = index;
};

const onFinishEdit = (index: number, newWord: string) => {
  if (newWord && dictionaryWords.value) {
    dictionaryWords.value[index] = newWord;
    setItemToLocalStorage(LOCAL_STORAGE_KEY, dictionaryWords.value || []);
  }
  editingIndex.value = null;
};

const onCancelEdit = () => {
  editingIndex.value = null;
};

const onRemove = (index: number) => {
  if (dictionaryWords.value) {
    dictionaryWords.value.splice(index, 1);
    setItemToLocalStorage(LOCAL_STORAGE_KEY, dictionaryWords.value || []);
  }
};

const initDictionaryWords = async () => {
  dictionaryWords.value = (await loadWords()) || [];
};

onMounted(initDictionaryWords);
</script>

<template>
  <div class="dictionary__container">
    <AddWordInput
      @add-word="addWordToDictionary"
      :disabled="isLoading"
    />

    <SkeletonLoader
      v-if="isLoading"
      :count="DEFAULT_WORD_COUNT"
    />

    <ErrorMessage
      v-else-if="error"
      @click-retry="reloadWords"
    />

    <Draggable
      v-else-if="dictionaryWords && dictionaryWords.length > 0"
      tag="ul"
      v-model="dictionaryWords"
      class="dictionary__word-list"
      handle=".word-card__handle"
      ghost-class="dictionary__word-list--ghost"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <template #item="{ element, index }">
        <WordCard
          :key="`${element}-${index}`"
          :word="element"
          :is-editing="editingIndex === index"
          @start-edit="onStartEdit(index)"
          @finish-edit="newWord => onFinishEdit(index, newWord)"
          @cancel-edit="onCancelEdit"
          @remove="onRemove(index)"
        />
      </template>
    </Draggable>

    <EmptyMessage
      v-else
      @click-retry="reloadWords"
    />
  </div>
</template>

<style scoped>
.dictionary__container {
  max-width: 75rem;
  margin: 0 auto;
  padding: 1.25rem;
}

.dictionary__word-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

.dictionary__word-list--ghost {
  opacity: 0.5;
  transform: rotate(5deg);
}
</style>
