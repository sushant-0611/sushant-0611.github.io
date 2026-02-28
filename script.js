// script.js - SushTech Main JavaScript (Core Web Vitals Optimized)

// ========== UTILITY FUNCTIONS ==========
// Batch DOM reads/writes to prevent layout thrashing
const DOMHandler = {
    reads: [],
    writes: [],
    scheduled: false,
    
    schedule() {
        if (this.scheduled) return;
        this.scheduled = true;
        
        requestAnimationFrame(() => {
            // Perform all reads first
            const reads = [...this.reads];
            this.reads = [];
            
            const readResults = reads.map(fn => {
                try { return fn(); } 
                catch (e) { console.error('DOM read error:', e); return null; }
            });
            
            // Then perform all writes with read results
            const writes = [...this.writes];
            this.writes = [];
            
            writes.forEach((fn, index) => {
                try { 
                    fn(readResults[index]); 
                } catch (e) { 
                    console.error('DOM write error:', e); 
                }
            });
            
            this.scheduled = false;
            
            // Reschedule if new tasks were added during this cycle
            if (this.reads.length > 0 || this.writes.length > 0) {
                this.schedule();
            }
        });
    },
    
    read(fn) { this.reads.push(fn); this.schedule(); },
    write(fn) { this.writes.push(fn); this.schedule(); }
};

// Optimized throttle with requestAnimationFrame
function rafThrottle(func) {
    let ticking = false;
    return function(...args) {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                func.apply(this, args);
                ticking = false;
            });
        }
    };
}

// ========== RIGHT SIDE PANEL MENU ==========
function initSidePanel() {
    const menuToggle = document.getElementById('menuToggle');
    const sidePanel = document.getElementById('sidePanel');
    const closePanel = document.getElementById('closePanel');
    const overlay = document.getElementById('overlay');
    const panelLinks = document.querySelectorAll('.panel-link');
    
    if (!menuToggle || !sidePanel || !closePanel || !overlay) return;
    
    function openPanel() {
        DOMHandler.write(() => {
            sidePanel.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            menuToggle.style.opacity = '0';
        });
    }
    
    function closePanelMenu() {
        DOMHandler.write(() => {
            sidePanel.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            menuToggle.style.opacity = '1';
        });
    }
    
    menuToggle.addEventListener('click', openPanel, { passive: true });
    closePanel.addEventListener('click', closePanelMenu, { passive: true });
    overlay.addEventListener('click', closePanelMenu, { passive: true });
    
    panelLinks.forEach(link => {
        link.addEventListener('click', closePanelMenu, { passive: true });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidePanel.classList.contains('active')) {
            closePanelMenu();
        }
    });
    
    // Optimized resize handler
    window.addEventListener('resize', rafThrottle(() => {
        if (window.innerWidth > 767 && sidePanel.classList.contains('active')) {
            closePanelMenu();
        }
    }), { passive: true });
}

