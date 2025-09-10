<script setup lang="ts">
import { ref } from 'vue'
import Draggable from 'vuedraggable'

interface Word {
  id: number
  text: string
}

const words = ref<Word[]>([
  { id: 1, text: 'Apple' },
  { id: 2, text: 'Banana' },
  { id: 3, text: 'Cherry' },
])
</script>

<template>
  <div class="list-wrapper">
    <h1>My Personal Dictionary</h1>

    <Draggable v-model="words" item-key="id" ghost-class="dragging" handle=".handle">
      <template #item="{ element }">
        <div class="word-item">
          <span class="handle">☰</span>
          <span>{{ element.text }}</span>
        </div>
      </template>
    </Draggable>

    <pre>{{ words }}</pre>
  </div>
</template>

<style scoped>
.list-wrapper {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h1 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.word-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.word-item .handle {
  cursor: grab;
  user-select: none;
  font-size: 1.2rem;
}

.dragging {
  opacity: 0.5;
}
</style>