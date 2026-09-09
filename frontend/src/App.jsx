import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        {/* Simple header for prototype */}
        <header className="bg-agrigreen-600 text-white p-4 shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">KrishiSetu</h1>
          <div className="flex gap-4">
            <span className="bg-agrigreen-700 px-3 py-1 rounded-full text-sm font-medium">Demo Mode</span>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
