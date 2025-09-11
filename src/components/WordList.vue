<script setup lang="ts">
import { ref } from 'vue'
import { generate } from 'random-words'
import Draggable from 'vuedraggable'

const words = ref<string[]>(generate({ min: 1, max: 1, exactly: 10000 }) as string[])
</script>

<template>
    <div class="word-list">
      <Draggable v-model="words" item-key="text" ghost-class="dragging" handle=".handle">
        <template #item="{ element }">
          <div class="word">
            <span class="handle">☰</span>
            <span>{{ element }}</span>
          </div>
        </template>
      </Draggable>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.word-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.word {
  padding: 0.3rem 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>