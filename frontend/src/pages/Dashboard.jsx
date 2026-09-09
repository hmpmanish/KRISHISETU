import { useState, useEffect } from 'react';
import { Package, Plus, TrendingUp, AlertTriangle } from 'lucide-react';
import RecommendationCard from '../components/RecommendationCard';
import { batches as batchesApi } from '../services/api';

export default function Dashboard() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await batchesApi.getMyBatches();
        setBatches(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch batches from the production server. Please make sure the backend API is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agrigreen-600"></div></div>;
  }

  if (error) {
    return <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200 mt-6"><AlertTriangle className="mb-2" /> {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Farmer Dashboard</h2>
          <p className="text-gray-500 mt-1">Manage your post-harvest batches and get AI recommendations.</p>
        </div>
        <button className="bg-agrigreen-600 hover:bg-agrigreen-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm">
          <Plus size={20} /> Add Harvest Batch
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Batches</h3>
          {batches.map((batch) => (
            <div 
              key={batch.id} 
              onClick={() => setSelectedBatch(batch)}
              className={`p-5 rounded-xl border cursor-pointer transition-all ${selectedBatch?.id === batch.id ? 'border-agrigreen-500 shadow-md ring-1 ring-agrigreen-500' : 'border-gray-200 bg-white hover:border-agrigreen-300 hover:shadow-sm'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-agrigreen-100 p-2 rounded-lg text-agrigreen-700">
                    <Package size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{batch.crop_type}</h4>
                    <p className="text-sm text-gray-500">{batch.quantity_kg} kg • Grade {batch.quality_grade}</p>
                  </div>
                </div>
                {batch.status === 'AI_RECOMMENDED' ? (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-medium">AI Reviewed</span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-1 rounded-full font-medium">Pending</span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-2">
          {selectedBatch ? (
            <RecommendationCard batch={selectedBatch} />
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl h-full flex flex-col items-center justify-center p-12 text-center">
              <Package size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">Select a batch</h3>
              <p className="text-gray-400 max-w-sm">Click on any of your harvest batches on the left to view AI insights and recommendations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
