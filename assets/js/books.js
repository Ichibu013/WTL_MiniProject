import { BOOK_URL, ADD_TO_CART_URL } from "./url.js";

// Initialize books module when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded");
    // Wait for a short time to allow HTML content to be loaded
    setTimeout(() => {
        const container = document.getElementById('booksContainer');
        if (container) {
            console.log("Books container found, initializing module");
            booksModule.init();
        } else {
            console.warn("Books container not found in DOM");
        }
    }, 100);
});

// ESC key to close
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && document.getElementById('modalOverlay')?.style.display === 'flex') {
        console.log("Escape key pressed, closing modal");
        booksModule.closeModal();
    }
});

console.log("booksContainer content:", document.getElementById('booksContainer')?.outerHTML);

const booksModule = {
    books: [],

    async init() {
        console.log("Initializing books module...");
        try {
            this.books = await this.fetchBooks();
            console.log(`Fetched ${this.books.length} books`);

            console.log("Validating books...");
            this.books = this.books.filter(book => this.validateBook(book));
            console.log(`After validation: ${this.books.length} valid books`);

            this.displayBooks(this.books);
            this.setupEventListeners();
            console.log("Books module initialization completed");
        } catch (error) {
            console.error("Error during initialization:", error);
        }
    },

    async fetchBooks() {
        try {
            console.log('Attempting to fetch books from:', BOOK_URL);
            const response = await fetch(BOOK_URL);
            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const books = await response.json();
            console.log('Fetched books:', books);
            return books;
        } catch (error) {
            console.error('Error fetching books:', error);
            const container = document.getElementById("booksContainer");
            if (container) {
                container.innerHTML = `
                    <div class="col-12 text-center">
                        <div class="alert alert-danger" role="alert">
                            Failed to load books. Error: ${error.message}<br>
                            Please check if the server is running at ${BOOK_URL}
                        </div>
                    </div>`;
            }
            return [];
        }
    },

    bookSchema: {
        id: 'string',
        title: 'string',
        author: 'string',
        price: 'number',
        category: 'string',
        language: 'string',
        imageUrl: 'string',
        description: 'string',
        isbn: 'string',
        publishDate: 'string',
        publisher: 'string',
        pageCount: 'number',
        rating: 'number',
        reviews: 'number'
    },

    validateBook(book) {
        const schema = this.bookSchema;
        for (const key in schema) {
            if (!(key in book)) {
                console.warn(`Missing field: ${key}`);
                return false;
            }
            // Convert string IDs to numbers if needed
            if (key === 'id' && typeof book[key] === 'number') {
                book[key] = String(book[key]);
            }
            // Convert string prices to numbers if needed
            if (key === 'price' && typeof book[key] === 'string') {
                book[key] = Number(book[key]);
            }
            // Convert string pageCount to numbers if needed
            if (key === 'pageCount' && typeof book[key] === 'string') {
                book[key] = Number(book[key]);
            }
            // Convert string rating to numbers if needed
            if (key === 'rating' && typeof book[key] === 'string') {
                book[key] = Number(book[key]);
            }
            // Convert string reviews to numbers if needed
            if (key === 'reviews' && typeof book[key] === 'string') {
                book[key] = Number(book[key]);
            }
            
            if (typeof book[key] !== schema[key]) {
                console.warn(`Type mismatch for "${key}". Expected ${schema[key]}, got ${typeof book[key]}`);
                return false;
            }
        }
        return true;
    },

    setupEventListeners() {
        console.log("Setting up event listeners...");
        const searchFilter = document.getElementById('searchFilter');
        const priceFilter = document.getElementById('priceFilter');
        const languageFilter = document.getElementById('languageFilter');
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');

        let searchTimeout;
        searchFilter.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => this.applyFilters(), 300);
        });

        priceFilter.addEventListener('change', () => this.applyFilters());
        languageFilter.addEventListener('change', () => this.applyFilters());
        categoryFilter.addEventListener('change', () => this.applyFilters());
        sortFilter.addEventListener('change', () => this.applyFilters());

        window.addEventListener('click', (event) => {
            const modal = document.getElementById('bookDetailModal');
            if (event.target === modal) {
                this.closeModal();
            }
        });
    },

    applyFilters() {
        if (!this.books) {
            console.error('Books not initialized');
            return;
        }

        const searchQuery = document.getElementById('searchFilter').value.toLowerCase();
        const priceRange = document.getElementById('priceFilter').value;
        const language = document.getElementById('languageFilter').value;
        const category = document.getElementById('categoryFilter').value;
        const sortBy = document.getElementById('sortFilter').value;

        const filterConditions = [
            { check: (b) => priceRange === 'all' || this.isInPriceRange(b.price, priceRange) },
            { check: (b) => language === 'all' || b.language === language },
            { check: (b) => category === 'all' || b.category === category }
        ];

        let filteredBooks = this.books.filter(book =>
            (searchQuery === '' ||
                book.title.toLowerCase().includes(searchQuery) ||
                book.author.toLowerCase().includes(searchQuery)) &&
            filterConditions.every(f => f.check(book))
        );

        filteredBooks = this.sortBooks(filteredBooks, sortBy);
        this.displayBooks(filteredBooks);
    },

    isInPriceRange(price, range) {
        const [min, max] = range.split('-').map(Number);
        return price >= min && price <= max;
    },

    sortBooks(books, sortBy) {
        switch (sortBy) {
            case 'price-low': return [...books].sort((a, b) => a.price - b.price);
            case 'price-high': return [...books].sort((a, b) => b.price - a.price);
            case 'popularity': return [...books].sort((a, b) => a.title.localeCompare(b.title));
            default: return books;
        }
    },

    displayBooks(books) {
        console.log("Displaying books...", books);
        const container = document.getElementById("booksContainer");
        if (!container) {
            console.warn("booksContainer not found.");
            return;
        }

        container.innerHTML = "";

        if (books.length === 0) {
            container.innerHTML = "<p class='text-center w-100'>No books found.</p>";
            return;
        }

        books.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.className = "col mb-4";

            bookCard.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="position-relative">
                        <img src="${book.imageUrl}" class="card-img-top" alt="${book.title}" 
                             loading="lazy" onerror="this.src='assets/img/coverNotFound.jpg';" 
                             style="height: 200px; object-fit: cover;">
                        <div class="position-absolute top-0 end-0 m-2">
                            <span class="badge bg-primary">$${book.price.toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-truncate mb-2" title="${book.title}">${book.title}</h5>
                        <p class="card-text mb-1"><small class="text-muted">By ${book.author}</small></p>
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center flex-wrap mb-2">
                                <span class="badge bg-secondary mb-1">${book.category}</span>
                                <div class="d-flex align-items-center mb-1" style="max-width: 100%; overflow: hidden;">
                                    <span class="text-warning me-1 text-nowrap" style="font-size: 0.9rem;">
                                        ${'⭐'.repeat(Math.floor(book.rating))}
                                    </span>
                                    <small class="text-muted">(${book.reviews})</small>
                                </div>
                                <button class="btn btn-outline-primary w-100 view-details-btn" data-book-id="${book.id}">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;

            container.appendChild(bookCard);
        });

        // Add click event listeners to all view details buttons
        container.querySelectorAll('.view-details-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const bookId = e.target.dataset.bookId;
                this.openBookDetail(bookId);
            });
        });
    },

    openBookDetail(id) {
        console.log("Opening book details for id:", id);
        const book = this.books.find(b => b.id === id);
        if (!book) {
            console.warn("Book not found with id:", id);
            return;
        }

        const modalOverlay = document.getElementById("modalOverlay");
        const modal = document.getElementById("bookDetailModal");

        if (!modalOverlay || !modal) {
            console.warn("Modal overlay or modal not found in DOM");
            return;
        }

        document.getElementById("modalImage").src = book.imageUrl;
        document.getElementById("modalTitle").textContent = book.title;
        document.getElementById("modalAuthor").textContent = book.author;
        document.getElementById("modalPrice").textContent = book.price.toFixed(2);
        document.getElementById("modalDescription").textContent = book.description;

        const existingDetails = document.querySelector("#modalDescription + div");
        if (existingDetails) existingDetails.remove();

        const additionalDetails = document.createElement('div');
        additionalDetails.innerHTML = `
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <p><strong>Publisher:</strong> ${book.publisher}</p>
            <p><strong>Published:</strong> ${book.publishDate}</p>
            <p><strong>Pages:</strong> ${book.pageCount}</p>
            <p><strong>Rating:</strong> ${book.rating} ⭐ (${book.reviews} reviews)</p>
        `;
        document.getElementById("modalDescription").after(additionalDetails);

        const cartBtn = document.getElementById("addToCartBtn");
        if (cartBtn) {
            cartBtn.onclick = async () => {
                try {
                    const response = await fetch(ADD_TO_CART_URL, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            cartID: localStorage.getItem('cartID'),
                            bookID: book.id
                        })
                    });

                    if (response.ok) {
                        this.closeModal();
                        const cartSuccessModalOverlay = document.getElementById('cartSuccessModalOverlay');
                        const cartSuccessModal = document.getElementById('cartSuccessModal');
                        cartSuccessModalOverlay.style.display = 'flex';
                        cartSuccessModal.style.display = 'block';
                        setTimeout(() => {
                            cartSuccessModalOverlay.style.display = 'none';
                            cartSuccessModal.style.display = 'none';
                        }, 2000);
                    } else {
                        const data = await response.json();
                        alert(`Failed to add to cart: ${data.message || 'Unknown error'}`);
                    }
                } catch (error) {
                    console.error('Error adding to cart:', error);
                    alert('Failed to add item to cart. Please try again.');
                }
            };
        }

        modalOverlay.style.display = 'flex';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'modalTitle');
        modal.focus(); // accessibility
    },

    closeModal() {
        const modal = document.getElementById("modalOverlay");
        if (modal) {
            modal.style.display = "none";
        }
    }
};

window.booksModule = booksModule;

export default booksModule;
