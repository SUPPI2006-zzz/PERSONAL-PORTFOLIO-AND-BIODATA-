# 📧 EmailJS Quick Setup Checklist

## ⚡ 5-Minute Setup Guide

### Step 1: Create Account (2 min)
- [ ] Go to https://www.emailjs.com/
- [ ] Click "Sign Up" (FREE - 200 emails/month)
- [ ] Verify your email

### Step 2: Add Email Service (1 min)
- [ ] Dashboard → "Email Services" → "Add New Service"
- [ ] Choose "Gmail"
- [ ] Enter: `supreetambiger@gmail.com`
- [ ] Click "Create Service"
- [ ] **COPY SERVICE ID:** `_________________`

### Step 3: Create Template (2 min)
- [ ] Dashboard → "Email Templates" → "Create New Template"
- [ ] Template Name: `Portfolio Inquiry with Images`
- [ ] Copy the HTML template from `EMAILJS_INTEGRATION_GUIDE.md`
- [ ] Paste into "Content" section
- [ ] Click "Save"
- [ ] **COPY TEMPLATE ID:** `_________________`

### Step 4: Get Public Key (30 sec)
- [ ] Dashboard → "Account" → "General"
- [ ] Find "Public Key" section
- [ ] **COPY PUBLIC KEY:** `_________________`

### Step 5: Update script.js (30 sec)
- [ ] Open `script.js`
- [ ] Find `EMAILJS_CONFIG` (line ~12)
- [ ] Replace:
```javascript
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY_HERE',  // ← Paste Public Key here
    serviceId: 'YOUR_SERVICE_ID_HERE',  // ← Paste Service ID here
    templateId: 'YOUR_TEMPLATE_ID_HERE' // ← Paste Template ID here
};
```

### Step 6: Test (1 min)
- [ ] Hard refresh: `Ctrl + Shift + R`
- [ ] Upload a profile picture (on profile.html)
- [ ] Go to index.html or resume.html
- [ ] Click "Email Me with Portfolio"
- [ ] Check console for: `✅ Email sent successfully`
- [ ] Check Gmail inbox for email

---

## 🎯 Expected Result

### Console Output:
```
🚀 DOM Ready - Initializing all components...
✅ EmailJS initialized
📧 Initializing Email Me button...
✅ Email Me button initialized

[User clicks button]

📧 Email Me button clicked!
📧 Preparing to send portfolio email...
📧 Sending email with portfolio data...
✅ Email sent successfully: {status: 200, text: "OK"}
```

### User Alert:
```
✅ Email Sent Successfully!

Your portfolio has been sent to supreetambiger@gmail.com

Including:
• Profile Picture: ✓
• Certificates: 3/5

You should receive a response soon!
```

### Email Received:
- Subject: "Portfolio Inquiry from [Your Name]"
- Body: Formatted HTML with contact info
- Profile picture displayed inline
- All certificates displayed with labels

---

## 🐛 Troubleshooting

### Still seeing "EmailJS Not Configured"?
✓ Check script.js - did you replace ALL THREE placeholders?
✓ Values should NOT contain 'YOUR_' prefix
✓ Hard refresh after saving: `Ctrl + Shift + R`

### Email not arriving?
✓ Check spam folder
✓ Verify Gmail is connected in EmailJS dashboard
✓ Check EmailJS dashboard → "Logs" for delivery status
✓ Free tier: 200 emails/month (check quota)

### Button shows error?
✓ Open Console (F12) and check error message
✓ Verify internet connection
✓ Check Service ID and Template ID are correct

---

## 📚 Full Documentation

See `EMAILJS_INTEGRATION_GUIDE.md` for:
- Complete EmailJS setup instructions
- Full HTML email template code
- Technical implementation details
- Security & privacy information
- Advanced troubleshooting

---

**Status:** Ready to configure  
**Estimated Time:** 5 minutes  
**Cost:** FREE (200 emails/month)
