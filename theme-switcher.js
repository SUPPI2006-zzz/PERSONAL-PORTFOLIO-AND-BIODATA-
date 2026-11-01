/* ========================================
   DARK/LIGHT MODE THEME SWITCHER SCRIPT
   Toggle between dark and light themes
   ======================================== */

$(document).ready(function() {
    // Create theme toggle button
    createThemeToggle();
    
    // Load saved theme preference
    loadThemePreference();
    
    console.log('✓ Theme switcher initialized');
});

/* ========================================
   CREATE THEME TOGGLE BUTTON
   ======================================== */
function createThemeToggle() {
    const toggleButton = `
        <button class="theme-toggle" id="themeToggle" onclick="toggleTheme()" aria-label="Toggle dark/light mode">
            <i class="fas fa-moon"></i>
        </button>
    `;
    
    $('body').append(toggleButton);
}

/* ========================================
   TOGGLE THEME
   ======================================== */
function toggleTheme() {
    const body = $('body');
    const themeIcon = $('#themeToggle i');
    
    // Add switching animation
    body.addClass('theme-switching');
    
    // Toggle dark mode class
    body.toggleClass('dark-mode');
    
    // Update icon with animation
    if (body.hasClass('dark-mode')) {
        // Switch to dark mode - show sun icon
        themeIcon.removeClass('fa-moon').addClass('fa-sun');
        localStorage.setItem('theme', 'dark');
        console.log('🌙 Dark mode activated');
    } else {
        // Switch to light mode - show moon icon
        themeIcon.removeClass('fa-sun').addClass('fa-moon');
        localStorage.setItem('theme', 'light');
        console.log('☀️ Light mode activated');
    }
    
    // Remove animation class after animation completes
    setTimeout(function() {
        body.removeClass('theme-switching');
    }, 300);
}

/* ========================================
   LOAD THEME PREFERENCE
   Load saved theme from localStorage
   ======================================== */
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const body = $('body');
    const themeIcon = $('#themeToggle i');
    
    if (savedTheme === 'dark') {
        body.addClass('dark-mode');
        themeIcon.removeClass('fa-moon').addClass('fa-sun');
        console.log('🌙 Dark mode loaded from preferences');
    } else {
        console.log('☀️ Light mode (default)');
    }
    
    // Also check system preference if no saved preference
    if (!savedTheme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.addClass('dark-mode');
            themeIcon.removeClass('fa-moon').addClass('fa-sun');
            console.log('🌙 Dark mode activated based on system preference');
        }
    }
}

/* ========================================
   KEYBOARD SHORTCUT
   Press 'T' to toggle theme
   ======================================== */
$(document).keydown(function(e) {
    // Check if 'T' key is pressed (and not in input field)
    if (e.key === 't' || e.key === 'T') {
        if (!$(e.target).is('input, textarea')) {
            toggleTheme();
        }
    }
});

/* ========================================
   AUTO THEME BASED ON TIME OF DAY (OPTIONAL)
   Automatically switch based on time
   ======================================== */
function autoThemeByTime() {
    const hour = new Date().getHours();
    const body = $('body');
    const themeIcon = $('#themeToggle i');
    
    // Dark mode between 6 PM (18:00) and 6 AM (06:00)
    if (hour >= 18 || hour < 6) {
        if (!body.hasClass('dark-mode')) {
            body.addClass('dark-mode');
            themeIcon.removeClass('fa-moon').addClass('fa-sun');
            console.log('🌙 Dark mode auto-activated (nighttime)');
        }
    } else {
        if (body.hasClass('dark-mode')) {
            body.removeClass('dark-mode');
            themeIcon.removeClass('fa-sun').addClass('fa-moon');
            console.log('☀️ Light mode auto-activated (daytime)');
        }
    }
}

// Uncomment to enable auto theme by time on page load
// autoThemeByTime();

/* ========================================
   SYSTEM THEME CHANGE LISTENER
   Update when system theme changes
   ======================================== */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    const savedTheme = localStorage.getItem('theme');
    
    // Only auto-switch if user hasn't set a preference
    if (!savedTheme) {
        const body = $('body');
        const themeIcon = $('#themeToggle i');
        
        if (e.matches) {
            // System switched to dark mode
            body.addClass('dark-mode');
            themeIcon.removeClass('fa-moon').addClass('fa-sun');
            console.log('🌙 Dark mode activated (system preference changed)');
        } else {
            // System switched to light mode
            body.removeClass('dark-mode');
            themeIcon.removeClass('fa-sun').addClass('fa-moon');
            console.log('☀️ Light mode activated (system preference changed)');
        }
    }
});

console.log('Theme switcher features:');
console.log('✓ Click floating button to toggle theme');
console.log('✓ Press "T" key to toggle theme');
console.log('✓ Theme preference saved to localStorage');
console.log('✓ Auto-detects system dark mode preference');
console.log('✓ Smooth transitions between themes');
