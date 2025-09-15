import { ref } from "vue";
import { generate } from "random-words";
import type { GenerateWordsOptions } from "../types/index";
import { DEFAULT_WORD_COUNT } from "../constants";
import { LOCAL_STORAGE_KEY } from "../constants";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../utils/localStorage";

export function useGenerateWords(options: GenerateWordsOptions = {}) {
  const { count = DEFAULT_WORD_COUNT } = options;

  const isLoading = ref(true);
  const error = ref<Error | null>(null);
  const loadingTime = ref<number>(0);
  const startTime = ref<number>(0);
  const progress = ref<number>(0);

  const setIsLoading = (value: boolean) => {
    if (value) {
      startTime.value = performance.now();
      loadingTime.value = 0;
      progress.value = 0;
    } else {
      const endTime = performance.now();
      loadingTime.value = Math.round(endTime - startTime.value);
      progress.value = 100;
      console.log(`Loading completed in ${loadingTime.value}ms`);
    }
    isLoading.value = value;
  };

  const setError = (err: Error | null) => {
    error.value = err;
  };

  const generateWords = async (): Promise<string[]> => {
    if (typeof Worker !== "undefined") {
      try {
        const WorkerModule = await import("../workers/word-generator.worker.ts?worker");
        const worker = new WorkerModule.default();

        return new Promise((resolve, reject) => {
          worker.onmessage = e => {
            const { type, progress: workerProgress, words, error } = e.data;

            if (type === "progress") {
              progress.value = workerProgress;
            } else if (type === "complete") {
              worker.terminate();
              resolve(words);
            } else if (type === "error") {
              console.error("Worker error:", error);
              worker.terminate();
              reject(new Error(error));
            }
          };

          worker.onerror = error => {
            console.error("Worker failed:", error);
            worker.terminate();
            reject(new Error("Worker failed to start"));
          };
          worker.postMessage({ count, batchSize: count });
        });
      } catch (workerError) {
        console.error("Failed to create worker:", workerError);
        return generateWordsMainThread();
      }
    } else {
      return generateWordsMainThread();
    }
  };

  const generateWordsMainThread = async (): Promise<string[]> => {
    const batchSize = 50;
    const totalBatches = Math.ceil(count / batchSize);
    const allWords: string[] = [];

    for (let i = 0; i < totalBatches; i++) {
      const wordsInThisBatch = Math.min(batchSize, count - i * batchSize);

      const batchWords = generate({
        min: 1,
        max: 1,
        exactly: wordsInThisBatch,
      }) as string[];

      allWords.push(...batchWords);

      progress.value = Math.round(((i + 1) / totalBatches) * 100);

      if (i > 0 && i % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }

    return allWords;
  };

  const loadWords = async (): Promise<string[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const localStorageWords = getItemFromLocalStorage(LOCAL_STORAGE_KEY);
      if (localStorageWords && localStorageWords.length) {
        return localStorageWords;
      }

      const generatedWords = await generateWords();
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
    loadingTime,
    progress,
  };
}
