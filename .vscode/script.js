/**
 * Resume & Bio-Data Portfolio Website
 * Main JavaScript File - BULLETPROOF VERSION
 * All interactive functionality with comprehensive error handling
 */

// ============================================
// EMAILJS CONFIGURATION & FUNCTIONALITY
// ============================================

/**
 * EmailJS Configuration
 * Replace these values with your own from EmailJS dashboard
 */
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY_HERE',  // Get from EmailJS Dashboard
    serviceId: 'YOUR_SERVICE_ID_HERE',  // e.g., 'service_abc123'
    templateId: 'YOUR_TEMPLATE_ID_HERE' // e.g., 'template_xyz456'
};

/**
 * Initialize EmailJS
 */
function initializeEmailJS() {
    try {
        if (typeof emailjs === 'undefined') {
            console.warn('⚠️ EmailJS library not loaded');
            return false;
        }
        
        // Initialize with your public key
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('✅ EmailJS initialized');
        return true;
    } catch (e) {
        console.error('❌ EmailJS initialization failed:', e);
        return false;
    }
}

/**
 * Send email with portfolio images via EmailJS
 */
async function sendPortfolioEmail() {
    try {
        console.log('📧 Preparing to send portfolio email...');
        
        // Get profile data from localStorage
        const profile = getProfileData();
        
        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY_HERE') {
            alert('⚠️ EmailJS Not Configured!\n\n' +
                  'Please set up EmailJS first:\n' +
                  '1. Go to https://www.emailjs.com/\n' +
                  '2. Create a free account\n' +
                  '3. Get your Public Key, Service ID, and Template ID\n' +
                  '4. Update EMAILJS_CONFIG in script.js\n\n' +
                  'For now, opening regular mailto link...');
            
            // Fallback to regular mailto
            window.location.href = `mailto:supreetambiger@gmail.com?subject=Portfolio Inquiry&body=Hello Supreet,%0D%0A%0D%0AI would like to discuss opportunities with you.`;
            return;
        }
        
        // Show loading state
        const emailBtn = document.getElementById('emailMeBtn');
        const originalHTML = emailBtn ? emailBtn.innerHTML : '';
        if (emailBtn) {
            emailBtn.disabled = true;
            emailBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }
        
        // Prepare email template parameters
        const templateParams = {
            from_name: profile.name || 'Portfolio Visitor',
            from_email: profile.email || 'Not provided',
            from_phone: profile.phone || 'Not provided',
            skills: profile.skills ? profile.skills.join(', ') : 'Not specified',
            message: 'I would like to discuss opportunities with you.',
            
            // Profile picture (Base64)
            profile_picture: profile.profileImage || '',
            has_profile_picture: profile.profileImage ? 'Yes' : 'No',
            
            // Certificates (Base64)
            cert_hackathon1: profile.certificates?.hackathon1 || '',
            cert_hackathon2: profile.certificates?.hackathon2 || '',
            cert_cert1: profile.certificates?.cert1 || '',
            cert_cert2: profile.certificates?.cert2 || '',
            cert_cert3: profile.certificates?.cert3 || '',
            
            // Certificate availability flags
            has_hackathon1: profile.certificates?.hackathon1 ? 'Yes' : 'No',
            has_hackathon2: profile.certificates?.hackathon2 ? 'Yes' : 'No',
            has_cert1: profile.certificates?.cert1 ? 'Yes' : 'No',
            has_cert2: profile.certificates?.cert2 ? 'Yes' : 'No',
            has_cert3: profile.certificates?.cert3 ? 'Yes' : 'No',
            
            // Metadata
            timestamp: new Date().toLocaleString(),
            page_url: window.location.href
        };
        
        console.log('📧 Sending email with portfolio data...');
        
        // Send email via EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );
        
        console.log('✅ Email sent successfully:', response);
        
        // Show success message
        alert('✅ Email Sent Successfully!\n\n' +
              'Your portfolio has been sent to supreetambiger@gmail.com\n\n' +
              'Including:\n' +
              '• Profile Picture: ' + (profile.profileImage ? '✓' : '✗') + '\n' +
              '• Certificates: ' + (Object.values(profile.certificates || {}).filter(c => c).length) + '/5\n\n' +
              'You should receive a response soon!');
        
        // Reset button
        if (emailBtn) {
            emailBtn.disabled = false;
            emailBtn.innerHTML = originalHTML;
        }
        
    } catch (error) {
        console.error('❌ Email sending failed:', error);
        
        // Reset button
        const emailBtn = document.getElementById('emailMeBtn');
        if (emailBtn) {
            emailBtn.disabled = false;
            emailBtn.innerHTML = '<i class="fas fa-envelope"></i> Email Me with Portfolio';
        }
        
        // Show error with fallback option
        const errorMsg = error.text || error.message || 'Unknown error';
        alert('❌ Email Sending Failed\n\n' +
              'Error: ' + errorMsg + '\n\n' +
              'Please try:\n' +
              '1. Check your internet connection\n' +
              '2. Verify EmailJS configuration\n' +
              '3. Or email directly: supreetambiger@gmail.com');
    }
}

