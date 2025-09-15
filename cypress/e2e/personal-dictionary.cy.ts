/// <reference types="cypress" />

describe("Personal Dictionary - Simple Walkthrough", () => {
  beforeEach(() => {
    cy.clearDictionaryStorage();
  });

  it("loads content, adds word, edits word, deletes word", () => {
    cy.visit("/");
    cy.waitForDictionary();

    const newWord = "cypress-" + Date.now();
    cy.addWord(newWord);

    const editedWord = "edited-" + Date.now();
    cy.editFirstWord(editedWord);

    cy.deleteFirstWord();

    cy.get('[data-cy="dictionary__word-card"]').should("have.length.greaterThan", 0);
  });
});
