// config.js - All SushTech configuration data
const SUSHITECH_CONFIG = {
    // Company Information
    company: {
        name: "SushTech",
        founder: "Sushant Kakade",
        email: "contact@sushtech.in",
        phone: "+91 9021496257",
        whatsapp: "+91 9021496257",
        hours: "Mon - Sat, 10:00 - 19:00",
        address: "Pune, Maharashtra, India",
        founded: "2024",
        founderAge: "21"
    },

    // Pricing Plans
    pricing: {
        basic: {
            name: "Basic",
            price: "₹4,999",
            priceSuffix: "onwards",
            features: ["5 Pages", "Mobile Friendly", "1 Month Support"],
            note: "Ideal for small businesses",
            badge: "🟢",
            badgeColor: "#10b981"
        },
        business: {
            name: "Business",
            price: "₹9,999",
            priceSuffix: "onwards",
            features: ["10 Pages", "SEO Setup", "Contact Form", "3 Months Support"],
            note: "Best for growing companies",
            badge: "🔵",
            badgeColor: "#3b82f6"
        },
        ecommerce: {
            name: "E‑commerce",
            price: "₹14,999",
            priceSuffix: "+",
            features: ["Product System", "Payment Gateway", "Admin Panel"],
            note: "Custom quotes for larger stores",
            badge: "🟣",
            badgeColor: "#a855f7"
        }
    },

    // Why Choose Us features
    features: [
        {
            icon: "fa-rocket",
            title: "Fast Delivery",
            description: "We respect your time. Get your website live in days, not weeks."
        },
        {
            icon: "fa-tag",
            title: "Affordable Pricing",
            description: "High-quality solutions at prices that won't break your bank."
        },
        {
            icon: "fa-shield-alt",
            title: "Secure Hosting",
            description: "Enterprise-grade security with free SSL & daily backups."
        },
        {
            icon: "fa-headset",
            title: "Local Support",
            description: "We're based in India. Real people, quick responses, no chatbots."
        }
    ],

    // Founder Information
    founder: {
        name: "Sushant Kakade",
        fullName: "Sushant Kakade",
        tagline: "Student & Founder at SushTech",
        age: "Age 21",
        bio: "I started SushTech at age 21 while studying because I believe young entrepreneurs bring fresh ideas and genuine passion. Every project gets my personal attention — because your success is my success.",
        skills: ["Web Dev", "UI/UX Design", "SEO", "WordPress", "React"],
        imageUrl: "https://ui-avatars.com/api/?name=Sushant+Kakade&background=38bdf8&color=fff&size=140"
    },

    // Translations
    translations: {
        en: {
            nav: {
                home: "Home",
                pricing: "Pricing",
                whyUs: "Why Us",
                about: "About",
                contact: "Contact"
            },
            hero: {
                title: 'We Help <span class="highlight">Businesses Grow</span> Online',
                description: "Strategic websites & digital solutions that turn visitors into customers. Fast, secure, and built for results.",
                primaryBtn: "Get Free Consultation",
                secondaryBtn: "View Pricing"
            },
            pricing: {
                title: "Simple, Transparent Pricing",
                subtitle: "Choose the plan that fits your needs — no negotiation, no hidden fees.",
                getStarted: "Get Started"
            },
            whyUs: {
                title: "Why Choose SushTech?"
            },
            about: {
                title: "About SushTech",
                description: "SushTech is a young and innovative digital agency. We help businesses succeed online with high-quality, affordable and scalable digital solutions. Our team blends technology with creativity."
            },
            founder: {
                name: "Sushant Kakade",
                tagline: "Student & Founder at SushTech",
                age: "Age 21",
                bio: "I started SushTech at age 21 while studying because I believe young entrepreneurs bring fresh ideas and genuine passion. Every project gets my personal attention — because your success is my success."
            },
            contact: {
                title: "Contact Us",
                chat: "Chat on WhatsApp",
                form: {
                    name: "Your Name",
                    email: "Email Address",
                    phone: "Phone Number",
                    message: "How can we help you?",
                    submit: "Send Message",
                    success: "Thank you! We will get back to you soon."
                }
            },
            footer: "© 2026 SushTech. All rights reserved.",
            whatsappMessage: "Hello SushTech! I'm interested in your services.",
            
            // Plan specific translations for English
            planBasicFeatures: ["5 Pages", "Mobile Friendly", "1 Month Support"],
            planBusinessFeatures: ["10 Pages", "SEO Setup", "Contact Form", "3 Months Support"],
            planEcomFeatures: ["Product System", "Payment Gateway", "Admin Panel"]
        },
        mr: {
            nav: {
                home: "मुखपृष्ठ",
                pricing: "किंमत योजना",
                whyUs: "आम्ही का?",
                about: "आमच्याबद्दल",
                contact: "संपर्क"
            },
            hero: {
                title: 'आम्ही <span class="highlight">व्यवसाय वाढविण्यास</span> मदत करतो',
                description: "रणनीतिक वेबसाइट्स आणि डिजिटल सोल्यूशन्स जे अभ्यागतांना ग्राहकांमध्ये रूपांतरित करतात. जलद, सुरक्षित आणि परिणामांसाठी बनवलेले.",
                primaryBtn: "मोफत सल्ला घ्या",
                secondaryBtn: "योजना पहा"
            },
            pricing: {
                title: "सोप्या, पारदर्शक किंमती",
                subtitle: "तुमच्या गरजेनुसार योजना निवडा — कोणतीही वाटाघाटी नाही, लपलेले शुल्क नाही.",
                getStarted: "सुरू करा"
            },
            whyUs: {
                title: "सुशटेक का निवडाल?"
            },
            about: {
                title: "सुशटेक बद्दल",
                description: "सुशटेक ही एक तरुण आणि नाविन्यपूर्ण डिजिटल एजन्सी आहे. आम्ही व्यवसायांना उच्च दर्जाचे, परवडणारे आणि प्रमाणित डिजिटल उपाय देऊन ऑनलाइन यशस्वी होण्यास मदत करतो. आमची टीम तंत्रज्ञान आणि सर्जनशीलता यांचा मेळ घालते."
            },
            founder: {
                name: "सुशांत काकडे",
                tagline: "विद्यार्थी आणि सुशटेकचे संस्थापक",
                age: "वय २१",
                bio: "मी वयाच्या २१ व्या वर्षी अभ्यास करत असताना सुशटेक सुरू केले कारण माझा विश्वास आहे की तरुण उद्योजक नवीन कल्पना आणि प्रामाणिक उत्कटता आणतात. प्रत्येक प्रकल्पाला माझे वैयक्तिक लक्ष मिळते — कारण तुमचे यश म्हणजे माझे यश."
            },
            contact: {
                title: "संपर्क साधा",
                chat: "व्हॉट्सॲप वर चर्चा करा",
                form: {
                    name: "तुमचे नाव",
                    email: "ईमेल पत्ता",
                    phone: "फोन नंबर",
                    message: "आम्ही तुम्हाला कशी मदत करू शकतो?",
                    submit: "संदेश पाठवा",
                    success: "धन्यवाद! आम्ही लवकरच तुमच्याशी संपर्क साधू."
                }
            },
            footer: "© २०२६ सुशटेक. सर्व हक्क राखीव.",
            whatsappMessage: "नमस्कार SushTech! मला तुमच्या सेवांमध्ये रस आहे.",
            
            // Plan specific translations for Marathi
            planBasicFeatures: ["५ पेज", "मोबाइल फ्रेंडली", "१ महिना सपोर्ट"],
            planBusinessFeatures: ["१० पेज", "एसइओ सेटअप", "संपर्क फॉर्म", "३ महिने सपोर्ट"],
            planEcomFeatures: ["उत्पादन प्रणाली", "पेमेंट गेटवे", "प्रशासक पॅनल"]
        }
    }
};