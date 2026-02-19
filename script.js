// script.js - SushTech Main JavaScript

// Initialize variables
let currentLanguage = 'en';
let currentMode = 'dark';

// Get configuration
const config = SUSHITECH_CONFIG;

// DOM Elements
const navHome = document.getElementById('navHome');
const navPricing = document.getElementById('navPricing');
const navWhyChoose = document.getElementById('navWhyChoose');
const navAbout = document.getElementById('navAbout');
const navContact = document.getElementById('navContact');
const heroTitle = document.getElementById('heroTitle');
const heroDesc = document.getElementById('heroDesc');
const heroBtnPrimary = document.getElementById('heroBtnPrimary');
const heroBtnSecondary = document.getElementById('heroBtnSecondary');
const pricingTitle = document.getElementById('pricingTitle');
const pricingSubhead = document.getElementById('pricingSubhead');
const pricingGrid = document.getElementById('pricingGrid');
const whyTitle = document.getElementById('whyTitle');
const featuresGrid = document.getElementById('featuresGrid');
const aboutTitle = document.getElementById('aboutTitle');
const aboutDesc = document.getElementById('aboutDesc');
const founderCard = document.getElementById('founderCard');
const contactTitle = document.getElementById('contactTitle');
const contactInfo = document.getElementById('contactInfo');
const businessEmailLink = document.getElementById('businessEmailLink');
const footerText = document.getElementById('footerText');
const whatsappFloat = document.getElementById('whatsappFloat');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

// Theme Toggle
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    currentMode = body.classList.contains('light-mode') ? 'light' : 'dark';
    modeToggle.innerHTML = currentMode === 'light' ? 
        '<i class="fas fa-moon"></i>' : 
        '<i class="fas fa-sun"></i>';
});

// Language Toggle
const langToggle = document.getElementById('languageToggle');

langToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'mr' : 'en';
    updateLanguage(currentLanguage);
    populateContent(); // Refresh all content with new language
});

// Function to update all content based on language
function updateLanguage(lang) {
    const t = config.translations[lang];
    
    // Update navigation
    navHome.textContent = t.nav.home;
    navPricing.textContent = t.nav.pricing;
    navWhyChoose.textContent = t.nav.whyUs;
    navAbout.textContent = t.nav.about;
    navContact.textContent = t.nav.contact;
    
    // Update hero section
    heroTitle.innerHTML = t.hero.title;
    heroDesc.textContent = t.hero.description;
    heroBtnPrimary.textContent = t.hero.primaryBtn;
    heroBtnSecondary.textContent = t.hero.secondaryBtn;
    
    // Update pricing section
    pricingTitle.textContent = t.pricing.title;
    pricingSubhead.textContent = t.pricing.subtitle;
    
    // Update why choose us section
    whyTitle.textContent = t.whyUs.title;
    
    // Update about section
    aboutTitle.textContent = t.about.title;
    aboutDesc.textContent = t.about.description;
    
    // Update contact section
    contactTitle.textContent = t.contact.title;
    submitBtn.textContent = t.contact.form.submit;
    
    // Update form placeholders
    document.getElementById('nameInput').placeholder = t.contact.form.name;
    document.getElementById('emailInput').placeholder = t.contact.form.email;
    document.getElementById('phoneInput').placeholder = t.contact.form.phone;
    document.getElementById('messageInput').placeholder = t.contact.form.message;
    
    // Update footer
    footerText.textContent = t.footer;
    
    // Update WhatsApp message
    updateWhatsAppLink(t.whatsappMessage);
}

// Function to update WhatsApp link
function updateWhatsAppLink(message) {
    const phone = config.company.whatsapp.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    whatsappFloat.href = `https://wa.me/${phone}?text=${encodedMessage}`;
}

// Function to populate pricing cards with translation
function populatePricing() {
    const t = config.translations[currentLanguage];
    const plans = config.pricing;
    let html = '';
    
    Object.keys(plans).forEach(key => {
        const plan = plans[key];
        
        // Get translated features based on plan type
        let translatedFeatures = [];
        if (key === 'basic') {
            translatedFeatures = t.planBasicFeatures;
        } else if (key === 'business') {
            translatedFeatures = t.planBusinessFeatures;
        } else if (key === 'ecommerce') {
            translatedFeatures = t.planEcomFeatures;
        }
        
        // Get translated plan name
        let planName = plan.name;
        if (currentLanguage === 'mr') {
            if (key === 'basic') planName = 'बेसिक';
            else if (key === 'business') planName = 'बिझनेस';
            else if (key === 'ecommerce') planName = 'ई‑कॉमर्स';
        }
        
        // Get translated note
        let planNote = plan.note;
        if (currentLanguage === 'mr') {
            if (key === 'basic') planNote = '*लहान व्यवसायांसाठी योग्य';
            else if (key === 'business') planNote = '*वाढत्या कंपन्यांसाठी उत्तम';
            else if (key === 'ecommerce') planNote = '*मोठ्या स्टोअर्ससाठी कस्टम कोट';
        }
        
        html += `
            <div class="price-card">
                <div class="price-badge" style="border-color: ${plan.badgeColor}; color: ${plan.badgeColor};">${plan.badge}</div>
                <h4>${planName}</h4>
                <div class="price-amount">${plan.price}<small> ${plan.priceSuffix}</small></div>
                <ul class="feature-list">
                    ${translatedFeatures.map(f => `
                        <li><i class="fas fa-check-circle"></i> <span>${f}</span></li>
                    `).join('')}
                </ul>
                <a href="#contact" class="btn-plan">${t.pricing.getStarted}</a>
                <div class="price-footer-note">${planNote}</div>
            </div>
        `;
    });
    
    pricingGrid.innerHTML = html;
}

