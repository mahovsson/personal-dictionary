import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import ErrorMessageDisplay from "../../../components/indicators/ErrorMessageDisplay.vue";

describe("ErrorMessageDisplay.vue", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(ErrorMessageDisplay);
  });

  it("renders component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays error message correctly", () => {
    const errorMessage = wrapper.find("[data-cy='dictionary__error-message']");

    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe("😕 Failed to load words. Please try again.");
  });

  it("renders retry button", () => {
    const retryBtn = wrapper.find("[data-cy='dictionary__error-retry-btn']");

    expect(retryBtn.exists()).toBe(true);
    expect(retryBtn.text()).toBe("Retry");
  });

  it("emits click-retry event when retry button is clicked", async () => {
    const retryBtn = wrapper.find("[data-cy='dictionary__error-retry-btn']");

    await retryBtn.trigger("click");

    expect(wrapper.emitted("click-retry")).toBeTruthy();
    expect(wrapper.emitted("click-retry")).toHaveLength(1);
  });
});
