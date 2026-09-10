# KrishiSetu — Research & Problem Validation

## 1. Problem Statement

### SIH Problem Statement

**SIH26193 — Student Innovation: Developing solutions, keeping in mind the need to enhance the primary sector of India — Agriculture and to manage and process our agriculture produce.**

### Our identified problem

Harvest ke baad farmer ke paas sirf ek question nahi hota ki **“meri crop ka price kya hai?”**

Actual questions hote hain:

* Abhi sell karun ya wait karun?
* Agar price badhne wala hai toh store karna chahiye?
* Agar shelf life kam hai toh kya karun?
* Kya crop ko process karke zyada value mil sakti hai?
* Kahan sell karun?
* Buyer/trader/processor genuine hai ya nahi?
* Jo information mujhe mil rahi hai uska proof kya hai?
* Agar crop rapidly spoil ho rahi hai toh rescue option kya hai?
* Agar farmer smartphone ya digital platform use nahi kar pata toh woh system tak kaise पहुंचे?

Isliye problem sirf **price discovery** nahi hai.

### Core problem

> **Farmers may have agricultural produce after harvest, but the decision about what to do with that produce is fragmented across market information, quality, shelf life, storage, processing and buyer information.**

KrishiSetu ka objective is fragmented information ko ek **post-harvest decision workflow** mein combine karna hai.

---

# 2. Why Post-Harvest Decision Support Matters

Government-backed research has identified post-harvest losses across agricultural commodities. A 2022 NABCONS study commissioned by the Ministry of Food Processing Industries assessed 54 commodities across 15 agro-climatic zones and 292 districts. The reported loss ranges included approximately:

* Cereals: 3.89–5.92%
* Pulses: 5.65–6.74%
* Oilseeds: 2.87–7.51%
* Fruits: 6.02–15.05%
* Vegetables: 4.87–11.61%

These figures show that post-harvest management is a genuine agricultural problem, not only a theoretical problem.

**Research implication:**

The question is not only:

> “How do we increase production?”

It is also:

> **“How do we make better decisions about produce after it has been harvested?”**

Source: Ministry of Agriculture / PIB information on post-harvest losses.

---

# 3. Existing Solutions Research

## A. e-NAM

### What already exists?

e-NAM is a pan-India electronic trading platform connecting existing APMC mandis.

It focuses on:

* Market access
* Price discovery
* Online trading
* Buyer/trader access
* Real-time information on arrival, quality and prices
* Transparent bidding
* Online payments
* Quality assaying

e-NAM's stated vision includes reducing information asymmetry between buyers and sellers and improving real-time price discovery.

Traders also have registration requirements including identity, bank information, trading licence and other documents.

### What does e-NAM solve?

**Market and trading problem.**

It helps answer:

> “Where and at what price can I sell my produce?”

### What is our gap?

KrishiSetu does not try to replace e-NAM.

Our question comes **before the final market action**:

> “Should I SELL, STORE, PROCESS or RESCUE this particular batch?”

We combine:

**Crop condition + quality + shelf life + spoilage risk + market signal + demand + storage feasibility + processing opportunity**

to generate a decision recommendation.

### Important distinction

**e-NAM = Market/Trading Layer**

**KrishiSetu = Post-Harvest Decision + Trust Layer**

e-NAM already supports farmers with price information, buyers and market access, so KrishiSetu should not claim that these capabilities are completely missing from India.

---

# 4. SATHI — Seed Authentication & Traceability

## What already exists?

SATHI stands for:

**Seed Authentication, Traceability & Holistic Inventory.**

It is a Ministry of Agriculture and Farmers Welfare initiative focused on making the seed supply chain more traceable and improving seed authentication and quality/purity.

Its ecosystem includes activities such as:

* Seed producer registration
* Processing-related registration
* Dealer licensing
* Document verification
* Inspection
* Laboratory testing
* Tagging
* Traceability
* Inventory-related processes