// Function to populate features with translation
function populateFeatures() {
    const t = config.translations[currentLanguage];
    let html = '';
    
    // Translated features for Marathi
    if (currentLanguage === 'mr') {
        const mrFeatures = [
            {
                icon: "fa-rocket",
                title: "जलद वितरण",
                description: "आम्ही तुमच्या वेळेचा आदर करतो. आठवड्यांमध्ये नव्हे तर दिवसांत वेबसाइट लाइव्ह करा."
            },
            {
                icon: "fa-tag",
                title: "परवडणारी किंमत",
                description: "तुमच्या बँकेत भंग न करता उच्च दर्जाचे उपाय."
            },
            {
                icon: "fa-shield-alt",
                title: "सुरक्षित होस्टिंग",
                description: "मोफत SSL आणि दैनंदिन बॅकअपसह एंटरप्राइझ-ग्रेड सुरक्षा."
            },
            {
                icon: "fa-headset",
                title: "स्थानिक समर्थन",
                description: "आम्ही भारतात आधारित आहोत. वास्तविक लोक, जलद प्रतिसाद, चॅटबॉट नाही."
            }
        ];
        
        mrFeatures.forEach(feature => {
            html += `
                <div class="choose-item">
                    <i class="fas ${feature.icon}"></i>
                    <h4>${feature.title}</h4>
                    <p>${feature.description}</p>
                </div>
            `;
        });
    } else {
        // English features
        config.features.forEach(feature => {
            html += `
                <div class="choose-item">
                    <i class="fas ${feature.icon}"></i>
                    <h4>${feature.title}</h4>
                    <p>${feature.description}</p>
                </div>
            `;
        });
    }
    
    featuresGrid.innerHTML = html;
}

// Function to populate founder card with translation
function populateFounder() {
    const t = config.translations[currentLanguage];
    const founder = config.founder;
    
    // Use translated content if available
    let founderName = founder.name;
    let founderTagline = founder.tagline;
    let founderAge = founder.age;
    let founderBio = founder.bio;
    
    if (currentLanguage === 'mr' && t.founder) {
        founderName = t.founder.name;
        founderTagline = t.founder.tagline;
        founderAge = t.founder.age;
        founderBio = t.founder.bio;
    }
    
    founderCard.innerHTML = `
        <div class="founder-img">
            <img src="${founder.imageUrl}" alt="${founder.fullName}">
        </div>
        <div class="founder-info">
            <h4>${founderName}</h4>
            <div class="founder-tagline">${founderTagline}</div>
            <p class="founder-bio">${founderBio}</p>
            <div class="founder-skills">
                ${founder.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `;
}

// Function to populate contact info with translation
function populateContact() {
    const company = config.company;
    const t = config.translations[currentLanguage];
    
    contactInfo.innerHTML = `
        <p><i class="fas fa-phone-alt"></i> <span>${company.phone}</span></p>
        <p><i class="fab fa-whatsapp"></i> <span>${company.whatsapp} (WhatsApp)</span></p>
        <p><i class="far fa-clock"></i> <span>${company.hours}</span></p>
        <a href="https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(t.whatsappMessage)}" 
           target="_blank" class="chat-btn">
            <i class="fab fa-whatsapp"></i> ${t.contact.chat}
        </a>
    `;
    
    businessEmailLink.innerHTML = `<i class="fas fa-envelope"></i> ${company.email}`;
    businessEmailLink.href = `mailto:${company.email}`;
}

// Function to populate all content
function populateContent() {
    populatePricing();
    populateFeatures();
    populateFounder(); // Founder card will now use translated content
    populateContact();
}

// Form submission handler
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const t = config.translations[currentLanguage];
    alert(t.contact.form.success);
    contactForm.reset();
});

// Initialize the page
function init() {
    // Set initial language
    updateLanguage('en');
    
    // Populate all dynamic content
    populateContent();
    
    // Set document language
    document.documentElement.lang = 'en';
    
    // Ensure dark mode is default
    body.classList.remove('light-mode');
    modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Start everything when DOM is loaded
document.addEventListener('DOMContentLoaded', init);