// Function to load HTML content
async function loadHTML(url, targetId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.innerHTML = html;
            // Initialize books module if this is the books section
            if (targetId === 'books-container') {
                // Wait for a short time to ensure DOM is updated
                setTimeout(() => {
                    loadBooksModule();
                }, 100);
            }
        } else {
            console.error(`Target element with id '${targetId}' not found`);
        }
    } catch (error) {
        console.error('Error loading HTML:', error);
        // Fallback content if loading fails
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            if (targetId === 'header-container') {
                targetElement.innerHTML = '<div class="alert alert-danger">Error loading header</div>';
            } else if (targetId === 'footer-container') {
                targetElement.innerHTML = '<div class="alert alert-danger">Error loading footer</div>';
            } else {
                targetElement.innerHTML = '<div class="alert alert-danger">Error loading section</div>';
            }
        }
    }
}

// Function to load and initialize the books module
async function loadBooksModule() {
    console.log('Initializing books module...');
    // Check if the container exists first
    const container = document.getElementById('booksContainer');
    if (!container) {
        console.warn('Books container not found in DOM');
        return;
    }
    
    try {
        // Import the books module dynamically
        const booksModule = await import('./books.js');
        if (booksModule.default) {
            booksModule.default.init();
            console.log('Books module initialized successfully');
        } else {
            console.warn('Books module not properly exported');
        }
    } catch (error) {
        console.error('Error loading books module:', error);
    }
}

// Function to initialize components after loading
function initializeComponents() {
    // Initialize any components that need to be set up after loading
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }
    if (typeof Swiper !== 'undefined') {
        // Initialize Swiper if needed
    }
    
    // Initialize main.js functionality
    if (typeof initializeMainJS === 'function') {
        initializeMainJS();
    }
}

// Load all sections when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const sections = [
        { url: 'sections/hero.html', id: 'hero-container' },
        { url: 'sections/about.html', id: 'about-container' },
        { url: 'sections/categories.html', id: 'categories-container' },
        { url: 'sections/books.html', id: 'books-container' },
        { url: 'sections/authors.html', id: 'authors-container' },
        { url: 'sections/contact.html', id: 'contact-container' },
        { url: 'footer.html', id: 'footer-container' }
    ];

    Promise.all(sections.map(section => loadHTML(section.url, section.id)))
        .then(() => {
            initializeComponents();
        })
        .catch(error => {
            console.error('Error initializing components:', error);
        });
}); 