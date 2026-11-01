/* ========================================
   PROFILE EDITING JAVASCRIPT
   Handles all interactive features for profile.html
   ======================================== */

// Track if there are unsaved changes
let hasUnsavedChanges = false;

// Initialize when page loads
$(document).ready(function() {
    console.log('Profile editing page loaded');
    
    // Load saved data from localStorage if available
    loadProfileData();
    
    // Setup event listeners for image uploads
    setupImageUploads();
    
    // Track changes in all input fields
    trackChanges();
    
    // Auto-open the first section by default
    $('#profile-pic-section').addClass('active');
    
    // Warn before leaving page with unsaved changes
    window.addEventListener('beforeunload', function(e) {
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return e.returnValue;
        }
    });
    
    // Warn before navigating away with unsaved changes
    $('a[href]').click(function(e) {
        if (hasUnsavedChanges && !$(this).attr('href').startsWith('mailto:') && !$(this).attr('href').startsWith('tel:')) {
            if (!confirm('You have unsaved changes. Do you want to leave without saving?')) {
                e.preventDefault();
                return false;
            }
        }
    });
});

/* ========================================
   TRACK CHANGES IN FORM FIELDS
   Set hasUnsavedChanges flag when user edits
   ======================================== */
function trackChanges() {
    // Track changes in all input and textarea fields
    $(document).on('input change', '.form-control, .skill-input', function() {
        hasUnsavedChanges = true;
        updateSaveButtonState();
    });
    
    // Track image uploads
    $(document).on('change', 'input[type="file"]', function() {
        hasUnsavedChanges = true;
        updateSaveButtonState();
    });
}

function updateSaveButtonState() {
    if (hasUnsavedChanges) {
        $('#save-all-btn').addClass('btn-pulse');
    } else {
        $('#save-all-btn').removeClass('btn-pulse');
    }
}

/* ========================================
   TOGGLE EDIT SECTIONS
   Show/hide sections when Edit button clicked
   ======================================== */
function toggleEdit(sectionId) {
    const section = $('#' + sectionId);
    section.toggleClass('active');
    
    // Update button text
    const button = section.prev('.section-header').find('.btn-edit');
    if (section.hasClass('active')) {
        button.html('<i class="fas fa-times"></i> Close');
    } else {
        button.html('<i class="fas fa-edit"></i> Edit');
    }
}

/* ========================================
   PROFILE PICTURE UPLOAD
   ======================================== */
function setupImageUploads() {
    // Profile picture upload
    $('#profile-pic-input').change(function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageUrl = event.target.result;
                
                // Update main profile picture
                $('#current-profile-pic').html(`<img src="${imageUrl}" alt="Profile Picture">`);
                
                // Update sidebar profile picture
                $('#sidebar-profile-pic').html(`<img src="${imageUrl}" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`);
                
                // Save to localStorage
                localStorage.setItem('profilePicture', imageUrl);
                
                showSuccess('Profile picture updated!');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Certificate image uploads
    $(document).on('change', '.cert-image-input', function(e) {
        const file = e.target.files[0];
        const target = $(this).data('target');
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageUrl = event.target.result;
                const preview = $(`[data-cert-type="${target}"]`);
                
                preview.html(`<img src="${imageUrl}" alt="Certificate">`);
                preview.addClass('has-image');
                
                // Save to localStorage
                localStorage.setItem('cert-' + target, imageUrl);
                
                showSuccess('Certificate image uploaded!');
            };
            reader.readAsDataURL(file);
        }
    });
}

function removeProfilePic() {
    $('#current-profile-pic').html('<i class="fas fa-user-circle"></i>');
    $('#sidebar-profile-pic').html('<i class="fas fa-user-circle"></i>');
    $('#profile-pic-input').val('');
    localStorage.removeItem('profilePicture');
    showSuccess('Profile picture removed!');
}

/* ========================================
   SKILLS MANAGEMENT
   Add/Remove Skills
   ======================================== */
function addSkill() {
    const skillItem = `
        <div class="skill-item">
            <input type="text" class="form-control skill-input" placeholder="Enter skill name">
            <button class="btn-remove" onclick="removeSkill(this)"><i class="fas fa-times"></i></button>
        </div>
    `;
    $('#skills-list').append(skillItem);
}

function removeSkill(button) {
    $(button).closest('.skill-item').fadeOut(300, function() {
        $(this).remove();
    });
}

/* ========================================
   HACKATHON MANAGEMENT
   Add/Remove Hackathons
   ======================================== */
let hackathonCounter = 2;

function addHackathon() {
    const hackathonId = 'hackathon-' + hackathonCounter++;
    const hackathonItem = `
        <div class="cert-edit-item">
            <div class="cert-image-preview" data-cert-type="${hackathonId}">
                <i class="fas fa-image"></i>
                <span>No image uploaded</span>
            </div>
            <div class="cert-details">
                <input type="text" class="form-control" placeholder="Hackathon Name">
                <textarea class="form-control" rows="2" placeholder="Description"></textarea>
                <input type="file" class="cert-image-input" accept="image/*" data-target="${hackathonId}" style="display: none;">
                <div class="cert-actions">
                    <button class="btn btn-sm btn-secondary" onclick="this.parentElement.parentElement.querySelector('.cert-image-input').click()">
                        <i class="fas fa-upload"></i> Upload Certificate
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="removeCertItem(this)">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `;
    $('#hackathon-list').append(hackathonItem);
}

