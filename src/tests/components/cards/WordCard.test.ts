import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import WordCard from "../../../components/cards/WordCard.vue";

describe("WordCard.vue", () => {
  let wrapper: ReturnType<typeof mount>;
  let wordHandle: ReturnType<typeof wrapper.find>;
  let wordText: ReturnType<typeof wrapper.find>;
  let wordActions: ReturnType<typeof wrapper.find>;
  let editBtn: ReturnType<typeof wrapper.find>;
  let removeBtn: ReturnType<typeof wrapper.find>;

  beforeEach(() => {
    wrapper = mount(WordCard, {
      props: {
        word: "test word",
        isEditing: false,
      },
    });
    wordHandle = wrapper.find("[data-cy='dictionary__word-handle']");
    wordText = wrapper.find("[data-cy='dictionary__word-text']");
    wordActions = wrapper.find("[data-cy='dictionary__word-actions']");
    editBtn = wrapper.find("[data-cy='dictionary__word-edit-btn']");
    removeBtn = wrapper.find("[data-cy='dictionary__word-remove-btn']");
  });

  it("renders component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the word text", () => {
    expect(wordText.exists()).toBe(true);
    expect(wordText.text()).toBe("test word");
  });

  it("renders drag handle", () => {
    expect(wordHandle.exists()).toBe(true);
    expect(wordHandle.text()).toBe("☰");
  });

  it("renders action buttons", () => {
    expect(wordActions.exists()).toBe(true);
    expect(editBtn.exists()).toBe(true);
    expect(removeBtn.exists()).toBe(true);
    expect(editBtn.text()).toBe("✏️");
    expect(removeBtn.text()).toBe("❌");
  });

  it("emits start-edit event when edit button is clicked", async () => {
    await editBtn.trigger("click");

    expect(wrapper.emitted("start-edit")).toBeTruthy();
    expect(wrapper.emitted("start-edit")).toHaveLength(1);
  });

  it("emits remove event when remove button is clicked", async () => {
    await removeBtn.trigger("click");

    expect(wrapper.emitted("remove")).toBeTruthy();
    expect(wrapper.emitted("remove")).toHaveLength(1);
  });

  it("emits finish-edit event when text loses focus", async () => {
    await wrapper.setProps({ isEditing: true });

    await wordText.trigger("blur");

    expect(wrapper.emitted("finish-edit")).toBeTruthy();
    expect(wrapper.emitted("finish-edit")?.[0]).toEqual(["test word"]);
  });

  it("emits finish-edit event when Enter key is pressed", async () => {
    await wrapper.setProps({ isEditing: true });

    await wordText.trigger("keydown.enter");

    expect(wrapper.emitted("finish-edit")).toBeTruthy();
    expect(wrapper.emitted("finish-edit")?.[0]).toEqual(["test word"]);
  });

  it("emits cancel-edit event when Escape key is pressed", async () => {
    await wrapper.setProps({ isEditing: true });

    await wordText.trigger("keydown.escape");

    expect(wrapper.emitted("cancel-edit")).toBeTruthy();
    expect(wrapper.emitted("cancel-edit")).toHaveLength(1);
  });

  describe("when editing", () => {
    beforeEach(async () => {
      await wrapper.setProps({ isEditing: true });
    });

    it("makes text contenteditable", () => {
      expect(wordText.attributes("contenteditable")).toBe("true");
    });

    it("applies editing CSS class", () => {
      expect(wordText.classes()).toContain("word-card__text--editing");
    });

    it("disables edit button", () => {
      expect(editBtn.attributes("disabled")).toBeDefined();
      expect(editBtn.classes()).toContain("word-card__button--disabled");
    });

    it("does not emit start-edit when edit button is clicked", async () => {
      await editBtn.trigger("click");

      expect(wrapper.emitted("start-edit")).toBeFalsy();
    });
  });

  describe("when not editing", () => {
    it("text is not contenteditable", () => {
      expect(wordText.attributes("contenteditable")).toBe("false");
    });

    it("does not apply editing CSS class", () => {
      expect(wordText.classes()).not.toContain("word-card__text--editing");
    });

    it("edit button is enabled", () => {
      expect(editBtn.attributes("disabled")).toBeUndefined();
      expect(editBtn.classes()).not.toContain("word-card__button--disabled");
    });
  });
});
