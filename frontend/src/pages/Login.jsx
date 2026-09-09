import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';
import { Lock, User } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('farmer@demo.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await auth.login(email, password);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('userEmail', email);
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Login failed. Please check credentials or ensure the production backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-agrigreen-600 px-8 py-10 text-white text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-agrigreen-100">Sign in to your KrishiSetu account</p>
      </div>
      <div className="p-8">
        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email / Phone</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-agrigreen-500 focus:border-transparent transition-colors"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-agrigreen-500 focus:border-transparent transition-colors"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-agrigreen-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-agrigreen-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-agrigreen-500 transition-colors disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 text-center mb-4">Demo Accounts:</p>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <button onClick={() => setEmail('farmer@demo.com')} className="text-left hover:text-agrigreen-600 font-medium">🧑‍🌾 Farmer (farmer@demo.com)</button>
            <button onClick={() => setEmail('processor@demo.com')} className="text-left hover:text-agrigreen-600 font-medium">🏭 Processor (processor@demo.com)</button>
            <button onClick={() => setEmail('admin@demo.com')} className="text-left hover:text-agrigreen-600 font-medium">🛡️ Admin (admin@demo.com)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
