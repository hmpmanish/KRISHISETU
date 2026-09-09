# KrishiSetu - Implementation Plan

KrishiSetu is an AI-Based Post-Harvest Decision & Rescue Engine addressing SIH26193. It empowers farmers by recommending the best action for their harvested produce (SELL, STORE, PROCESS, or RESCUE) using a transparent, explainable AI model. The system facilitates connections with buyers/processors and provides detailed analytics for admins.

## System Architecture

- **Frontend:** React (using Vite for fast bundling), TailwindCSS for styling (premium, accessible UI), `react-i18next` for bilingual support.
- **Backend:** Python + FastAPI for high performance and easy ML integration.
- **Database:** MongoDB (using Motor for async Python interactions).
- **Architecture Pattern:** RESTful API architecture. The backend serves JSON data to the React SPA.
- **Authentication:** JWT + Email/Password. Role-based access control for FARMER, ADMIN, BUYER.

## MongoDB Collections/Schema

1. **Users** (`users`)
   - `_id`, `email`, `password_hash`, `role` (FARMER, ADMIN, BUYER), `name`, `phone`, `location`, `language`
2. **Crop Batches** (`batches`)
   - `_id`, `farmer_id`, `crop_type`, `variety`, `quantity_kg`, `harvest_date`, `location`, `quality_grade` (A/B/C/D), `images` (URLs), `shelf_life_days`, `storage_condition_temp` (optional IoT ready), `storage_condition_humidity` (optional IoT ready), `storage_cost`, `spoilage_risk_score`, `current_market_price`, `demand_level`, `price_trend_prediction`, `processing_suitability`, `status` (PENDING, AI_RECOMMENDED, FARMER_DECIDED, COMPLETED), `ai_recommendation` (SELL/STORE/PROCESS/RESCUE), `farmer_final_decision` (SELL/STORE/PROCESS/RESCUE), `created_at`
3. **Recommendations** (`recommendations`)
   - `_id`, `batch_id`, `recommended_action`, `confidence_score`, `positive_factors` (list), `risk_factors` (list), `expected_market_direction`, `shelf_life_info`, `why_alternatives_lower` (text), `suggested_next_step`, `created_at`
4. **Offers/Requests** (`offers`)
   - `_id`, `batch_id`, `buyer_id`, `offer_price`, `status` (PENDING, ACCEPTED, REJECTED), `type` (BUY, PROCESS, RESCUE), `created_at`
5. **Notifications** (`notifications`)
   - `_id`, `user_id`, `type` (ALERT, INFO, URGENCY), `message`, `is_demo` (boolean, clearly labels mock data), `is_read`, `created_at`

## Backend APIs (FastAPI)

- **Auth:** `POST /api/auth/login`, `POST /api/auth/register`
- **Farmer Batches:** 
  - `GET /api/batches/my`
  - `POST /api/batches` (manual entry)
  - `POST /api/batches/bulk` (CSV upload)
  - `GET /api/batches/{id}/recommendation` (fetches explainable AI data)
  - `POST /api/batches/{id}/decision` (Farmer submits final decision)
- **AI Engine:** `POST /api/engine/recommend/{batch_id}` (Triggers hybrid AI engine for a batch)
- **Buyer/Processor Workflow:** 
  - `GET /api/market/available-batches` (Filters by Farmer's final decision e.g., PROCESS, RESCUE)
  - `POST /api/offers`
- **Admin Analytics:** `GET /api/admin/stats`
- **Notifications:** `GET /api/notifications`

## Frontend Pages/Screens

1. **Landing Page:** Premium, high-conversion design explaining KrishiSetu's USP ("AI Recommends. The Farmer Decides.").
2. **Login/Register:** JWT-based email/password login.
3. **Farmer Dashboard:** Overview of batches, actionable alerts, mobile-friendly card layout.
4. **Add Harvest Batch:** Detailed form (including hardware-ready fields) + CSV drag-and-drop.
5. **AI Recommendation View (Explainability Engine):**
   - Recommended action prominently displayed with Confidence Score.
   - Top positive factors & Risk factors (visual gauges/lists).
   - Expected market direction (ML prediction).
   - Shelf-life/spoilage context.
   - Why alternative actions scored lower.
   - Suggested next step (e.g., "Connect with Processor X").
6. **Human-in-the-loop Decision Modal:** Farmer explicitly accepts AI recommendation or overrides it to set the final `farmer_final_decision`.
7. **Processor/Buyer Workflow:** Processors see batches specifically marked for PROCESS. Rescuers see urgent RESCUE batches.
8. **Admin Dashboard:** Detailed analytics, total batches, action distribution, system health.

## AI Decision Engine Architecture (Hybrid)

1. **ML Component (Price Trend):**
   - Simple predictive function (mocked as an ML model for the demo) outputting `expected_market_direction` (UP/DOWN/STABLE).
   - Does NOT make the final decision. Feeds into the rule engine.
2. **Explainable Rule-Based Core:**
   - Evaluates inputs: `quality_grade`, `shelf_life_days`, `spoilage_risk_score`, `price_trend_prediction`, `storage_cost`, etc.
   - Outputs scores for SELL, STORE, PROCESS, RESCUE.
   - Generates the explainability factors (positive/risk/alternative explanations) based on which rules fired.

## Demo Data Strategy (`seed.py`)

- Script will populate MongoDB to ensure a perfect "Golden Path" demo without external APIs.
- **Specific Scenarios Seeded:**
  1. **Strong SELL Case:** High demand, good price, average shelf life.
  2. **STORE Case:** Low current price, upward trend predicted, long shelf life (e.g., Potatoes).
  3. **PROCESS Case:** High yield, average price, suitable crop (e.g., Tomatoes for ketchup).
  4. **Urgent RESCUE Case:** Grade C/D quality, extremely short shelf life, high spoilage risk, impending loss.
- **Mock/Demo Labels:** All mock prices, predictions, and notifications will be clearly labeled as `[DEMO DATA]`.

## Folder/Project Structure

```text
krishisetu/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── locales/
│   │   ├── App.jsx
│   │   └── main.jsx
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── services/
│   │   └── engine/
│   ├── scripts/
│   │   └── seed.py
│   ├── requirements.txt
│   └── main.py
└── README.md
```
