from app.models.schemas import ActionType, BatchResponse, MarketDirection
from typing import Dict, Any

def predict_price_trend(crop_type: str, current_price: float) -> MarketDirection:
    # MOCK ML MODEL for Demo
    # In a real app, this would load a scikit-learn model and call predict()
    if crop_type.lower() == "tomato":
        return MarketDirection.DOWN
    elif crop_type.lower() == "potato":
        return MarketDirection.UP
    else:
        return MarketDirection.STABLE

def generate_recommendation(batch: dict) -> Dict[str, Any]:
    # Extract inputs
    quality = batch.get("quality_grade", "A")
    shelf_life = batch.get("shelf_life_days", 10)
    spoilage_risk = batch.get("spoilage_risk_score", 0.0)
    cost = batch.get("storage_cost", 0.0)
    demand = batch.get("demand_level", "MEDIUM")
    
    trend = predict_price_trend(batch.get("crop_type", ""), batch.get("current_price", 0.0))
    
    # Base scores
    scores = {
        ActionType.SELL: 50.0,
        ActionType.STORE: 50.0,
        ActionType.PROCESS: 50.0,
        ActionType.RESCUE: 0.0,
    }
    
    factors = {"positive": [], "risk": []}
    
    # Rules
    if quality in ["C", "D"] or spoilage_risk > 0.8 or shelf_life < 3:
        scores[ActionType.RESCUE] += 100
        scores[ActionType.STORE] -= 50
        factors["positive"].append("Quality is low and spoilage risk is extremely high.")
        factors["risk"].append("Cannot store without immediate loss.")
        
    if trend == MarketDirection.DOWN:
        scores[ActionType.PROCESS] += 30
        scores[ActionType.SELL] -= 10
        scores[ActionType.STORE] -= 40
        factors["positive"].append("Processing avoids price drops in fresh markets.")
        factors["risk"].append("Market prices are trending downwards.")
        
    if trend == MarketDirection.UP and shelf_life > 14 and cost < 10.0:
        scores[ActionType.STORE] += 60
        factors["positive"].append("Expected market price increase over next 14 days.")
        factors["positive"].append("Storage cost is low and crop is durable.")
        
    if demand == "HIGH" and quality in ["A", "B"]:
        scores[ActionType.SELL] += 40
        factors["positive"].append("High current market demand for premium quality.")
        
    if batch.get("processing_suitability", 0.0) > 0.7:
        scores[ActionType.PROCESS] += 20
        factors["positive"].append("Crop variety is highly suitable for industrial processing.")

    # Determine winner
    best_action = max(scores, key=scores.get)
    max_score = scores[best_action]
    
    # Normalizing confidence for demo
    confidence = min(max_score / 150.0 * 100, 98.0)
    if confidence < 50:
        confidence = 65.0 # baseline floor
        
    why_alt = "Alternative actions scored lower due to either high storage costs or unsuited market trends."
    next_step = "Review buyers" if best_action in [ActionType.SELL, ActionType.PROCESS, ActionType.RESCUE] else "Find cold storage near you"
    
    return {
        "recommended_action": best_action,
        "confidence_score": round(confidence, 1),
        "positive_factors": factors["positive"],
        "risk_factors": factors["risk"],
        "expected_market_direction": trend,
        "shelf_life_info": f"Critical limit at {shelf_life} days based on storage conditions.",
        "why_alternatives_lower": why_alt,
        "suggested_next_step": next_step
    }
