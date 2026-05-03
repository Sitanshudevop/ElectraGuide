describe('Timeline Workflow', () => {
  it('displays upcoming election entries', () => {
    // 1. Visit timeline
    cy.visit('/timeline');
    
    // 2. Assert timeline renders
    cy.contains('Election Timeline').should('be.visible');
    
    // 3. Assert key upcoming elections
    cy.contains('Gazette Notification Issued').should('be.visible');
    cy.contains('West Bengal Phase II Polling').should('be.visible');
    cy.contains('Counting of Votes').should('be.visible');
  });
});
