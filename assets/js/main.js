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
  
  // Function to navigate to the selected category
function filterBooks(category) {
  // Remove 'active' class from all books
  document.querySelectorAll('.books-item').forEach(item => {
    item.style.display = 'none';
  });

  // Show books that match the selected category
  document.querySelectorAll(`.books-item[data-category="${category}"]`).forEach(item => {
    item.style.display = 'block';
  });
}

  // Sample array of book objects
  const books = [
    {
      id: 1,
      title: "The Enchanted Forest",
      author: "Ava Green",
      price: 15.00,
      category: "fantasy",
      language: "english",
      imageUrl: "path/to/enchanted_forest.jpg",
      description: "An epic journey through a mystical forest filled with magical creatures.",
      isbn: "978-1234567890",
      publishDate: "2023-01-15",
      publisher: "Fantasy Press",
      pageCount: 320,
      rating: 4.8,
      reviews: 450
    }
    // Add remaining book objects here
  ];

  // Function to render books based on filters
  function renderBooks(filteredBooks) {
    const container = document.getElementById('booksContainer');
    container.innerHTML = ''; // Clear previous entries

    filteredBooks.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.className = 'col book-card';
      bookCard.dataset.price = book.price;
      bookCard.dataset.language = book.language.toLowerCase();
      bookCard.dataset.author = book.author.toLowerCase();
      bookCard.dataset.category = book.category.toLowerCase();

      bookCard.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${book.imageUrl}" class="card-img-top" alt="${book.title}">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">
              <strong>Author:</strong> ${book.author}<br>
              <strong>Price:</strong> $${book.price.toFixed(2)}<br>
              <strong>Category:</strong> ${book.category}<br>
              <strong>Rating:</strong> ${book.rating} ⭐ (${book.reviews} reviews)
            </p>
          </div>
        </div>
      `;

      // Add click event to show detailed view
      bookCard.addEventListener('click', () => booksModule.openModal(book));

      container.appendChild(bookCard);
    });
  }

  // Function to apply filters
  function applyFilters() {
    const priceFilter = document.getElementById('priceFilter').value;
    const languageFilter = document.getElementById('languageFilter').value.toLowerCase();
    const authorFilter = document.getElementById('authorFilter').value.toLowerCase();
    const categoryFilter = document.getElementById('BookCategoryFilter').value.toLowerCase();

    const filteredBooks = books.filter(book => {
      const matchesPrice = priceFilter === 'all' || (book.price >= parseInt(priceFilter.split('-')[0]) && book.price <= parseInt(priceFilter.split('-')[1]));
      const matchesLanguage = languageFilter === 'all' || book.language.toLowerCase() === languageFilter;
      const matchesAuthor = authorFilter === 'all' || book.author.toLowerCase().includes(authorFilter);
      const matchesCategory = categoryFilter === 'all' || book.category.toLowerCase() === categoryFilter;

      return matchesPrice && matchesLanguage && matchesAuthor && matchesCategory;
    });

    renderBooks(filteredBooks);
  }

  // Function to show book details in the modal
  function showBookDetails(book) {
    document.getElementById("modalImage").src = book.imageUrl;
    document.getElementById("modalTitle").textContent = book.title;
    document.getElementById("modalAuthor").textContent = book.author;
    document.getElementById("modalPrice").textContent = book.price.toFixed(2);
    document.getElementById("modalDescription").textContent = book.description;
    
    // Add additional book details if available
    const additionalDetails = document.createElement('div');
    additionalDetails.innerHTML = `
      <p><strong>ISBN:</strong> ${book.isbn}</p>
      <p><strong>Publisher:</strong> ${book.publisher}</p>
      <p><strong>Published:</strong> ${book.publishDate}</p>
      <p><strong>Pages:</strong> ${book.pageCount}</p>
      <p><strong>Rating:</strong> ${book.rating} ⭐ (${book.reviews} reviews)</p>
    `;
    document.getElementById("modalDescription").after(additionalDetails);
    
    document.getElementById("bookDetailModal").style.display = "block";
  }

  // Function to close the modal
  function closeModal() {
    document.getElementById("bookDetailModal").style.display = "none";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("bookDetailModal");
    const closeButton = document.querySelector(".closeModal"); // Fix: Select using class

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    // Optional: Close modal when clicking outside the content box
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
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

})();