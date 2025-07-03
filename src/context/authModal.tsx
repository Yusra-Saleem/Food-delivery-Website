import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Mail, Lock, MapPin, Phone } from 'lucide-react'
import { useAuth } from '@/context/authContext'

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { login, signup } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (mode === 'login') {
      if (!login(username, password)) setError('Invalid credentials')
      else onClose()
    } else {
      if (!username || !password || !email || !address || !contact) {
        setError('All fields are required')
        return
      }
      if (!signup(username, password, email, contact, address)) setError('Username already exists')
      else onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row bg-white/10"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            style={{ maxHeight: '95vh' }}
          >
            {/* Left Branding Panel */}
            <div className="hidden sm:flex flex-col justify-center items-center bg-gradient-to-br from-spice-orange-500 to-spice-orange-700 w-1/2 p-8">
              <div className="text-3xl font-extrabold text-white tracking-widest mb-2 drop-shadow-lg">UrbanSpice</div>
              <div className="text-white/80 text-base font-semibold mb-4 text-center">Premium Food Delivery</div>
              <div className="text-white/70 text-sm text-center">
                {mode === 'login'
                  ? 'Welcome back! Please login to continue your UrbanSpice experience.'
                  : 'Sign up and enjoy exclusive UrbanSpice offers and fast delivery.'}
              </div>
            </div>
            {/* Right Form Panel */}
            <div className="w-full sm:w-1/2 bg-smoke-800 p-4 sm:p-10 flex flex-col justify-center relative overflow-y-auto"
              style={{ maxHeight: '95vh' }}>
              <button
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-white/10 transition z-10"
                onClick={onClose}
              >
                <X size={20} className="text-white" />
              </button>
              <h2 className="text-2xl font-bold text-white mb-6 text-center mt-10 sm:mt-0">
                {mode === 'login' ? 'Login to UrbanSpice' : 'Sign Up for UrbanSpice'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-spice-orange-400" />
                  <input
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-spice-orange-400"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                </div>
                {/* Password */}
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-spice-orange-400" />
                  <input
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-spice-orange-400"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                {/* Sign Up Only Fields */}
                {mode === 'signup' && (
                  <>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-spice-orange-400" />
                      <input
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-spice-orange-400"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-spice-orange-400" />
                      <input
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-spice-orange-400"
                        placeholder="Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-spice-orange-400" />
                      <input
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-spice-orange-400"
                        placeholder="Phone Number"
                        type="tel"
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}
                {error && <div className="text-red-400 text-sm">{error}</div>}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-gradient-to-r from-spice-orange-500 to-spice-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg"
                >
                  {mode === 'login' ? 'Login' : 'Sign Up'}
                </motion.button>
              </form>
              <div className="text-center mt-4">
                <button
                  className="text-spice-orange-400 hover:underline text-sm"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                >
                  {mode === 'login'
                    ? "Don't have an account? Sign Up"
                    : 'Already have an account? Login'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}