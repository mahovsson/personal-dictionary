<script setup lang="ts">
import { ref } from "vue";
import { generate } from "random-words";
import AddWordInput from "./form/AddWordInput.vue";
import DraggableWordList from "./DraggableWordList.vue";

const words = ref<string[]>(generate({ min: 1, max: 1, exactly: 10 }) as string[]);
const dragging = ref(false);

const handleAddWord = (word: string) => {
  words.value.push(word);
};

const handleDragStart = () => {
  dragging.value = true;
};

const handleDragEnd = () => {
  dragging.value = false;
};
</script>

<template>
  <div class="word-list-container">
    <AddWordInput @add-word="handleAddWord" />

    <DraggableWordList
      v-model="words"
      @drag-start="handleDragStart"
      @drag-end="handleDragEnd"
    />

    <div
      v-if="words.length === 0"
      class="empty-state"
    >
      <p>No words yet. Add some words to get started! 📝</p>
    </div>
  </div>
</template>
<style scoped>
.word-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.empty-state {
  text-align: center;
  margin-top: 50px;
  padding: 40px;
  color: #666;
  font-size: 18px;
}

.empty-state p {
  margin: 0;
}
</style>
