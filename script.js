/* ========================================
   CUSTOM JAVASCRIPT WITH JQUERY
   College Assignment - Supreet Ambiger
   jQuery Interactivity Requirements
   ======================================== */

// Ensure the DOM is fully loaded before running jQuery code
$(document).ready(function() {
    
    /* ========================================
       ASSIGNMENT REQUIREMENT A:
       jQuery animate() method - slideToggle
       Show/Hide Achievements Section
       ======================================== */
    
    // Event handler for the toggle button click
    $('#toggle-achievements').click(function() {
        
        // slideToggle() is the jQuery animate method that smoothly shows/hides the element
        // Duration: 600ms for smooth animation
        $('#achievements-container').slideToggle(600, function() {
            
            // Callback function runs AFTER animation completes
            // Check if the achievements container is now visible
            if ($('#achievements-container').is(':visible')) {
                // Container is now visible - change button text to "Hide Achievements"
                $('#toggle-achievements').html('<i class="fas fa-eye-slash"></i> Hide Achievements');
            } else {
                // Container is now hidden - change button text to "View Achievements"
                $('#toggle-achievements').html('<i class="fas fa-eye"></i> View Achievements');
            }
        });
    });
    
    
    /* ========================================
       ASSIGNMENT REQUIREMENT B:
       JavaScript/jQuery - Append Content
       Add status text to professional summary
       ======================================== */
    
    // Wait 1 second (1000ms) after page load, then append content
    setTimeout(function() {
        
        // Find the paragraph with ID 'summary-paragraph' and append new content
        $('#summary-paragraph').append(' <strong style="color: #10b981;">Status: Actively looking for internship opportunities and collaborative projects.</strong>');
        
        // Optional: Add a fade-in effect to the appended content
        // First hide the entire paragraph, then fade it in smoothly
        $('#summary-paragraph').hide().fadeIn(800);
        
    }, 1000); // 1000 milliseconds = 1 second delay
    
    
    /* ========================================
       BONUS INTERACTIVITY (Not required but enhances UX)
       Smooth scroll for navigation links
       ======================================== */
    
    // Add smooth scrolling to all anchor links within the page
    $('a[href^="#"]').on('click', function(event) {
        
        // Prevent default jump behavior
        event.preventDefault();
        
        // Get the target element ID from the href
        var target = $(this.getAttribute('href'));
        
        // If target exists, smoothly scroll to it
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 20 // 20px offset from top
            }, 800); // 800ms smooth scroll duration
        }
    });
    
    
    /* ========================================
       SKILL TAGS HOVER EFFECT
       Add interactive pulse effect on hover
       ======================================== */
    
    $('.skill-tag').hover(
        function() {
            // Mouse enters - add pulse animation
            $(this).addClass('pulse-animation');
        },
        function() {
            // Mouse leaves - remove pulse animation
            $(this).removeClass('pulse-animation');
        }
    );
    
    
    /* ========================================
       CARD HOVER EFFECT
       Subtle lift animation on project cards
       ======================================== */
    
    $('.project-card, .achievement-card').hover(
        function() {
            // Mouse enters - animate lift
            $(this).animate({
                marginLeft: '5px'
            }, 200);
        },
        function() {
            // Mouse leaves - return to original position
            $(this).animate({
                marginLeft: '0px'
            }, 200);
        }
    );
    
    

    /* ========================================
       FIX #3: ACHIEVEMENT CARD CLICK HANDLER
       Make achievement cards clickable to show details
       ======================================== */
    
    // Add click event handler to all achievement card list items
    // This makes individual hackathon/certification items clickable
    $('.achievement-list li').on('click', function() {
        
        // Get the clicked item
        var $clickedItem = $(this);
        
        // Extract the title (strong tag content)
        var title = $clickedItem.find('strong').text();
        
        // Extract the description (all paragraph text)
        var description = '';
        $clickedItem.find('p').each(function() {
            description += $(this).html() + '<br><br>';
        });
        
        // Check if this item has an associated certificate image
        // (Image would be stored in data attribute or retrieved from localStorage)
        var imageUrl = $clickedItem.data('image-url');
        
        // Create modal content
        var modalContent = '<h2>' + title + '</h2>';
        modalContent += '<div style="margin-top: 20px; line-height: 1.8;">' + description + '</div>';
        
        // If there's an image, add it to the modal
        if (imageUrl) {
            modalContent += '<img src="' + imageUrl + '" style="max-width: 100%; margin-top: 20px; border-radius: 8px;" alt="Certificate">';
        }
        
        // Display modal with achievement details
        showAchievementModal(title, description, imageUrl);
        
        // Add visual feedback - highlight the clicked item briefly
        $clickedItem.css('background-color', '#d1fae5');
        setTimeout(function() {
            $clickedItem.css('background-color', '');
        }, 300);
    });
    
    // Function to display achievement modal
    function showAchievementModal(title, description, imageUrl) {
        
        // Remove any existing modal
        $('.achievement-modal').remove();
        
        // Create modal HTML
        var modalHTML = `
            <div class="achievement-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 20px;
                animation: fadeIn 0.3s ease;
            ">
                <div class="achievement-modal-content" style="
                    background: white;
                    padding: 40px;
                    border-radius: 16px;
                    max-width: 700px;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.3s ease;
                ">
                    <button class="achievement-modal-close" style="
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background: #10b981;
                        color: white;
                        border: none;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='#059669'; this.style.transform='rotate(90deg)';" 
                       onmouseout="this.style.background='#10b981'; this.style.transform='rotate(0deg)';">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <h2 style="
                        color: #0f172a;
                        margin-bottom: 20px;
                        font-size: 1.8rem;
                        border-bottom: 3px solid #10b981;
                        padding-bottom: 15px;
                    ">${title}</h2>
                    
                    <div style="
                        color: #334155;
                        line-height: 1.8;
                        font-size: 1rem;
                    ">${description}</div>
                    
                    ${imageUrl ? `
                        <img src="${imageUrl}" style="
                            max-width: 100%;
                            margin-top: 30px;
                            border-radius: 12px;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                            cursor: pointer;
                        " alt="Certificate" class="modal-certificate-image">
                    ` : ''}
                </div>
            </div>
        `;
        
        // Append modal to body
        $('body').append(modalHTML);
        
        // Close modal on background click
        $('.achievement-modal').on('click', function(e) {
            if ($(e.target).hasClass('achievement-modal')) {
                closeAchievementModal();
            }
        });
        
        // Close modal on close button click
        $('.achievement-modal-close').on('click', function() {
            closeAchievementModal();
        });
        
        // Close modal on Escape key
        $(document).on('keydown.achievementModal', function(e) {
            if (e.key === 'Escape') {
                closeAchievementModal();
            }
        });
        
        // If certificate image exists, make it clickable to open in image modal
        $('.modal-certificate-image').on('click', function() {
            if (typeof openImageModal === 'function') {
                openImageModal(imageUrl);
                closeAchievementModal();
            }
        });
    }
    
    // Function to close achievement modal
    function closeAchievementModal() {
        $('.achievement-modal').fadeOut(300, function() {
            $(this).remove();
        });
        $(document).off('keydown.achievementModal');
    }
    
    // Add visual indicator that achievement items are clickable
    $('.achievement-list li').css({
        'cursor': 'pointer',
        'transition': 'all 0.3s ease'
    }).hover(
        function() {
            $(this).css({
                'background': '#f0fdf4',
                'transform': 'translateX(5px)',
                'box-shadow': '0 4px 12px rgba(16, 185, 129, 0.2)'
            });
        },
        function() {
            $(this).css({
                'background': '#f8fafc',
                'transform': 'translateX(0)',
                'box-shadow': 'none'
            });
        }
    );
    
    console.log('✓ Achievement cards are now clickable!');


        /* ========================================
       FORM VALIDATION (If you add contact form)
       Example validation code (optional)
       ======================================== */
    
    // If you have a contact form with ID 'contact-form'
    $('#contact-form').submit(function(event) {
        
        // Get form field values
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var message = $('#message').val().trim();
        
        // Validation flags
        var isValid = true;
        
        // Check if name is empty
        if (name === '') {
            alert('Please enter your name');
            isValid = false;
        }
        
        // Check if email is empty or invalid format
        if (email === '') {
            alert('Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            isValid = false;
        }
        
        // Check if message is empty
        if (message === '') {
            alert('Please enter a message');
            isValid = false;
        }
        
        // If validation fails, prevent form submission
        if (!isValid) {
            event.preventDefault();
        }
    });
    
    // Helper function to validate email format using regex
    function isValidEmail(email) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    
    /* ========================================
       CONSOLE LOG (For demonstration purposes)
       Shows that jQuery is loaded and working
       ======================================== */
    
    console.log('jQuery version:', $.fn.jquery);
    console.log('Portfolio website loaded successfully!');
    console.log('Assignment Requirements:');
    console.log('âœ“ Requirement A: slideToggle animation implemented');
    console.log('âœ“ Requirement B: Content appended to paragraph after 1 second');
    
});


