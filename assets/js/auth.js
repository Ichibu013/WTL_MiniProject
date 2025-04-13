// Function to check if user is admin
function isAdmin() {
    const userRole = localStorage.getItem('role');
    return userRole === 'admin';
}

// Function to update the manage button visibility
function updateManageButton() {
    const manageBtn = document.querySelector('.btn-getstarted[href="forms/manage-books.html"]');
    if (manageBtn) {
        manageBtn.style.display = isAdmin() ? 'inline-block' : 'none';
    }
}

// Function to update the login/logout button based on authentication status
function updateAuthButton() {
    const loginLogoutBtn = document.getElementById('loginLogoutBtn');
    const userId = localStorage.getItem('userID');

    if (userId) {
        // User is logged in
        loginLogoutBtn.textContent = 'Logout';
        loginLogoutBtn.href = '#';
        loginLogoutBtn.addEventListener('click', handleLogout);
    } else {
        // User is not logged in
        loginLogoutBtn.textContent = 'Login';
        loginLogoutBtn.href = 'forms/loginform.html';
        loginLogoutBtn.removeEventListener('click', handleLogout);
    }
    
    // Update manage button visibility
    updateManageButton();
}

// Function to handle logout
function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('userID');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('cartID')
    localStorage.removeItem('cart_books')
    // Dispatch login state change event
    window.dispatchEvent(new Event('loginStateChanged'));
    window.location.href = 'index.html';
}

// Update buttons when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateAuthButton();
    updateManageButton();
}); 