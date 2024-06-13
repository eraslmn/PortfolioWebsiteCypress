describe('Portfolio Website - Home Page', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
  });

  it('should display the logo correctly', () => {
    cy.get('.nav__logo').should('contain', 'Venkatesh');
  });

  it('should display the correct title and subtitle', () => {
    cy.get('.home__title').should('contain', "Hi, I'm Venkatesh Kamath");
    cy.get('.home__subtitle').should('contain', 'Information Science Engineering Student');
  });

  it('should display social links', () => {
    cy.get('.home__social-icon').should('have.length', 2);
    cy.get('.home__social-icon[href="https://www.linkedin.com/in/venkateeshh/"]').should('exist');
    cy.get('.home__social-icon[href="https://github.com/Venkateeshh"]').should('exist');
  });

  it('should display the contact button with correct text', () => {
    cy.get('.button--flex').contains('Contact me').should('exist');
  });

  it('should display the scroll down button', () => {
    cy.get('.home__scroll-button').should('exist');
    cy.get('.home__scroll-mouse').should('exist');
    cy.get('.home__scroll-name').should('contain', 'Scroll down');
    cy.get('.home__scroll-arrow').should('exist');
  });

  it('should display the home image', () => {
    cy.get('.home__blob-img').should('exist');
  });
});

describe('Portfolio Website - Navigation', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
  });

  it('should navigate to the About section', () => {
    cy.get('.nav__link').contains('About').click();
    cy.url().should('include', '#about');
    cy.get('.section__title').should('contain', 'About Me');
  });

  it('should navigate to the Skills section', () => {
    cy.get('.nav__link').contains('Skills').click();
    cy.url().should('include', '#skills');
    cy.get('.section__title').should('contain', 'Skills');
  });

  it('should navigate to the Qualification section', () => {
    cy.get('.nav__link').contains('Qualification').click();
    cy.url().should('include', '#qualification');
    cy.get('.section__title').should('contain', 'Qualification');
  });

  it('should navigate to the Projects section', () => {
    cy.get('.nav__link').contains('Projects').click();
    cy.url().should('include', '#portfolio');
    cy.get('.section__title').should('contain', 'Projects');
  });

  it('should navigate to the Contact-Me section', () => {
    cy.get('.nav__link').contains('Contact-Me').click();
    cy.url().should('include', '#contact');
    cy.get('.section__title').should('contain', 'Contact Me');
  });

  it('should open and close the mobile menu', () => {
    cy.viewport('iphone-6'); // Set viewport to mobile size
    cy.get('#nav-toggle').should('be.visible').click();
    cy.get('#nav-menu').should('have.class', 'show-menu');
    cy.get('#nav-close').click();
    cy.get('#nav-menu').should('not.have.class', 'show-menu');
  });
});

describe('Portfolio Website - About Section', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
    cy.get('.nav__link').contains('About').click();
  });

  it('should display the About section title and subtitle', () => {
    cy.get('.section__title').should('contain', 'About Me');
    cy.get('.section__subtitle').should('contain', 'My introduction');
  });

  it('should display the About description', () => {
    cy.get('.about__description').should('contain', "I'm a third-year ISE undergraduate");
  });

  it('should display the correct aggregate CGPA', () => {
    cy.get('.about__info-title').contains('08.30+').should('exist');
  });

  it('should display the correct number of projects', () => {
    cy.get('.about__info-title').contains('04+').should('exist');
  });

  it('should display the correct months of experience', () => {
    cy.get('.about__info-title').contains('01+').should('exist');
  });

  it('should have a Download CV button', () => {
    cy.get('.button--flex').contains('Download CV').should('exist');
  });
});

describe('Portfolio Website - Skills Section', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
    cy.get('.nav__link').contains('Skills').click();
  });

  it('should display the Skills section title and subtitle', () => {
    cy.get('.section__title').should('contain', 'Skills');
    cy.get('.section__subtitle').should('contain', 'My technical level');
  });

  it('should display Programming Languages', () => {
    cy.get('.skills__title').contains('Programming Languages').should('exist');
    cy.get('.skills__name').contains('C').should('exist');
    cy.get('.skills__name').contains('Java').should('exist');
    cy.get('.skills__name').contains('JavaScript').should('exist');
    cy.get('.skills__name').contains('Python').should('exist');
    cy.get('.skills__name').contains('TypeScript').should('exist');
  });

  it('should display IT Constructs', () => {
    cy.get('.skills__title').contains('IT Constructs').should('exist');
    cy.get('.skills__name').contains('DBMS').should('exist');
    cy.get('.skills__name').contains('DS & Algorithms').should('exist');
    cy.get('.skills__name').contains('OOP').should('exist');
    cy.get('.skills__name').contains('OS').should('exist');
  });
});

