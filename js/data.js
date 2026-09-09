const INITIAL_BATCHES = [
    {
        id: "KS-WHT-2026-001",
        crop: "Wheat",
        quantity: 50,
        unit: "Quintal",
        harvestDate: "2026-09-08",
        quality: "Good",
        shelfLife: 180,
        spoilageRisk: "Low",
        marketPrice: "Favorable",
        demand: "Strong",
        storageAvailable: true,
        storageCost: "Low",
        processingSuitable: false,
        processorDemand: "Low",
        status: "Pending Decision",
        farmerDecision: null,
        timeline: [
            { date: "2026-09-08 10:00", event: "Harvest Added" }
        ]
    },
    {
        id: "KS-POT-2026-002",
        crop: "Potato",
        quantity: 100,
        unit: "Quintal",
        harvestDate: "2026-09-09",
        quality: "Good",
        shelfLife: 60,
        spoilageRisk: "Low",
        marketPrice: "Weak",
        demand: "Average",
        storageAvailable: true,
        storageCost: "Reasonable",
        processingSuitable: true,
        processorDemand: "Medium",
        status: "Pending Decision",
        farmerDecision: null,
        timeline: [
            { date: "2026-09-09 14:30", event: "Harvest Added" }
        ]
    },
    {
        id: "KS-TOM-2026-003",
        crop: "Tomato",
        quantity: 30,
        unit: "Quintal",
        harvestDate: "2026-09-09",
        quality: "Average",
        shelfLife: 4,
        spoilageRisk: "High",
        marketPrice: "Weak",
        demand: "Low",
        storageAvailable: false,
        storageCost: "High",
        processingSuitable: true,
        processorDemand: "High",
        status: "Pending Decision",
        farmerDecision: null,
        timeline: [
            { date: "2026-09-09 16:15", event: "Harvest Added" }
        ]
    },
    {
        id: "KS-MNG-2026-004",
        crop: "Mango",
        quantity: 20,
        unit: "Quintal",
        harvestDate: "2026-09-05",
        quality: "Poor",
        shelfLife: 1,
        spoilageRisk: "Critical",
        marketPrice: "Weak",
        demand: "Weak",
        storageAvailable: false,
        storageCost: "N/A",
        processingSuitable: false,
        processorDemand: "Low",
        status: "Pending Decision",
        farmerDecision: null,
        timeline: [
            { date: "2026-09-05 09:00", event: "Harvest Added" }
        ]
    }
];

const PROCESSING_OPPORTUNITIES = [
    {
        id: "OPP-001",
        crop: "Tomato",
        product: "Puree / Pulp",
        processor: "AgroFresh Processing Unit",
        entityId: "KS-ENT-2026-0047",
        location: "Lucknow, UP",
        quantityRequired: 100,
        offer: "₹1800/Qtl",
        urgency: "High"
    },
    {
        id: "OPP-002",
        crop: "Potato",
        product: "Chips",
        processor: "SnackCo Industries",
        entityId: "KS-ENT-2026-0091",
        location: "Kanpur, UP",
        quantityRequired: 500,
        offer: "₹1500/Qtl",
        urgency: "Medium"
    }
];

