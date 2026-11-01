# 🎓 Portfolio Website - Supreet Suresh Ambiger

A modern, responsive portfolio website with complete profile editing capabilities built for a college web development assignment.

## 📁 Project Structure

```
RESUME/
├── index.html              # Bio-Data page (Home)
├── resume.html             # Resume page
├── profile.html            # Edit Profile page (NEW!)
├── style.css               # Main stylesheet
├── profile-style.css       # Profile editing styles
├── script.js               # Main JavaScript with jQuery
├── profile-script.js       # Profile editing JavaScript
├── sync-data.js            # Data synchronization script (NEW!)
└── README.md               # This file
```

## ✨ Features

### 🏠 Bio-Data Page (index.html)
- Professional introduction and summary
- Top skills displayed as styled tags
- Education timeline
- Interactive achievements section with slideToggle animation
- Hackathon certifications
- Course certifications and job simulations
- Contact information with call-to-action buttons

### 📄 Resume Page (resume.html)
- Professional summary
- Detailed education section
- Technical skills organized by categories
- Key projects with features and technologies
- Certifications grid
- Download/contact section

### ✏️ Edit Profile Page (profile.html) - **NEW!**

#### Editable Sections:
1. **Profile Picture Upload**
   - Upload custom profile picture
   - Remove/change anytime
   - Syncs to all pages instantly

2. **Personal Information**
   - Full Name
   - Email Address
   - Phone Number
   - Location
   - LinkedIn URL
   - GitHub URL (https://github.com/SUPPI2006-zzz)

3. **Professional Summary**
   - Edit your about section
   - Syncs to Bio-Data and Resume pages

4. **Technical Skills**
   - Add unlimited skills
   - Remove any skill
   - Edit existing skills
   - Syncs across all pages

5. **Hackathon Certifications**
   - Upload certificate images
   - Edit hackathon names and descriptions
   - Add/remove hackathons
   - Includes:
     - CODE BHARAT 2025 (IIIT Dharwad)
     - AGAMYA TECH SUMMIT 2025 - EKAIVA Hackathon

6. **Course Certifications**
   - Upload certificate images
   - Edit certification names and descriptions
   - Add/remove certifications
   - Includes:
     - AI Tools & ChatGPT Workshop (Be10x)
     - GenAI Powered Data Analytics (Forage AI)
     - Deloitte Australia - Data Analytics (Forage)

## 🎯 Assignment Requirements Met

✅ **Multiple Web Pages**
- Three pages with consistent navigation
- Active page highlighting (green for current page)

✅ **Premium UI/UX Design**
- Two-column layout (fixed sidebar + main content)
- Dark slate (#1e293b) and emerald green (#10b981) theme
- Google Fonts (Poppins)
- Subtle shadows and rounded corners
- Fully responsive (mobile, tablet, desktop)

✅ **jQuery/JavaScript Interactivity**
- **Requirement A:** slideToggle animation for achievements section
- **Requirement B:** Content appended to paragraph after 1 second
- Image upload with preview
- Form validation
- Data persistence with localStorage

✅ **Cloud Hosting Ready**
- Pure static files (HTML, CSS, JS)
- No build tools required
- Drag-and-drop ready for Netlify

## 🚀 How to Use

### Local Testing:
1. Open `index.html` in your browser
2. Navigate between pages using the sidebar menu
3. Go to "Edit Profile" to customize your information
4. Upload images and edit all sections
5. Click "Save All Changes" to persist data

### Editing Your Profile:
1. Click **Edit Profile** in the navigation menu
2. Click **Edit** button next to any section to expand it
3. Make your changes:
   - Upload profile picture
   - Edit personal information
   - Add/remove skills
   - Upload certificate images
   - Edit hackathon/certification details
4. Click **Save All Changes** at the top
5. Changes automatically appear on Bio-Data and Resume pages

### Unsaved Changes Warning:
- When you edit anything, changes are tracked
- If you try to navigate away, you'll get a confirmation popup
- "Save All Changes" button pulses when there are unsaved changes
- Press **Ctrl+S** to quick-save (or Cmd+S on Mac)
- Press **Esc** to close all open sections

### Cloud Hosting (Netlify):
1. Go to [netlify.com](https://www.netlify.com/)
2. Sign in or create account
3. Drag and drop your project folder
4. Your site will be live instantly!

## 🔧 Technical Details

### Technologies Used:
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with variables and animations
- **JavaScript** - Interactive features
- **jQuery 3.6.0** - DOM manipulation and animations
- **Font Awesome 6.4.0** - Professional icons
- **Google Fonts** - Poppins typography
- **LocalStorage API** - Data persistence

### Key Features:
- **Responsive Design** - Adapts to all screen sizes
- **Data Persistence** - Changes saved in browser
- **Cross-Page Sync** - Edits appear on all pages
- **Image Upload** - Preview and store images locally
- **Form Validation** - Client-side validation
- **Keyboard Shortcuts** - Ctrl+S to save, Esc to close
- **Unsaved Changes Warning** - Prevents accidental data loss

## 📝 Customization Guide

### Updating Certifications:

#### Hackathons (index.html):
```html
<li>
    <strong>Your Hackathon Name</strong>
    <p><em>Organization | Date</em></p>
    <p>Your description here...</p>
</li>
```

#### Course Certifications (index.html):
```html
<li>
    <strong>Your Certification Name</strong>
    <p><em>Provider | Date</em></p>
    <p>Your description here...</p>
</li>
```

### Adding Skills:
Use the Edit Profile page or manually edit:
```html
<span class="skill-tag">Your Skill Name</span>
```

### Changing Colors:
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #10b981;     /* Change this */
    --dark-bg: #1e293b;            /* Change this */
}
```

## 🎨 Design Features

- **Sidebar:** Fixed navigation with profile info
- **Cards:** Rounded corners with subtle shadows
- **Animations:** Smooth transitions and hover effects
- **Icons:** Font Awesome for professional look
- **Typography:** Poppins font family
- **Colors:** Dark slate and emerald green theme
- **Responsive:** Mobile-first approach

## 📱 Responsive Breakpoints

- **Desktop:** 768px and above (two-column layout)
- **Tablet:** 600px - 768px (adjusted sidebar)
- **Mobile:** Below 600px (stacked layout)

## 🔐 Data Storage

All data is stored in browser's localStorage:
- `profilePicture` - Profile image as base64
- `profileData` - Personal information JSON
- `skills` - Array of skill names
- `hackathons` - Array of hackathon objects
- `certifications` - Array of certification objects
- `cert-*` - Individual certificate images

### Clear All Data:
Click "Reset All" button on Edit Profile page, or:
```javascript
localStorage.clear();
location.reload();
```

## 🎓 Academic Use

This project demonstrates:
- Semantic HTML5 structure
- Modern CSS3 techniques
- jQuery animations and DOM manipulation
- JavaScript ES6 features
- LocalStorage API usage
- Responsive web design
- User experience (UX) principles
- Clean, documented code

## 📞 Contact Information

- **Name:** Supreet Suresh Ambiger
- **Email:** supreetambiger@gmail.com
- **Phone:** 8217245816
- **Location:** Hubballi Urban, Karnataka, India
- **LinkedIn:** [Profile Link](https://www.linkedin.com/in/supreet-suresh-ambiger-33158634a)
- **GitHub:** [SUPPI2006-zzz](https://github.com/SUPPI2006-zzz)

## 📄 License

This project is created for educational purposes as part of a college assignment.

---

**Built with ❤️ for KLE Institute of Technology, Hubballi**

**Assignment:** Web Development - Resume & Bio-Data Website
**Semester:** 5th Sem
**Year:** 2025