describe('Portfolio Website - Qualification Section', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
    cy.get('.nav__link').contains('Qualification').click();
    cy.wait(1000); // Ensure page and elements are fully loaded
  });

  it('should display the Qualification section title and subtitle', () => {
    cy.get('.section__title').should('contain', 'Qualification');
    cy.get('.section__subtitle').should('contain', 'My personal journey');
  });

  it('should display all qualifications', () => {
    cy.get('.qualification__title').should('exist');
    cy.get('.qualification__subtitle').should('exist');
    cy.get('.qualification__calender').should('exist');
  });

  it('should display the SSLC qualification', () => {
    cy.get('.qualification__title').contains('SSLC').should('exist');
    cy.get('.qualification__subtitle').contains('S.V.S High School').should('exist');
    cy.get('.qualification__calender').contains('2019').should('exist');
  });

  it('should display the Class 12th qualification', () => {
    cy.get('.qualification__title').contains('Class 12th').should('exist');
    cy.get('.qualification__subtitle').contains('Vidyodaya Pre University College').should('exist');
    cy.get('.qualification__calender').contains('2021').should('exist');
  });

  it('should display the College qualification', () => {
    // Adding wait and log for debugging
    cy.wait(1000); // Ensure the content is fully loaded
    cy.get('.qualification__title').contains('College').should('exist').then(($title) => {
      console.log('College Title:', $title.text());
    });

    cy.get('.qualification__subtitle').contains('Canara Enginnering College, Manglore').should('exist').then(($subtitle) => {
      console.log('College Subtitle:', $subtitle.text());
    });

    cy.get('.qualification__calender').contains('2021 - 2025').should('exist').then(($calendar) => {
      console.log('College Calendar:', $calendar.text());
    });
  });
});


describe('Portfolio Website - Projects Section', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
    cy.get('.nav__link').contains('Projects').click();
  });

  it('should display the Projects section title and subtitle', () => {
    cy.get('.section__title').should('contain', 'Projects');
    cy.get('.section__subtitle').should('contain', 'Most recent work');
  });

  it('should display all projects', () => {
    cy.get('.portfolio__content').should('have.length.at.least', 1); // Ensure there is at least one project
  });

  it('should display the DarkSurfer-Extension project', () => {
    cy.get('.portfolio__title').contains('DarkSurfer-Extension').should('exist');
    cy.get('.portfolio__description').contains('DarkSurfer-Extension, is a project based on the application of advanced Language Models LMs to detect and eliminate dark patterns on websites.').should('exist');
    cy.get('.portfolio__button[href="https://github.com/Venkateeshh/DarkSurfer-Extension"]').should('exist');
    cy.get('.portfolio__button[href="https://darksurfer.streamlit.app/"]').should('exist');
  });

  it('should display the Responsive-Weather-Forecast-Website project', () => {
    cy.get('.portfolio__title').contains('Responsive-Weather-Forecast-Website').should('exist');
    cy.get('.portfolio__description').contains('This project is a weather website that provides live weather updates and forecasts based on your location.').should('exist');
    cy.get('.portfolio__button[href="https://github.com/Venkateeshh/Weather-App"]').should('exist');
    cy.get('.portfolio__button[href="https://venkateeshh.github.io/Weather-App/"]').should('exist');
  });

  it('should display the Spotify-Clone project', () => {
    cy.get('.portfolio__title').contains('Spotify-Clone').should('exist');
    cy.get('.portfolio__description').contains('Spotify Clone is a web app developed using HTML, CSS, and JavaScript.').should('exist');
    cy.get('.portfolio__button[href="https://github.com/Venkateeshh/Spotify-Clone"]').should('exist');
    cy.get('.portfolio__button[href="https://venkateeshh.github.io/Spotify-Clone/"]').should('exist');
  });

  it('should display the Language Translator project', () => {
    cy.get('.portfolio__title').contains('Language Translator').should('exist');
    cy.get('.portfolio__description').contains('This language translator web app is a user-friendly tool built with HTML, CSS, and JavaScript.').should('exist');
    cy.get('.portfolio__button[href="https://github.com/Venkateeshh/Js-Language-Translator"]').should('exist');
    cy.get('.portfolio__button[href="https://venkateeshh.github.io/Js-Language-Translator/"]').should('exist');
  });

  it('should display the Sorting Visualizer project', () => {
    cy.get('.portfolio__title').contains('Sorting Visualizer').should('exist');
    cy.get('.portfolio__description').contains('Sorting Visualizer is a Java-based project that allows users to visualize various sorting algorithms in action using a Graphical User Interface (GUI).').should('exist');
    cy.get('.portfolio__button[href="https://github.com/Venkateeshh/Sorting-Visualizer"]').should('exist');
    cy.get('.portfolio__button[href="https://www.linkedin.com/posts/venkatesh-kamath-_algorithmdesign-sortingvisualizer-javaprojects-activity-7095437035125043200-fWDl?utm_source=share&utm_medium=member_desktop"]').should('exist');
  });
});

