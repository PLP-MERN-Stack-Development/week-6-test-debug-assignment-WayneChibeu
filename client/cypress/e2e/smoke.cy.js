describe('MERN App Smoke Test', () => {
  it('should load the homepage and display the main heading', () => {
    cy.visit('http://localhost:5000'); // Adjust port if your frontend runs elsewhere
    // Check for text or element you expect on the homepage
    cy.contains('MERN').should('exist');
  });
}); 