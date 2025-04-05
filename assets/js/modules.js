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
                loadBooksModule();
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
function loadBooksModule() {
    if (!document.querySelector('script[src="assets/js/books.js"]')) {
        const script = document.createElement('script');
        script.src = 'assets/js/books.js';
        script.onload = function() {
            console.log('Books.js loaded successfully');
            if (typeof booksModule !== 'undefined') {
                booksModule.init();
            }
        };
        document.body.appendChild(script);
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
        { url: 'header.html', id: 'header-container' },
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