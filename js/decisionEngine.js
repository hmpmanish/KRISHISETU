// decisionEngine.js

function evaluateBatch(batch) {
    let scores = {
        SELL: 0,
        STORE: 0,
        PROCESS: 0,
        RESCUE: 0
    };

    let reasons = { SELL: [], STORE: [], PROCESS: [], RESCUE: [] };
    let risks = { SELL: [], STORE: [], PROCESS: [], RESCUE: [] };

    // 1. RESCUE Logic
    if (batch.shelfLife <= 2 || batch.spoilageRisk === 'Critical') {
        scores.RESCUE += 100; // Immediate trigger
        reasons.RESCUE.push("Remaining shelf life is critically low.");
        reasons.RESCUE.push("High spoilage risk detected.");
    }

    // 2. SELL Logic
    if (batch.marketPrice === 'Favorable' && batch.demand === 'Strong') {
        scores.SELL += 80;
        reasons.SELL.push("Market price is currently favorable.");
        reasons.SELL.push("Strong demand in local markets.");
    } else if (batch.marketPrice === 'Weak') {
        risks.SELL.push("Current market price is weak.");
        scores.SELL -= 20;
    }

    // 3. STORE Logic
    if (batch.storageAvailable && (batch.storageCost === 'Low' || batch.storageCost === 'Reasonable') && batch.shelfLife > 30) {
        scores.STORE += 60;
        reasons.STORE.push("Storage is available at reasonable cost.");
        reasons.STORE.push("Crop has sufficient shelf life for holding.");
        if (batch.marketPrice === 'Weak') {
            scores.STORE += 30; // Better to store if price is weak now
            reasons.STORE.push("Current weak price makes holding attractive.");
        }
    } else {
        risks.STORE.push("Storage is either unavailable or cost-prohibitive.");
    }

    // 4. PROCESS Logic
    if (batch.processingSuitable && (batch.processorDemand === 'High' || batch.processorDemand === 'Medium')) {
        scores.PROCESS += 70;
        reasons.PROCESS.push("High processing suitability for this crop.");
        reasons.PROCESS.push("Active processor demand detected.");
        if (batch.marketPrice === 'Weak' && batch.shelfLife <= 10) {
            scores.PROCESS += 40;
            reasons.PROCESS.push("Shelf life permits immediate processing avoiding market loss.");
        }
    }

    // Determine Winner
    let recommendedAction = 'SELL';
    let maxScore = scores.SELL;

    ['STORE', 'PROCESS', 'RESCUE'].forEach(action => {
        if (scores[action] > maxScore) {
            maxScore = scores[action];
            recommendedAction = action;
        }
    });

    // Confidence Calculation
    let confidence = 'Medium';
    if (maxScore > 90) confidence = 'High';
    if (maxScore < 50) confidence = 'Low';

    return {
        action: recommendedAction,
        score: maxScore,
        confidence: confidence,
        reasons: reasons[recommendedAction].length > 0 ? reasons[recommendedAction] : ["Algorithm suggests this based on multiple weak factors."],
        risks: risks[recommendedAction] || [],
        allScores: scores
    };
}
