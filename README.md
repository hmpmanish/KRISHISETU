# KrishiSetu — From Harvest to Decision. From Decision to Verified Action.

**SIH 2026 Master Prototype | Team LogicForge**
**Problem Statement ID:** SIH26193
**Theme:** Agriculture, FoodTech & Rural Development

## The Core Concept

KrishiSetu is a digital post-harvest decision and trust ecosystem that helps farmers decide what to do with harvested agricultural produce — **SELL, STORE, PROCESS, or RESCUE** — using crop condition, quality, quantity, shelf life, market signals, and processing opportunities. 

Crucially, it answers both **“What should I do?”** and **“Who should I deal with?”** by helping farmers verify the entities and records involved in the final action.

**Core USP:** *AI Recommends. The Farmer Decides.*

---

## Two Intelligence Layers

### Layer 1 — Decision Intelligence
Answers: *“Meri harvested crop ke saath kya karna chahiye?”*
The system takes post-harvest variables and recommends one of four actions:
- **SELL**: Sell the produce now when market conditions and demand are favorable.
- **STORE**: Store the produce when quality and shelf life are suitable and future market conditions may improve.
- **PROCESS**: Convert the produce into a value-added product when direct selling is less attractive.
- **RESCUE**: Take urgent action when spoilage risk is high.

### Layer 2 — Trust & Verify
Answers: *“Ye action kis verified person/entity ke saath karna chahiye, aur iska proof kya hai?”*
If the system recommends PROCESS, it doesn't leave the farmer stranded. It finds a processor and provides an **Evidence-First** view containing the Processor's Verification Status, Registration Records, and Proof Vault documents.

> **Important Demo Rule**: This is an SIH Prototype. All verification records, licenses, market data, and AI models are **simulated using local demo data**. Production deployment would connect to authoritative licensing, registration, and market APIs (AGMARKNET, e-NAM, etc.).

---

## The "Magic Moment" Flow (Guided Demo)

1. **Farmer Dashboard**: Rajesh Kumar logs in and sees a dashboard with active harvests.
2. **Tomato Batch**: The farmer clicks on a tomato batch with limited shelf life.
3. **AI Recommendation**: The KrishiSetu Decision Engine recommends **PROCESS**.
4. **Explainability**: The system clearly explains *Why* (e.g. Weak market + Short shelf life) and the *Risks* of ignoring it.
5. **Interactive What-If**: The farmer drags the shelf life slider down to 1 day. The AI dynamically shifts the recommendation to **RESCUE**.
6. **Trust & Verify**: The farmer accepts the processing recommendation and connects with **AgroFresh Processing Unit**. Before connecting, the farmer opens the **Proof Vault** to verify AgroFresh's registration.
7. **Traceability**: Once connected, a complete verifiable timeline is generated for the batch.

---

## Architecture

```text
USER LAYER
(Farmer, Buyer, Processor, Admin)
       ↓
APPLICATION LAYER
(Dashboard, Decision Engine, Trust & Verify, Offers, Notifications)
       ↓
INTELLIGENCE LAYER
(Post-Harvest Rules, Market Signals, Shelf-Life Analysis)
       ↓
TRUST LAYER
(Entity/Batch Verification, Proof Vault)
       ↓
DATA LAYER
(LocalStorage, Simulated Offline Data)
       ↓
FUTURE INTEGRATION LAYER (Production)
(AGMARKNET APIs, Licensing Databases, ML Models, IoT Sensors)
```

## How to Run

This application was strictly built as a **Frontend-Only** application using HTML5, CSS3, and Vanilla JavaScript, ensuring it operates completely offline for demonstration purposes.

1. Double-click `index.html` in your web browser.
2. Or use **Live Server** in VS Code to host on localhost.
3. Click **"Start Judge Demo"** in the top navigation to experience the core narrative flow.

*KrishiSetu does not just tell a farmer what to do after harvest. It explains why, shows supporting evidence, helps verify the next participant, creates traceability, and keeps the final decision with the farmer.*
