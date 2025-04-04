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
            }
        }
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

// Load header and footer when the page loads
document.addEventListener('DOMContentLoaded', function() {
    Promise.all([
        loadHTML('header.html', 'header-container'),
        loadHTML('footer.html', 'footer-container')
    ]).then(() => {
        initializeComponents();
    }).catch(error => {
        console.error('Error initializing components:', error);
    });
}); 