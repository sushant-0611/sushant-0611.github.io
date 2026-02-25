// script.js - SushTech Main JavaScript

// ========== RIGHT SIDE PANEL MENU ==========
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sidePanel = document.getElementById('sidePanel');
    const closePanel = document.getElementById('closePanel');
    const overlay = document.getElementById('overlay');
    const panelLinks = document.querySelectorAll('.panel-link');
    
    // Check if elements exist
    if (!menuToggle || !sidePanel || !closePanel || !overlay) return;
    
    // Function to open panel
    function openPanel() {
        sidePanel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        menuToggle.style.opacity = '0'; // Hide menu icon when panel is open
    }
    
    // Function to close panel
    function closePanelMenu() {
        sidePanel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        menuToggle.style.opacity = '1'; // Show menu icon
    }
    
    // Open panel when menu icon is clicked
    menuToggle.addEventListener('click', openPanel);
    
    // Close panel when close icon is clicked
    closePanel.addEventListener('click', closePanelMenu);
    
    // Close panel when overlay is clicked
    overlay.addEventListener('click', closePanelMenu);
    
    // Close panel when a link is clicked
    panelLinks.forEach(link => {
        link.addEventListener('click', function() {
            closePanelMenu();
        });
    });
    
    // Close panel on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidePanel.classList.contains('active')) {
            closePanelMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767 && sidePanel.classList.contains('active')) {
            closePanelMenu();
        }
    });
});

// ========== PRICING CARDS DATA ==========
const pricingPlans = [
    {
        badge: "📄",
        badgeColor: "#22D3EE",
        name: "Basic",
        price: "₹9,999",
        priceSuffix: "one-time",
        features: [
            "5 Pages Website",
            "Mobile Responsive",
            "Contact Form",
            "Social Media Integration",
            "Basic SEO",
            "Free SSL Certificate"
        ],
        note: "*Perfect for small businesses"
    },
    {
        badge: "⚡",
        badgeColor: "#2563EB",
        name: "Business",
        price: "₹24,999",
        priceSuffix: "one-time",
        features: [
            "10 Pages Website",
            "Advanced Animations",
            "Blog/News Section",
            "Advanced SEO",
            "Google Analytics",
            "Priority Support"
        ],
        note: "*Great for growing companies",
        popular: true
    },
    {
        badge: "🛒",
        badgeColor: "#22D3EE",
        name: "E-Commerce",
        price: "₹49,999",
        priceSuffix: "one-time",
        features: [
            "Unlimited Products",
            "Payment Gateway",
            "Shopping Cart",
            "Order Management",
            "Inventory System",
            "24/7 Support"
        ],
        note: "*Custom quotes for large stores"
    }
];

// ========== POPULATE PRICING CARDS ==========
function populatePricingCards() {
    const pricingGrid = document.querySelector('.pricing-grid');
    if (!pricingGrid) return;
    
    let html = '';
    
    pricingPlans.forEach(plan => {
        const popularClass = plan.popular ? 'popular' : '';
        const popularBadge = plan.popular ? '<div class="popular-badge">Most Popular</div>' : '';
        
        html += `
            <div class="price-card ${popularClass}">
                ${popularBadge}
                <div class="price-badge" style="border-color: ${plan.badgeColor}; color: ${plan.badgeColor};">${plan.badge}</div>
                <h4>${plan.name}</h4>
                <div class="price-amount">${plan.price}<small> ${plan.priceSuffix}</small></div>
                <ul class="feature-list">
                    ${plan.features.map(f => `
                        <li><i class="fas fa-check-circle"></i> <span>${f}</span></li>
                    `).join('')}
                </ul>
                <a href="#contact" class="btn-plan">Get Started</a>
                <div class="price-footer-note">${plan.note}</div>
            </div>
        `;
    });
    
    pricingGrid.innerHTML = html;
}

