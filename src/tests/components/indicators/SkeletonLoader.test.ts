import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import SkeletonLoader from "../../../components/indicators/SkeletonLoader.vue";

describe("SkeletonLoader.vue", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(SkeletonLoader);
  });

  it("renders component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders default count of skeleton cards", () => {
    const skeletonCards = wrapper.findAll("[data-cy='dictionary__skeleton-card']");

    expect(skeletonCards).toHaveLength(10);
  });

  it("renders custom count of skeleton cards", async () => {
    await wrapper.setProps({ count: 5 });

    const skeletonCards = wrapper.findAll("[data-cy='dictionary__skeleton-card']");
    expect(skeletonCards).toHaveLength(5);
  });

  it("renders skeleton handles by default", () => {
    const skeletonHandles = wrapper.findAll("[data-cy='dictionary__skeleton-handle']");

    expect(skeletonHandles.length).toBeGreaterThan(0);
    expect(skeletonHandles).toHaveLength(10);
  });

  it("hides skeleton handles when showHandle is false", async () => {
    await wrapper.setProps({ showHandle: false });

    const skeletonHandles = wrapper.findAll("[data-cy='dictionary__skeleton-handle']");
    expect(skeletonHandles).toHaveLength(0);
  });

  it("renders skeleton text for each card", () => {
    const skeletonTexts = wrapper.findAll("[data-cy='dictionary__skeleton-text']");

    expect(skeletonTexts).toHaveLength(10);
  });

  it("renders skeleton actions by default", () => {
    const skeletonActions = wrapper.findAll("[data-cy='dictionary__skeleton-actions']");

    expect(skeletonActions).toHaveLength(10);
  });

  it("hides skeleton actions when showActions is false", async () => {
    const wrapper = mount(SkeletonLoader, {
      props: {
        showActions: false,
      },
    });

    const skeletonActions = wrapper.findAll("[data-cy='dictionary__skeleton-actions']");
    expect(skeletonActions).toHaveLength(0);
  });

  it("renders skeleton buttons within actions", () => {
    const skeletonButtons = wrapper.findAll("[data-cy='dictionary__skeleton-button']");

    expect(skeletonButtons).toHaveLength(20);
  });

  it("renders with custom configuration", async () => {
    await wrapper.setProps({ count: 3, showHandle: false, showActions: false });

    const skeletonCards = wrapper.findAll("[data-cy='dictionary__skeleton-card']");
    const skeletonHandles = wrapper.findAll("[data-cy='dictionary__skeleton-handle']");
    const skeletonActions = wrapper.findAll("[data-cy='dictionary__skeleton-actions']");
    const skeletonTexts = wrapper.findAll("[data-cy='dictionary__skeleton-text']");

    expect(skeletonCards).toHaveLength(3);
    expect(skeletonHandles).toHaveLength(0);
    expect(skeletonActions).toHaveLength(0);
    expect(skeletonTexts).toHaveLength(3);
  });
});