/* ========================================
   ADDITIONAL JAVASCRIPT EXPLANATIONS
   FOR PROFESSOR REVIEW
   ======================================== */

/*
 * ASSIGNMENT REQUIREMENT A - slideToggle() Method:
 * ================================================
 * The slideToggle() method is a jQuery animation method that:
 * 1. Checks if the element is currently visible or hidden
 * 2. If visible: animates the element's height to 0 (sliding up) and hides it
 * 3. If hidden: animates the element's height from 0 to full height (sliding down) and shows it
 * 4. Takes a duration parameter (600ms in this case) for animation speed
 * 5. Accepts a callback function that runs after animation completes
 * 
 * In this implementation:
 * - Button click triggers slideToggle on #achievements-container
 * - Button text changes based on container visibility state
 * - Smooth 600ms animation provides professional user experience
 */

/*
 * ASSIGNMENT REQUIREMENT B - Append Content:
 * ==========================================
 * The append() method is a jQuery DOM manipulation method that:
 * 1. Adds content to the END of the selected element
 * 2. Does not replace existing content, only adds to it
 * 3. Can append HTML strings, text, or jQuery objects
 * 
 * In this implementation:
 * - setTimeout() creates a 1-second delay
 * - After delay, append() adds status text to #summary-paragraph
 * - Text includes styling (green color) for visual emphasis
 * - fadeIn() adds smooth reveal effect for better UX
 */

/*
 * JQUERY SYNTAX EXPLANATION:
 * ==========================
 * $(selector) - Finds HTML elements
 * .method() - Performs actions on elements
 * 
 * Common patterns used:
 * $('#id') - Selects element by ID
 * $('.class') - Selects elements by class
 * $('element') - Selects elements by tag name
 * 
 * Chaining: $('.class').hide().fadeIn()
 * - Multiple methods can be chained together
 * - Executes left to right in sequence
 */
