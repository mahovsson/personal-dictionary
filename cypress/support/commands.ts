// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

Cypress.Commands.add("clearDictionaryStorage", () => {
  cy.window().then(win => {
    win.localStorage.removeItem("personalDictionary");
  });
});

Cypress.Commands.add("waitForDictionary", () => {
  cy.get('[data-cy="dictionary__container"]').should("be.visible");
  cy.get('[data-cy="dictionary__word-list"]', { timeout: 15000 }).should("be.visible");
});

Cypress.Commands.add("addWord", (word: string) => {
  cy.get('[data-cy="dictionary__add-word-input"]').type(word);
  cy.get('[data-cy="dictionary__add-word-button"]').click();
  cy.contains('[data-cy="dictionary__word-text"]', word).should("be.visible");
});

Cypress.Commands.add("editFirstWord", (newWord: string) => {
  cy.get('[data-cy="dictionary__word-card"]')
    .first()
    .within(() => {
      cy.get('[data-cy="dictionary__word-edit-btn"]').click();
    });
  cy.get('[data-cy="dictionary__word-text"]')
    .first()
    .clear()
    .type(newWord + "{enter}");
  cy.contains('[data-cy="dictionary__word-text"]', newWord).should("be.visible");
});

Cypress.Commands.add("deleteFirstWord", () => {
  cy.get('[data-cy="dictionary__word-card"]')
    .first()
    .within(() => {
      cy.get('[data-cy="dictionary__word-remove-btn"]').click();
    });
});

Cypress.Commands.add("shouldHaveWordCount", (count: number) => {
  cy.get('[data-cy="dictionary__word-card"]').should("have.length", count);
});

export {};