/* ========================================
   CERTIFICATION MANAGEMENT
   Add/Remove Certifications
   ======================================== */
let certCounter = 3;

function addCertification() {
    const certId = 'cert-' + certCounter++;
    const certItem = `
        <div class="cert-edit-item">
            <div class="cert-image-preview" data-cert-type="${certId}">
                <i class="fas fa-image"></i>
                <span>No image uploaded</span>
            </div>
            <div class="cert-details">
                <input type="text" class="form-control" placeholder="Certification Name">
                <textarea class="form-control" rows="2" placeholder="Description"></textarea>
                <input type="file" class="cert-image-input" accept="image/*" data-target="${certId}" style="display: none;">
                <div class="cert-actions">
                    <button class="btn btn-sm btn-secondary" onclick="this.parentElement.parentElement.querySelector('.cert-image-input').click()">
                        <i class="fas fa-upload"></i> Upload Certificate
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="removeCertItem(this)">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `;
    $('#certification-list').append(certItem);
}

function removeCertItem(button) {
    if (confirm('Are you sure you want to remove this item?')) {
        $(button).closest('.cert-edit-item').fadeOut(300, function() {
            $(this).remove();
        });
    }
}

/* ========================================
   SAVE ALL CHANGES
   Store data to localStorage and sync to other pages
   ======================================== */
$('#save-all-btn').click(function() {
    // Show loading state
    const originalText = $(this).html();
    $(this).html('<span class="loading"></span> Saving...').prop('disabled', true);
    
    // Simulate save delay
    setTimeout(function() {
        // Save personal information
        const profileData = {
            name: $('#edit-name').val(),
            email: $('#edit-email').val(),
            phone: $('#edit-phone').val(),
            location: $('#edit-location').val(),
            linkedin: $('#edit-linkedin').val(),
            github: $('#edit-github').val(),
            summary: $('#edit-summary').val()
        };
        localStorage.setItem('profileData', JSON.stringify(profileData));
        
        // Save education data
        const educationData = {
            collegeName: $('#edit-college-name').val(),
            degree: $('#edit-degree').val(),
            major: $('#edit-major').val(),
            collegeStart: $('#edit-college-start').val(),
            collegeEnd: $('#edit-college-end').val(),
            schoolName: $('#edit-school-name').val(),
            schoolDescription: $('#edit-school-description').val()
        };
        localStorage.setItem('educationData', JSON.stringify(educationData));
        
        // Update sidebar immediately
        $('#sidebar-name').text(profileData.name);
        $('#sidebar-email').text(profileData.email).attr('href', 'mailto:' + profileData.email);
        $('#sidebar-phone').text(profileData.phone).attr('href', 'tel:' + profileData.phone);
        $('#sidebar-location').text(profileData.location);
        $('#sidebar-linkedin').attr('href', profileData.linkedin);
        $('#sidebar-github').attr('href', profileData.github);
        
        // Save skills
        const skills = [];
        $('.skill-input').each(function() {
            const skill = $(this).val().trim();
            if (skill) {
                skills.push(skill);
            }
        });
        localStorage.setItem('skills', JSON.stringify(skills));
        
        // Save hackathons
        const hackathons = [];
        $('#hackathon-list .cert-edit-item').each(function() {
            const name = $(this).find('input[type="text"]').val();
            const description = $(this).find('textarea').val();
            const certType = $(this).find('.cert-image-preview').data('cert-type');
            const image = localStorage.getItem('cert-' + certType);
            
            if (name) {
                hackathons.push({ name, description, image, certType });
            }
        });
        localStorage.setItem('hackathons', JSON.stringify(hackathons));
        
        // Save certifications
        const certifications = [];
        $('#certification-list .cert-edit-item').each(function() {
            const name = $(this).find('input[type="text"]').val();
            const description = $(this).find('textarea').val();
            const certType = $(this).find('.cert-image-preview').data('cert-type');
            const image = localStorage.getItem('cert-' + certType);
            
            if (name) {
                certifications.push({ name, description, image, certType });
            }
        });
        localStorage.setItem('certifications', JSON.stringify(certifications));
        
        // Mark as saved - clear unsaved changes flag
        hasUnsavedChanges = false;
        updateSaveButtonState();
        
        // Reset button
        $('#save-all-btn').html(originalText).prop('disabled', false);
        
        // Show success message
        showSuccess('All changes saved successfully! Changes will appear on Bio-Data and Resume pages.');
        
        console.log('Profile data saved:', profileData);
        console.log('Skills saved:', skills);
        console.log('Hackathons saved:', hackathons);
        console.log('Certifications saved:', certifications);
        
    }, 1000);
});

