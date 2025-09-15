import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import EmptyMessageDisplay from "../../../components/indicators/EmptyMessageDisplay.vue";

describe("EmptyMessageDisplay.vue", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(EmptyMessageDisplay);
  });

  it("renders component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays empty message correctly", () => {
    const emptyMessage = wrapper.find("[data-cy='dictionary__empty-message']");

    expect(emptyMessage.exists()).toBe(true);
    expect(emptyMessage.text()).toBe("No words yet. Add some words to get started! 📝");
  });

  it("renders retry button", () => {
    const retryBtn = wrapper.find("[data-cy='dictionary__retry-btn']");

    expect(retryBtn.exists()).toBe(true);
    expect(retryBtn.text()).toBe("Retry");
  });

  it("emits click-retry event when retry button is clicked", async () => {
    const retryBtn = wrapper.find("[data-cy='dictionary__retry-btn']");

    await retryBtn.trigger("click");

    expect(wrapper.emitted("click-retry")).toBeTruthy();
    expect(wrapper.emitted("click-retry")).toHaveLength(1);
  });
});
