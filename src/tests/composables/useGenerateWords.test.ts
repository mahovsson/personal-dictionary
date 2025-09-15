import { describe, it, expect, vi, beforeEach } from "vitest";
import { useGenerateWords } from "../../composables/useGenerateWords";
import { getItemFromLocalStorage } from "../../utils/localStorage";
import { generate } from "random-words";

vi.mock("../../utils/localStorage", () => ({
  setItemToLocalStorage: vi.fn(),
  getItemFromLocalStorage: vi.fn(() => []),
}));

vi.mock("../../constants", () => ({
  DEFAULT_WORD_COUNT: 3,
  LOCAL_STORAGE_KEY: "test-key",
}));

vi.mock("random-words", () => ({
  generate: vi.fn(() => ["batman", "aquaman", "wonder woman"]),
}));

const mockWorker = {
  postMessage: vi.fn(),
  terminate: vi.fn(),
  onmessage: null,
  onerror: null,
};

Object.defineProperty(window, "Worker", {
  value: vi.fn(() => mockWorker),
  writable: true,
});

describe("useGenerateWords", () => {
  describe("initial state", () => {
    it("starts with loading true", () => {
      const { isLoading } = useGenerateWords();
      expect(isLoading.value).toBe(true);
    });

    it("starts with no error", () => {
      const { error } = useGenerateWords();
      expect(error.value).toBeNull();
    });

    it("starts with zero loading time", () => {
      const { loadingTime } = useGenerateWords();
      expect(loadingTime.value).toBe(0);
    });
  });

  describe("loadWords", () => {
    it("returns words from localStorage when available", async () => {
      vi.mocked(getItemFromLocalStorage).mockReturnValue(["rambo", "superman"]);

      const { loadWords } = useGenerateWords();
      const result = await loadWords();

      expect(result).toEqual(["rambo", "superman"]);
    });

    it("sets loading to false after completion", async () => {
      vi.mocked(getItemFromLocalStorage).mockReturnValue(["test"]);

      const { loadWords, isLoading } = useGenerateWords();
      await loadWords();

      expect(isLoading.value).toBe(false);
    });

    describe("when Worker is not available", () => {
      beforeEach(() => {
        Object.defineProperty(window, "Worker", {
          value: undefined,
          writable: true,
        });
      });

      it("generates new words when localStorage is empty", async () => {
        vi.mocked(getItemFromLocalStorage).mockReturnValue([]);

        const { loadWords } = useGenerateWords();
        const result = await loadWords();

        expect(result).toEqual(["batman", "aquaman", "wonder woman"]);
      });

      it("sets loading time after completion", async () => {
        vi.mocked(getItemFromLocalStorage).mockReturnValue([]);

        const { loadWords, loadingTime } = useGenerateWords();
        await loadWords();

        expect(loadingTime.value).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe("error handling", () => {
    describe("when Worker is not available", () => {
      beforeEach(() => {
        Object.defineProperty(window, "Worker", {
          value: undefined,
          writable: true,
        });
      });

      it("sets error when generation fails", async () => {
        vi.mocked(getItemFromLocalStorage).mockReturnValue([]);
        vi.mocked(generate).mockImplementation(() => {
          throw new Error("Generation failed");
        });

        const { loadWords, error } = useGenerateWords();
        const result = await loadWords();

        expect(error.value).toBeTruthy();
        expect(result).toBeNull();
      });
    });
  });
});
