import { useState, useEffect } from 'react';
import { CheckCircle2, TrendingDown, Clock, ShieldAlert, ArrowRight, Zap, Check } from 'lucide-react';

const MOCK_REC = {
  recommended_action: 'PROCESS',
  confidence_score: 85.5,
  positive_factors: [
    'Processing avoids price drops in fresh markets.',
    'Crop variety is highly suitable for industrial processing.'
  ],
  risk_factors: [
    'Market prices are trending downwards.'
  ],
  expected_market_direction: 'DOWN',
  shelf_life_info: 'Critical limit at 7 days based on storage conditions.',
  why_alternatives_lower: 'Alternative actions scored lower due to either high storage costs or unsuited market trends.',
  suggested_next_step: 'Review buyers'
};

import { engine, batches } from '../services/api';

export default function RecommendationCard({ batch }) {
  const [rec, setRec] = useState(null);
  const [loading, setLoading] = useState(false);
  const [farmerDecision, setFarmerDecision] = useState(batch.farmer_final_decision || null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setRec(null);
    setFarmerDecision(batch.farmer_final_decision || null);
    setError(null);
    if (batch.status === 'AI_RECOMMENDED' || batch.status === 'FARMER_DECIDED') {
      const fetchRecommendation = async () => {
        setLoading(true);
        try {
          const response = await engine.getRecommendation(batch.id);
          setRec(response.data);
        } catch (err) {
          setError('Failed to fetch AI recommendation from server.');
        } finally {
          setLoading(false);
        }
      };
      fetchRecommendation();
    }
  }, [batch.id, batch.status, batch.farmer_final_decision]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await engine.generateRecommendation(batch.id);
      setRec(response.data);
    } catch (err) {
      setError('Engine error: Make sure FastAPI backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (decision) => {
    try {
      await batches.submitDecision(batch.id, decision);
      setFarmerDecision(decision);
    } catch (err) {
      setError('Failed to submit decision.');
    }
  };

  if (loading) {
    return <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center h-full"><div className="animate-pulse flex flex-col items-center"><div className="h-16 w-16 bg-agrigreen-100 rounded-full mb-4"></div><div className="h-4 bg-gray-200 rounded w-32"></div><p className="mt-4 text-gray-400">KrishiSetu AI is analyzing market variables...</p></div></div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-2xl shadow-sm border border-red-100 p-8 flex flex-col items-center justify-center h-full text-center">
        <ShieldAlert size={48} className="text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-red-800 mb-2">Analysis Error</h3>
        <p className="text-red-600 max-w-md">{error}</p>
      </div>
    );
  }

  if (!rec) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center h-full text-center">
        <Zap size={48} className="text-yellow-400 mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready for Analysis</h3>
        <p className="text-gray-500 mb-6 max-w-md">Run this batch through the KrishiSetu engine to get actionable intelligence based on real-time market data, shelf-life, and demand.</p>
        <button onClick={handleGenerate} className="bg-agrigreen-600 hover:bg-agrigreen-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-agrigreen-500/30">
          <Zap size={20} /> Generate AI Recommendation
        </button>
      </div>
    );
  }

  const actionColors = {
    SELL: 'bg-green-100 text-green-800 border-green-200',
    STORE: 'bg-blue-100 text-blue-800 border-blue-200',
    PROCESS: 'bg-purple-100 text-purple-800 border-purple-200',
    RESCUE: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="bg-gray-900 text-white p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold mb-1">KrishiSetu AI Recommendation</p>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-black tracking-tight">{rec.recommended_action}</h2>
              <span className={`px-3 py-1 text-sm font-bold rounded-full border ${actionColors[rec.recommended_action]} bg-opacity-20 text-white`}>
                {rec.confidence_score}% Match
              </span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-right">
            <p className="text-xs text-gray-400 uppercase font-semibold">Trend</p>
            <div className="flex items-center gap-1 text-red-400 font-bold">
              <TrendingDown size={16} /> {rec.expected_market_direction}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-bold text-gray-500 flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Positive Factors</h4>
            <ul className="space-y-3">
              {rec.positive_factors.map((factor, i) => (
                <li key={i} className="flex gap-3 text-gray-700 bg-green-50 p-3 rounded-lg border border-green-100 text-sm">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-bold text-gray-500 flex items-center gap-2"><ShieldAlert size={16} className="text-red-500"/> Risk Factors</h4>
            <ul className="space-y-3">
              {rec.risk_factors.map((factor, i) => (
                <li key={i} className="flex gap-3 text-gray-700 bg-red-50 p-3 rounded-lg border border-red-100 text-sm">
                  <span className="text-red-500 mt-0.5">!</span>
                  <span>{factor}</span>
                </li>
              ))}
              <li className="flex gap-3 text-gray-700 bg-orange-50 p-3 rounded-lg border border-orange-100 text-sm">
                <Clock size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <span>{rec.shelf_life_info}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
          <p className="text-sm text-gray-600 italic">" {rec.why_alternatives_lower} "</p>
        </div>

        <div className="mt-auto border-t border-gray-100 pt-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">Farmer's Final Decision</h4>
          
          {farmerDecision ? (
            <div className="bg-agrigreen-50 border border-agrigreen-200 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-agrigreen-800 font-medium">You decided to</p>
                <p className="text-xl font-bold text-agrigreen-700 flex items-center gap-2">
                  <Check size={20} /> {farmerDecision}
                </p>
              </div>
              <button className="bg-agrigreen-600 hover:bg-agrigreen-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 shadow-sm transition-colors">
                {rec.suggested_next_step} <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['SELL', 'STORE', 'PROCESS', 'RESCUE'].map(action => (
                <button 
                  key={action}
                  onClick={() => handleDecision(action)}
                  className={`py-3 rounded-xl font-bold text-sm transition-all border-2 
                    ${action === rec.recommended_action 
                      ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800 hover:-translate-y-1 hover:shadow-lg' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  {action}
                  {action === rec.recommended_action && <span className="block text-xs font-normal text-gray-400 mt-1">Recommended</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
