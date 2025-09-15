<script setup lang="ts">
interface Props {
  count?: number;
  showHandle?: boolean;
  showActions?: boolean;
}

withDefaults(defineProps<Props>(), {
  count: 10,
  showHandle: true,
  showActions: true,
});
</script>

<template>
  <div class="dictionary__skeleton-container">
    <div
      v-for="n in count"
      :key="n"
      class="dictionary__skeleton-card"
    >
      <div
        v-if="showHandle"
        class="dictionary__skeleton-handle"
      ></div>
      <div class="dictionary__skeleton-text"></div>
      <div
        v-if="showActions"
        class="dictionary__skeleton-actions"
      >
        <div class="dictionary__skeleton-button"></div>
        <div class="dictionary__skeleton-button"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dictionary__skeleton-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 0;
  margin: 0;
}

.dictionary__skeleton-card {
  border: 0.0625rem solid #e0e0e0;
  border-radius: 0.25rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 75px; /* Match virtual list item height */
  box-sizing: border-box;
  background-color: #f8f9fa59;
  animation: skeleton__pulse 1.5s ease-in-out infinite;
}

.dictionary__skeleton-handle {
  width: 1.25rem;
  height: 1.25rem;
  background-color: #e0e0e0;
  border-radius: 0.1875rem;
  animation: skeleton__shimmer 1.5s ease-in-out infinite;
}

.dictionary__skeleton-text {
  flex: 1;
  height: 1.25rem;
  margin: 0 1.25rem;
  background-color: #e0e0e0;
  border-radius: 0.1875rem;
  animation: skeleton__shimmer 1.5s ease-in-out infinite;
  animation-delay: 0.2s;
}

.dictionary__skeleton-actions {
  display: flex;
  gap: 0.5rem;
}

.dictionary__skeleton-button {
  width: 1.5rem;
  height: 1.5rem;
  background-color: #e0e0e0;
  border-radius: 0.1875rem;
  animation: skeleton__shimmer 1.5s ease-in-out infinite;
  animation-delay: 0.4s;
}

@keyframes skeleton__pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes skeleton__shimmer {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}

.dictionary__skeleton-card:nth-child(2n) {
  animation-delay: 0.1s;
}

.dictionary__skeleton-card:nth-child(3n) {
  animation-delay: 0.2s;
}

.dictionary__skeleton-card:nth-child(4n) {
  animation-delay: 0.3s;
}

.dictionary__skeleton-card:nth-child(5n) {
  animation-delay: 0.4s;
}
</style>
