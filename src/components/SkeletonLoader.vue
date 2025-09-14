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
  <div class="skeleton__container">
    <div
      v-for="n in count"
      :key="n"
      class="skeleton__card"
    >
      <div
        v-if="showHandle"
        class="skeleton__handle"
      ></div>
      <div class="skeleton__text"></div>
      <div
        v-if="showActions"
        class="skeleton__actions"
      >
        <div class="skeleton__button"></div>
        <div class="skeleton__button"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton__container {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
}

.skeleton__card {
  border: 0.0625rem solid #e0e0e0;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(50% - 2rem);
  box-sizing: border-box;
  background-color: #f8f9fa59;
  animation: skeleton__pulse 1.5s ease-in-out infinite;
}

.skeleton__handle {
  width: 1.25rem;
  height: 1.25rem;
  background-color: #e0e0e0;
  border-radius: 0.1875rem;
  animation: skeleton__shimmer 1.5s ease-in-out infinite;
}

.skeleton__text {
  flex: 1;
  height: 1.25rem;
  margin: 0 1.25rem;
  background-color: #e0e0e0;
  border-radius: 0.1875rem;
  animation: skeleton__shimmer 1.5s ease-in-out infinite;
  animation-delay: 0.2s;
}

.skeleton__actions {
  display: flex;
  gap: 0.5rem;
}

.skeleton__button {
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

.skeleton__card:nth-child(2n) {
  animation-delay: 0.1s;
}

.skeleton__card:nth-child(3n) {
  animation-delay: 0.2s;
}

.skeleton__card:nth-child(4n) {
  animation-delay: 0.3s;
}

.skeleton__card:nth-child(5n) {
  animation-delay: 0.4s;
}
</style>
