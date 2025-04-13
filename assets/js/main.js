// Function to initialize all main.js functionality
function initializeMainJS() {
    // Mobile nav toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector('body').classList.toggle('mobile-nav-active');
            this.classList.toggle('bi-list');
            this.classList.toggle('bi-x');
        });
    }

    // Mobile nav dropdowns activate
    document.querySelectorAll('.navbar .dropdown > a').forEach(function (el) {
        el.addEventListener('click', function (event) {
            if (document.querySelector('.mobile-nav-active')) {
                event.preventDefault();
                this.classList.toggle('active');
                this.nextElementSibling.classList.toggle('dropdown-active');
            }
        });
    });

    // Init glightbox
    if (typeof GLightbox !== 'undefined') {
        GLightbox({ selector: '.glightbox' });
    }

    // Init swiper
    if (typeof Swiper !== 'undefined') {
        const categoriesSwiperConfig = document.querySelector('.swiper-config');
        if (categoriesSwiperConfig) {
            const config = JSON.parse(categoriesSwiperConfig.textContent);
            new Swiper('.init-swiper', config);
        }

        new Swiper('.swiper:not(.init-swiper)', {
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

(function () {
    "use strict";

    function debounce(func, wait = 10) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function toggleScrolled() {
        const body = document.querySelector('body');
        const header = document.querySelector('#header');
        if (!header.classList.contains('scroll-up-sticky') && !header.classList.contains('sticky-top') && !header.classList.contains('fixed-top')) return;
        window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
    }

    function closeMobileNav() {
        document.querySelector('body').classList.remove('mobile-nav-active');
        const toggle = document.querySelector('.mobile-nav-toggle');
        if (toggle) {
            toggle.classList.add('bi-list');
            toggle.classList.remove('bi-x');
        }
    }

    function toggleScrollTop() {
        const scrollTop = document.querySelector('.scroll-top');
        if (!scrollTop) return;
        scrollTop.classList.toggle('active', window.scrollY > 100);
    }

    function aosInit() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 600,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        }
    }

    function navbooksScrollspy() {
        document.querySelectorAll('.navbooks a').forEach(navbookslink => {
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
        });
    }

    window.addEventListener('scroll', debounce(toggleScrolled));
    window.addEventListener('scroll', debounce(toggleScrollTop));
    document.addEventListener('scroll', debounce(navbooksScrollspy));
    window.addEventListener('load', () => {
        toggleScrolled();
        toggleScrollTop();
        navbooksScrollspy();
        aosInit();
    });

    document.addEventListener("DOMContentLoaded", function () {
        initializeMainJS();

        if (typeof booksModule !== 'undefined') booksModule.init();

        const signInTab = document.getElementById("signInTab");
        const registerTab = document.getElementById("registerTab");
        const signInForm = document.getElementById("sign-in-form");
        const registerForm = document.getElementById("register-form");

        if (signInForm && registerForm && signInTab && registerTab) {
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
        }

        let cart = JSON.parse(localStorage.getItem("cart_books")) || [];

        function updateCartCount() {
            const cartCount = document.getElementById("cart-count");
            if (cartCount) cartCount.textContent = cart.length;
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

    document.querySelectorAll('#navbooks a').forEach(navbooks => {
        navbooks.addEventListener('click', () => {
            if (document.querySelector('.mobile-nav-active')) {
                closeMobileNav();
            }
        });
    });

    document.querySelectorAll('.navbooks .toggle-dropdown').forEach(navbooks => {
        navbooks.addEventListener('click', function (e) {
            e.preventDefault();
            this.parentNode.classList.toggle('active');
            this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
            e.stopImmediatePropagation();
        });
    });

    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => preloader.remove());
    }

    document.querySelectorAll(".book-card").forEach(book => {
        book.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    });

    window.addEventListener('load', function () {
        if (window.location.hash) {
            const section = document.querySelector(window.location.hash);
            if (section) {
                setTimeout(() => {
                    const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
                    window.scrollTo({
                        top: section.offsetTop - parseInt(scrollMarginTop),
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    });

    function toggleLoginForm() {
        const dropdown = document.getElementById('loginDropdown');
        if (dropdown) dropdown.classList.toggle('show');
    }

    window.addEventListener('click', function (event) {
        const dropdown = document.getElementById('loginDropdown');
        const loginButton = document.querySelector('.btn-getstarted');

        if (!event.target.matches('.btn-getstarted') && !event.target.closest('.dropdown-content')) {
            if (dropdown && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    });

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            console.log('Login attempt:', { email, password });
            document.getElementById('loginDropdown').classList.remove('show');
        });
    }
})();

// Call initialization function when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMainJS);
