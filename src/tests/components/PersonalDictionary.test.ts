import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import PersonalDictionary from "../../components/PersonalDictionary.vue";
import { getItemFromLocalStorage } from "../../utils/localStorage";
import { nextTick } from "vue";

vi.mock("../../constants", () => ({
  DEFAULT_WORD_COUNT: 3,
  LOCAL_STORAGE_KEY: "test-dictionary-words",
}));

vi.mock("../../utils/localStorage", () => ({
  setItemToLocalStorage: vi.fn(),
  getItemFromLocalStorage: vi.fn(() => []),
}));

vi.mock("random-words", () => ({
  generate: vi.fn(() => ["word1", "word2", "word3"]),
}));
const mockedGetItemFromLocalStorage = vi.mocked(getItemFromLocalStorage);

describe("PersonalDictionary.vue", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(async () => {
    wrapper = mount(PersonalDictionary);
  });

  it("renders component correctly", async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("shows skeleton loader initially when loading", async () => {
    const skeletonLoader = wrapper.findComponent({ name: "SkeletonLoader" });
    expect(skeletonLoader.exists()).toBe(true);
  });

  it("renders AddWordInput component", async () => {
    const addWordInput = wrapper.findComponent({ name: "AddWordInput" });
    expect(addWordInput.exists()).toBe(true);
  });

  describe("after initial load", () => {
    beforeEach(async () => {
      await nextTick();
    });

    it("shows word list after loading completes", async () => {
      const wordList = wrapper.find("[data-cy='dictionary__word-list']");
      expect(wordList.exists()).toBe(true);
    });

    it("renders draggable component when words exist", async () => {
      const draggable = wrapper.findComponent({ name: "Draggable" });
      expect(draggable.exists()).toBe(true);
    });

    it("renders word cards when words exist", async () => {
      const wordCards = wrapper.findAllComponents({ name: "WordCard" });
      expect(wordCards.length).toBeGreaterThan(0);
    });

    it("shows loading time display after loading completes", async () => {
      const loadingTimeDisplay = wrapper.findComponent({ name: "LoadingTimeDisplay" });
      expect(loadingTimeDisplay.exists()).toBe(true);
      expect(loadingTimeDisplay.props("loadingTime")).toBeGreaterThan(0);
    });

    it("starts editing when WordCard emits start-edit", async () => {
      const wordCards = wrapper.findAllComponents({ name: "WordCard" });
      if (wordCards.length > 0) {
        const wordCard = wordCards[0];

        await wordCard.vm.$emit("start-edit");
        await nextTick();

        expect(wordCard.props("isEditing")).toBe(true);
      }
    });

    it("finishes editing when WordCard emits finish-edit", async () => {
      const wordCards = wrapper.findAllComponents({ name: "WordCard" });
      if (wordCards.length > 0) {
        const wordCard = wordCards[0];

        await wordCard.vm.$emit("start-edit");
        await nextTick();

        await wordCard.vm.$emit("finish-edit", "edited word");
        await nextTick();

        expect(wordCard.props("isEditing")).toBe(false);
      }
    });

    it("cancels editing when WordCard emits cancel-edit", async () => {
      const wordCards = wrapper.findAllComponents({ name: "WordCard" });
      if (wordCards.length > 0) {
        const wordCard = wordCards[0];

        await wordCard.vm.$emit("start-edit");
        await nextTick();

        await wordCard.vm.$emit("cancel-edit");
        await nextTick();

        expect(wordCard.props("isEditing")).toBe(false);
      }
    });

    it("removes word when WordCard emits remove", async () => {
      const initialWordCards = wrapper.findAllComponents({ name: "WordCard" });
      const initialCount = initialWordCards.length;

      if (initialCount > 0) {
        const wordCard = initialWordCards[0];
        await wordCard.vm.$emit("remove");
        await nextTick();

        const finalWordCards = wrapper.findAllComponents({ name: "WordCard" });
        expect(finalWordCards.length).toBe(initialCount - 1);
      }
    });

    describe("word management", () => {
      it("adds word when AddWordInput emits add-word", async () => {
        const addWordInput = wrapper.findComponent({ name: "AddWordInput" });
        const initialWordCards = wrapper.findAllComponents({ name: "WordCard" });
        const initialCount = initialWordCards.length;

        await addWordInput.vm.$emit("add-word", "new word");
        await nextTick();

        const finalWordCards = wrapper.findAllComponents({ name: "WordCard" });
        expect(finalWordCards.length).toBe(initialCount + 1);
      });
    });
  });

  describe("with empty localStorage", () => {
    beforeEach(async () => {
      mockedGetItemFromLocalStorage.mockReturnValue([]);

      wrapper = mount(PersonalDictionary);

      await nextTick();
    });

    it("shows empty message when no words are generated", async () => {
      const emptyMessage = wrapper.findComponent({ name: "EmptyMessageDisplay" });
      expect(emptyMessage.exists()).toBe(true);
    });
  });

  describe("with existing localStorage data", () => {
    beforeEach(async () => {
      mockedGetItemFromLocalStorage.mockReturnValue(["existing1", "existing2"]);

      wrapper = mount(PersonalDictionary);
      await nextTick();
    });

    it("loads words from localStorage", async () => {
      const wordCards = wrapper.findAllComponents({ name: "WordCard" });
      expect(wordCards.length).toBe(2);
    });
  });
});
