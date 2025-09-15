/// <reference types="cypress" />

describe("Personal Dictionary - Simple Walkthrough", () => {
  beforeEach(() => {
    cy.clearDictionaryStorage();
  });

  it("loads content, adds word, edits word, deletes word", () => {
    cy.visit("/");
    cy.waitForDictionary();

    const newWord = "wolf";
    cy.addWord(newWord);

    const editedWord = "wolwerine";
    cy.editFirstWord(editedWord);

    cy.deleteFirstWord();

    cy.get('[data-cy="dictionary__word-card"]').should("have.length.greaterThan", 0);
  });
});