/**
 * Initialize "Email Me" button click handler
 */
function initializeEmailButton() {
    try {
        const emailBtn = document.getElementById('emailMeBtn');
        
        if (!emailBtn) {
            console.log('Email Me button not found (may not be on this page)');
            return;
        }
        
        console.log('📧 Initializing Email Me button...');
        
        // Initialize EmailJS
        const emailJSReady = initializeEmailJS();
        
        // Attach click handler
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📧 Email Me button clicked!');
            sendPortfolioEmail();
        });
        
        console.log('✅ Email Me button initialized');
    } catch (e) {
        console.error('❌ Error initializing Email button:', e);
    }
}

// ============================================
// DEFAULT PROFILE DATA
// ============================================
const defaultProfile = {
    name: 'Supreet Suresh Ambiger',
    phone: '8217245816',
    email: 'supreetambiger@gmail.com',
    skills: ['Python', 'Java', 'C/C++', 'HTML/CSS', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
    profileImage: null,
    certificates: {
        hackathon1: null,
        hackathon2: null,
        cert1: null,
        cert2: null,
        cert3: null
    }
};

// Track if there are unsaved changes on profile page
let hasUnsavedChanges = false;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check localStorage usage and available space
 */
function checkStorageUsage() {
    try {
        const profile = getProfileData();
        const profileSize = JSON.stringify(profile).length;
        const profileSizeKB = Math.round(profileSize / 1024);
        const maxSize = 5 * 1024; // 5MB in KB
        const percentUsed = Math.round((profileSizeKB / maxSize) * 100);
        
        console.log(`💾 LocalStorage Usage: ${profileSizeKB}KB / ~${maxSize}KB (${percentUsed}%)`);
        
        if (percentUsed > 80) {
            console.warn(`⚠️ Storage usage high (${percentUsed}%). Consider removing images.`);
        }
        
        return {
            usedKB: profileSizeKB,
            maxKB: maxSize,
            percentUsed: percentUsed,
            availableKB: maxSize - profileSizeKB
        };
    } catch (e) {
        console.error('Error checking storage:', e);
        return null;
    }
}

/**
 * Get profile data from localStorage or use defaults
 */
function getProfileData() {
    try {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            return JSON.parse(storedProfile);
        }
    } catch (e) {
        console.error('Error parsing stored profile:', e);
    }
    return JSON.parse(JSON.stringify(defaultProfile)); // Deep copy
}

/**
 * Save profile data to localStorage with quota error handling
 */
function saveProfileData(profileData) {
    try {
        const jsonString = JSON.stringify(profileData);
        const sizeInKB = Math.round(jsonString.length / 1024);
        
        console.log(`💾 Attempting to save profile data (~${sizeInKB}KB)...`);
        
        // Check if we're approaching the 5MB localStorage limit
        if (sizeInKB > 4500) {
            console.warn('⚠️ Profile data is very large (>4.5MB). Consider removing some images.');
            alert('Warning: Your profile data is very large. You may need to remove some images if you encounter storage errors.');
        }
        
        localStorage.setItem('userProfile', jsonString);
        console.log(`✅ Profile data saved to localStorage (${sizeInKB}KB)`);
        return true;
        
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.code === 22) {
            console.error('❌ LocalStorage quota exceeded!');
            alert('Storage limit exceeded! Your images are too large. Please:\n\n1. Remove some certificate images, or\n2. Upload smaller/lower resolution images\n\nThe browser has a ~5MB storage limit.');
            return false;
        } else {
            console.error('❌ Error saving profile data:', e);
            return false;
        }
    }
}

/**
 * Update all profile information across the page
 */
