describe('Quiz Workflow', () => {
  it('navigates to quiz, answers a question, and proceeds', () => {
    // 1. Visit homepage
    cy.visit('/');
    
    // 2. Click on Interactive Quiz
    cy.contains('Interactive Quiz').click();
    
    // 3. Verify URL
    cy.url().should('include', '/quiz');
    cy.contains('Knowledge Quiz').should('be.visible');
    
    // 4. Select an option and click Next
    cy.contains('Question 1 of 3').should('be.visible');
    cy.get('button').contains('USA').click(); // Select first option
    cy.get('button').contains('Next').click();
    
    // 5. Assert progression to next question
    cy.contains('Question 2 of 3').should('be.visible');
  });
});
