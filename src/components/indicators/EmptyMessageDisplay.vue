<script setup lang="ts">
interface Emits {
  (eventr: "click-retry"): void;
}

const emits = defineEmits<Emits>();
</script>
<template>
  <div 
    class="dictionary__empty"
    data-cy="dictionary__empty"
  >
    <p 
      class="dictionary__empty-message"
      data-cy="dictionary__empty-message"
    >No words yet. Add some words to get started! 📝</p>
    <button
      class="dictionary__retry-btn"
      data-cy="dictionary__retry-btn"
      @click="emits('click-retry')"
    >
      Retry
    </button>
  </div>
</template>
<style scoped>
.dictionary__empty {
  text-align: center;
  margin-top: 3.125rem;
  padding: 2.5rem;
  color: #666;
  font-size: 1.125rem;
}

.dictionary__empty-message {
  margin: 0;
}
</style>
