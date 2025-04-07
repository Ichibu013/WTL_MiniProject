// Function to initialize all main.js functionality
function initializeMainJS() {
    // Mobile nav toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector('body').classList.toggle('mobile-nav-active');
            this.classList.toggle('bi-list');
            this.classList.toggle('bi-x');
        });
    }

    // Mobile nav dropdowns activate
    document.querySelectorAll('.navbar .dropdown > a').forEach(function(el) {
        el.addEventListener('click', function(event) {
            if (document.querySelector('.mobile-nav-active')) {
                event.preventDefault();
                this.classList.toggle('active');
                this.nextElementSibling.classList.toggle('dropdown-active');
            }
        });
    });

    // Scroll top button
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollTop.classList.add('active');
            } else {
                scrollTop.classList.remove('active');
            }
        });
    }

    // Init glightbox
    if (typeof GLightbox !== 'undefined') {
        GLightbox({
            selector: '.glightbox'
        });
    }

    // Init swiper
    if (typeof Swiper !== 'undefined') {
        // Initialize categories swiper
        const categoriesSwiperConfig = document.querySelector('.swiper-config');
        if (categoriesSwiperConfig) {
            const config = JSON.parse(categoriesSwiperConfig.textContent);
            new Swiper('.init-swiper', config);
        }

        // Initialize any other swipers with default config
        const defaultSwiper = new Swiper('.swiper:not(.init-swiper)', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });
    }

    // Init AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Init PureCounter
    if (typeof PureCounter !== 'undefined') {
        new PureCounter();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // If components are already loaded, initialize immediately
    if (document.getElementById('header-container').innerHTML !== '') {
        initializeMainJS();
    }
});

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbooks a').forEach(navbooks => {
    navbooks.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navbooks .toggle-dropdown').forEach(navbooks => {
    navbooks.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Click to Show Description of books
   */
  document.querySelectorAll(".book-card").forEach(book => {
    book.addEventListener("click", function() {
      this.classList.toggle("active");
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const signInTab = document.getElementById("signInTab");
    const registerTab = document.getElementById("registerTab");
    const signInForm = document.getElementById("sign-in-form");
    const registerForm = document.getElementById("register-form");

    // Default: Show Sign-in form
    signInForm.classList.add("active");
    signInTab.classList.add("active");

    signInTab.addEventListener("click", function () {
        signInForm.classList.add("active");
        registerForm.classList.remove("active");

        signInTab.classList.add("active");
        registerTab.classList.remove("active");
    });

    registerTab.addEventListener("click", function () {
        registerForm.classList.add("active");
        signInForm.classList.remove("active");

        registerTab.classList.add("active");
        signInTab.classList.remove("active");
    });
  });

  // cart functionalities
  document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        document.getElementById("cart-count").textContent = cart.length;
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function addToCart(event) {
        const button = event.target;
        const id = button.getAttribute("data-id");
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));

        let existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        saveCart();
        updateCartCount();
        alert("Added to cart!");
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", addToCart);
    });

    updateCartCount();
  });


    // Initial render
    document.addEventListener('DOMContentLoaded', () => renderBooks(books));


    /**
     * Correct scrolling position upon page load for URLs containing hash links.
     */
    window.addEventListener('load', function(e) {
      if (window.location.hash) {
        if (document.querySelector(window.location.hash)) {
          setTimeout(() => {
            let section = document.querySelector(window.location.hash);
            let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop),
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    });

    /**
     * Navbooks Scrollspy
     */
    let navbookslinks = document.querySelectorAll('.navbooks a');

    function navbooksScrollspy() {
      navbookslinks.forEach(navbookslink => {
        if (!navbookslink.hash) return;
        let section = document.querySelector(navbookslink.hash);
        if (!section) return;
        let position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          document.querySelectorAll('.navbooks a.active').forEach(link => link.classList.remove('active'));
          navbookslink.classList.add('active');
        } else {
          navbookslink.classList.remove('active');
        }
      })
    }
    window.addEventListener('load', navbooksScrollspy);
    document.addEventListener('scroll', navbooksScrollspy);

  // Login dropdown functionality
  function toggleLoginForm() {
    const dropdown = document.getElementById('loginDropdown');
    dropdown.classList.toggle('show');
  }

  // Close dropdown when clicking outside
  window.addEventListener('click', function(event) {
    const dropdown = document.getElementById('loginDropdown');
    const loginButton = document.querySelector('.btn-getstarted');
    
    if (!event.target.matches('.btn-getstarted') && !event.target.closest('.dropdown-content')) {
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    }
  });

  // Handle login form submission
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    // Here you would typically handle the login logic
    console.log('Login attempt:', { email, password });
    
    // For demo purposes, just close the dropdown
    document.getElementById('loginDropdown').classList.remove('show');
  });

})();