const VERIFIED_ENTITIES = [
    {
        id: "KS-ENT-2026-0047",
        name: "AgroFresh Processing Unit",
        type: "Processor",
        location: "Uttar Pradesh",
        categories: ["Tomato processing", "Mango processing"],
        verificationDate: "2026-01-15",
        validity: "2027-01-14",
        status: "VERIFIED IN PROTOTYPE",
        proofs: [
            { type: "Registration Record", date: "2026-01-10", source: "MSME Udyam (Demo)", status: "Valid" },
            { type: "FSSAI License", date: "2026-01-12", source: "FSSAI Registry (Demo)", status: "Valid" }
        ]
    },
    {
        id: "KS-ENT-2026-0088",
        name: "GreenGrow Seeds",
        type: "Seed Seller",
        location: "Punjab",
        categories: ["Wheat seeds", "Pesticides"],
        verificationDate: "2025-11-20",
        validity: "2026-11-19",
        status: "VERIFIED IN PROTOTYPE",
        proofs: [
            { type: "Seed License", date: "2025-11-15", source: "State Dept (Demo)", status: "Valid" }
        ]
    },
    {
        id: "KS-ENT-2026-0012",
        name: "Raj Agriculture Traders",
        type: "Trader",
        location: "Haryana",
        categories: ["Wholesale Trading"],
        verificationDate: "2026-04-10",
        validity: "2027-04-09",
        status: "VERIFIED IN PROTOTYPE",
        proofs: [
            { type: "APMC License", date: "2026-04-05", source: "APMC Mandi (Demo)", status: "Valid" }
        ]
    },
    {
        id: "KS-ENT-2026-0091",
        name: "SnackCo Industries",
        type: "Processor",
        location: "Kanpur, UP",
        categories: ["Potato processing"],
        verificationDate: "2025-12-01",
        validity: "2026-12-01",
        status: "VERIFICATION INCOMPLETE",
        proofs: [
            { type: "Registration Record", date: "2025-12-01", source: "MSME (Demo)", status: "Expired" }
        ]
    }
    ,
    {
    "id": "DAO-GAUTAMBUDDHANAGAR",
    "name": "DAO-GAUTAM BUDDHA NAGAR",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "02-01-2072",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/10",
    "name": "MAHESH VISHNU KHAD BEEJ BHANDAR KULESRA GBN",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/16",
    "name": "NEW KRISHI NIVESH KENDRA",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "ADA SEED/103/GBN/1",
    "name": "ALLIANCE AGRI TECH",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/11",
    "name": "JANTA AGRIJUNCTION NOORPUR DADRI GBN",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/9",
    "name": "GURUKRIPA AGRI TRADERS DERY SCKENAR DADRI GBN",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/15",
    "name": "S S Traders Chhapraula Dadri GBN",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/17",
    "name": "PRANAV KHAD BEEJ BHANDAR CHHAYANSA DADRI GBN",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/12",
    "name": "SHREE VISHNU MADHAV BEEJ BHANDAR KULESRA GBN",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/145/GZB/13",
    "name": "B PACS KARIMNAGAR KATIYAR",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/14",
    "name": "JAGVEER KHAAD BEEJ BHANDAR ASGARPUR GREATER NODIA",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/13",
    "name": "KISAN AGRI JUCTION JARCHA DADRI GBN",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/8",
    "name": "SANTOSH SHARMA",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/7",
    "name": "SADHAN SEHKARI SAMITY LIMITED BISHARA AT KHATANA DHEERKHERA GBN",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/6",
    "name": "DRISHTI KHAD BEEJ BHANDAR KULESRA GBN",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/5",
    "name": "BHARAT TRADERS KHURJA ROAD JEWAR GBN",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/4",
    "name": "GUPTA BEEJ PAINTS HOUSE RABUPURA JEWAR GBN",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/3",
    "name": "BHATI TRADERS FALAIDA BANGAR JEWAR",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/2",
    "name": "NEW KRISHAK SEWA KENDRA",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO SEED/144/GBN/1",
    "name": "SAINI SEEDS DUJANA ROAD ACHHEJA GBN",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO/GBN/90",
    "name": "SagarMal Chringilal Dankaur",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO/GBN/89",
    "name": "Bishamber Dayal Girdhrilal Dankaur",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO/GBN/82",
    "name": "Sharma Kisan Seva Kwndra Bhaipur",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO/GBN/70",
    "name": "San Building Matrial Hardware & Khad Bhandar",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO/GBN/56",
    "name": "Mahesh Pesticide Seed & Fertizer Kulsera GBN",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO/GBN/55",
    "name": "Kisan Khad Bikri Kendra MandiShyamNagar",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO/GBN/50",
    "name": "Gyoal Fertilizer And Chemical Jewar",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO/GBN/2",
    "name": "Pant Nagar Beej Bhandar Mandi Shyam Nagar",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO/GBN/178",
    "name": "Raghuvansh Agrijuction Piyawali Tajpur Dadri",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO/GBN/175",
    "name": "Kishan Agro Agency Chacura G B Nagar",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
},
    {
    "id": "DAO/GBN/171",
    "name": "Kisan Agrijuction Dhoommanikpur Dadri",
    "type": "Dealer",
    "location": "Gautam Buddha Nagar",
    "categories": [
        "Agri Inputs",
        "Seeds"
    ],
    "verificationDate": "01-01-2024",
    "validity": "31-12-2027",
    "status": "VERIFIED IN PROTOTYPE",
    "proofs": [
        {
            "type": "Dealer License",
            "date": "01-01-2024",
            "source": "UP Agriculture Dept",
            "status": "Valid"
        }
    ]
}
];

const INITIAL_ROLES = {
    farmer: { name: "Rajesh Kumar", location: "Uttar Pradesh", type: "Farmer" },
    processor: { name: "AgroFresh Processing Unit", location: "Lucknow", type: "Buyer / Processor" },
    admin: { name: "KrishiSetu Admin", location: "HQ", type: "Admin" }
};

const ASSISTANT_KNOWLEDGE = {
    "weak": "Current demo data ke according processing opportunity check karna useful ho sakta hai. Aap processor availability aur proof verify karke final decision le sakte hain.",
    "process": "Processing ek accha alternative hai jab direct market price weak ho. KrishiSetu aapko verified processors se connect karne me madad karta hai.",
    "spoil": "Agar crop spoil hone wali hai (Shelf life < 2 days), toh aapko RESCUE action lena chahiye. 'Rescue Center' me alternative options check karein.",
    "trust": "Aap kisi bhi buyer/processor ka License ID 'Trust & Verify' page par search karke unka Proof Vault check kar sakte hain.",
    "default": "Kshama karein, main KrishiSetu demo assistant hu. AI hamesha recommend karta hai, par final decision aapka (Farmer ka) hota hai. Kripya apna dashboard check karein."
};

function initDemoData() {
    if (!Storage.get('batches')) Storage.set('batches', INITIAL_BATCHES);
    if (!Storage.get('opportunities')) Storage.set('opportunities', PROCESSING_OPPORTUNITIES);
    if (!Storage.get('entities')) Storage.set('entities', VERIFIED_ENTITIES);
    if (!Storage.get('notifications')) Storage.set('notifications', []);
}
