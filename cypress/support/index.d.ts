/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    clearDictionaryStorage(): Chainable<void>;
    waitForDictionary(): Chainable<void>;
    addWord(word: string): Chainable<void>;
    editFirstWord(newWord: string): Chainable<void>;
    deleteFirstWord(): Chainable<void>;
    shouldHaveWordCount(count: number): Chainable<void>;
  }
}