### What does SATHI solve?

> **“Can this seed and its supply-chain record be authenticated and traced?”**

### What does KrishiSetu do?

We take inspiration from this **trust + traceability approach**, but our project is broader and focused on post-harvest decision-making.

Our proposed Trust & Verify layer can contain:

**Entity → Registration/License → Proof → Verification status → Batch/Product → Connection → Timeline**

Possible entities:

* Buyer
* Trader
* Processor
* Agricultural shop
* Seed seller
* Produce batch

### Important limitation

We are **not claiming that KrishiSetu currently performs real government verification.**

Our SIH prototype uses simulated/demo records.

Production deployment would require authorised government/industry data sources and proper verification mechanisms.

SATHI itself demonstrates the value of authentication and traceability in the seed ecosystem.

---

# 5. Food Processing & PMFME/PMKSY Ecosystem

Government already supports:

* Food processing
* Value addition
* Cold chain
* Preservation
* Processing infrastructure
* Micro food-processing enterprises

PMFME has supported a large number of micro food-processing enterprises, while PMKSY includes post-harvest infrastructure and processing facilities.

### Existing ecosystem solves:

> “How can processing and preservation infrastructure be developed/supported?”

### KrishiSetu solves a different question:

> **“For this particular harvested batch, is processing a suitable next action?”**

Example:

### Tomato

Market price → weak

Shelf life → short

Processing suitability → high

Processor demand → available

KrishiSetu:

**PROCESS**

Then:

**Processing opportunity → Processor → Verification → Connection Request → Traceability**

We are therefore not replacing government processing schemes.

We are proposing a **decision and connection layer before action**.

---

# 6. Storage / Cold Chain

Existing cold-chain programmes support infrastructure such as:

* Storage
* Preservation
* Sorting
* Grading
* Packing
* Transportation
* Cold-chain facilities

### Existing solution:

> “Storage infrastructure is available.”

### KrishiSetu question:

> **“Should this particular batch be stored?”**

Example:

Potato:

* Good quality
* Long enough shelf life
* Storage available
* Storage cost manageable
* Expected price trend positive

→ **STORE**

But:

Tomato:

* Very short shelf life
* High spoilage risk
* Weak current selling opportunity
* Processing opportunity available

→ **PROCESS**

Thus, storage is an infrastructure option; KrishiSetu attempts to provide **batch-level decision support** for choosing among possible actions.

---

# 7. Quality Assaying

Existing systems such as e-NAM already support quality assaying and quality certificates.

### Therefore we are NOT claiming:

> “Farmers have no quality information.”

Instead:

KrishiSetu treats quality as **one decision variable among several**.

Example:

**Quality + Price + Trend + Demand + Shelf Life + Spoilage + Storage + Processing**

↓

### Decision Engine

↓

**SELL / STORE / PROCESS / RESCUE**

This distinction is important for avoiding overclaiming.

---

# 8. Existing Solutions — Overall Gap

| Existing solution               | Main focus                                | What KrishiSetu adds                                  |
| ------------------------------- | ----------------------------------------- | ----------------------------------------------------- |
| e-NAM                           | Trading & price discovery                 | Post-harvest action decision                          |
| SATHI                           | Seed authentication & traceability        | Broader proposed trust/action workflow                |
| Quality Assaying                | Quality assessment                        | Combine quality with other decision factors           |
| Cold Chain                      | Storage & preservation infrastructure     | Decide whether storage makes sense                    |
| PMFME / Processing ecosystem    | Processing & value addition               | Identify processing as a suitable action              |
| Digital Agriculture initiatives | Digital agriculture infrastructure/data   | Farmer-facing decision workflow                       |
| **KrishiSetu**                  | **Decision + Evidence + Verified Action** | **Connects these decision factors into one workflow** |

---

# 9. The Actual Gap We Identified

Existing agricultural systems are valuable but often solve **specific parts** of the ecosystem.

The farmer's journey can still look like:

