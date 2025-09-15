import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import AddWordInput from "../../../components/form/AddWordInput.vue";

describe("AddWordInput.vue", () => {
  let wrapper: ReturnType<typeof mount>;
  let input: ReturnType<typeof wrapper.find>;
  let button: ReturnType<typeof wrapper.find>;
  let form: ReturnType<typeof wrapper.find>;

  beforeEach(() => {
    wrapper = mount(AddWordInput);
    input = wrapper.find("[data-cy='dictionary__add-word-input']");
    button = wrapper.find("[data-cy='dictionary__add-word-button']");
    form = wrapper.find("[data-cy='dictionary__add-word-form']");
  });

  it("renders component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders input field with default placeholder", () => {
    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("Add a new word 👈");
    expect(input.attributes("type")).toBe("text");
  });

  it("renders add button with default text", () => {
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Add");
    expect(button.attributes("type")).toBe("submit");
  });

  it("updates input value when typing", async () => {
    await input.setValue("test word");

    expect((input.element as HTMLInputElement).value).toBe("test word");
  });

  it("button is disabled when input is empty", () => {
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("button is enabled when input has value", async () => {
    await input.setValue("test word");

    expect(button.attributes("disabled")).toBeUndefined();
  });

  it("button is disabled when input has only whitespace", async () => {
    await input.setValue("   ");

    expect(button.attributes("disabled")).toBeDefined();
  });

  it("emits add-word event when form is submitted", async () => {
    const input = wrapper.find("[data-cy='dictionary__add-word-input']");
    const form = wrapper.find("[data-cy='dictionary__add-word-form']");

    await input.setValue("test word");
    await form.trigger("submit.prevent");

    expect(wrapper.emitted("add-word")).toBeTruthy();
    expect(wrapper.emitted("add-word")?.[0]).toEqual(["test word"]);
  });

  it("button triggers form submission when clicked", async () => {
    const input = wrapper.find("[data-cy='dictionary__add-word-input']");
    const button = wrapper.find("[data-cy='dictionary__add-word-button']");

    await input.setValue("test word");

    expect(button.attributes("disabled")).toBeUndefined();
    expect(button.attributes("type")).toBe("submit");

    const form = wrapper.find("[data-cy='dictionary__add-word-form']");
    await form.trigger("submit");

    expect(wrapper.emitted("add-word")).toBeTruthy();
    expect(wrapper.emitted("add-word")?.[0]).toEqual(["test word"]);
  });

  it("trims whitespace from input before emitting", async () => {
    const input = wrapper.find("[data-cy='dictionary__add-word-input']");
    const form = wrapper.find("[data-cy='dictionary__add-word-form']");

    await input.setValue("  test word  ");
    await form.trigger("submit.prevent");

    expect(wrapper.emitted("add-word")?.[0]).toEqual(["test word"]);
  });

  it("clears input after successful submission", async () => {
    const input = wrapper.find("[data-cy='dictionary__add-word-input']");
    const form = wrapper.find("[data-cy='dictionary__add-word-form']");

    await input.setValue("test word");
    await form.trigger("submit.prevent");

    expect((input.element as HTMLInputElement).value).toBe("");
  });

  describe("when disabled", () => {
    beforeEach(async () => {
      await wrapper.setProps({ disabled: true });
    });

    it("does not emit when form is submitted", async () => {
      await input.setValue("test word");
      await form.trigger("submit.prevent");

      expect(wrapper.emitted("add-word")).toBeFalsy();
    });

    it("shows loading placeholder", () => {
      expect(input.attributes("placeholder")).toBe("Loading words...");
      expect(input.attributes("disabled")).toBeDefined();
    });

    it("shows loading button text", () => {
      expect(button.text()).toBe("Loading...");
      expect(button.attributes("disabled")).toBeDefined();
    });

    it("applies disabled CSS classes", () => {
      expect(input.classes()).toContain("dictionary__add-word-input--disabled");
      expect(button.classes()).toContain("dictionary__add-word-button--disabled");
    });
  });

  it("does not submit empty or whitespace-only input", async () => {
    const input = wrapper.find("[data-cy='dictionary__add-word-input']");
    const form = wrapper.find("[data-cy='dictionary__add-word-form']");

    await input.setValue("");
    await form.trigger("submit.prevent");
    expect(wrapper.emitted("add-word")).toBeFalsy();

    await input.setValue("   ");
    await form.trigger("submit.prevent");
    expect(wrapper.emitted("add-word")).toBeFalsy();
  });
});
