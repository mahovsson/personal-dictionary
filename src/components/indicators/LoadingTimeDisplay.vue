<script setup lang="ts">
interface Props {
  loadingTime: number;
}

interface Emits {
  (eventr: "click-reload"): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();
</script>

<template>
  <div class="dictionary__loading-time">
    Data loaded in {{ props.loadingTime }}ms
    <button
      @click="emits('click-reload')"
      class="dictionary__reload-btn"
    >
      🔄 Reload
    </button>
  </div>
</template>

<style scoped>
.dictionary__loading-time {
  font-size: 0.8rem;
  color: #666;
  padding: 0.5rem;
  text-align: center;
  background: #f0f8ff;
  border-radius: 4px;
  margin: 0.5rem 0;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.dictionary__reload-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  border: 1px solid #007bff;
  border-radius: 3px;
  background: white;
  color: #007bff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dictionary__reload-btn:hover {
  background: #007bff;
  color: white;
}
</style>
