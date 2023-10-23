import React from "react";
import RandomImage from "../../app/random-image/page";
import SelectedSectionProvider from "../../providers/sectionstate";
import SidebarProvider from "@/providers/sidebar";
describe("<Random />", () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    cy.viewport(1280, 720);
    cy.intercept("GET", "**/breeds/image/random", {
      fixture: "random-image.json",
    }).as("dogs-list");
    cy.mount(
      <SelectedSectionProvider>
        <SidebarProvider>
          <RandomImage />
        </SidebarProvider>
      </SelectedSectionProvider>
    );
  });

  it("renders", () => {
    cy.get('[data-cy="random-image"]').should("exist");
  });
  it("display-flow", () => {
    cy.get('[data-cy="app-loader"]')
      .should("be.visible")
      .then(() => {
        // After we've successfully asserted the loading spinner is
        // visible, call the resolve function of the above Promise
        // to allow the response to the data request to occur...

        // ...and assert the spinner is removed from the DOM and
        // the dog image is shown instead.
        cy.get('[data-cy="app-loader"]').should("not.exist");
        cy.get('[data-cy="dog-image"]').should("be.visible");
      });
  });
});
