describe('Media Shield Workflow', () => {
  it('submits a headline for bias analysis using mocked Gemini API', () => {
    // 1. Visit Media Shield
    cy.visit('/media-shield');
    
    // 3. Intercept API call
    cy.intercept('POST', 'https://generativelanguage.googleapis.com/**', {
      statusCode: 200,
      body: {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: JSON.stringify({
                    bias_rating: 'center',
                    loaded_phrases: ['mocked loaded phrase'],
                    missing_context: 'Mocked missing context.',
                    credibility_score: 85,
                    summary: 'This is a mocked summary.'
                  })
                }
              ]
            }
          }
        ]
      }
    }).as('geminiApi');
    
    // 2. Type headline
    cy.get('textarea[placeholder="Paste article text or headline here..."]').type('Local government implements new zoning laws.');
    
    // 4. Click analyze
    cy.get('button').contains('Analyze with Gemini').click();
    
    // Wait for the mock intercept
    cy.wait('@geminiApi');
    
    // 5. Assert scorecard renders
    cy.contains('Live Source Analysis').should('be.visible');
    cy.contains('85/100').should('be.visible');
    cy.contains('center').should('be.visible');
    cy.contains('This is a mocked summary.').should('be.visible');
  });
});