**Market information**
↓
**Separate quality information**
↓
**Separate storage option**
↓
**Separate processor**
↓
**Separate buyer**
↓
**Separate verification**

The farmer has to connect these pieces mentally.

### KrishiSetu proposes:

**One decision workflow**

Farmer / Assisted Access

↓

Crop & Batch Data

↓

Quality + Shelf Life

↓

Market + Demand

↓

Storage + Processing Opportunity

↓

### AI Decision Engine

↓

**SELL / STORE / PROCESS / RESCUE**

↓

**Why this recommendation?**

↓

**Evidence / Proof**

↓

**Verify next participant**

↓

Buyer / Trader / Processor

↓

Connection / Offer

↓

Batch Traceability

↓

Final Action

---

# 10. Why Would Farmers Use KrishiSetu?

A farmer will use the platform only if it provides a clear practical benefit.

## Reason 1 — Simple decision

Instead of showing many disconnected data points:

> “Price = ₹X, demand = Y, shelf life = Z...”

the system gives:

### Recommended Action: PROCESS

and explains:

> “Processing is recommended because current selling attractiveness is weak, remaining shelf life is limited, and a suitable processing opportunity is available.”

The farmer can still accept or reject the recommendation.

---

## Reason 2 — Farmer remains in control

Important principle:

### “AI Recommends. The Farmer Decides.”

AI should not automatically sell the crop.

The farmer sees:

* Recommendation
* Reasons
* Risks
* Evidence
* Alternatives

Then:

**Accept / Override**

---

## Reason 3 — Trust

Farmer may ask:

> “Processor genuine hai?”

KrishiSetu can show, in a production version:

* Entity name
* Registration information
* License/registration status
* Verification date
* Validity
* Authorized category
* Supporting documents/proof
* Verification history

For the SIH prototype, these records are clearly labelled **simulated/demo data**.

---

## Reason 4 — More than selling

A farmer may normally think:

> “Mandi mein sell kar do.”

KrishiSetu introduces alternatives:

**SELL**

**STORE**

**PROCESS**

**RESCUE**

The goal is not to force a farmer away from the mandi.

The goal is to help the farmer compare possible actions.

---

## Reason 5 — Rescue before spoilage

For highly perishable crops:

**Short shelf life + high spoilage risk**

can trigger:

### RESCUE

Possible actions:

* Find verified buyer
* Find processor
* Alternative market
* Urgent connection

This makes the system relevant when delay itself creates loss.

---

# 11. Why Might Farmers NOT Use KrishiSetu?

This is equally important.

A good research document should not only explain advantages.

## Barrier 1 — Digital literacy

Some farmers may not be comfortable with apps.

### Solution

Use an **Assisted Access Model**.

The farmer does not necessarily have to operate every screen personally.

Possible future assisted users:

* FPO
* CSC
* Mandi representative
* Authorized local facilitator
* Agriculture extension worker

### Principle:

> **The farmer is the beneficiary, not necessarily the operator.**

---

# 12. Barrier 2 — Smartphone / Internet Availability

Not every farmer will have:

* Smartphone
* Reliable internet
* Digital payment familiarity
* Continuous connectivity

### Proposed solution

Three access modes:

### Mode A — Direct Farmer

Simple Hindi/local-language interface.

### Mode B — Assisted

Authorized facilitator enters crop/batch information.

### Mode C — Future Voice/IVR

Voice-based interaction for users with low digital literacy or limited smartphone usage.

**Important:** Voice/IVR is a proposed future feature, not a claim that it is already implemented.

---

# 13. Barrier 3 — “Farmer already has a trusted local trader”

This is realistic.

A farmer may say:

> “Main toh saalon se isi trader ko bechta hoon.”

KrishiSetu should not try to force the farmer to replace that relationship.

Instead:

### Compare.

Existing trader

vs.

Verified alternatives

vs.

Processor

vs.

Other available market options

The farmer makes the final choice.

---

