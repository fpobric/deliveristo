/// <reference types="cypress" />

describe("breed-image-flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept("GET", "**/breeds/list/all", { fixture: "dog-list.json" }).as(
      "dogs-list"
    );
  });

  it("breed image select", () => {
    cy.get('[data-cy="breed-page"]').should("have.class", "breed-page");
    cy.get("#breed-select").click();
    cy.get("[id$=-option-5]").click();
    cy.get('[data-cy="dog-image"]').should("exist");

    cy.get('[data-cy="image-wrapper"]').should("have.class", "image-wrapper");

    cy.get('[data-cy="btn-previous"]').contains("Previous");
    cy.get('[data-cy="btn-next"]').contains("Next");
    for (let n = 0; n < 4; n++) {
      cy.get('[data-cy="btn-next"]').click();
      if (n < 4) cy.wait(1000);
    }

    cy.get('[data-cy="btn-next"]').should("be.disabled");

    for (let n = 0; n < 4; n++) {
      cy.get('[data-cy="btn-previous"]').click();
      if (n < 4) cy.wait(1000);
    }
    cy.get('[data-cy="btn-previous"]').should("be.disabled");
  });
});