// ========== POPULATE PRICING CARDS FROM CONFIG ==========
function populatePricingCards() {
    const pricingGrid = document.querySelector('.pricing-grid');
    if (!pricingGrid || typeof SUSHITECH_CONFIG === 'undefined') return;
    
    const config = SUSHITECH_CONFIG;
    const plans = config.pricing;
    let html = '';
    
    Object.keys(plans).forEach((key) => {
        const plan = plans[key];
        const popularClass = plan.popular ? 'popular' : '';
        const popularBadge = plan.popular ? '<div class="popular-badge">Most Popular</div>' : '';
        
        html += `
            <div class="price-card card-scroll-highlight ${popularClass}">
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
    
    DOMHandler.write(() => { pricingGrid.innerHTML = html; });
}

// ========== POPULATE FEATURES FROM CONFIG ==========
function populateFeatures() {
    const featuresGrid = document.querySelector('.choose-grid');
    if (!featuresGrid || typeof SUSHITECH_CONFIG === 'undefined') return;
    
    const config = SUSHITECH_CONFIG;
    let html = '';
    
    config.features.forEach(feature => {
        html += `
            <div class="choose-item card-scroll-highlight">
                <i class="fas ${feature.icon}"></i>
                <h4>${feature.title}</h4>
                <p>${feature.description}</p>
            </div>
        `;
    });
    
    DOMHandler.write(() => { featuresGrid.innerHTML = html; });
}

// ========== POPULATE FOUNDER CARD FROM CONFIG ==========
function populateFounder() {
    const founderCard = document.querySelector('.founder-card');
    if (!founderCard || typeof SUSHITECH_CONFIG === 'undefined') return;
    
    const config = SUSHITECH_CONFIG;
    const founder = config.founder;
    
    DOMHandler.write(() => {
        founderCard.innerHTML = `
            <div class="founder-img">
                <img src="${founder.imageUrl}" alt="${founder.fullName || founder.name}" loading="lazy">
            </div>
            <div class="founder-info">
                <h4>${founder.name}</h4>
                <div class="founder-tagline">${founder.tagline}</div>
                <div class="founder-age">${founder.age}</div>
                <p class="founder-bio">${founder.bio}</p>
                <div class="founder-skills">
                    ${founder.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;
    });
}

// ========== DEMO MODAL FUNCTIONS ==========
window.openDemoModal = function(category) {
    closeAllModals();
    
    const modalId = category + 'DemoModal';
    const modal = document.getElementById(modalId);
    if (modal) {
        DOMHandler.write(() => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        DOMHandler.write(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
};

function closeAllModals() {
    const modals = document.querySelectorAll('.demo-modal');
    DOMHandler.write(() => {
        modals.forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = '';
    });
}

window.openDemoLink = function(demoKey) {
    if (typeof SUSHITECH_CONFIG === 'undefined') {
        console.error('❌ config.js not loaded!');
        alert('Demo links not available. Please try again later.');
        return;
    }
    
    let demoLink = null;
    
    if (SUSHITECH_CONFIG.weddingDemos?.[demoKey]) {
        demoLink = SUSHITECH_CONFIG.weddingDemos[demoKey];
    } else if (SUSHITECH_CONFIG.businessDemos?.[demoKey]) {
        demoLink = SUSHITECH_CONFIG.businessDemos[demoKey];
    } else if (SUSHITECH_CONFIG.ecommerceDemos?.[demoKey]) {
        demoLink = SUSHITECH_CONFIG.ecommerceDemos[demoKey];
    }
    
    if (demoLink) {
        window.open(demoLink, '_blank');
        closeAllModals();
    } else {
        console.error(`❌ No link found for demo: ${demoKey}`);
        alert('Demo link not available. Please try again later.');
    }
};

// Event delegation for modal clicks (better performance)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('demo-modal')) {
        closeAllModals();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// ========== POPULATE SOCIAL LINKS ==========
function populateSocialLinks() {
    const socialLinksContainer = document.querySelector('.social-links');
    if (!socialLinksContainer || typeof SUSHITECH_CONFIG === 'undefined') return;
    
    const config = SUSHITECH_CONFIG;
    const social = config.social;
    const fragment = document.createDocumentFragment();
    
    const socialPlatforms = [
        { key: 'linkedin', icon: 'linkedin' },
        { key: 'instagram', icon: 'instagram' },
        { key: 'github', icon: 'github' },
        { key: 'twitter', icon: 'twitter' }
    ];
    
    socialPlatforms.forEach(({ key, icon }) => {
        if (social[key]) {
            const link = document.createElement('a');
            link.href = social[key];
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerHTML = `<i class="fab fa-${icon}"></i>`;
            link.title = icon.charAt(0).toUpperCase() + icon.slice(1);
            link.setAttribute('aria-label', icon);
            fragment.appendChild(link);
        }
    });
    
    DOMHandler.write(() => {
        socialLinksContainer.innerHTML = '';
        socialLinksContainer.appendChild(fragment);
    });
}

// ========== POPULATE CONTACT INFO ==========
function populateContactInfo() {
    const contactInfo = document.querySelector('.contact-info');
    if (!contactInfo || typeof SUSHITECH_CONFIG === 'undefined') return;
    
    const config = SUSHITECH_CONFIG;
    const company = config.company;
    const cleanWhatsapp = company.whatsapp.replace(/[^0-9]/g, '');
    const whatsappMessage = encodeURIComponent(`Hello ${company.name}, I'm interested in your services`);
    
    DOMHandler.write(() => {
        contactInfo.innerHTML = `
            <p><i class="fas fa-phone-alt"></i> <span>${company.phone}</span></p>
            <p><i class="fab fa-whatsapp"></i> <span>${company.whatsapp} (WhatsApp)</span></p>
            <p><i class="far fa-clock"></i> <span>${company.hours}</span></p>
            <a href="https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}" 
               target="_blank" class="chat-btn">
                <i class="fab fa-whatsapp"></i> Chat on WhatsApp
            </a>
        `;
    });
    
    const businessEmail = document.querySelector('.business-email');
    if (businessEmail) {
        DOMHandler.write(() => {
            businessEmail.innerHTML = `<i class="fas fa-envelope"></i> ${company.email}`;
            businessEmail.href = `mailto:${company.email}`;
        });
    }
}

// ========== UPDATE WHATSAPP FLOAT ==========
function updateWhatsAppFloat() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (!whatsappFloat || typeof SUSHITECH_CONFIG === 'undefined') return;
    
    const config = SUSHITECH_CONFIG;
    const company = config.company;
    const cleanWhatsapp = company.whatsapp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello ${company.name}, I'm interested in your services`);
    
    DOMHandler.write(() => {
        whatsappFloat.href = `https://wa.me/${cleanWhatsapp}?text=${message}`;
    });
}

// ========== UPDATE FOOTER ==========
function updateFooter() {
    const footer = document.querySelector('footer p');
    if (!footer || typeof SUSHITECH_CONFIG === 'undefined') return;
    
    const config = SUSHITECH_CONFIG;
    const year = new Date().getFullYear();
    
    DOMHandler.write(() => {
        footer.innerHTML = `© ${year} ${config.company.name}. All rights reserved.`;
    });
}

// ========== FORM SUBMISSION ==========
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        if (formStatus) {
            DOMHandler.write(() => {
                formStatus.innerHTML = '<span style="color: #22D3EE; font-weight: 500;">✓ Message sent successfully! We\'ll contact you soon.</span>';
                formStatus.style.display = 'block';
            });
        }
        
        contactForm.reset();
        
        setTimeout(() => {
            if (formStatus) {
                DOMHandler.write(() => {
                    formStatus.style.display = 'none';
                });
            }
        }, 5000);
    });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                requestAnimationFrame(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
            }
        }, { passive: false });
    });
}