function updateProfileDisplay() {
    try {
        const profile = getProfileData();
        console.log('📋 Updating profile display with:', profile);
        
        // Update name elements
        const nameElements = ['sidebarName', 'mainName'];
        nameElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = profile.name;
            }
        });
        
        // Update phone elements
        const phoneElements = ['sidebarPhone', 'headerPhone'];
        phoneElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = profile.phone;
            }
        });
        
        // Update email elements (text and href)
        const emailElements = [
            { id: 'sidebarEmail', isLink: true },
            { id: 'headerEmail', isLink: true }
        ];
        emailElements.forEach(item => {
            const element = document.getElementById(item.id);
            if (element) {
                element.textContent = profile.email;
                if (item.isLink) {
                    element.href = `mailto:${profile.email}`;
                }
            }
        });
        
        // Update profile image
        if (profile.profileImage) {
            const profilePics = document.querySelectorAll('#profilePic');
            profilePics.forEach(pic => {
                if (pic) {
                    pic.src = profile.profileImage;
                }
            });
        }
        
        // Update skills lists
        const skillsListElements = document.querySelectorAll('#skillsList');
        skillsListElements.forEach(container => {
            if (container && profile.skills) {
                container.innerHTML = '';
                profile.skills.forEach(skill => {
                    const skillTag = document.createElement('span');
                    skillTag.className = 'skill-tag';
                    skillTag.textContent = skill;
                    container.appendChild(skillTag);
                });
            }
        });
        
        // Update certificate images on index.html
        if (profile.certificates) {
            Object.keys(profile.certificates).forEach(certKey => {
                const certImage = profile.certificates[certKey];
                const container = document.getElementById(`${certKey}ImageContainer`);
                
                if (container && certImage) {
                    container.innerHTML = `<img src="${certImage}" alt="${certKey} certificate" class="clickable-image">`;
                    console.log(`✅ Certificate ${certKey} displayed`);
                }
            });
        }
        
        console.log('✅ Profile display updated successfully');
    } catch (e) {
        console.error('❌ Error updating profile display:', e);
    }
}

// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================

/**
 * Get theme from localStorage or system preference
 */
function getInitialTheme() {
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
    } catch (e) {
        console.error('Error getting theme:', e);
    }
    
    return 'light';
}

/**
 * Initialize theme toggle
 */
function initializeThemeToggle() {
    try {
        const themeToggle = document.getElementById('themeToggle');
        const htmlElement = document.documentElement;
        
        if (!themeToggle) {
            console.log('Theme toggle button not found (may not be on this page)');
            return;
        }
        
        console.log('🎨 Initializing theme toggle...');
        
        // Get current theme from data-theme attribute (set by inline script)
        let currentTheme = htmlElement.getAttribute('data-theme') || getInitialTheme();
        
        // Ensure theme is set
        if (!htmlElement.getAttribute('data-theme')) {
            htmlElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
        }
        
        // Set initial icon based on current theme
        updateThemeIcon(currentTheme);
        
        // Toggle theme on button click
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            console.log(`🎨 Theme switched to: ${newTheme}`);
        });
        
        console.log('✅ Theme toggle initialized');
    } catch (e) {
        console.error('❌ Error initializing theme toggle:', e);
    }
}

/**
 * Update theme toggle icon based on current theme
 */
function updateThemeIcon(theme) {
    try {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        
        const icon = themeToggle.querySelector('i');
        if (!icon) return;
        
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
            themeToggle.setAttribute('title', 'Switch to light mode');
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            themeToggle.setAttribute('title', 'Switch to dark mode');
        }
    } catch (e) {
        console.error('Error updating theme icon:', e);
    }
}

// ============================================
// LIGHTBOX (IMAGE MAGNIFICATION) FUNCTIONALITY
// ============================================

/**
 * Initialize lightbox for image viewing
 */
function initializeLightbox() {
    try {
        const lightboxModal = document.getElementById('lightboxModal');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxClose = document.getElementById('lightboxClose');
        
        if (!lightboxModal || !lightboxImage) {
            console.log('Lightbox elements not found (may not be on this page)');
            return;
        }
        
        console.log('🖼️ Initializing lightbox...');
        
        // Add click event to all clickable images (using event delegation)
        document.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('clickable-image')) {
                e.preventDefault();
                lightboxImage.src = e.target.src;
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('🖼️ Lightbox opened');
            }
        });
        
        // Close lightbox on close button click
        if (lightboxClose) {
            lightboxClose.addEventListener('click', function(e) {
                e.preventDefault();
                closeLightbox();
            });
        }
        
        // Close lightbox on overlay click
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                e.preventDefault();
                closeLightbox();
            }
        });
        
        // Close lightbox on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeLightbox();
            }
        });
        
        function closeLightbox() {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
            console.log('🖼️ Lightbox closed');
        }
        
        console.log('✅ Lightbox initialized');
    } catch (e) {
        console.error('❌ Error initializing lightbox:', e);
    }
}

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

