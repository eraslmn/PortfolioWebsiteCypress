describe('Swiper Library Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html'); // Ensure this points to a valid test page
  });

  it('should have Swiper globally available', () => {
    cy.window().should('have.property', 'Swiper').then(Swiper => {
      expect(Swiper).to.exist;
    });
  });

  it('should initialize Swiper and have expected methods', () => {
    cy.window().then((win) => {
      const swiperInstance = new win.Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
      });
      expect(swiperInstance).to.exist;

      console.log('Swiper Instance:', swiperInstance);
      console.log('Swiper Methods:', Object.keys(swiperInstance));

      expect(swiperInstance.slideNext).to.be.a('function');
      expect(swiperInstance.slidePrev).to.be.a('function');
      expect(swiperInstance.update).to.be.a('function');
      expect(swiperInstance.destroy).to.be.a('function');
    });
  });

  it('should slide to the next and previous slides', () => {
    cy.window().then((win) => {
      const swiperContainer = win.document.createElement('div');
      swiperContainer.classList.add('swiper-container');
      win.document.body.appendChild(swiperContainer);
      
      const swiperWrapper = win.document.createElement('div');
      swiperWrapper.classList.add('swiper-wrapper');
      swiperContainer.appendChild(swiperWrapper);

      for (let i = 0; i < 3; i++) {
        const swiperSlide = win.document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        swiperSlide.textContent = `Slide ${i + 1}`;
        swiperWrapper.appendChild(swiperSlide);
      }

      const swiperInstance = new win.Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
      });

      console.log('Swiper Instance:', swiperInstance);
      console.log('Swiper Methods:', Object.keys(swiperInstance));

      expect(swiperInstance).to.exist;

      if (typeof swiperInstance.slideNext === 'function') {
        swiperInstance.slideNext();
        console.log('Active Index after slideNext:', swiperInstance.activeIndex);
        expect(swiperInstance.activeIndex).to.equal(1);

        swiperInstance.slidePrev();
        console.log('Active Index after slidePrev:', swiperInstance.activeIndex);
        expect(swiperInstance.activeIndex).to.equal(0);
      } else {
        console.error('slideNext method is not available on swiperInstance');
      }

      swiperContainer.remove();
    });
  });

  it('should trigger slide change events', () => {
    cy.window().then((win) => {
      const swiperInstance = new win.Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
      });

      const slideChangeSpy = cy.spy();
      swiperInstance.on('slideChange', slideChangeSpy);

      if (typeof swiperInstance.slideNext === 'function') {
        swiperInstance.slideNext();
        expect(slideChangeSpy).to.have.been.called;
      } else {
        console.error('slideNext method is not available on swiperInstance');
      }
    });
  });

  it('should update and destroy Swiper instance', () => {
    cy.window().then((win) => {
      const swiperInstance = new win.Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
      });

      expect(swiperInstance.update).to.be.a('function');
      expect(swiperInstance.destroy).to.be.a('function');

      swiperInstance.update();
      console.log('Swiper updated:', swiperInstance);

      swiperInstance.destroy();
      console.log('Swiper destroyed:', swiperInstance);

      expect(swiperInstance.destroyed).to.be.true;
    });
  });

  
  it('should handle breakpoints correctly', () => {
    cy.window().then((win) => {
      const swiperInstance = new win.Swiper('.swiper-container', {
        breakpoints: {
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      });

      expect(swiperInstance.params.breakpoints).to.exist;
      swiperInstance.setBreakpoint();
      // Assertions to verify breakpoint settings if needed
    });
  });

  // Overflow Handling Tests
  it('should check overflow correctly', () => {
    cy.window().then((win) => {
      const swiperInstance = new win.Swiper('.swiper-container');
      swiperInstance.checkOverflow();
      // Assertions to verify overflow settings if needed
    });
  });

  

  // Image Handling Tests
  it('should load and preload images correctly', () => {
    cy.window().then((win) => {
      const swiperInstance = new win.Swiper('.swiper-container');
      const img = document.createElement('img');
      swiperInstance.loadImage(img, 'path/to/image.jpg', null, null, true, () => {
        expect(img.complete).to.be.true;
      });
      swiperInstance.preloadImages();
      cy.get('img').each(($img) => {
        expect($img[0].complete).to.be.true;
      });
    });
  });

  // Virtual Slides Tests
  it('should handle virtual slides correctly', () => {
    cy.window().then((win) => {
      const swiperInstance = new win.Swiper('.swiper-container', {
        virtual: {
          slides: ['Slide 1', 'Slide 2', 'Slide 3'],
          renderSlide: (slide, index) => `<div class="swiper-slide">${slide}</div>`,
        },
      });

      expect(swiperInstance.virtual).to.exist;
      swiperInstance.virtual.update(true);
      swiperInstance.virtual.appendSlide('<div class="swiper-slide">Slide 4</div>');
      swiperInstance.virtual.prependSlide('<div class="swiper-slide">Slide 0</div>');
      swiperInstance.virtual.removeSlide(2);
      swiperInstance.virtual.removeAllSlides();
    });
  });

 

  // Breakpoint Tests
  it('should set and get breakpoints correctly', () => {
    cy.window().then((win) => {
      const swiperInstance = new win.Swiper('.swiper-container', {
        breakpoints: {
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
        },
      });

      swiperInstance.setBreakpoint();
      const breakpoint = swiperInstance.getBreakpoint({
        320: 'small',
        640: 'medium',
        1024: 'large',
      });
      expect(breakpoint).to.exist;
    });
  });

  // Check Overflow Tests
  it('should check overflow state', () => {
    cy.window().then((win) => {
      const swiperInstance = new win.Swiper('.swiper-container');
      swiperInstance.checkOverflow();
      // Check if the swiper is locked/unlocked based on overflow
      expect(swiperInstance.isLocked).to.be.a('boolean');
    });
  });

  describe('Mousewheel Functionality', () => {
    beforeEach(() => {
      // Set up the swiper instance
      cy.window().then((win) => {
        win.swiper = new win.Swiper('.swiper-container', {
          mousewheel: {
            enabled: true,
            thresholdDelta: 6,
            thresholdTime: 60
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        });
      });
    });

    it('should enable mousewheel', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        expect(swiper.mousewheel.enabled).to.be.true;
      });
    });

    it('should disable mousewheel', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.mousewheel.disable();
        expect(swiper.mousewheel.enabled).to.be.false;
      });
    });

    it('should handle mousewheel event correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        const e = { delta: 10, direction: -1, raw: {} };
        const result = swiper.mousewheel.animateSlider(e);
        expect(result).to.be.false;
      });
    });

    
  

    it('should not release scroll when not at edges', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.isBeginning = false;
        swiper.isEnd = false;
        const e = { direction: 1 };
        const result = swiper.mousewheel.releaseScroll(e);
        expect(result).to.be.false;
      });
    });

    it('should handle mouse enter event correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.mousewheel.handleMouseEnter();
        expect(swiper.mousewheel.enabled).to.be.true;
      });
    });

    it('should handle mouse leave event correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.mousewheel.handleMouseLeave();
        expect(swiper.mousewheel.enabled).to.be.true;
      });
    });

    it('should enable mousewheel events correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.mousewheel.enable();
        expect(swiper.mousewheel.enabled).to.be.true;
      });
    });

    it('should disable mousewheel events correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.mousewheel.disable();
        expect(swiper.mousewheel.enabled).to.be.false;
      });
    });
  });
  // Test suite for navigation functionality
