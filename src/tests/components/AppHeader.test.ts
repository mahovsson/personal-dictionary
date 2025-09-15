import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import AppHeader from "../../components/layout/AppHeader.vue";

describe("AppHeader.vue", () => {
  let wrapper: ReturnType<typeof mount>;
  beforeEach(() => {
    wrapper = mount(AppHeader);
  });

  it("renders app correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the app title correctly", () => {
    const title = wrapper.find("[data-cy='dictionary__title']");

    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Personal dictionary 📔");
  });
});
