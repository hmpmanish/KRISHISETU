const fs = require('fs');

const rawData = `1	GAUTAM BUDDHA NAGAR	DAO-GAUTAM BUDDHA NAGAR	DAO-GAUTAMBUDDHANAGAR		02-01-2072
2		MAHESH VISHNU KHAD BEEJ BHANDAR KULESRA GBN	DAO SEED/144/GBN/10		
3		NEW KRISHI NIVESH KENDRA	DAO SEED/144/GBN/16		
4		ALLIANCE AGRI TECH	ADA SEED/103/GBN/1		
5		JANTA AGRIJUNCTION NOORPUR DADRI GBN	DAO SEED/144/GBN/11		
6		GURUKRIPA AGRI TRADERS DERY SCKENAR DADRI GBN	DAO SEED/144/GBN/9		
7		S S Traders Chhapraula Dadri GBN	DAO SEED/144/GBN/15		
8		PRANAV KHAD BEEJ BHANDAR CHHAYANSA DADRI GBN	DAO SEED/144/GBN/17		
9		SHREE VISHNU MADHAV BEEJ BHANDAR KULESRA GBN	DAO SEED/144/GBN/12		
10		B PACS KARIMNAGAR KATIYAR	DAO SEED/145/GZB/13		
11		JAGVEER KHAAD BEEJ BHANDAR ASGARPUR GREATER NODIA	DAO SEED/144/GBN/14		
12		KISAN AGRI JUCTION JARCHA DADRI GBN	DAO SEED/144/GBN/13		
13		SANTOSH SHARMA	DAO SEED/144/GBN/8		
14		SADHAN SEHKARI SAMITY LIMITED BISHARA AT KHATANA DHEERKHERA GBN	DAO SEED/144/GBN/7		
15		DRISHTI KHAD BEEJ BHANDAR KULESRA GBN	DAO SEED/144/GBN/6		
16		BHARAT TRADERS KHURJA ROAD JEWAR GBN	DAO SEED/144/GBN/5		
17		GUPTA BEEJ PAINTS HOUSE RABUPURA JEWAR GBN	DAO SEED/144/GBN/4		
18	GAUTAM BUDDHA NAGAR	BHATI TRADERS FALAIDA BANGAR JEWAR	DAO SEED/144/GBN/3		
19		NEW KRISHAK SEWA KENDRA	DAO SEED/144/GBN/2		
20		SAINI SEEDS DUJANA ROAD ACHHEJA GBN	DAO SEED/144/GBN/1		
21	GAUTAM BUDDHA NAGAR	SagarMal Chringilal Dankaur	DAO/GBN/90		
22	GAUTAM BUDDHA NAGAR	Bishamber Dayal Girdhrilal Dankaur	DAO/GBN/89		
23	GAUTAM BUDDHA NAGAR	Sharma Kisan Seva Kwndra Bhaipur	DAO/GBN/82		
24	GAUTAM BUDDHA NAGAR	San Building Matrial Hardware & Khad Bhandar	DAO/GBN/70		
25	GAUTAM BUDDHA NAGAR	Mahesh Pesticide Seed & Fertizer Kulsera GBN	DAO/GBN/56		
26	GAUTAM BUDDHA NAGAR	Kisan Khad Bikri Kendra MandiShyamNagar	DAO/GBN/55		
27	GAUTAM BUDDHA NAGAR	Gyoal Fertilizer And Chemical Jewar	DAO/GBN/50		
28	GAUTAM BUDDHA NAGAR	Pant Nagar Beej Bhandar Mandi Shyam Nagar	DAO/GBN/2		
29	GAUTAM BUDDHA NAGAR	Raghuvansh Agrijuction Piyawali Tajpur Dadri	DAO/GBN/178		
30	GAUTAM BUDDHA NAGAR	Kishan Agro Agency Chacura G B Nagar	DAO/GBN/175		
31	GAUTAM BUDDHA NAGAR	Kisan Agrijuction Dhoommanikpur Dadri	DAO/GBN/171`;

const lines = rawData.split('\n');
const dealers = [];

lines.forEach(line => {
    const parts = line.split('\t');
    if (parts.length >= 4) {
        const firmName = parts[2].trim();
        let licenseNo = parts[3].trim();
        if (!firmName || !licenseNo) return;
        
        let validUpto = parts[5] ? parts[5].trim() : "31-12-2027";
        if (!validUpto) validUpto = "31-12-2027";

        dealers.push({
            id: licenseNo,
            name: firmName,
            type: "Dealer",
            location: "Gautam Buddha Nagar",
            categories: ["Agri Inputs", "Seeds"],
            verificationDate: "01-01-2024",
            validity: validUpto,
            status: "VERIFIED IN PROTOTYPE",
            proofs: [
                { type: "Dealer License", date: "01-01-2024", source: "UP Agriculture Dept", status: "Valid" }
            ]
        });
    }
});

let dataJs = fs.readFileSync('js/data.js', 'utf8');

// Convert dealers to JSON string and append them inside VERIFIED_ENTITIES array
const dealersStr = dealers.map(d => JSON.stringify(d, null, 4)).join(',\n    ');

dataJs = dataJs.replace('];\n\nconst INITIAL_ROLES', '    ,\n    ' + dealersStr + '\n];\n\nconst INITIAL_ROLES');

fs.writeFileSync('js/data.js', dataJs);
console.log('Added ' + dealers.length + ' dealers to data.js');
