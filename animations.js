/* ========================================
   SCROLL ANIMATIONS & PROFESSIONAL POLISH
   IntersectionObserver for scroll animations
   ======================================== */

$(document).ready(function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add ripple effect to buttons
    addRippleEffect();
    
    // Check for empty states
    checkEmptyStates();
    
    // Add print button to resume page
    if (window.location.pathname.includes('resume.html')) {
        addPrintButton();
    }
    
    console.log('✓ Professional polish features initialized');
});

/* ========================================
   SCROLL ANIMATIONS
   Fade in elements as they enter viewport
   ======================================== */
function initScrollAnimations() {
    // Add animate classes to sections
    $('.content-section, .card, .timeline-card, .project-card, .achievement-card').addClass('animate-on-scroll');
    
    // Create IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    console.log('✓ Scroll animations active');
}

/* ========================================
   RIPPLE EFFECT ON BUTTONS
   Material design ripple effect
   ======================================== */
function addRippleEffect() {
    // Add ripple class to all buttons
    $('.btn, .btn-primary, .btn-secondary, .toggle-btn').addClass('btn-ripple');
    
    console.log('✓ Button ripple effects added');
}

/* ========================================
   EMPTY STATE DETECTION
   Show friendly messages when sections are empty
   ======================================== */
function checkEmptyStates() {
    // Check skills section
    const skillsContainer = $('.skills-section .skills-grid');
    if (skillsContainer.length > 0 && skillsContainer.children('.skill-tag').length === 0) {
        skillsContainer.html(`
            <div class="empty-state">
                <i class="fas fa-code"></i>
                <h3>No skills added yet</h3>
                <p>Click <a href="profile.html">Edit Profile</a> to add your skills</p>
            </div>
        `);
    }
    
    // Check achievements section
    const hackathonList = $('#achievements-container .achievement-list').first();
    if (hackathonList.length > 0 && hackathonList.children('li').length === 0) {
        hackathonList.html(`
            <li style="list-style: none; text-align: center; color: var(--text-muted); padding: 2rem;">
                <i class="fas fa-trophy" style="font-size: 2rem; opacity: 0.3; margin-bottom: 1rem; display: block;"></i>
                <p>No hackathons added yet. <a href="profile.html" style="color: var(--primary-color);">Add some</a></p>
            </li>
        `);
    }
    
    const certList = $('#achievements-container .achievement-list').last();
    if (certList.length > 0 && certList.children('li').length === 0) {
        certList.html(`
            <li style="list-style: none; text-align: center; color: var(--text-muted); padding: 2rem;">
                <i class="fas fa-certificate" style="font-size: 2rem; opacity: 0.3; margin-bottom: 1rem; display: block;"></i>
                <p>No certifications added yet. <a href="profile.html" style="color: var(--primary-color);">Add some</a></p>
            </li>
        `);
    }
    
    console.log('✓ Empty state protection active');
}

/* ========================================
   ADD PRINT BUTTON
   Print button for resume page
   ======================================== */
function addPrintButton() {
    const printButton = `
        <button class="print-resume-btn" onclick="printResume()" aria-label="Print Resume">
            <i class="fas fa-print"></i>
        </button>
    `;
    
    $('body').append(printButton);
    console.log('✓ Print button added to resume page');
}

/* ========================================
   PRINT RESUME FUNCTION
   ======================================== */
function printResume() {
    // Optional: Load print-specific data from localStorage before printing
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    
    if (profileData && profileData.name) {
        // Temporarily update page title for print
        const originalTitle = document.title;
        document.title = `${profileData.name} - Resume`;
        
        window.print();
        
        // Restore original title
        setTimeout(() => {
            document.title = originalTitle;
        }, 1000);
    } else {
        window.print();
    }
    
    console.log('📄 Printing resume...');
}

/* ========================================
   ENHANCED NAVIGATION HIGHLIGHTING
   Ensure active page is clearly highlighted
   ======================================== */
function enhanceNavHighlighting() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    $('.nav-menu a').each(function() {
        const href = $(this).attr('href');
        
        if (href === currentPage) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
    
    console.log(`✓ Active page highlighted: ${currentPage}`);
}

// Call on page load
enhanceNavHighlighting();

/* ========================================
   SMOOTH SCROLL TO TOP BUTTON
   ======================================== */
function addScrollToTop() {
    const scrollButton = `
        <button class="scroll-to-top" onclick="scrollToTop()" style="display: none;" aria-label="Scroll to top">
            <i class="fas fa-arrow-up"></i>
        </button>
    `;
    
    $('body').append(scrollButton);
    
    // Show/hide on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });
}

function scrollToTop() {
    $('html, body').animate({ scrollTop: 0 }, 600);
}

// Uncomment to enable scroll to top button
// addScrollToTop();

/* ========================================
   LOADING STATE FOR ASYNC OPERATIONS
   ======================================== */
function showLoading(buttonElement) {
    const $btn = $(buttonElement);
    const originalText = $btn.html();
    $btn.data('original-text', originalText);
    $btn.html('<span class="spinner"></span>').prop('disabled', true);
}

function hideLoading(buttonElement) {
    const $btn = $(buttonElement);
    const originalText = $btn.data('original-text');
    $btn.html(originalText).prop('disabled', false);
}

// Make functions globally available
window.showLoading = showLoading;
window.hideLoading = hideLoading;

/* ========================================
   FORM VALIDATION ENHANCEMENT
   ======================================== */
function enhanceFormValidation() {
    // Add visual feedback for form validation
    $('input, textarea').on('blur', function() {
        if ($(this).val().trim() === '' && $(this).attr('required')) {
            $(this).css('border-color', '#dc2626');
        } else {
            $(this).css('border-color', 'var(--border-color)');
        }
    });
    
    $('input, textarea').on('focus', function() {
        $(this).css('border-color', 'var(--primary-color)');
    });
}

enhanceFormValidation();

/* ========================================
   ACCESSIBILITY ENHANCEMENTS
   ======================================== */
function enhanceAccessibility() {
    // Add keyboard navigation for custom elements
    $('.theme-toggle, .print-resume-btn').attr('tabindex', '0');
    
    $('.theme-toggle, .print-resume-btn').keypress(function(e) {
        if (e.which === 13 || e.which === 32) { // Enter or Space
            e.preventDefault();
            $(this).click();
        }
    });
    
    console.log('✓ Accessibility enhancements applied');
}

enhanceAccessibility();

/* ========================================
   PERFORMANCE OPTIMIZATION
   Lazy load images if needed
   ======================================== */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Uncomment if you add data-src attributes to images
// lazyLoadImages();

console.log('Professional polish features:');
console.log('✓ Scroll animations with IntersectionObserver');
console.log('✓ Enhanced button hover effects');
console.log('✓ Active navigation highlighting');
console.log('✓ Empty state protection');
console.log('✓ Print resume functionality');
console.log('✓ Ripple effects on buttons');
console.log('✓ Form validation feedback');
console.log('✓ Accessibility improvements');
