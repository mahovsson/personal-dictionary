import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import App from "../../App.vue";

describe("App.vue", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(App);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders AppHeader component", () => {
    const header = wrapper.findComponent({ name: "AppHeader" });
    expect(header.exists()).toBe(true);
  });

  it("renders PersonalDictionary component", () => {
    const dictionary = wrapper.findComponent({ name: "PersonalDictionary" });
    expect(dictionary.exists()).toBe(true);
  });
});