describe('Portfolio Website - Contact Form', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
    cy.wait(1000); // Ensure page and elements are fully loaded
  });

  it('should have a working contact form', () => {
    // Log the entire HTML for debugging
    cy.document().then((doc) => {
      console.log(doc.documentElement.innerHTML);
    });

    // Wait for the Contact-Me link to be visible and click it
    cy.get('.nav__link').contains('Contact-Me').should('be.visible').click();

    // Wait for the contact form section to be visible
    cy.get('#contact').should('be.visible').then(($contactSection) => {
      console.log('Contact section HTML:', $contactSection.html());
    });

    // Wait for the contact form to be visible
    cy.get('.contact__form').should('be.visible').then(($form) => {
      console.log('Form content:', $form.html());
    });

    // Confirm element availability with debug
    cy.get('.contact__form input[type="text"]').should('exist').then(($el) => {
      console.log('Input Name:', $el);
    }).should('be.visible').type('Test User');

    cy.get('.contact__form input[type="Email"]').should('exist').then(($el) => {
      console.log('Input Email:', $el);
    }).should('be.visible').type('testuser@example.com');

    cy.get('.contact__form textarea').should('exist').then(($el) => {
      console.log('Textarea Message:', $el);
    }).should('be.visible').type('This is a test message.');

    // Prevent default behavior of the "Send Message" button
    cy.get('.button--flex').contains('Send Message').then(($el) => {
      $el.on('click', (e) => {
        e.preventDefault();
      });
    }).click();
  });
});

describe('Portfolio Website - Responsive Design', () => {
  const viewports = ['iphone-6', 'ipad-2', [1024, 768]];

  viewports.forEach((viewport) => {
    it(`should display correctly on ${Array.isArray(viewport) ? viewport.join('x') : viewport}`, () => {
      if (Array.isArray(viewport)) {
        cy.viewport(viewport[0], viewport[1]);
      } else {
        cy.viewport(viewport);
      }
      cy.visit('http://127.0.0.1:8080/index.html');
      cy.get('.nav__logo').should('be.visible');

      if (viewport === 'iphone-6' || viewport === 'ipad-2') {
        cy.wait(500); // Add a brief wait to allow the element to be visible
        cy.get('body').then(($body) => {
          if ($body.find('#nav-toggle').is(':visible')) {
            cy.get('#nav-toggle').should('be.visible').click();
            cy.get('#nav-menu').should('be.visible');
            cy.get('#nav-close').click();
            cy.get('#nav-menu').should('not.be.visible');
          } else {
            cy.log('#nav-toggle is not visible in this viewport');
          }
        });
      }
    });
  });
});

describe('Portfolio Website - Performance', () => {
  it('should load the home page within acceptable time', () => {
    cy.visit('http://127.0.0.1:8080/index.html', { timeout: 10000 });
    cy.get('.nav__logo').should('be.visible');
  });


  describe('Portfolio Website - Footer', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:8080/index.html');
    });
  
    it('should navigate to the Qualification section from footer', () => {
      cy.get('.footer__link').contains('Qualification').click();
      cy.url().should('include', '#qualification');
      cy.get('.section__title').should('contain', 'Qualification');
    });
  
    it('should navigate to the Portfolio section from footer', () => {
      cy.get('.footer__link').contains('Portfolio').click();
      cy.url().should('include', '#portfolio');
      cy.get('.section__title').should('contain', 'Projects');
    });
  
    it('should navigate to the Contact-Me section from footer', () => {
      cy.get('.footer__link').contains('Contact-Me').click();
      cy.url().should('include', '#contact');
      cy.get('.section__title').should('contain', 'Contact Me');
    });
  });

  

  describe('Portfolio Website - Social Media Links', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
  });

  it('should have working social media links in the footer', () => {
    cy.get('.footer__social[href="https://www.instagram.com/venkateeshh/"]').should('have.attr', 'target', '__blank');
    cy.get('.footer__social[href="https://twitter.com/Venkateeshhh"]').should('have.attr', 'target', '__blank');
  });

  it('should have working social media links in the home section', () => {
    cy.get('.home__social-icon[href="https://www.linkedin.com/in/venkateeshh/"]').should('have.attr', 'target', '_blank');
    cy.get('.home__social-icon[href="https://github.com/Venkateeshh"]').should('have.attr', 'target', '_blank');
  });
});

});
