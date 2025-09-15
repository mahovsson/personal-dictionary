<script setup lang="ts">
import { computed } from "vue";
import { RecycleScroller } from "vue-virtual-scroller";
import WordCard from "./cards/WordCard.vue";

interface Props {
  words: string[];
  editingIndex: number | null;
}

interface Emits {
  (e: "start-edit", index: number): void;
  (e: "finish-edit", index: number, newWord: string): void;
  (e: "cancel-edit"): void;
  (e: "remove", index: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Transform words array to items with unique keys
const items = computed(() =>
  props.words.map((word, index) => ({
    id: `word-${index}-${word}`,
    word,
    index,
  }))
);

const onStartEdit = (index: number) => {
  emit("start-edit", index);
};

const onFinishEdit = (index: number, newWord: string) => {
  emit("finish-edit", index, newWord);
};

const onCancelEdit = () => {
  emit("cancel-edit");
};

const onRemove = (index: number) => {
  emit("remove", index);
};
</script>

<template>
  <div class="virtual-word-list">
    <RecycleScroller
      class="scroller"
      :items="items"
      :item-size="120"
      key-field="id"
      v-slot="{ item }"
    >
      <WordCard
        :key="item.id"
        :word="item.word"
        :is-editing="editingIndex === item.index"
        @start-edit="onStartEdit(item.index)"
        @finish-edit="newWord => onFinishEdit(item.index, newWord)"
        @cancel-edit="onCancelEdit"
        @remove="onRemove(item.index)"
      />
    </RecycleScroller>
  </div>
</template>

<style scoped>
.virtual-word-list {
  height: 70vh;
  width: 100%;
}

.scroller {
  height: 100%;
}
</style>