# 14. Barrier 4 — Farmer may not trust AI

A farmer may ask:

> “AI ne ye decision kyun diya?”

Therefore KrishiSetu should not show only:

### “AI says PROCESS.”

It should show:

**Why?**

* Shelf life
* Price trend
* Demand
* Quality
* Spoilage risk
* Processing suitability

### Evidence

* Data source
* Date
* Verification status
* Record/proof where available

This is why explainability is part of our design.

---

# 15. Barrier 5 — Wrong Recommendation

AI/rule-based decision support can be wrong.

Therefore:

### Human-in-the-loop

**AI Recommendation**

↓

**Farmer Review**

↓

**Accept / Override**

The system should record:

**AI Recommendation**

and

**Farmer Final Decision**

separately.

This also creates useful future data for improving the decision engine.

---

# 16. Barrier 6 — Fake Verification / False Trust

A verification badge should never mean:

> “This person can never cheat.”

Verification only reduces uncertainty based on available records.

Therefore production system should maintain:

* Verification status
* Verification source
* Verification date
* Expiry/validity
* Document status
* Report/complaint mechanism
* Audit/update history

If sufficient proof is not available:

### VERIFICATION INCOMPLETE

Not:

### “This seller is definitely fake.”

This is an important ethical design principle.

---

# 17. Barrier 7 — Data Accuracy

The decision is only as good as the input data.

If:

* Price is outdated
* Quantity is wrong
* Harvest date is wrong
* Quality is incorrectly entered

the recommendation can be affected.

### Proposed solution

Show:

**Data source + timestamp + confidence/quality of information**

and allow farmer/facilitator to edit incorrect information.

---

# 18. Disease Detection — Where Does It Fit?

Disease detection should **not be our main USP**.

It can be a secondary/future module.

Possible workflow:

**Crop Image**

↓

Possible disease/stress detected

↓

Possible condition + confidence

↓

Visual evidence

↓

Recommended next step

↓

Expert/agriculture advisory

It should say:

### “Possible disease/stress”

not:

### “Confirmed disease.”

This keeps KrishiSetu aligned with its main post-harvest problem.

---

# 19. Why KrishiSetu Is Not Just Another Agriculture App

We are NOT positioning KrishiSetu as:

❌ Only a price app

❌ Only an e-commerce marketplace

❌ Only a disease detector

❌ Only a chatbot

❌ Only a storage calculator

❌ Only a buyer directory

### Our positioning:

# POST-HARVEST DECISION & TRUST ECOSYSTEM

It answers two connected questions:

### Question 1

> **“What should I do with my harvested produce?”**

SELL / STORE / PROCESS / RESCUE

### Question 2

> **“Who should I deal with, and what evidence is available?”**

VERIFY → PROOF → CONNECT → TRACE

---

# 20. Farmer Adoption Strategy

For real-world deployment, KrishiSetu should follow:

### Step 1 — Keep UI extremely simple

Farmer should not need to understand AI.

### Step 2 — Local language

Hindi + regional languages.

### Step 3 — Assisted access

FPO / CSC / mandi / authorized facilitator.

### Step 4 — Explain every recommendation

No black-box “AI says so.”

### Step 5 — Give alternatives

Never force one buyer or one action.

### Step 6 — Show evidence

Source + date + verification status.

### Step 7 — Farmer remains final decision-maker

AI supports; farmer decides.

---

# 21. Current Prototype vs Future Production

## Implemented / Prototype

* Farmer dashboard
* Harvest batch creation
* SELL / STORE / PROCESS / RESCUE decision engine
* Rule-based explainability
* Mock/demo market data
* Processing opportunities
* Rescue workflow
* Trust & Verify prototype
* Simulated entity records
* Evidence/proof UI
* Batch timeline
* QR verification demo
* Notifications
* Buyer/processor workflow
* Admin analytics
* localStorage-based data
* English/Hindi UI concept

## Future Production