// ========== INTERSECTION OBSERVER FOR NAVIGATION ==========
function initNavigationObserver() {
    const sections = document.querySelectorAll('section');
    const panelLinks = document.querySelectorAll('.panel-link');
    
    if (sections.length === 0 || panelLinks.length === 0) return;
    
    const sectionMap = new Map();
    sections.forEach(section => {
        const id = section.getAttribute('id');
        const link = Array.from(panelLinks).find(link => link.getAttribute('href') === `#${id}`);
        if (link) sectionMap.set(section, link);
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const link = sectionMap.get(entry.target);
            if (!link) return;
            
            DOMHandler.write(() => {
                if (entry.isIntersecting) {
                    panelLinks.forEach(l => {
                        l.classList.remove('active');
                        l.style.borderLeftColor = 'transparent';
                        l.style.color = '#F8FAFC';
                    });
                    
                    link.classList.add('active');
                    link.style.borderLeftColor = '#22D3EE';
                    link.style.color = '#22D3EE';
                }
            });
        });
    }, { threshold: 0.3, rootMargin: '-50px 0px -50px 0px' });
    
    sections.forEach(section => observer.observe(section));
}

// ========== BACK TO TOP BUTTON ==========
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;
    
    // Use passive scroll listener with RAF throttling
    window.addEventListener('scroll', rafThrottle(() => {
        DOMHandler.write(() => {
            backToTopButton.classList.toggle('show', window.scrollY > 300);
        });
    }), { passive: true });
    
    backToTopButton.addEventListener('click', () => {
        requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }, { passive: true });
}

