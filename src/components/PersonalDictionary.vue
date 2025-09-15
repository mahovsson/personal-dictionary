<script setup lang="ts">
import { ref } from "vue";
import Draggable from "vuedraggable";
import AddWordInput from "./form/AddWordInput.vue";
import WordCard from "./cards/WordCard.vue";
import SkeletonLoader from "./indicators/SkeletonLoader.vue";
import EmptyMessageDisplay from "./indicators/EmptyMessageDisplay.vue";
import { useGenerateWords } from "../composables/useGenerateWords";
import { DEFAULT_WORD_COUNT, LOCAL_STORAGE_KEY } from "../constants";
import { setItemToLocalStorage } from "../utils/localStorage";
import ErrorMessageDisplay from "./indicators/ErrorMessageDisplay.vue";
import LoadingTimeDisplay from "./indicators/LoadingTimeDisplay.vue";

const { isLoading, error, reloadWords, loadWords, loadingTime } = useGenerateWords({
  count: DEFAULT_WORD_COUNT,
});

const dictionaryWords = ref<string[]>([]);

const editingIndex = ref<number | null>(null);
const isDragging = ref(false);

const addWordToDictionary = (word: string) => {
  if (dictionaryWords.value) {
    dictionaryWords.value.push(word);
    setItemToLocalStorage(LOCAL_STORAGE_KEY, dictionaryWords.value || []);
  }
};

const onDragStart = () => {
  isDragging.value = true;
};

const onDragEnd = () => {
  isDragging.value = false;
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

initDictionaryWords();
</script>

<template>
  <div class="dictionary__container">
    <AddWordInput
      @add-word="addWordToDictionary"
      :disabled="isLoading"
    />

    <LoadingTimeDisplay
      v-if="!isLoading && loadingTime > 0"
      :loadingTime="loadingTime"
      @click-reload="reloadWords"
    />

    <SkeletonLoader
      v-if="isLoading"
      :count="DEFAULT_WORD_COUNT"
    />

    <ErrorMessageDisplay
      v-else-if="error"
      @click-retry="reloadWords"
    />

    <div
      v-else-if="dictionaryWords && dictionaryWords.length > 0"
      class="word-list-container"
    >
      <Draggable
        v-model="dictionaryWords"
        class="word-draggable"
        handle=".word-card__handle"
        ghost-class="dictionary__word-list--ghost"
        @start="onDragStart"
        @end="onDragEnd"
      >
        <template #item="{ element, index }">
          <div class="word-item">
            <WordCard
              :word="element"
              :is-editing="editingIndex === index"
              @start-edit="onStartEdit(index)"
              @finish-edit="newWord => onFinishEdit(index, newWord)"
              @cancel-edit="onCancelEdit"
              @remove="onRemove(index)"
            />
          </div>
        </template>
      </Draggable>
    </div>

    <EmptyMessageDisplay
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.word-list-container {
  width: 100%;
}

.word-draggable {
  position: relative;
  width: 100%;
}

.word-item {
  width: 100%;
  margin-bottom: 0.5rem;
  background: transparent;
  cursor: grab;
}

.word-item:active {
  cursor: grabbing;
}

.dictionary__word-list--ghost {
  opacity: 0.5;
  transform: rotate(2deg);
  background: #f0f8ff;
}
</style>