/**
 * Initialize mobile hamburger menu
 */
function initializeMobileMenu() {
    try {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const sidebar = document.getElementById('sidebar');
        
        if (!hamburgerBtn || !sidebar) {
            console.log('Mobile menu elements not found (may not be on this page)');
            return;
        }
        
        console.log('📱 Initializing mobile menu...');
        
        // Toggle sidebar on hamburger click
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sidebar.classList.toggle('active');
            console.log('📱 Mobile menu toggled');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnHamburger = hamburgerBtn.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnHamburger && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
        
        // Close sidebar when clicking nav links on mobile
        const navLinks = sidebar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link) {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('active');
                    }
                });
            }
        });
        
        console.log('✅ Mobile menu initialized');
    } catch (e) {
        console.error('❌ Error initializing mobile menu:', e);
    }
}

// ============================================
// JQUERY REQUIREMENT A: ACHIEVEMENTS TOGGLE
// ============================================

/**
 * Initialize jQuery slideToggle for achievements section
 * This meets the assignment requirement for jQuery slideToggle usage
 */
function initializeAchievementsToggle() {
    try {
        const toggleBtn = $('#achievementsToggle');
        const achievementsContent = $('#achievementsContent');
        
        if (!toggleBtn.length || !achievementsContent.length) {
            console.log('Achievements toggle elements not found (not on index.html)');
            return;
        }
        
        console.log('🏆 Initializing achievements toggle...');
        
        // CRITICAL: Remove any existing click handlers first
        toggleBtn.off('click');
        
        toggleBtn.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🏆 View Achievements button clicked!');
            
            // Use jQuery slideToggle method (REQUIRED FOR ASSIGNMENT)
            achievementsContent.slideToggle(400, function() {
                // Update button text and icon after animation completes
                if (achievementsContent.is(':visible')) {
                    toggleBtn.html('<i class="fas fa-chevron-up"></i> Hide Achievements');
                    toggleBtn.addClass('active');
                    console.log('✅ Achievements section expanded');
                } else {
                    toggleBtn.html('<i class="fas fa-chevron-down"></i> View Achievements');
                    toggleBtn.removeClass('active');
                    console.log('✅ Achievements section collapsed');
                }
            });
        });
        
        console.log('✅ Achievements toggle initialized');
    } catch (e) {
        console.error('❌ Error initializing achievements toggle:', e);
    }
}

// ============================================
// JQUERY REQUIREMENT B: APPEND STATUS TEXT
// ============================================

/**
 * Append status update to professional summary paragraph
 * This meets the assignment requirement for jQuery text appending
 */
function appendStatusUpdate() {
    try {
        const summaryParagraph = $('#summaryParagraph');
        
        if (!summaryParagraph.length) {
            console.log('Summary paragraph not found (not on index.html)');
            return;
        }
        
        console.log('📝 Will append status text in 1 second...');
        
        // Wait 1 second, then append status text (REQUIRED FOR ASSIGNMENT)
        setTimeout(function() {
            const statusText = ' <strong>Status:</strong> Actively looking for internships.';
            summaryParagraph.append(statusText);
            console.log('✅ Status text appended to summary');
        }, 1000);
    } catch (e) {
        console.error('❌ Error appending status update:', e);
    }
}

// ============================================
// PROFILE EDITING FUNCTIONALITY
// ============================================

/**
 * Initialize profile editing form on profile.html
 */
