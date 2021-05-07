describe("Workflow test", () => {
  it("Ensure basic functionality", () => {
    cy.visit("http://localhost:3000");

    cy.contains("Spiel starten").click();
    cy.url().should("include", "/macke");

    cy.get("input").type("Hendrik").blur();
    cy.get("input").eq(1).type("Jessica").blur();
    cy.contains("Start").click();

    // Hendrik's first move
    cy.get("#roll-dices-button").click();
    cy.get(".macke-dice").eq(0).click();
    cy.get("#take-scores-button").click();
    cy.get("#finish-move-button").click();

    // Jessis's first move
    cy.get("#roll-dices-button").click();
    cy.get(".macke-dice").eq(0).click();
    cy.get(".macke-dice").eq(1).click();
    cy.get("#take-scores-button").click();
    cy.get("#finish-move-button").click();

    // Hendrik's second move
    cy.get("#roll-dices-button").click();
    cy.get(".macke-dice").eq(0).click();
    cy.get("#take-scores-button").click();
    cy.get("#finish-move-button").click();

    // Jessis's first move
    cy.get("#roll-dices-button").click();
    cy.get(".macke-dice").eq(0).click();
    cy.get(".macke-dice").eq(1).click();
    cy.get(".macke-dice").eq(2).click();
    cy.get(".macke-dice").eq(3).click();
    cy.get(".macke-dice").eq(4).click();
    cy.get("#take-scores-button").click();
    cy.contains("Punkte in in dieser Runde: 2000");
    cy.get("#finish-move-button").click();

    cy.contains("Hendrik (0)");
    cy.contains("Jessica (1)");
    cy.contains("Das Spiel ist zu Ende. Jessica hat gewonnen!");
    cy.contains("Punkte in in dieser Runde: 2000");
  });
});
