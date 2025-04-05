// Books Section Functionality
const booksModule = {
    // Book model schema
    bookSchema: {
        id: Number,
        title: String,
        author: String,
        price: Number,
        category: String,
        language: String,
        imageUrl: String,
        description: String,
        isbn: String,
        publishDate: String,
        publisher: String,
        pageCount: Number,
        rating: Number,
        reviews: Number
    },

    // Validate book object against schema
    validateBook(book) {
        const requiredFields = ['id', 'title', 'author', 'price', 'category', 'language', 'imageUrl', 'description'];
        const missingFields = requiredFields.filter(field => !(field in book));

        if (missingFields.length > 0) {
            console.warn(`Book validation failed. Missing fields: ${missingFields.join(', ')}`);
            return false;
        }
        return true;
    },

    // Dummy books data for testing
    dummyBooks: [
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            price: 10.99,
            category: "fiction",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
            description: "A story of decadence and excess, Gatsby explores the darker aspects of the Jazz Age.",
            isbn: "978-0743273565",
            publishDate: "1925-04-10",
            publisher: "Scribner",
            pageCount: 180,
            rating: 4.5,
            reviews: 1250
        },
        {
            id: 2,
            title: "1984",
            author: "George Orwell",
            price: 8.99,
            category: "science-fiction",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
            description: "A dystopian social science fiction novel that examines the consequences of totalitarianism.",
            isbn: "978-0451524935",
            publishDate: "1949-06-08",
            publisher: "Signet Classic",
            pageCount: 328,
            rating: 4.7,
            reviews: 2100
        },
        {
            id: 3,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            price: 12.49,
            category: "historical-fiction",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
            description: "A powerful story of racial injustice and the loss of innocence in the American South.",
            isbn: "978-0446310789",
            publishDate: "1960-07-11",
            publisher: "Grand Central",
            pageCount: 324,
            rating: 4.8,
            reviews: 1800
        },
        {
            id: 4,
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            price: 15.99,
            category: "fantasy",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
            description: "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar.",
            isbn: "978-0547928227",
            publishDate: "1937-09-21",
            publisher: "Houghton Mifflin",
            pageCount: 366,
            rating: 4.6,
            reviews: 1600
        },
        {
            id: 5,
            title: "Pride and Prejudice",
            author: "Jane Austen",
            price: 9.99,
            category: "romance",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
            description: "A classic romance novel that follows the character development of Elizabeth Bennet.",
            isbn: "978-0141439518",
            publishDate: "1813-01-28",
            publisher: "Penguin Classics",
            pageCount: 432,
            rating: 4.5,
            reviews: 1900
        },
        {
            id: 6,
            title: "The Da Vinci Code",
            author: "Dan Brown",
            price: 14.99,
            category: "mystery",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71ebGt+ZRgL._AC_UF1000,1000_QL80_.jpg",
            description: "A mysterious murder inside the Louvre and clues in Da Vinci paintings lead to the discovery of a religious mystery.",
            isbn: "978-0307474278",
            publishDate: "2003-03-18",
            publisher: "Anchor",
            pageCount: 489,
            rating: 3.8,
            reviews: 950
        },
        {
            id: 7,
            title: "Moby Dick",
            author: "Herman Melville",
            price: 11.99,
            category: "classic",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71yNg5me63L._AC_UF1000,1000_QL80_.jpg",
            description: "A tale of a sea captain's obsession with a great white whale.",
            isbn: "978-0142437247",
            publishDate: "1851-10-18",
            publisher: "Penguin Classics",
            pageCount: 720,
            rating: 4.2,
            reviews: 1400
        },
        {
            id: 8,
            title: "War and Peace",
            author: "Leo Tolstoy",
            price: 13.99,
            category: "historical-fiction",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71dNsRuYL7L._AC_UF1000,1000_QL80_.jpg",
            description: "A sweeping story of Russian society during the Napoleonic era.",
            isbn: "978-0143035008",
            publishDate: "1869-01-01",
            publisher: "Penguin Classics",
            pageCount: 1392,
            rating: 4.5,
            reviews: 1200
        },
        {
            id: 9,
            title: "Jane Eyre",
            author: "Charlotte Brontë",
            price: 9.49,
            category: "romance",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71fWBGO5iNL._AC_UF1000,1000_QL80_.jpg",
            description: "The story of a young woman's resilience and passion for justice and love.",
            isbn: "978-0141441146",
            publishDate: "1847-10-16",
            publisher: "Penguin Classics",
            pageCount: 624,
            rating: 4.3,
            reviews: 1500
        },
        {
            id: 10,
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            price: 12.99,
            category: "fiction",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/61fgOuZfBGL._AC_UF1000,1000_QL80_.jpg",
            description: "A coming-of-age story about a cynical teenager navigating life.",
            isbn: "978-0316769488",
            publishDate: "1951-07-16",
            publisher: "Little, Brown and Company",
            pageCount: 277,
            rating: 3.8,
            reviews: 1700
        },
        {
            id: 11,
            title: "The Alchemist",
            author: "Paulo Coelho",
            price: 10.99,
            category: "philosophy",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/51Z0nLAfLmL._AC_UF1000,1000_QL80_.jpg",
            description: "An inspiring tale of self-discovery and following your dreams.",
            isbn: "978-0062315007",
            publishDate: "1988-01-01",
            publisher: "HarperOne",
            pageCount: 208,
            rating: 3.9,
            reviews: 2000
        },
        {
            id: 12,
            title: "Brave New World",
            author: "Aldous Huxley",
            price: 11.49,
            category: "science-fiction",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/81zE42gT3xL._AC_UF1000,1000_QL80_.jpg",
            description: "A dystopian vision of a future controlled by technology and consumerism.",
            isbn: "978-0060850524",
            publishDate: "1932-01-01",
            publisher: "Harper Perennial",
            pageCount: 288,
            rating: 4.1,
            reviews: 1300
        },
        {
            id: 13,
            title: "Little Women",
            author: "Louisa May Alcott",
            price: 8.99,
            category: "classic",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71t-7Ex+cgL._AC_UF1000,1000_QL80_.jpg",
            description: "The heartwarming tale of four sisters growing up during the Civil War.",
            isbn: "978-0142437209",
            publishDate: "1868-09-30",
            publisher: "Penguin Classics",
            pageCount: 528,
            rating: 4.2,
            reviews: 1100
        },
        {
            id: 14,
            title: "Crime and Punishment",
            author: "Fyodor Dostoevsky",
            price: 13.49,
            category: "philosophy",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71OZY035QKL._AC_UF1000,1000_QL80_.jpg",
            description: "An exploration of guilt, redemption, and morality in 19th-century Russia.",
            isbn: "978-0143107637",
            publishDate: "1866-01-01",
            publisher: "Penguin Classics",
            pageCount: 671,
            rating: 4.4,
            reviews: 1600
        },
        {
            id: 15,
            title: "Wuthering Heights",
            author: "Emily Brontë",
            price: 10.49,
            category: "romance",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71dNsRuYL7L._AC_UF1000,1000_QL80_.jpg",
            description: "A passionate story of love and revenge on the English moors.",
            isbn: "978-0141439556",
            publishDate: "1847-12-01",
            publisher: "Penguin Classics",
            pageCount: 464,
            rating: 3.9,
            reviews: 1400
        },
        {
            id: 16,
            title: "Frankenstein",
            author: "Mary Shelley",
            price: 9.99,
            category: "horror",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71VtC9ufkWL._AC_UF1000,1000_QL80_.jpg",
            description: "A chilling tale of a scientist's creation and its tragic consequences.",
            isbn: "978-0141439471",
            publishDate: "1818-01-01",
            publisher: "Penguin Classics",
            pageCount: 280,
            rating: 3.8,
            reviews: 1200
        },
        {
            id: 17,
            title: "The Odyssey",
            author: "Homer",
            price: 14.99,
            category: "classic",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71yNg5me63L._AC_UF1000,1000_QL80_.jpg",
            description: "An ancient epic about Odysseus's journey home after the Trojan War.",
            isbn: "978-0140268867",
            publishDate: "800 BCE",
            publisher: "Penguin Classics",
            pageCount: 541,
            rating: 4.0,
            reviews: 900
        },
        {
            id: 18,
            title: "Dracula",
            author: "Bram Stoker",
            price: 10.49,
            category: "horror",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71VtC9ufkWL._AC_UF1000,1000_QL80_.jpg",
            description: "The chilling tale of Count Dracula and his quest for blood.",
            isbn: "978-0141439846",
            publishDate: "1897-05-26",
            publisher: "Penguin Classics",
            pageCount: 488,
            rating: 4.0,
            reviews: 1300
        },
        {
            id: 19,
            title: "Les Misérables",
            author: "Victor Hugo",
            price: 12.99,
            category: "historical-fiction",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71dNsRuYL7L._AC_UF1000,1000_QL80_.jpg",
            description: "A timeless story of justice, love, and redemption in 19th-century France.",
            isbn: "978-0140444308",
            publishDate: "1862-01-01",
            publisher: "Penguin Classics",
            pageCount: 1463,
            rating: 4.3,
            reviews: 1100
        },
        {
            id: 20,
            title: "The Adventures of Sherlock Holmes",
            author: "Arthur Conan Doyle",
            price: 7.99,
            category: "mystery",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71yNg5me63L._AC_UF1000,1000_QL80_.jpg",
            description: "A collection of thrilling detective stories featuring Sherlock Holmes.",
            isbn: "978-0140439073",
            publishDate: "1892-10-14",
            publisher: "Penguin Classics",
            pageCount: 307,
            rating: 4.5,
            reviews: 1800
        },
        {
            id: 21,
            title: "The Scarlet Letter",
            author: "Nathaniel Hawthorne",
            price: 11.99,
            category: "classic",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71VtC9ufkWL._AC_UF1000,1000_QL80_.jpg",
            description: "A story of sin, guilt, and redemption in Puritan New England.",
            isbn: "978-0142437261",
            publishDate: "1850-03-16",
            publisher: "Penguin Classics",
            pageCount: 238,
            rating: 3.7,
            reviews: 1000
        },
        {
            id: 22,
            title: "The Grapes of Wrath",
            author: "John Steinbeck",
            price: 13.49,
            category: "historical-fiction",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71dNsRuYL7L._AC_UF1000,1000_QL80_.jpg",
            description: "The struggles of a family during the Great Depression.",
            isbn: "978-0143039433",
            publishDate: "1939-04-14",
            publisher: "Penguin Classics",
            pageCount: 464,
            rating: 4.2,
            reviews: 1200
        },
        {
            id: 23,
            title: "Anna Karenina",
            author: "Leo Tolstoy",
            price: 14.99,
            category: "romance",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71yNg5me63L._AC_UF1000,1000_QL80_.jpg",
            description: "A tragic story of love, betrayal, and morality in Russian society.",
            isbn: "978-0143035008",
            publishDate: "1877-01-01",
            publisher: "Penguin Classics",
            pageCount: 964,
            rating: 4.5,
            reviews: 1500
        },
        {
            id: 24,
            title: "A Tale of Two Cities",
            author: "Charles Dickens",
            price: 10.99,
            category: "historical-fiction",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71VtC9ufkWL._AC_UF1000,1000_QL80_.jpg",
            description: "A story of love and sacrifice during the French Revolution.",
            isbn: "978-0141439600",
            publishDate: "1859-11-26",
            publisher: "Penguin Classics",
            pageCount: 489,
            rating: 4.0,
            reviews: 1300
        },
        {
            id: 25,
            title: "The Picture of Dorian Gray",
            author: "Oscar Wilde",
            price: 10.49,
            category: "philosophy",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71dNsRuYL7L._AC_UF1000,1000_QL80_.jpg",
            description: "A gothic tale exploring morality, vanity, and the nature of art.",
            isbn: "978-0141439570",
            publishDate: "1890-07-01",
            publisher: "Penguin Classics",
            pageCount: 304,
            rating: 4.1,
            reviews: 1100
        },
        {
            id: 26,
            title: "The Three Musketeers",
            author: "Alexandre Dumas",
            price: 12.99,
            category: "adventure",
            language: "english",
            imageUrl: "https://m.media-amazon.com/images/I/71yNg5me63L._AC_UF1000,1000_QL80_.jpg",
            description: "A thrilling story of friendship and daring exploits in France.",
            isbn: "978-0140444578",
            publishDate: "1844-03-14",
            publisher: "Penguin Classics",
            pageCount: 704,
            rating: 4.2,
            reviews: 1000
        }
    ],

    // Initialize books section
    init() {
        console.log("Initializing books module...");
        // Validate all books before displaying
        this.dummyBooks = this.dummyBooks.filter(book => this.validateBook(book));
        this.displayBooks(this.dummyBooks);
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        console.log("Setting up event listeners...");
        // Add event listeners for filters
        const searchFilter = document.getElementById('searchFilter');
        const priceFilter = document.getElementById('priceFilter');
        const languageFilter = document.getElementById('languageFilter');
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');

        // Add real-time search with debouncing
        let searchTimeout;
        searchFilter.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.applyFilters();
            }, 300); // 300ms debounce delay
        });

        // Add event listeners for other filters
        priceFilter.addEventListener('change', () => this.applyFilters());
        languageFilter.addEventListener('change', () => this.applyFilters());
        categoryFilter.addEventListener('change', () => this.applyFilters());
        sortFilter.addEventListener('change', () => this.applyFilters());

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('bookDetailModal');
            if (event.target === modal) {
                this.closeModal();
            }
        });
    },

    // Apply filters function
    applyFilters() {
        const searchQuery = document.getElementById('searchFilter').value.toLowerCase();
        const priceRange = document.getElementById('priceFilter').value;
        const language = document.getElementById('languageFilter').value;
        const category = document.getElementById('categoryFilter').value;
        const sortBy = document.getElementById('sortFilter').value;

        let filteredBooks = this.dummyBooks.filter(book => {
            // Search filter - check both title and author
            const matchesSearch = searchQuery === '' ||
                book.title.toLowerCase().includes(searchQuery) ||
                book.author.toLowerCase().includes(searchQuery);

            // Price filter
            const matchesPrice = priceRange === 'all' || this.isInPriceRange(book.price, priceRange);

            // Language filter
            const matchesLanguage = language === 'all' || book.language === language;

            // Category filter
            const matchesCategory = category === 'all' || book.category === category;

            return matchesSearch && matchesPrice && matchesLanguage && matchesCategory;
        });

        // Sort the filtered books
        filteredBooks = this.sortBooks(filteredBooks, sortBy);

        // Display the filtered books
        this.displayBooks(filteredBooks);
    },

    // Helper function to check if price is in range
    isInPriceRange(price, range) {
        const [min, max] = range.split('-').map(Number);
        return price >= min && price <= max;
    },

    // Sort books function
    sortBooks(books, sortBy) {
        switch (sortBy) {
            case 'price-low':
                return [...books].sort((a, b) => a.price - b.price);
            case 'price-high':
                return [...books].sort((a, b) => b.price - a.price);
            case 'popularity':
                // For now, just sort by title as we don't have popularity data
                return [...books].sort((a, b) => a.title.localeCompare(b.title));
            default:
                return books;
        }
    },

    // Display books function
    displayBooks(books) {
        console.log("Displaying books...", books);
        const container = document.getElementById("booksContainer");
        if (!container) {
            console.warn("booksContainer not found in DOM.");
            return;
        }

        container.innerHTML = ""; // Clear previous content

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
                        <img src="${book.imageUrl}" class="card-img-top" alt="${book.title}" loading="lazy" style="height: 200px; object-fit: cover;">
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
                            <button class="btn btn-outline-primary w-100" onclick="booksModule.openBookDetail(${book.id})">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>`;

            container.appendChild(bookCard);
        });
    },

    // Open book details modal
    openBookDetail(id) {
        console.log("Opening book details for id:", id);
        const book = this.dummyBooks.find(b => b.id === id);
        if (!book) {
            console.warn("Book not found with id:", id);
            return;
        }

        const modalOverlay = document.getElementById("modalOverlay");
        if (!modalOverlay) {
            console.warn("Modal overlay not found in DOM");
            return;
        }

        const modal = document.getElementById("bookDetailModal");
        if (!modal) {
            console.warn("Modal not found in DOM");
            return;
        }

        document.getElementById("modalImage").src = book.imageUrl;
        document.getElementById("modalTitle").textContent = book.title;
        document.getElementById("modalAuthor").textContent = book.author;
        document.getElementById("modalPrice").textContent = book.price.toFixed(2);
        document.getElementById("modalDescription").textContent = book.description;

        // Clear any existing additional details
        const existingDetails = document.querySelector("#modalDescription + div");
        if (existingDetails) {
            existingDetails.remove();
        }

        // Add additional book details
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
            cartBtn.onclick = () => {
                alert(`Added "${book.title}" to cart!`);
                booksModule.closeModal();
            };
        }

        modalOverlay.style.display = 'flex';
    },

    // Close modal function
    closeModal() {
        const modal = document.getElementById("modalOverlay");
        if (modal) {
            modal.style.display = "none";
        }
    }


};

// Initialize books module when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded");
    if (document.getElementById('booksContainer')) {
        console.log("Books container found, initializing module");
        booksModule.init();
    } else {
        console.warn("Books container not found in DOM");
    }
});

// ESC key to close
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        console.log("Escape key pressed, closing modal");
        booksModule.closeModal();
    }
});