function initializeProfileForm() {
    try {
        const profileForm = document.getElementById('profileForm');
        
        if (!profileForm) {
            console.log('Profile form not found (not on profile.html)');
            return;
        }
        
        console.log('📝 Initializing profile form...');
        
        const profile = getProfileData();
        
        // Populate form fields with current data
        const nameInput = document.getElementById('editName');
        const phoneInput = document.getElementById('editPhone');
        const emailInput = document.getElementById('editEmail');
        
        if (nameInput) {
            nameInput.value = profile.name || '';
            console.log('✅ Name input populated');
        }
        if (phoneInput) {
            phoneInput.value = profile.phone || '';
            console.log('✅ Phone input populated');
        }
        if (emailInput) {
            emailInput.value = profile.email || '';
            console.log('✅ Email input populated');
        }
        
        // Display current skills
        displayEditableSkills(profile.skills);
        
        // Display uploaded certificates
        displayUploadedCertificates(profile.certificates);
        
        // CRITICAL FIX: Handle Save Changes button click directly
        const saveChangesBtn = document.getElementById('saveChangesBtn');
        if (saveChangesBtn) {
            // Remove any existing handlers
            saveChangesBtn.onclick = null;
            
            saveChangesBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('💾 Save Changes button clicked!');
                saveProfileChanges();
            });
            console.log('✅ Save Changes button handler attached');
        } else {
            console.error('❌ Save Changes button not found!');
        }
        
        // Also handle form submission as backup
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('📋 Form submitted');
            saveProfileChanges();
        });
        
        // Handle reset button
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Are you sure you want to reset to default profile data? This cannot be undone.')) {
                    saveProfileData(defaultProfile);
                    hasUnsavedChanges = false;
                    location.reload();
                }
            });
            console.log('✅ Reset button handler attached');
        }
        
        // Handle add skill button
        const addSkillBtn = document.getElementById('addSkillBtn');
        const skillInput = document.getElementById('skillInput');
        
        if (addSkillBtn && skillInput) {
            addSkillBtn.addEventListener('click', function(e) {
                e.preventDefault();
                addSkill();
            });
            
            skillInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                }
            });
            console.log('✅ Add skill button handler attached');
        }
        
        // Initialize image upload handlers
        initializeImageUploads();
        
        // Track changes for unsaved warning
        const formInputs = profileForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            if (input) {
                input.addEventListener('input', function() {
                    hasUnsavedChanges = true;
                });
            }
        });
        
        console.log('✅ Profile form initialized successfully');
    } catch (e) {
        console.error('❌ Error initializing profile form:', e);
    }
}

/**
 * Initialize all image upload handlers
 */
function initializeImageUploads() {
    try {
        console.log('📷 Initializing image uploads...');
        
        // Profile image upload
        const profileImageBtn = document.getElementById('profileImageBtn');
        const profileImageUpload = document.getElementById('profileImageUpload');
        const profileFileName = document.getElementById('profileFileName');
        
        if (profileImageBtn && profileImageUpload) {
            profileImageBtn.addEventListener('click', function(e) {
                e.preventDefault();
                profileImageUpload.click();
            });
            
            profileImageUpload.addEventListener('change', function(e) {
                handleImageUpload(e, 'profile', profileFileName);
            });
            console.log('✅ Profile image upload handler attached');
        }
        
        // Certificate upload buttons
        const uploadCertBtns = document.querySelectorAll('.upload-cert-btn');
        uploadCertBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('data-target');
                    const fileInput = document.getElementById(targetId);
                    if (fileInput) {
                        fileInput.click();
                    }
                });
            }
        });
        
        // Certificate file inputs
        const certUploads = [
            { input: 'hackathon1Upload', fileName: 'hackathon1FileName', preview: 'hackathon1Preview', key: 'hackathon1' },
            { input: 'hackathon2Upload', fileName: 'hackathon2FileName', preview: 'hackathon2Preview', key: 'hackathon2' },
            { input: 'cert1Upload', fileName: 'cert1FileName', preview: 'cert1Preview', key: 'cert1' },
            { input: 'cert2Upload', fileName: 'cert2FileName', preview: 'cert2Preview', key: 'cert2' },
            { input: 'cert3Upload', fileName: 'cert3FileName', preview: 'cert3Preview', key: 'cert3' }
        ];
        
        certUploads.forEach(upload => {
            const input = document.getElementById(upload.input);
            if (input) {
                input.addEventListener('change', function(e) {
                    handleCertificateUpload(e, upload.key, document.getElementById(upload.fileName), document.getElementById(upload.preview));
                });
            }
        });
        
        console.log('✅ All image upload handlers initialized');
    } catch (e) {
        console.error('❌ Error initializing image uploads:', e);
    }
}

/**
 * Compress image to fit within localStorage limits
 * Target: ~500KB per image to stay well under 5MB total limit
 */
function compressImage(file, maxWidth = 800, maxHeight = 800, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = new Image();
            
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // Calculate new dimensions while maintaining aspect ratio
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convert to base64 with compression
                const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                
                // Check size (base64 is roughly 1.37x the binary size)
                const sizeInKB = Math.round((compressedBase64.length * 0.75) / 1024);
                console.log(`📦 Compressed image: ${width}x${height}, ~${sizeInKB}KB`);
                
                resolve(compressedBase64);
            };
            
            img.onerror = function() {
                reject(new Error('Failed to load image'));
            };
            
            img.src = e.target.result;
        };
        
        reader.onerror = function() {
            reject(new Error('Failed to read file'));
        };
        
        reader.readAsDataURL(file);
    });
}

