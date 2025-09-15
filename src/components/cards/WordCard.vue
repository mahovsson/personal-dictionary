<script setup lang="ts">
import { ref, nextTick } from "vue";

interface Props {
  word: string;
  isEditing: boolean;
}

interface Emits {
  (event: "start-edit"): void;
  (event: "finish-edit", newWord: string): void;
  (event: "cancel-edit"): void;
  (event: "remove"): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const textRef = ref<HTMLElement>();

const onStartEditing = async () => {
  emits("start-edit");
  await nextTick();

  if (textRef.value) {
    textRef.value.focus();
    const range = document.createRange();
    range.selectNodeContents(textRef.value);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
};

const onFinishEditing = (event: Event) => {
  const target = event.target as HTMLElement;
  const newText = target.textContent?.trim() || "";
  emits("finish-edit", newText);
};

const onCancelEditing = () => {
  emits("cancel-edit");
};

const onRemoveWord = () => {
  emits("remove");
};
</script>

<template>
  <li 
    class="word-card__container"
    data-cy="dictionary__word-card"
  >
    <i 
      class="word-card__handle"
      data-cy="dictionary__word-handle"
    >☰</i>
    <span
      ref="textRef"
      class="word-card__text"
      :contenteditable="isEditing"
      :class="{ 'word-card__text--editing': isEditing }"
      @blur="onFinishEditing"
      @keydown.enter="onFinishEditing"
      @keydown.escape="onCancelEditing"
      data-cy="dictionary__word-text"
    >
      {{ props.word }}
    </span>
    <div 
      class="word-card__actions"
      data-cy="dictionary__word-actions"
    >
      <button
        @click="onStartEditing"
        :disabled="props.isEditing"
        class="word-card__button word-card__button--edit"
        :class="{ 'word-card__button--disabled': props.isEditing }"
        data-cy="dictionary__word-edit-btn"
      >
        ✏️
      </button>
      <button
        @click="onRemoveWord"
        class="word-card__button word-card__button--remove"
        data-cy="dictionary__word-remove-btn"
      >
        ❌
      </button>
    </div>
  </li>
</template>

<style scoped>
.word-card__container {
  border: 0.0625rem solid #555;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.05);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.word-card__container:hover {
  transform: translateY(-0.125rem);
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.08);
}

.word-card__handle {
  cursor: grab;
  padding: 0.5rem;
  color: #666;
  user-select: none;
}

.word-card__handle:active {
  cursor: grabbing;
}

.word-card__text {
  flex: 1;
  margin: 0 1.25rem;
  min-width: 6.25rem;
  padding: 0.25rem;
  border-radius: 0.1875rem;
  transition: all 0.2s ease;
}

.word-card__text--editing {
  border: 0.125rem solid #007bff;
  outline: none;
}

.word-card__text:not(.word-card__text--editing):hover {
  background-color: rgba(0, 123, 255, 0.1);
  cursor: text;
}

.word-card__actions {
  display: flex;
  gap: 0.5rem;
}

.word-card__button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.1875rem;
  transition: background-color 0.2s ease;
}

.word-card__button--edit:hover:not(.word-card__button--disabled) {
  background-color: rgba(0, 123, 255, 0.1);
}

.word-card__button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.word-card__button--remove:hover {
  background-color: rgba(220, 53, 69, 0.1);
}
</style>
