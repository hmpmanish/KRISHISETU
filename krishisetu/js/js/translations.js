const translations = {
    en: {
        "nav.brand": "KrishiSetu",
        "nav.home": "Home",
        "nav.farmer": "Farmer",
        "nav.processor": "Processor",
        "nav.admin": "Admin",
        "banner.demo": "SIH 2026 LIVE PROTOTYPE — AI Decision Engine & Trust Ecosystem Active.",
        "role.select": "Select Your Role",
        "role.farmer": "Farmer",
        "role.processor": "Buyer / Processor",
        "role.admin": "System Admin",
        
        "farmer.dashboard": "Farmer Dashboard",
        "farmer.harvests": "My Harvest Batches",
        "farmer.add": "+ Add Harvest",
        "farmer.ai_snapshot": "AI Decision Snapshot",
        
        "action.sell": "SELL",
        "action.store": "STORE",
        "action.process": "PROCESS",
        "action.rescue": "RESCUE",
        
        "batch.id": "Batch ID",
        "batch.crop": "Crop",
        "batch.quantity": "Quantity",
        "batch.quality": "Quality",
        "batch.status": "Status",
        
        "magic.title": "KrishiSetu Recommendation",
        "magic.confidence": "Confidence",
        "magic.why": "Why?",
        "magic.risks": "Risks",
        "magic.next": "AI Suggested Next Step",
        "magic.accept": "Accept Recommendation",
        "magic.override": "Choose Another Action",
        
        "whatif.title": "What If? Simulator",
        "whatif.shelflife": "Remaining Shelf Life (Days)",
        
        "processor.dashboard": "Processor Dashboard",
        "processor.opportunities": "Processing Opportunities",
        "processor.requests": "Incoming Requests",
        
        "admin.dashboard": "Admin Analytics",
        "admin.metrics": "Platform Metrics",
        
        "btn.view": "View",
        "btn.connect": "Connect",
        "btn.close": "Close",
        "btn.save": "Save",
        
        "status.pending": "Pending",
        "status.active": "Active",
        "status.completed": "Completed"
    },
    hi: {
        "nav.brand": "कृषि-सेतु",
        "nav.home": "होम",
        "nav.farmer": "किसान",
        "nav.processor": "खरीदार / प्रोसेसर",
        "nav.admin": "एडमिन",
        "banner.demo": "SIH 2026 लाइव प्रोटोटाइप — AI निर्णय इंजन और ट्रस्ट इकोसिस्टम सक्रिय।",
        "role.select": "अपनी भूमिका चुनें",
        "role.farmer": "किसान",
        "role.processor": "खरीदार / प्रोसेसर",
        "role.admin": "सिस्टम एडमिन",
        
        "farmer.dashboard": "किसान डैशबोर्ड",
        "farmer.harvests": "मेरे फसल बैच",
        "farmer.add": "+ फसल जोड़ें",
        "farmer.ai_snapshot": "AI निर्णय स्नैपशॉट",
        
        "action.sell": "बेचें (SELL)",
        "action.store": "भंडारण (STORE)",
        "action.process": "प्रोसेस (PROCESS)",
        "action.rescue": "बचाव (RESCUE)",
        
        "batch.id": "बैच ID",
        "batch.crop": "फसल",
        "batch.quantity": "मात्रा",
        "batch.quality": "गुणवत्ता",
        "batch.status": "स्थिति",
        
        "magic.title": "कृषि-सेतु अनुशंसा",
        "magic.confidence": "आत्मविश्वास",
        "magic.why": "क्यों?",
        "magic.risks": "जोखिम",
        "magic.next": "AI द्वारा सुझाया गया अगला कदम",
        "magic.accept": "अनुशंसा स्वीकार करें",
        "magic.override": "अन्य विकल्प चुनें",
        
        "whatif.title": "क्या हो अगर? (सिम्युलेटर)",
        "whatif.shelflife": "शेष शेल्फ लाइफ (दिन)",
        
        "processor.dashboard": "प्रोसेसर डैशबोर्ड",
        "processor.opportunities": "प्रोसेसिंग अवसर",
        "processor.requests": "आने वाले अनुरोध",
        
        "admin.dashboard": "एडमिन एनालिटिक्स",
        "admin.metrics": "प्लेटफ़ॉर्म मेट्रिक्स",
        
        "btn.view": "देखें",
        "btn.connect": "संपर्क करें",
        "btn.close": "बंद करें",
        "btn.save": "सुरक्षित करें",
        
        "status.pending": "लंबित",
        "status.active": "सक्रिय",
        "status.completed": "पूर्ण"
    }
};

let currentLang = localStorage.getItem('krishisetu_lang') || 'en';

function setLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('krishisetu_lang', lang);
        applyTranslations();
    }
}

function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });
}