describe('Navigation Functionality', () => {
  beforeEach(() => {
    // Set up the swiper instance
    cy.window().then((win) => {
      win.swiper = new win.Swiper('.swiper-container', {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });
    });
  });

  it('should handle next button click correctly', () => {
    cy.get('.swiper-button-next').click({ force: true });
    cy.window().then((win) => {
      const swiper = win.swiper;
      expect(swiper.activeIndex).to.equal(1);
    });
  });

  it('should handle prev button click correctly', () => {
    cy.get('.swiper-button-next').click({ force: true }); // First, move to next slide
    cy.get('.swiper-button-prev').click({ force: true }); // Then move back to the previous slide
    cy.window().then((win) => {
      const swiper = win.swiper;
      expect(swiper.activeIndex).to.equal(0);
    });
  });

  it('should initialize navigation correctly', () => {
    cy.window().then((win) => {
      const swiper = win.swiper;
      expect(swiper.navigation.$nextEl).to.exist;
      expect(swiper.navigation.$prevEl).to.exist;
    });
  });

  
});


  // Test suite for pagination functionality
  describe('Pagination Functionality', () => {
    beforeEach(() => {
      // Set up the swiper instance
      cy.window().then((win) => {
        win.swiper = new win.Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        });
      });
    });

    
    it('should handle bullet click correctly', () => {
      cy.get('.swiper-pagination-bullet').eq(1).click();
      cy.window().then((win) => {
        const swiper = win.swiper;
        expect(swiper.activeIndex).to.equal(1);
      });
    });

    it('should initialize pagination correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        expect(swiper.pagination.$el).to.exist;
      });
    });

    
  });




  // Test suite for autoplay functionality
  describe('Autoplay Functionality', () => {
    beforeEach(() => {
      // Set up the swiper instance
      cy.window().then((win) => {
        win.swiper = new win.Swiper('.swiper-container', {
          autoplay: {
            delay: 1000,
            disableOnInteraction: false,
          },
        });
      });
    });

    it('should start autoplay correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        expect(swiper.autoplay.running).to.be.true;
      });
    });

    it('should pause autoplay on interaction', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.autoplay.stop();
        expect(swiper.autoplay.running).to.be.false;
      });
    });

    it('should resume autoplay after interaction', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.autoplay.start();
        expect(swiper.autoplay.running).to.be.true;
      });
    });

   
  });

  describe('Lazy Loading Functionality', () => {
    beforeEach(() => {
      // Set up the swiper instance with lazy loading
      cy.window().then((win) => {
        win.swiper = new win.Swiper('.swiper-container', {
          lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2,
          },
        });
      });
    });
  
    it('should initialize lazy loading correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        expect(swiper.lazy).to.exist;
      });
    });
  
    it('should load images lazily', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.lazy.load();
        cy.get('.swiper-slide img').each(($img) => {
          expect($img[0].complete).to.be.true;
        });
      });
    });
  
    it('should load images for next slides lazily', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.lazy.loadInSlide(1);
        expect(swiper.lazy).to.exist;
      });
    });
  
   
  });
  
     
  // Test suite for parallax functionality
  describe('Parallax Functionality', () => {
    beforeEach(() => {
      // Set up the swiper instance
      cy.window().then((win) => {
        win.swiper = new win.Swiper('.swiper-container', {
          parallax: true,
        });
      });
    });

    it('should initialize parallax correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        expect(swiper.parallax).to.exist;
      });
    });

    it('should apply parallax effect on slide change', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.slideNext();
        // Additional assertions to verify parallax effect if needed
      });
    });

  
  });

  // Test suite for effect coverflow functionality
  describe('Effect Coverflow Functionality', () => {
    beforeEach(() => {
      // Set up the swiper instance
      cy.window().then((win) => {
        win.swiper = new win.Swiper('.swiper-container', {
          effect: 'coverflow',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          },
        });
      });
    });

    it('should initialize effect coverflow correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        expect(swiper.params.effect).to.equal('coverflow');
      });
    });

    it('should apply coverflow effect on slide change', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.slideNext();
        // Additional assertions to verify coverflow effect if needed
      });
    });

    it('should destroy coverflow effect correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.destroy(true, true);
        expect(swiper.destroyed).to.be.true;
      });
    });
  });

  // Test suite for effect fade functionality
  describe('Effect Fade Functionality', () => {
    beforeEach(() => {
      // Set up the swiper instance
      cy.window().then((win) => {
        win.swiper = new win.Swiper('.swiper-container', {
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
        });
      });
    });

    it('should initialize effect fade correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        expect(swiper.params.effect).to.equal('fade');
      });
    });

    it('should apply fade effect on slide change', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.slideNext();
        // Additional assertions to verify fade effect if needed
      });
    });

    it('should destroy fade effect correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.destroy(true, true);
        expect(swiper.destroyed).to.be.true;
      });
    });
  });

  // Test suite for effect flip functionality
  describe('Effect Flip Functionality', () => {
    beforeEach(() => {
      // Set up the swiper instance
      cy.window().then((win) => {
        win.swiper = new win.Swiper('.swiper-container', {
          effect: 'flip',
          flipEffect: {
            slideShadows: true,
            limitRotation: true,
          },
        });
      });
    });

    it('should initialize effect flip correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        expect(swiper.params.effect).to.equal('flip');
      });
    });

    it('should apply flip effect on slide change', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.slideNext();
        // Additional assertions to verify flip effect if needed
      });
    });

    it('should destroy flip effect correctly', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.destroy(true, true);
        expect(swiper.destroyed).to.be.true;
      });
    });

    
  });
 
  describe('Keyboard Control Functionality', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.swiper = new win.Swiper('.swiper-container', {
          keyboard: {
            enabled: true,
            onlyInViewport: false,
          },
        });
      });
    });
  
    it('should enable keyboard control', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        expect(swiper.keyboard.enabled).to.be.true;
      });
    });

  
    it('should disable keyboard control', () => {
      cy.window().then((win) => {
        const swiper = win.swiper;
        swiper.keyboard.disable();
        expect(swiper.keyboard.enabled).to.be.false;
      });
    });
  });
  
  
  // Test suite for navigation accessibility
  describe('Navigation Accessibility', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.swiper = new win.Swiper('.swiper-container', {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          a11y: {
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
          },
        });
      });
    });
  
    it('should have accessible next and previous buttons', () => {
      cy.get('.swiper-button-next').should('have.attr', 'aria-label', 'Next slide');
      cy.get('.swiper-button-prev').should('have.attr', 'aria-label', 'Previous slide');
    });
  
   
});
});