// ========== HORIZONTAL SCROLL INDICATOR ==========
function initHorizontalScrollIndicator() {
    const demoGrid = document.getElementById('demoGrid');
    const dots = document.querySelectorAll('.dot');
    const scrollIndicator = document.querySelector('.scroll-indicator-horizontal');
    
    if (!demoGrid || dots.length === 0) return;
    
    let cardWidth = 300, gap = 25;
    
    // Read dimensions once
    const firstCard = demoGrid.querySelector('.demo-card');
    if (firstCard) {
        DOMHandler.read(() => {
            cardWidth = firstCard.offsetWidth;
            gap = parseInt(window.getComputedStyle(demoGrid).gap) || 25;
        });
    }
    
    // Optimized scroll handler
    demoGrid.addEventListener('scroll', rafThrottle(() => {
        const scrollLeft = demoGrid.scrollLeft;
        const maxScroll = demoGrid.scrollWidth - demoGrid.clientWidth;
        const scrollPercentage = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
        
        // Update dots
        const activeIndex = scrollPercentage < 33 ? 0 : scrollPercentage < 66 ? 1 : 2;
        dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
        
        // Update gradient
        const gradientOpacity = (scrollLeft + demoGrid.clientWidth >= demoGrid.scrollWidth - 10) ? '0' : '1';
        demoGrid.style.setProperty('--gradient-opacity', gradientOpacity);
    }), { passive: true });
    
    // Click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            DOMHandler.read(() => {
                const currentCardWidth = demoGrid.querySelector('.demo-card')?.offsetWidth || cardWidth;
                const currentGap = parseInt(window.getComputedStyle(demoGrid).gap) || gap;
                const scrollTo = index * (currentCardWidth + currentGap);
                
                requestAnimationFrame(() => {
                    demoGrid.scrollTo({ left: scrollTo, behavior: 'smooth' });
                });
            });
        }, { passive: true });
    });
    
    // Hide indicator after first scroll
    if (scrollIndicator) {
        demoGrid.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.5s ease';
            });
        }, { once: true, passive: true });
    }
}

// ========== CARD HIGHLIGHT OBSERVERS ==========
function initCardHighlight() {
    const cards = document.querySelectorAll('.card-scroll-highlight');
    if (cards.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            requestAnimationFrame(() => {
                entry.target.classList.toggle('card-visible', entry.isIntersecting);
            });
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });
    
    cards.forEach(card => observer.observe(card));
}

function initHorizontalCardsObserver() {
    const demoGrid = document.getElementById('demoGrid');
    const cards = document.querySelectorAll('.demo-card');
    
    if (!demoGrid || cards.length === 0) return;
    
    const horizontalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            requestAnimationFrame(() => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('card-visible');
                } else {
                    const rect = entry.target.getBoundingClientRect();
                    const containerRect = demoGrid.getBoundingClientRect();
                    const isPartiallyVisible = rect.right > containerRect.left && rect.left < containerRect.right;
                    entry.target.classList.toggle('card-visible', isPartiallyVisible);
                }
            });
        });
    }, { threshold: [0, 0.3, 0.6, 1], root: demoGrid });
    
    cards.forEach(card => horizontalObserver.observe(card));
}

// ========== INITIALIZATION ==========
// Critical initialization (runs immediately)
function initCritical() {
    initSidePanel();
    initSmoothScroll();
    initBackToTop();
    initContactForm();
    initNavigationObserver();
    
    console.log('✅ Critical initialization complete');
}

// Non-critical initialization (runs after load)
function initNonCritical() {
    // Populate content from config
    if (typeof SUSHITECH_CONFIG !== 'undefined') {
        populatePricingCards();
        populateFeatures();
        populateFounder();
        populateContactInfo();
        populateSocialLinks();
        updateWhatsAppFloat();
        updateFooter();
        
        // Initialize observers after content is ready
        setTimeout(() => {
            initCardHighlight();
            initHorizontalCardsObserver();
            initHorizontalScrollIndicator();
        }, 100);
    }
    
    console.log('✅ Non-critical initialization complete');
}

// Start critical initialization immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCritical);
} else {
    initCritical();
}

// Defer non-critical initialization to after load
if (document.readyState === 'complete') {
    initNonCritical();
} else {
    window.addEventListener('load', initNonCritical, { once: true, passive: true });
}