/**
 * Handle profile image upload with compression and immediate save
 */
async function handleImageUpload(event, type, fileNameElement) {
    try {
        const file = event.target.files[0];
        if (!file) return;
        
        console.log(`📷 Profile image selected: ${file.name} (${Math.round(file.size / 1024)}KB)`);
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }
        
        // Update file name display
        if (fileNameElement) {
            fileNameElement.textContent = `${file.name} (compressing...)`;
        }
        
        try {
            // Compress image for localStorage
            const compressedBase64 = await compressImage(file, 400, 400, 0.85);
            
            // Get profile data
            const profile = getProfileData();
            profile.profileImage = compressedBase64;
            
            // CRITICAL: Save to localStorage immediately
            const saved = saveProfileData(profile);
            
            if (!saved) {
                alert('Failed to save image. Storage quota may be exceeded.');
                return;
            }
            
            // Update preview on current page
            const profilePics = document.querySelectorAll('#profilePic');
            profilePics.forEach(pic => {
                if (pic) {
                    pic.src = compressedBase64;
                }
            });
            
            // Update file name display
            if (fileNameElement) {
                fileNameElement.textContent = `${file.name} ✓`;
            }
            
            hasUnsavedChanges = true;
            console.log('✅ Profile image compressed, saved to localStorage, and preview updated');
            
        } catch (compressionError) {
            console.error('❌ Image compression failed:', compressionError);
            alert('Failed to process image. Please try a different image.');
            if (fileNameElement) {
                fileNameElement.textContent = 'Error - try again';
            }
        }
        
    } catch (e) {
        console.error('❌ Error handling image upload:', e);
    }
}

/**
 * Handle certificate image upload with compression and immediate save
 */
async function handleCertificateUpload(event, certKey, fileNameElement, previewElement) {
    try {
        const file = event.target.files[0];
        if (!file) return;
        
        console.log(`📜 Certificate ${certKey} selected: ${file.name} (${Math.round(file.size / 1024)}KB)`);
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }
        
        // Update file name display
        if (fileNameElement) {
            fileNameElement.textContent = `${file.name} (compressing...)`;
        }
        
        try {
            // Compress certificate image (larger size allowed for readability)
            const compressedBase64 = await compressImage(file, 1200, 1200, 0.85);
            
            // Get profile data
            const profile = getProfileData();
            if (!profile.certificates) {
                profile.certificates = {};
            }
            profile.certificates[certKey] = compressedBase64;
            
            // CRITICAL: Save to localStorage immediately
            const saved = saveProfileData(profile);
            
            if (!saved) {
                alert('Failed to save certificate. Storage quota may be exceeded. Try a smaller image.');
                return;
            }
            
            // Update preview on current page
            if (previewElement) {
                previewElement.innerHTML = `<img src="${compressedBase64}" alt="${certKey} certificate" class="clickable-image">`;
            }
            
            // Update file name display
            if (fileNameElement) {
                fileNameElement.textContent = `${file.name} ✓`;
            }
            
            hasUnsavedChanges = true;
            console.log(`✅ Certificate ${certKey} compressed, saved to localStorage, and preview updated`);
            
            // Update the display on index.html certificates section immediately
            updateProfileDisplay();
            
        } catch (compressionError) {
            console.error(`❌ Certificate ${certKey} compression failed:`, compressionError);
            alert('Failed to process certificate image. Please try a different image.');
            if (fileNameElement) {
                fileNameElement.textContent = 'Error - try again';
            }
        }
        
    } catch (e) {
        console.error('❌ Error handling certificate upload:', e);
    }
}

/**
 * Display uploaded certificates in profile form
 */
function displayUploadedCertificates(certificates) {
    try {
        if (!certificates) return;
        
        console.log('📜 Displaying uploaded certificates...');
        
        Object.keys(certificates).forEach(certKey => {
            const certImage = certificates[certKey];
            const preview = document.getElementById(`${certKey}Preview`);
            const fileName = document.getElementById(`${certKey}FileName`);
            
            if (certImage && preview) {
                preview.innerHTML = `<img src="${certImage}" alt="${certKey} certificate" class="clickable-image">`;
                console.log(`✅ Certificate ${certKey} preview displayed`);
            }
            
            if (certImage && fileName) {
                fileName.textContent = 'Image uploaded';
            }
        });
    } catch (e) {
        console.error('❌ Error displaying certificates:', e);
    }
}

/**
 * Display skills in editable format
 */
