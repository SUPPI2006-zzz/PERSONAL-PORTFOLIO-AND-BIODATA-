/* ========================================
   IMAGE MODAL/LIGHTBOX JAVASCRIPT
   Click any image to view full size popup
   ======================================== */

$(document).ready(function() {
    // Create modal HTML structure and append to body
    createImageModal();
    
    // Setup click handlers for all images
    setupImageClickHandlers();
    
    console.log('✓ Image modal/lightbox initialized');
});

/* ========================================
   CREATE MODAL STRUCTURE
   ======================================== */
function createImageModal() {
    const modalHTML = `
        <div class="image-modal-overlay" id="imageModal">
            <div class="image-modal-content" onclick="event.stopPropagation()">
                <button class="image-modal-close" onclick="closeImageModal()">
                    <i class="fas fa-times"></i>
                </button>
                <img src="" alt="Full size image" id="modalImage">
                <div class="image-modal-caption" id="modalCaption"></div>
            </div>
        </div>
    `;
    
    $('body').append(modalHTML);
    
    // Close modal when clicking overlay
    $('#imageModal').click(function() {
        closeImageModal();
    });
    
    // Close modal on Escape key
    $(document).keydown(function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
}

/* ========================================
   SETUP CLICK HANDLERS FOR ALL IMAGES
   ======================================== */
function setupImageClickHandlers() {
    // Handle dynamically loaded images
    $(document).on('click', '.cert-image-preview img, .current-image img, .profile-pic img', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const imageSrc = $(this).attr('src');
        const imageAlt = $(this).attr('alt') || 'Image';
        
        // Get caption from parent or nearby text
        let caption = imageAlt;
        const parentCard = $(this).closest('.cert-edit-item');
        if (parentCard.length > 0) {
            const certName = parentCard.find('input[type="text"]').val();
            if (certName) {
                caption = certName;
            }
        }
        
        openImageModal(imageSrc, caption);
    });
    
    // Make profile picture in sidebar clickable
    $(document).on('click', '.sidebar .profile-pic img', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const imageSrc = $(this).attr('src');
        openImageModal(imageSrc, 'Profile Picture');
    });
}

/* ========================================
   OPEN IMAGE MODAL
   ======================================== */
function openImageModal(imageSrc, caption) {
    $('#modalImage').attr('src', imageSrc);
    $('#modalCaption').text(caption);
    $('#imageModal').addClass('active');
    
    // Prevent body scroll when modal is open
    $('body').css('overflow', 'hidden');
}

/* ========================================
   CLOSE IMAGE MODAL
   ======================================== */
function closeImageModal() {
    $('#imageModal').removeClass('active');
    
    // Restore body scroll
    $('body').css('overflow', 'auto');
    
    // Clear image after animation
    setTimeout(function() {
        $('#modalImage').attr('src', '');
        $('#modalCaption').text('');
    }, 300);
}

/* ========================================
   ZOOM IN/OUT WITH MOUSE WHEEL (BONUS)
   ======================================== */
let zoomLevel = 1;

$('#modalImage').on('wheel', function(e) {
    e.preventDefault();
    
    if (e.originalEvent.deltaY < 0) {
        // Zoom in
        zoomLevel = Math.min(zoomLevel + 0.1, 3);
    } else {
        // Zoom out
        zoomLevel = Math.max(zoomLevel - 0.1, 0.5);
    }
    
    $(this).css('transform', `scale(${zoomLevel})`);
});

// Reset zoom when modal closes
$('#imageModal').on('click', function() {
    zoomLevel = 1;
    $('#modalImage').css('transform', 'scale(1)');
});

console.log('Image modal features:');
console.log('✓ Click any image to view full size');
console.log('✓ Press Escape or click outside to close');
console.log('✓ Mouse wheel to zoom in/out');
console.log('✓ Works on profile pictures and certificates');
