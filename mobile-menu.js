/* ========================================
   MOBILE MENU / HAMBURGER FUNCTIONALITY
   Toggle sidebar on mobile devices
   ======================================== */

$(document).ready(function() {
    // Create mobile menu elements
    createMobileMenu();
    
    // Setup event listeners
    setupMobileMenuListeners();
    
    console.log('✓ Mobile menu initialized');
});

/* ========================================
   CREATE MOBILE MENU ELEMENTS
   ======================================== */
function createMobileMenu() {
    // Add hamburger button
    const hamburgerButton = `
        <button class="hamburger-menu" id="hamburgerMenu" aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    `;
    
    // Add mobile overlay
    const mobileOverlay = `
        <div class="mobile-overlay" id="mobileOverlay"></div>
    `;
    
    // Add skip to main content link
    const skipLink = `
        <a href="#main-content" class="skip-to-main">Skip to main content</a>
    `;
    
    $('body').prepend(hamburgerButton);
    $('body').prepend(mobileOverlay);
    $('body').prepend(skipLink);
    
    // Add ID to main content for skip link
    $('.main-content').attr('id', 'main-content');
}

/* ========================================
   SETUP EVENT LISTENERS
   ======================================== */
function setupMobileMenuListeners() {
    // Hamburger button click
    $('#hamburgerMenu').click(function() {
        toggleMobileMenu();
    });
    
    // Overlay click to close
    $('#mobileOverlay').click(function() {
        closeMobileMenu();
    });
    
    // Close button in sidebar (created via CSS ::before)
    $('.sidebar').on('click', function(e) {
        if (e.target === this && $(window).width() <= 768) {
            // Clicked on sidebar background
            const rect = this.getBoundingClientRect();
            if (e.clientX > rect.width - 60 && e.clientY < 60) {
                // Clicked close button area
                closeMobileMenu();
            }
        }
    });
    
    // Close menu when navigation link clicked
    $('.nav-menu a').click(function() {
        if ($(window).width() <= 768) {
            closeMobileMenu();
        }
    });
    
    // Close on Escape key
    $(document).keydown(function(e) {
        if (e.key === 'Escape' && $('body').hasClass('menu-open')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    $(window).resize(function() {
        if ($(window).width() > 768) {
            closeMobileMenu();
        }
    });
}

/* ========================================
   TOGGLE MOBILE MENU
   ======================================== */
function toggleMobileMenu() {
    const $body = $('body');
    const $sidebar = $('.sidebar');
    const $overlay = $('#mobileOverlay');
    const $hamburger = $('#hamburgerMenu');
    
    if ($body.hasClass('menu-open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

/* ========================================
   OPEN MOBILE MENU
   ======================================== */
function openMobileMenu() {
    const $body = $('body');
    const $sidebar = $('.sidebar');
    const $overlay = $('#mobileOverlay');
    const $hamburger = $('#hamburgerMenu');
    
    $body.addClass('menu-open');
    $sidebar.addClass('mobile-open');
    $overlay.addClass('active').css('display', 'block');
    $hamburger.addClass('active');
    
    // Prevent body scroll
    $body.css('overflow', 'hidden');
    
    console.log('📱 Mobile menu opened');
}

/* ========================================
   CLOSE MOBILE MENU
   ======================================== */
function closeMobileMenu() {
    const $body = $('body');
    const $sidebar = $('.sidebar');
    const $overlay = $('#mobileOverlay');
    const $hamburger = $('#hamburgerMenu');
    
    $body.removeClass('menu-open');
    $sidebar.removeClass('mobile-open');
    $overlay.removeClass('active');
    $hamburger.removeClass('active');
    
    // Restore body scroll
    $body.css('overflow', 'auto');
    
    // Hide overlay after transition
    setTimeout(function() {
        if (!$overlay.hasClass('active')) {
            $overlay.css('display', 'none');
        }
    }, 300);
    
    console.log('📱 Mobile menu closed');
}

/* ========================================
   SWIPE GESTURE SUPPORT
   Swipe right to open, left to close
   ======================================== */
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
}, { passive: true });

function handleSwipeGesture() {
    const swipeThreshold = 50;
    
    // Only on mobile
    if ($(window).width() > 768) return;
    
    // Swipe right from left edge to open
    if (touchStartX < 50 && touchEndX - touchStartX > swipeThreshold) {
        openMobileMenu();
    }
    
    // Swipe left to close
    if ($('body').hasClass('menu-open') && touchStartX - touchEndX > swipeThreshold) {
        closeMobileMenu();
    }
}

/* ========================================
   MOBILE MENU STATE PERSISTENCE
   Remember if user prefers menu closed
   ======================================== */
function saveMobileMenuState() {
    const isOpen = $('body').hasClass('menu-open');
    localStorage.setItem('mobileMenuOpen', isOpen);
}

function loadMobileMenuState() {
    const wasOpen = localStorage.getItem('mobileMenuOpen') === 'true';
    if (wasOpen && $(window).width() <= 768) {
        openMobileMenu();
    }
}

// Uncomment to enable state persistence
// loadMobileMenuState();
// $(window).on('beforeunload', saveMobileMenuState);

console.log('Mobile menu features:');
console.log('✓ Hamburger menu button');
console.log('✓ Slide-in sidebar navigation');
console.log('✓ Overlay background');
console.log('✓ Swipe gestures (open/close)');
console.log('✓ Escape key to close');
console.log('✓ Auto-close on link click');
console.log('✓ Responsive to window resize');
