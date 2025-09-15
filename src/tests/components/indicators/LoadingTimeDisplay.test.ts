import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import LoadingTimeDisplay from "../../../components/indicators/LoadingTimeDisplay.vue";

describe("LoadingTimeDisplay.vue", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(LoadingTimeDisplay, {
      props: {
        loadingTime: 1500,
      },
    });
  });

  it("renders component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays loading time correctly", () => {
    const loadingText = wrapper.find("[data-cy='dictionary__loading-text']");

    expect(loadingText.exists()).toBe(true);
    expect(loadingText.text()).toBe("Data loaded in 1500ms");
  });

  it("displays loading time with different value", async () => {
    await wrapper.setProps({ loadingTime: 2300 });

    const loadingText = wrapper.find("[data-cy='dictionary__loading-text']");
    expect(loadingText.text()).toBe("Data loaded in 2300ms");
  });

  it("renders reload button", () => {
    const reloadBtn = wrapper.find("[data-cy='dictionary__reload-btn']");

    expect(reloadBtn.exists()).toBe(true);
    expect(reloadBtn.text()).toBe("🔄 Reload");
  });

  it("emits click-reload event when reload button is clicked", async () => {
    const reloadBtn = wrapper.find("[data-cy='dictionary__reload-btn']");

    await reloadBtn.trigger("click");

    expect(wrapper.emitted("click-reload")).toBeTruthy();
    expect(wrapper.emitted("click-reload")).toHaveLength(1);
  });
});