function displayEditableSkills(skills) {
    try {
        const skillsList = document.getElementById('editSkillsList');
        if (!skillsList) return;
        
        skillsList.innerHTML = '';
        
        if (!skills || skills.length === 0) {
            skillsList.innerHTML = '<p style="color: var(--text-light);">No skills added yet. Add your first skill above!</p>';
            return;
        }
        
        skills.forEach((skill, index) => {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            skillTag.setAttribute('data-index', index);
            skillTag.style.cursor = 'pointer';
            skillTag.title = 'Click to remove';
            
            // Remove skill on click
            skillTag.addEventListener('click', function() {
                removeSkill(index);
            });
            
            skillsList.appendChild(skillTag);
        });
        
        console.log(`✅ ${skills.length} skills displayed`);
    } catch (e) {
        console.error('❌ Error displaying skills:', e);
    }
}

/**
 * Add a new skill
 */
function addSkill() {
    try {
        const skillInput = document.getElementById('skillInput');
        if (!skillInput) {
            console.error('❌ Skill input not found');
            return;
        }
        
        const newSkill = skillInput.value.trim();
        
        if (!newSkill) {
            alert('Please enter a skill name.');
            return;
        }
        
        const profile = getProfileData();
        
        // Check for duplicates
        if (profile.skills.includes(newSkill)) {
            alert('This skill already exists.');
            skillInput.value = '';
            return;
        }
        
        // Add the skill
        profile.skills.push(newSkill);
        displayEditableSkills(profile.skills);
        skillInput.value = '';
        skillInput.focus();
        hasUnsavedChanges = true;
        
        console.log(`✅ Skill "${newSkill}" added`);
    } catch (e) {
        console.error('❌ Error adding skill:', e);
    }
}

/**
 * Remove a skill by index
 */
function removeSkill(index) {
    try {
        const profile = getProfileData();
        
        if (!profile.skills || !profile.skills[index]) {
            console.error('❌ Invalid skill index');
            return;
        }
        
        if (confirm(`Remove "${profile.skills[index]}"?`)) {
            const removedSkill = profile.skills[index];
            profile.skills.splice(index, 1);
            displayEditableSkills(profile.skills);
            hasUnsavedChanges = true;
            console.log(`✅ Skill "${removedSkill}" removed`);
        }
    } catch (e) {
        console.error('❌ Error removing skill:', e);
    }
}

/**
 * Save profile changes from the form
 */
function saveProfileChanges() {
    try {
        console.log('💾 saveProfileChanges() called');
        
        const nameInput = document.getElementById('editName');
        const phoneInput = document.getElementById('editPhone');
        const emailInput = document.getElementById('editEmail');
        
        // Check if inputs exist
        if (!nameInput || !phoneInput || !emailInput) {
            console.error('❌ Form inputs not found!', {
                name: !!nameInput,
                phone: !!phoneInput,
                email: !!emailInput
            });
            alert('Error: Form inputs not found. Please refresh the page.');
            return;
        }
        
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        
        console.log('📋 Form values:', { name, phone, email });
        
        // ============================================
        // STRICT VALIDATION (Silly Mode)
        // ============================================
        
        // 1. Check if all fields are filled
        if (!name || !phone || !email) {
            alert('Please fill in all required fields.');
            console.warn('⚠️ Validation failed: missing fields');
            return;
        }
        
        // 2. PHONE VALIDATION - Must contain ONLY digits (numbers)
        const phonePattern = /^\d+$/;  // Only digits, no spaces/dashes/letters
        if (!phonePattern.test(phone)) {
            alert('Please enter numbers only for the phone number');
            console.warn('⚠️ Validation failed: phone contains non-numeric characters');
            // Highlight the phone field
            phoneInput.focus();
            phoneInput.select();
            return;
        }
        
        // 3. EMAIL VALIDATION - Must match standard email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email format (e.g., name@example.com)');
            console.warn('⚠️ Validation failed: invalid email format');
            // Highlight the email field
            emailInput.focus();
            emailInput.select();
            return;
        }
        
        console.log('✅ All validation checks passed');
        
        const profile = getProfileData();
        
        // Update profile object
        profile.name = name;
        profile.phone = phone;
        profile.email = email;
        
        console.log('💾 Saving profile to localStorage:', profile);
        
        // Save to localStorage
        const saved = saveProfileData(profile);
        
        if (!saved) {
            alert('Error saving profile. Please try again.');
            return;
        }
        
        // Mark as saved
        hasUnsavedChanges = false;
        
        // Show success message
        const successAlert = document.getElementById('successAlert');
        if (successAlert) {
            successAlert.classList.add('show');
            console.log('✅ Success alert shown');
            
            // Scroll to top to show the alert
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Hide after 5 seconds
            setTimeout(function() {
                successAlert.classList.remove('show');
            }, 5000);
        } else {
            console.warn('⚠️ Success alert element not found');
            alert('Profile saved successfully!');
        }
        
        // Update the display immediately
        updateProfileDisplay();
        
        console.log('✅ Profile saved and display updated successfully!');
    } catch (e) {
        console.error('❌ Error saving profile changes:', e);
        alert('An error occurred while saving. Please try again.');
    }
}

