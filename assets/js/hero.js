// Hero section module
export function initHeroSection() {
    console.log('Initializing hero section...');
    const registrationSection = document.getElementById('registration-section');
    console.log('Registration section element:', registrationSection);

    if (!registrationSection) {
        console.error('Registration section element not found!');
        return;
    }

    const userID = localStorage.getItem('userID');
    console.log('Current userID in localStorage:', userID);

    if (userID) {
        console.log('User logged in, hiding registration section');
        // First remove transition
        registrationSection.style.transition = 'none';

        // Force hide using multiple methods
        registrationSection.style.display = 'none';
        registrationSection.style.visibility = 'hidden';
        registrationSection.style.opacity = '0';
        registrationSection.style.height = '0';
        registrationSection.style.overflow = 'hidden';
        registrationSection.style.padding = '0';
        registrationSection.style.margin = '0';

        // Force a reflow to ensure styles are applied
        registrationSection.offsetHeight;

        // Then add transition back for showing
        registrationSection.style.transition = 'all 0.3s ease';

        console.log('Registration section display style:', registrationSection.style.display);
        console.log('Registration section computed style:', window.getComputedStyle(registrationSection).display);
    } else {
        console.log('No user logged in, showing registration section');
        // Add a small delay before showing the registration section
        setTimeout(() => {
            // Then add transition back for showing
            registrationSection.style.transition = 'all 0.3s ease';
            registrationSection.style.display = 'flex';
            registrationSection.style.visibility = 'visible';
            registrationSection.style.opacity = '1';
            registrationSection.style.height = 'auto';
            registrationSection.style.overflow = 'visible';
            registrationSection.style.padding = '';
            registrationSection.style.margin = '';
            console.log('Registration section display style:', registrationSection.style.display);
            console.log('Registration section computed style:', window.getComputedStyle(registrationSection).display);
        }, 500); // 500ms delay
    }
}

// Listen for login state changes
window.addEventListener('loginStateChanged', () => {
    console.log('Login state changed event received');
    initHeroSection();
});

// Run initialization immediately
initHeroSection(); 