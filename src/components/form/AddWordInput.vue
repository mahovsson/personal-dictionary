<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  disabled?: boolean;
}

interface Emits {
  (event: "add-word", word: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emits = defineEmits<Emits>();

const newWord = ref("");

const inputRef = ref<HTMLInputElement>();

const disableButton = computed(() => props.disabled || !newWord.value.trim());
const placeholderText = computed(() => (props.disabled ? "Loading words..." : "Add a new word 👈"));
const buttonText = computed(() => (props.disabled ? "Loading..." : "Add"));

const submitNewWord = () => {
  if (props.disabled) return;

  const word = newWord.value.trim();
  if (word) {
    emits("add-word", word);
    newWord.value = "";
    inputRef.value?.focus();
  }
};
</script>

<template>
  <form
    class="add-word__container"
    @submit.prevent="submitNewWord"
  >
    <input
      ref="inputRef"
      class="add-word__input"
      :class="{ 'add-word__input--disabled': disabled }"
      type="text"
      v-model="newWord"
      :placeholder="placeholderText"
      :disabled="disabled"
    />
    <button
      class="add-word__button"
      :class="{ 'add-word__button--disabled': disableButton }"
      type="submit"
      :disabled="disableButton"
    >
      {{ buttonText }}
    </button>
  </form>
</template>

<style scoped>
.add-word__container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.25rem;
  gap: 0.625rem;
  width: 100%;
}

.add-word__input {
  flex: 1;
  padding: 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.add-word__input--disabled {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.add-word__button {
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-word__button:hover:not(.add-word__button--disabled) {
  background-color: #0056b3;
}

.add-word__button--disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>