* Authoritative government verification
* Real market APIs/data
* Real licensed entity verification
* Real processor/buyer onboarding
* Backend + database
* Secure authentication
* FPO/CSC/assisted access
* Voice/IVR
* Real-time market intelligence
* Expert-validated crop health screening
* Audit/dispute mechanism
* Offline/low-connectivity support

---

# 22. Technical Research Conclusion

### Existing ecosystem

**e-NAM**
→ Market & price discovery

**SATHI**
→ Seed authentication & traceability

**Government processing programmes**
→ Processing/value addition infrastructure

**Cold-chain programmes**
→ Storage/preservation infrastructure

**Quality systems**
→ Produce quality assessment

**Digital Agriculture**
→ Farmer/crop/data infrastructure

### KrishiSetu

→ **Decision layer**

→ **Evidence layer**

→ **Trust/verification layer**

→ **Action/connection layer**

Therefore:

> **KrishiSetu does not claim to replace existing agricultural platforms. It proposes a unified post-harvest decision workflow that can consume information from different sources and help the farmer move from “What should I do?” to “Why should I do it?” and finally to “Who can I safely connect with?”**

---

# 23. Final Research Insight

### Existing systems solve parts of the journey.

### KrishiSetu connects the decision journey.

**Harvest**

↓

**Understand the Batch**

↓

**Evaluate Condition**

↓

**Check Market**

↓

**Check Shelf Life**

↓

**Check Storage**

↓

**Check Processing**

↓

### AI Recommendation

**SELL / STORE / PROCESS / RESCUE**

↓

### Explain Why

↓

### Show Evidence

↓

### Verify Next Participant

↓

### Connect

↓

### Track

↓

### Farmer Makes Final Decision

---

# 24. One-Line USP

> **“KrishiSetu bridges the gap between post-harvest information and verified action.”**

## Stronger SIH version

> **“Existing platforms solve market access, traceability, processing and infrastructure separately. KrishiSetu brings these decision factors together into a farmer-centric post-harvest decision and trust workflow.”**

---

# 25. Judge Question — “Why will a farmer use your app?”

### 30-second answer

> **“Sir, we don't expect every farmer to use KrishiSetu like a normal complex smartphone application. Our value is very practical: after harvest, the farmer gets a recommendation based on crop condition, shelf life, market signals, storage and processing opportunity. We explain why the recommendation was made and then help the farmer identify verified next participants. For digitally comfortable farmers, there is direct access; for others, our proposed assisted model can work through FPOs, CSCs, mandis or authorized facilitators. Most importantly, AI only recommends—the farmer makes the final decision.”**

---

# 26. Judge Question — “Why won't farmers use it?”

### Strong answer

> **“Sir, adoption is one of our identified challenges. Farmers may not trust AI, may have low digital literacy, limited internet access, or may already have trusted local traders. That's why our design doesn't depend only on direct smartphone usage. We propose simple local-language UI, assisted access, explainable recommendations, verified records and comparison rather than forcing a particular buyer. We consider adoption itself as a design requirement, not an afterthought.”**

---

# 27. Judge Question — “What is actually innovative?”

### Answer

> **“Sir, we are not claiming that price discovery, traceability or food processing are individually new. Existing systems already address those areas. Our innovation is the combination of a batch-level post-harvest decision engine with explainability, evidence and a trust layer. We first help answer what should happen to the produce, and then help the farmer move toward a verified action while keeping the farmer in control.”**

---

# 28. Important Research Disclaimer

**KrishiSetu is an SIH 2026 prototype.**

Market information, entity records, verification records, licences, documents, processor opportunities and analytics shown inside the prototype may be simulated unless explicitly connected to an authoritative source.

KrishiSetu does not currently represent an official Government of India verification or trading service.

Existing government platforms such as e-NAM and SATHI remain independent systems. KrishiSetu is a proposed decision-support and trust workflow that could potentially integrate with authoritative sources in a future production implementation.
