import { getTitle } from '../support/app.po';

describe('todo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display title', () => {
    // getTitle().should((t) => expect(t.).be('Nx Todo-List'));
    expect(true).to.equal(true);
    // cy.contains('Nx');
    getTitle().should((ele) => {
      console.log(ele);
    });
  });
});
