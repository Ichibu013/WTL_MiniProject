// Global toggleForm function
window.toggleForm = function(formType) {
  const signInForm = document.getElementById('sign-in-form');
  const registerForm = document.getElementById('register-form');
  const signInTab = document.getElementById('signInTab');
  const registerTab = document.getElementById('registerTab');

  if (formType === 'sign-in') {
    signInForm.style.display = 'block';
    registerForm.style.display = 'none';
    signInTab.classList.add('active');
    registerTab.classList.remove('active');
  } else {
    signInForm.style.display = 'none';
    registerForm.style.display = 'block';
    signInTab.classList.remove('active');
    registerTab.classList.add('active');
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Load footer
  fetch('../footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));

  // Import URLs
  import("./url.js").then(module => {
    const { LOGIN_URL, REGISTER_URL } = module;

    // Handle sign-in form submission
    document.getElementById('sign-in-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Create the request body
      const loginRequestBody = {
        username: username,
        password: password
      };

      // Make API call to Spring Boot backend
      fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginRequestBody)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        localStorage.setItem('userID', data.id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        // Dispatch login state change event
        window.dispatchEvent(new Event('loginStateChanged'));
        // Redirect to home page or dashboard
        window.location.href = '../index.html';
      })
      .catch(error => {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials and try again.');
      });
    });

    // Handle register form submission
    document.getElementById('register-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('register-username').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;

      // Create the request body
      const registerRequestBody = {
        username: username,
        email: email,
        password: password
      };

      // Make API call to Spring Boot backend
      fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerRequestBody)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        return response.json();
      })
      .then(data => {
        // Handle successful registration
        console.log('Registration successful:', data);
        alert('Registration successful! Please login.');
        toggleForm('sign-in');
      })
      .catch(error => {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
      });
    });
  });
}); 