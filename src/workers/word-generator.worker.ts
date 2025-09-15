import { generate } from "random-words";

self.onmessage = function (event: MessageEvent) {
  const { count, batchSize } = event.data;

  try {
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

      // Only send progress updates every 3 batches to reduce overhead
      if (i % 3 === 0 || i === totalBatches - 1) {
        const progress = Math.round(((i + 1) / totalBatches) * 100);
        self.postMessage({
          type: "progress",
          progress,
          wordsGenerated: allWords.length,
        });
      }
    }

    self.postMessage({
      type: "complete",
      words: allWords,
    });
  } catch (error) {
    self.postMessage({
      type: "error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