/* ========================================
   RESET ALL CHANGES
   Clear localStorage and reload defaults
   ======================================== */
$('#reset-all-btn').click(function() {
    if (confirm('Are you sure you want to reset all changes? This will clear all your edits and restore default values.')) {
        // Clear localStorage
        localStorage.clear();
        
        // Reload page to reset to defaults
        location.reload();
    }
});

/* ========================================
   LOAD PROFILE DATA
   Load saved data from localStorage on page load
   ======================================== */
function loadProfileData() {
    // Load profile picture
    const profilePic = localStorage.getItem('profilePicture');
    if (profilePic) {
        $('#current-profile-pic').html(`<img src="${profilePic}" alt="Profile Picture">`);
        $('#sidebar-profile-pic').html(`<img src="${profilePic}" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`);
    }
    
    // Load personal information
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData) {
        $('#edit-name').val(profileData.name);
        $('#edit-email').val(profileData.email);
        $('#edit-phone').val(profileData.phone);
        $('#edit-location').val(profileData.location);
        $('#edit-linkedin').val(profileData.linkedin);
        $('#edit-github').val(profileData.github);
        $('#edit-summary').val(profileData.summary);
        
        // Update sidebar
        $('#sidebar-name').text(profileData.name);
        $('#sidebar-email').text(profileData.email).attr('href', 'mailto:' + profileData.email);
        $('#sidebar-phone').text(profileData.phone).attr('href', 'tel:' + profileData.phone);
        $('#sidebar-location').text(profileData.location);
        $('#sidebar-linkedin').attr('href', profileData.linkedin);
        $('#sidebar-github').attr('href', profileData.github);
    }
    
    // Load education data
    const educationData = JSON.parse(localStorage.getItem('educationData'));
    if (educationData) {
        $('#edit-college-name').val(educationData.collegeName);
        $('#edit-degree').val(educationData.degree);
        $('#edit-major').val(educationData.major);
        $('#edit-college-start').val(educationData.collegeStart);
        $('#edit-college-end').val(educationData.collegeEnd);
        $('#edit-school-name').val(educationData.schoolName);
        $('#edit-school-description').val(educationData.schoolDescription);
    }
    
    // Load skills
    const skills = JSON.parse(localStorage.getItem('skills'));
    if (skills && skills.length > 0) {
        $('#skills-list').empty();
        skills.forEach(skill => {
            const skillItem = `
                <div class="skill-item">
                    <input type="text" class="form-control skill-input" value="${skill}">
                    <button class="btn-remove" onclick="removeSkill(this)"><i class="fas fa-times"></i></button>
                </div>
            `;
            $('#skills-list').append(skillItem);
        });
    }
    
    // Load certificate images
    $('[data-cert-type]').each(function() {
        const certType = $(this).data('cert-type');
        const image = localStorage.getItem('cert-' + certType);
        if (image) {
            $(this).html(`<img src="${image}" alt="Certificate">`);
            $(this).addClass('has-image');
        }
    });
}

/* ========================================
   SUCCESS MESSAGE DISPLAY
   Show floating success notification
   ======================================== */
function showSuccess(message) {
    const successMsg = $('#success-message');
    successMsg.html(`<i class="fas fa-check-circle"></i> ${message}`);
    successMsg.fadeIn(300);
    
    setTimeout(function() {
        successMsg.fadeOut(300);
    }, 3000);
}

/* ========================================
   EXPORT PROFILE DATA (Bonus Feature)
   Allow downloading profile as JSON
   ======================================== */
function exportProfile() {
    const data = {
        profilePicture: localStorage.getItem('profilePicture'),
        profileData: JSON.parse(localStorage.getItem('profileData')),
        skills: JSON.parse(localStorage.getItem('skills')),
        hackathons: JSON.parse(localStorage.getItem('hackathons')),
        certifications: JSON.parse(localStorage.getItem('certifications'))
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'profile-backup.json';
    link.click();
    
    showSuccess('Profile data exported!');
}

/* ========================================
   KEYBOARD SHORTCUTS
   Ctrl+S to save, Esc to close sections
   ======================================== */
$(document).keydown(function(e) {
    // Ctrl+S or Cmd+S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        $('#save-all-btn').click();
    }
    
    // Escape to close all open sections
    if (e.key === 'Escape') {
        $('.section-content.active').removeClass('active');
        $('.btn-edit').html('<i class="fas fa-edit"></i> Edit');
    }
});

console.log('Profile editing features loaded:');
console.log('✓ Image upload (profile picture & certificates)');
console.log('✓ Editable sections (all fields can be changed)');
console.log('✓ Skills management (add/remove)');
console.log('✓ Hackathon certifications (add/remove)');
console.log('✓ Course certifications (add/remove)');
console.log('✓ GitHub profile link');
console.log('✓ LocalStorage persistence');
console.log('✓ Keyboard shortcuts (Ctrl+S to save, Esc to close)');