// ========== POPULATE FEATURES ==========
function populateFeatures() {
    const featuresGrid = document.querySelector('.choose-grid');
    if (!featuresGrid) return;
    
    const features = [
        {
            icon: "fa-rocket",
            title: "Fast Delivery",
            description: "We respect your time. Get your website live in days, not weeks."
        },
        {
            icon: "fa-tag",
            title: "Affordable Pricing",
            description: "High-quality solutions without breaking your bank."
        },
        {
            icon: "fa-shield-alt",
            title: "Secure Hosting",
            description: "Free SSL and daily backups for peace of mind."
        },
        {
            icon: "fa-headset",
            title: "Local Support",
            description: "We're based in India. Real people, fast response."
        }
    ];
    
    let html = '';
    
    features.forEach(feature => {
        html += `
            <div class="choose-item">
                <i class="fas ${feature.icon}"></i>
                <h4>${feature.title}</h4>
                <p>${feature.description}</p>
            </div>
        `;
    });
    
    featuresGrid.innerHTML = html;
}

// ========== POPULATE FOUNDER CARD ==========
function populateFounder() {
    const founderCard = document.querySelector('.founder-card');
    if (!founderCard) return;
    
    const founder = {
        name: "Sushant Kakade",
        tagline: "Founder & Lead Developer",
        bio: "A passionate developer with 5+ years of experience in web development. Started SushTech to help small businesses establish their online presence with affordable solutions.",
        skills: ["HTML/CSS", "JavaScript", "React", "UI/UX"],
        imageUrl: "https://via.placeholder.com/120"
    };
    
    founderCard.innerHTML = `
        <div class="founder-img">
            <img src="${founder.imageUrl}" alt="${founder.name}">
        </div>
        <div class="founder-info">
            <h4>${founder.name}</h4>
            <div class="founder-tagline">${founder.tagline}</div>
            <p class="founder-bio">${founder.bio}</p>
            <div class="founder-skills">
                ${founder.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `;
}

// ========== POPULATE CONTACT INFO ==========
function populateContactInfo() {
    const contactInfo = document.querySelector('.contact-info');
    if (!contactInfo) return;
    
    const company = {
        phone: "+91 90214 96257",
        whatsapp: "+91 90214 96257",
        hours: "Mon-Fri: 9 AM - 6 PM",
        email: "contact@sushtech.in"
    };
    
    const whatsappMessage = encodeURIComponent("Hello SushTech, I'm interested in your services");
    
    contactInfo.innerHTML = `
        <p><i class="fas fa-phone-alt"></i> <span>${company.phone}</span></p>
        <p><i class="fab fa-whatsapp"></i> <span>${company.whatsapp} (WhatsApp)</span></p>
        <p><i class="far fa-clock"></i> <span>${company.hours}</span></p>
        <a href="https://wa.me/919021496257?text=${whatsappMessage}" 
           target="_blank" class="chat-btn">
            <i class="fab fa-whatsapp"></i> Chat on WhatsApp
        </a>
    `;
    
    const businessEmail = document.querySelector('.business-email');
    if (businessEmail) {
        businessEmail.href = `mailto:${company.email}`;
    }
}

// ========== UPDATE WHATSAPP FLOAT LINK ==========
function updateWhatsAppFloat() {
    const whatsappFloat = document.getElementById('whatsappFloat');
    if (!whatsappFloat) return;
    
    const message = encodeURIComponent("Hello SushTech, I'm interested in your services");
    whatsappFloat.href = `https://wa.me/919021496257?text=${message}`;
}

// ========== FORM SUBMISSION ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        if (formStatus) {
            formStatus.innerHTML = '<span style="color: #22D3EE; font-weight: 500;">✓ Message sent successfully! We\'ll contact you soon.</span>';
            formStatus.style.display = 'block';
        }
        
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            if (formStatus) formStatus.style.display = 'none';
        }, 5000);
    });
}

// ========== SMOOTH SCROLL FOR NAVIGATION ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== ACTIVE NAVIGATION HIGHLIGHT ==========
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const panelLinks = document.querySelectorAll('.panel-link');
    
    if (sections.length === 0 || panelLinks.length === 0) return;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    panelLinks.forEach(link => {
        link.classList.remove('active');
        link.style.borderLeftColor = 'transparent';
        link.style.color = '#F8FAFC';
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            link.style.borderLeftColor = '#22D3EE';
            link.style.color = '#22D3EE';
        }
    });
});

// ========== INITIALIZE PAGE ==========
function init() {
    // Populate all dynamic content
    populatePricingCards();
    populateFeatures();
    populateFounder();
    populateContactInfo();
    updateWhatsAppFloat();
}

// Start everything when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