// ============================================
// UNSAVED CHANGES WARNING
// ============================================

/**
 * Initialize unsaved changes warning for profile page
 */
function initializeUnsavedChangesWarning() {
    try {
        // Only on profile page
        if (!document.getElementById('profileForm')) {
            return;
        }
        
        console.log('⚠️ Initializing unsaved changes warning...');
        
        // Browser warning when closing/refreshing
        window.onbeforeunload = function(e) {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
                return e.returnValue;
            }
        };
        
        // Warning when clicking navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link) {
                link.addEventListener('click', function(e) {
                    if (hasUnsavedChanges) {
                        const confirmLeave = confirm('You have unsaved changes. Are you sure you want to leave this page?');
                        if (!confirmLeave) {
                            e.preventDefault();
                        }
                    }
                });
            }
        });
        
        console.log('✅ Unsaved changes warning initialized');
    } catch (e) {
        console.error('❌ Error initializing unsaved changes warning:', e);
    }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

/**
 * Add smooth scrolling to anchor links
 */
function initializeSmoothScroll() {
    try {
        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => {
            if (anchor) {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href && href !== '#' && href.length > 1) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                });
            }
        });
    } catch (e) {
        console.error('Error initializing smooth scroll:', e);
    }
}

// ============================================
// INITIALIZATION ON PAGE LOAD
// ============================================

/**
 * Main initialization function
 * Runs when the DOM is fully loaded
 */
$(document).ready(function() {
    console.log('🚀 DOM Ready - Initializing all components...');
    
    try {
        // Check localStorage usage
        checkStorageUsage();
        
        // Update profile display on all pages (loads saved images)
        updateProfileDisplay();
        
        // Initialize EmailJS and Email Me button
        initializeEmailButton();
        
        // Initialize theme toggle
        initializeThemeToggle();
        
        // Initialize lightbox for image viewing
        initializeLightbox();
        
        // Initialize mobile menu
        initializeMobileMenu();
        
        // Initialize smooth scrolling
        initializeSmoothScroll();
        
        // jQuery Requirement A: Achievements toggle (only on index.html)
        initializeAchievementsToggle();
        
        // jQuery Requirement B: Append status text (only on index.html)
        appendStatusUpdate();
        
        // Initialize profile editing form (only on profile.html)
        initializeProfileForm();
        
        // Initialize unsaved changes warning (only on profile.html)
        initializeUnsavedChangesWarning();
        
        // Add active class to current page nav link
        highlightActiveNavLink();
        
        // Add fade-in animation to sections
        addFadeInAnimation();
        
        console.log('✅ All components initialized successfully!');
    } catch (e) {
        console.error('❌ Critical error during initialization:', e);
    }
});

/**
 * Highlight the active navigation link based on current page
 */
function highlightActiveNavLink() {
    try {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link) {
                const linkPage = link.getAttribute('href');
                if (linkPage === currentPage || 
                    (currentPage === '' && linkPage === 'index.html')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    } catch (e) {
        console.error('Error highlighting active nav link:', e);
    }
}

/**
 * Add fade-in animation to sections as they appear
 */
function addFadeInAnimation() {
    try {
        const sections = document.querySelectorAll('.bio-section, .resume-section, .form-card');
        
        if (sections.length === 0) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            if (section) {
                observer.observe(section);
            }
        });
    } catch (e) {
        console.error('Error adding fade-in animation:', e);
    }
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================

/**
 * Handle window resize events
 */
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    }, 250);
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c Resume Portfolio Website ', 'background: #10b981; color: white; font-size: 20px; padding: 10px;');
console.log('%c Created by Supreet Suresh Ambiger ', 'color: #10b981; font-size: 14px;');
console.log('%c KLE Institute of Technology, Hubballi ', 'color: #64748b; font-size: 12px;');
console.log('%c ✅ All systems operational - BULLETPROOF VERSION ', 'color: #10b981; font-size: 11px; font-weight: bold;');
