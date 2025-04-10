// Function to fetch current cart data
import {GET_CURRENT_CART_URL} from "../js/url.js";

// Function to update cart count in UI
function updateCartCount(count) {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Function to save cart books to localStorage
export function saveCartBooksToLocalStorage(books) {
    try {
        localStorage.setItem('cart_books', JSON.stringify(books));
    } catch (error) {
        console.error('Error saving cart books to localStorage:', error);
    }
}

export async function fetchCartData() {
    try {
        const userID = localStorage.getItem('userID');
        if (!userID) {
            updateCartCount(0);
            return;
        }
        
        const requestBody = {
            userID: userID
        };
        
        const response = await fetch(GET_CURRENT_CART_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const cartData = await response.json();
        console.log('Cart data:', cartData);
        localStorage.setItem('cartID',cartData.id)
        saveCartBooksToLocalStorage(cartData.bookID)
        localStorage.setItem('cart_book_quantity',cartData.quantity)
        
        // Update cart count in UI
        if (Array.isArray(cartData)) {
            updateCartCount(cartData.length);
        } else {
            updateCartCount(0);
        }
    } catch (error) {
        console.error('Error fetching cart data:', error);
        updateCartCount(0);
    }
}

// Initialize cart data when the script loads
document.addEventListener('DOMContentLoaded', () => {
    fetchCartData();
});

// Export for use in other modules if needed
export { updateCartCount };
