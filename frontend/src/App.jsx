import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Leaf } from 'lucide-react';
import './i18n';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <nav className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-2">
                <Leaf className="text-agrigreen-600" size={28} />
                <span className="text-xl font-bold text-gray-900 tracking-tight">KrishiSetu</span>
                <span className="bg-agrigreen-100 text-agrigreen-800 px-2.5 py-0.5 rounded-full text-xs font-semibold ml-2">Demo Mode</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
