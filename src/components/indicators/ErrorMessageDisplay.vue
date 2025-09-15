<script setup lang="ts">
interface Emits {
  (eventr: "click-retry"): void;
}

const emits = defineEmits<Emits>();
</script>

<template>
  <div 
    class="dictionary__error"
    data-cy="dictionary__error"
  >
    <p 
      class="dictionary__error-message"
      data-cy="dictionary__error-message"
    >😕 Failed to load words. Please try again.</p>
    <button
      @click="emits('click-retry')"
      class="dictionary__retry-btn"
      data-cy="dictionary__error-retry-btn"
    >
      Retry
    </button>
  </div>
</template>
<style scoped>
.dictionary__error {
  text-align: center;
  margin-top: 3.125rem;
  padding: 2.5rem;
  color: #dc3545;
  font-size: 1.125rem;
}

.dictionary__error-message {
  margin: 0 0 1.25rem 0;
}

.dictionary__retry-btn {
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
  border: 0.125rem solid #dc3545;
  border-radius: 0.25rem;
  background-color: transparent;
  color: #dc3545;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dictionary__retry-btn:hover {
  background-color: #dc3545;
  color: white;
}
</style>
