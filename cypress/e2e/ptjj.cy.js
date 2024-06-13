describe('Portfolio Website Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html'); 
  });

  describe('Navigation Menu Tests', () => {
    it('should toggle the navigation menu', () => {
      cy.get('#nav-toggle').should('exist').then($navToggle => {
        if ($navToggle.css('display') === 'none' || !$navToggle.is(':visible')) {
          cy.wrap($navToggle).invoke('attr', 'style', 'display: block !important');
        }

        cy.wrap($navToggle).should('be.visible').click();
      });

      cy.get('#nav-menu').should('have.class', 'show-menu');

      cy.get('#nav-close').should('exist').then($navClose => {
        if ($navClose.css('display') === 'none' || !$navClose.is(':visible')) {
          cy.wrap($navClose).invoke('attr', 'style', 'display: block !important');
        }

        cy.wrap($navClose).should('be.visible').click();
      });

      cy.get('#nav-menu').should('not.have.class', 'show-menu');
    });

    it('should remove mobile menu on nav link click', () => {
      cy.get('#nav-toggle').should('exist').then($navToggle => {
        if ($navToggle.css('display') === 'none' || !$navToggle.is(':visible')) {
          cy.wrap($navToggle).invoke('attr', 'style', 'display: block !important');
        }

        cy.wrap($navToggle).click();
      });

      cy.get('#nav-menu').should('have.class', 'show-menu');

      cy.get('.nav__link').first().click({ force: true });
      cy.get('#nav-menu').should('not.have.class', 'show-menu');
    });
  });

  describe('Skills Accordion Tests', () => {
    it('should have the correct initial state', () => {
      cy.get('.skills__content').first().should('have.class', 'skills__open');
      cy.get('.skills__content').not(':first').each(($el) => {
        cy.wrap($el).should('have.class', 'skills__close');
      });
    });

    it('should open and close sections when their headers are clicked', () => {
      cy.get('.skills__content').first().should('have.class', 'skills__open');

      cy.get('.skills__header').first().click();
      cy.get('.skills__content').first().should('have.class', 'skills__close');

      cy.get('.skills__header').first().click();
      cy.get('.skills__content').first().should('have.class', 'skills__open');

      cy.get('.skills__header').eq(1).click();
      cy.get('.skills__content').eq(1).should('have.class', 'skills__open');
      cy.get('.skills__content').first().should('have.class', 'skills__close');
    });
  });

  describe('Swiper and Scroll Tests', () => {
    it('should initialize Swiper correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        expect(swiper).to.exist;
      });
    });

    it('should activate correct link on scroll', () => {
      cy.scrollTo('bottom');
      cy.get('section[id]').each((section) => {
        const sectionId = section.attr('id');
        const sectionTop = section.offset().top - 50;
        const sectionHeight = section.height();
        const isActive = cy.window().then((win) => {
          const scrollY = win.scrollY;
          return scrollY > sectionTop && scrollY <= sectionTop + sectionHeight;
        });

        cy.get(`.nav__menu a[href*=${sectionId}]`).should('have.class', 'active-link');
      });
    });

    it('should change header background on scroll', () => {
      cy.scrollTo(0, 100);
      cy.get('#header').should('have.class', 'scroll-header');

      cy.scrollTo(0, 50);
      cy.get('#header').should('not.have.class', 'scroll-header');
    });

    it('should show scroll up button on scroll', () => {
      cy.scrollTo(0, 600);
      cy.get('#scroll-up').should('have.class', 'show-scroll');

      cy.scrollTo(0, 500);
      cy.get('#scroll-up').should('not.have.class', 'show-scroll');
    });
  });

  describe('Theme Toggle Tests', () => {
    it('should toggle dark/light theme', () => {
      cy.get('#theme-button').click();
      cy.get('body').should('have.class', 'dark-theme');

      cy.get('#theme-button').click();
      cy.get('body').should('not.have.class', 'dark-theme');
    });

    it('should remember the selected theme after reload', () => {
      cy.get('#theme-button').click();
      cy.reload();
      cy.get('body').should('have.class', 'dark-theme');

      cy.get('#theme-button').click();
      cy.reload();
      cy.get('body').should('not.have.class', 'dark-theme');
    });

    it('should persist theme selection in localStorage', () => {
      cy.get('#theme-button').click();
      cy.window().then((win) => {
        expect(win.localStorage.getItem('selected-theme')).to.eq('dark');
        expect(win.localStorage.getItem('selected-icon')).to.eq('uil-moon');
      });

      cy.get('#theme-button').click();
      cy.window().then((win) => {
        expect(win.localStorage.getItem('selected-theme')).to.eq('light');
        expect(win.localStorage.getItem('selected-icon')).to.eq('uil-sun');
      });
    });

    it('should load the correct theme based on localStorage', () => {
      cy.window().then((win) => {
        win.localStorage.setItem('selected-theme', 'dark');
        win.localStorage.setItem('selected-icon', 'uil-moon');
      });
      cy.reload();
      cy.get('body').should('have.class', 'dark-theme');
      cy.get('#theme-button').should('have.class', 'uil-sun');

      cy.window().then((win) => {
        win.localStorage.setItem('selected-theme', 'light');
        win.localStorage.setItem('selected-icon', 'uil-sun');
      });
      cy.reload();
      cy.get('body').should('not.have.class', 'dark-theme');
      cy.get('#theme-button').should('have.class', 'uil-moon');
    });
  });
});