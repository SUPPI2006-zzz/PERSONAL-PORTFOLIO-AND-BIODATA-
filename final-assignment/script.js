$(document).ready(function() {
    
    // 1. Mobile Menu Logic
    $('#hamburgerMenu').click(function() {
        $(this).toggleClass('active');
        $('#sidebar').toggleClass('mobile-open');
        $('#mobileOverlay').toggleClass('active');
    });

    $('#mobileOverlay').click(function() {
        $('#hamburgerMenu').removeClass('active');
        $('#sidebar').removeClass('mobile-open');
        $(this).removeClass('active');
    });

    // 2. jQuery Assignment Requirement A: slideToggle Animation
    $('#toggle-achievements').click(function() {
        $('#achievements-container').slideToggle(600, function() {
            // Change button text based on visibility
            if ($('#achievements-container').is(':visible')) {
                $('#toggle-achievements').html('<i class="fas fa-eye-slash"></i> Hide Achievements');
            } else {
                $('#toggle-achievements').html('<i class="fas fa-eye"></i> View Achievements');
            }
        });
    });

    // 3. jQuery Assignment Requirement B: Append Content
    setTimeout(function() {
        if ($('#summary-paragraph').length > 0) {
            $('#summary-paragraph').append(' <br><br><strong style="color: #10b981;">Status: Actively looking for internship opportunities.</strong>');
        }
    }, 1000); // 1 second delay

});