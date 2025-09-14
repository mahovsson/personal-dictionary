import { ref } from "vue";
import { generate } from "random-words";
import type { GenerateWordsOptions } from "../types/index";
import { DEFAULT_WORD_COUNT, DEFAULT_DELAY_MS } from "../constants";
import { LOCAL_STORAGE_KEY } from "../constants";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../utils/localStorage";

export function useGenerateWords(options: GenerateWordsOptions = {}) {
  const { count = DEFAULT_WORD_COUNT, delay = DEFAULT_DELAY_MS } = options;

  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  const setIsLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setError = (err: Error | null) => {
    error.value = err;
  };

  const generateWordsAsync = async (): Promise<string[]> => {
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    return generate({ min: 1, max: 1, exactly: count }) as string[];
  };

  const loadFromLocalStorageAsync = async (): Promise<string[] | null> => {
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    const localStorageWords = getItemFromLocalStorage(LOCAL_STORAGE_KEY);
    return localStorageWords;
  };

  const loadWords = async (): Promise<string[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const localStorageWords = await loadFromLocalStorageAsync();
      if (localStorageWords && localStorageWords.length) {
        return localStorageWords;
      }

      const generatedWords = await generateWordsAsync();
      if (!generatedWords.length) {
        return [];
      }

      setItemToLocalStorage(LOCAL_STORAGE_KEY, generatedWords);
      return generatedWords;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to generate words"));
      console.error("Failed to generate words:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reloadWords = () => {
    loadWords();
  };

  return {
    loadWords,
    isLoading,
    error,
    reloadWords,
  };
}
