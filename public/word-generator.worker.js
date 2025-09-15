import { generate } from 'random-words';

self.onmessage = function(e) {
  const { count, batchSize } = e.data;
  
  try {
    console.log(`Worker: Generating ${count} words with batch size ${batchSize}`);
    
    const totalBatches = Math.ceil(count / batchSize);
    const allWords = [];
    
    for (let i = 0; i < totalBatches; i++) {
      const wordsInThisBatch = Math.min(batchSize, count - i * batchSize);
      
      const batchWords = generate({ 
        min: 1, 
        max: 1, 
        exactly: wordsInThisBatch 
      });
      
      allWords.push(...batchWords);
      
      // Send progress update
      const progress = Math.round(((i + 1) / totalBatches) * 100);
      self.postMessage({ 
        type: 'progress', 
        progress, 
        wordsGenerated: allWords.length 
      });
    }
    
    // Send final result
    self.postMessage({ 
      type: 'complete', 
      words: allWords 
    });
    
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      error: error.message 
    });
  }
};
