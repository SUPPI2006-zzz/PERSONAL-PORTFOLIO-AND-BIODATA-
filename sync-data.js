/* ========================================
   DATA SYNCHRONIZATION SCRIPT
   Syncs profile data from localStorage to Bio-Data and Resume pages
   Include this script in index.html and resume.html
   ======================================== */

$(document).ready(function() {
    console.log('Data sync script loaded');
    
    // Sync profile data from localStorage
    syncProfileData();
    syncSkills();
    syncAchievements();
});

/* ========================================
   SYNC PROFILE DATA
   Update sidebar and main content with saved data
   ======================================== */
function syncProfileData() {
    // Load profile picture
    const profilePic = localStorage.getItem('profilePicture');
    if (profilePic) {
        $('.profile-pic').html(`<img src="${profilePic}" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`);
    }
    
    // Load personal information
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData) {
        // Update sidebar
        $('.profile-name').text(profileData.name);
        $('#sidebar-email, .contact-info a[href^="mailto:"]').text(profileData.email).attr('href', 'mailto:' + profileData.email);
        $('#sidebar-phone, .contact-info a[href^="tel:"]').text(profileData.phone).attr('href', 'tel:' + profileData.phone);
        $('#sidebar-location, .contact-info span').first().text(profileData.location);
        $('#sidebar-linkedin, .contact-info a[href*="linkedin"]').attr('href', profileData.linkedin);
        $('#sidebar-github, .contact-info a[href*="github"]').attr('href', profileData.github);
        
        // Update main content summary (if exists)
        $('#summary-paragraph').first().text(profileData.summary);
        $('.lead').first().text(profileData.summary);
    }
}

/* ========================================
   SYNC SKILLS
   Update skills section on both pages
   ======================================== */
function syncSkills() {
    const skills = JSON.parse(localStorage.getItem('skills'));
    if (skills && skills.length > 0) {
        // Update Bio-Data page skills
        if ($('.skills-grid').length > 0 && $('.skills-section').length > 0) {
            $('.skills-section .skills-grid').empty();
            skills.forEach(skill => {
                $('.skills-section .skills-grid').append(`<span class="skill-tag">${skill}</span>`);
            });
        }
        
        // Update Resume page skills (if on resume page)
        if ($('.skills-category').length > 0) {
            // Clear all skill grids in skills categories
            $('.skills-category .skills-grid').empty();
            
            // Add all skills to the first category
            skills.forEach(skill => {
                $('.skills-category .skills-grid').first().append(`<span class="skill-tag">${skill}</span>`);
            });
        }
    }
}

/* ========================================
   SYNC ACHIEVEMENTS (HACKATHONS & CERTIFICATIONS)
   Update achievements section on Bio-Data page
   ======================================== */
function syncAchievements() {
    // Sync Hackathons
    const hackathons = JSON.parse(localStorage.getItem('hackathons'));
    if (hackathons && hackathons.length > 0) {
        const hackathonList = $('#achievements-container .achievement-list').first();
        if (hackathonList.length > 0) {
            hackathonList.empty();
            hackathons.forEach(hackathon => {
                const listItem = `
                    <li>
                        <strong>${hackathon.name}</strong>
                        <p>${hackathon.description.replace(/\n/g, '<br>')}</p>
                    </li>
                `;
                hackathonList.append(listItem);
            });
        }
    }
    
    // Sync Certifications
    const certifications = JSON.parse(localStorage.getItem('certifications'));
    if (certifications && certifications.length > 0) {
        const certList = $('#achievements-container .achievement-list').last();
        if (certList.length > 0) {
            certList.empty();
            certifications.forEach(cert => {
                const listItem = `
                    <li>
                        <strong>${cert.name}</strong>
                        <p>${cert.description.replace(/\n/g, '<br>')}</p>
                    </li>
                `;
                certList.append(listItem);
            });
        }
    }
}

console.log('✓ Profile data synced from localStorage');
console.log('✓ Skills synced across pages');
console.log('✓ Achievements synced to Bio-Data page');
