import { describe, it, expect } from "vitest";
import { setItemToLocalStorage, getItemFromLocalStorage } from "../../utils/localStorage";

describe("localStorage", () => {
  const keys = ["test", "test1", "test2", "test3"];
  const items = [["word1", "word2"], [], ["apple"], ["test", "hello", "world"]];

  describe("Set", () => {
    it("Doesn't set if key is not a string", () => {
      // @ts-expect-error - Testing invalid input type
      setItemToLocalStorage(1, items[0]);
      // @ts-expect-error - Testing invalid input type
      let localStorageItem = localStorage.getItem(1);
      expect(localStorageItem).toBeNull();
    });

    it("Set items are equal to got after storage from LS", () => {
      items.forEach((item, i) => {
        setItemToLocalStorage(keys[i], item);
        let localStorageItem = JSON.parse(localStorage.getItem(keys[i]) || "null");
        expect(localStorageItem).toEqual(item);
      });
    });
  });

  describe("Get", () => {
    it("Doesn't get if key is not a string", () => {
      // @ts-expect-error - Testing invalid input type
      const localStorageItem = getItemFromLocalStorage(1);
      expect(localStorageItem).toBeNull();
    });

    it("Got items are equal to set after storage from LS", () => {
      items.forEach((item, i) => {
        localStorage.setItem(keys[i], JSON.stringify(item));
      });
      keys.forEach((key, i) => {
        const localStorageItem = getItemFromLocalStorage(key);
        expect(localStorageItem).toEqual(items[i]);
      });
    });
  });
});
