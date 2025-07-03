'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  UtensilsCrossed,
  ShoppingBag,
  Calendar,
  Star,
  User,
  MessageCircle,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '@/context/authContext'
// Update the import path below if your AuthModal is in a different location
import AuthModal from '../../context/authModal'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const navLinks = [
  { label: 'Home', id: 'hero', icon: <Home size={18} /> },
  { label: 'Features', id: 'features', icon: <Star size={18} /> },
  { label: 'Menu', id: 'menu', icon: <UtensilsCrossed size={18} /> },
  { label: 'Testimonials', id: 'testimonials', icon: <MessageCircle size={18} /> },
  { label: 'Promotions', id: 'promotions', icon: <ShoppingBag size={18} /> },
]

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user, logout } = useAuth()
  const [authOpen, setAuthOpen] = useState(false) 

  return (
    <>
      {/* Toggle Button: Always visible */}
      <button
        className="fixed top-4 left-4 z-50 px-3 py-1 bg-spice-orange-500 text-white rounded-lg shadow-lg"
        onClick={onToggle}
        aria-label="Toggle sidebar"
        type="button"
      >
        {isOpen ? '✖' : '☰'}
      </button>
      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 z-40 h-full w-[90vw] sm:w-[270px] sm:max-w-[270px] glass-morphism border-r pb-6 border-white/10 flex flex-col overflow-y-auto"
            style={{ minWidth: 0 }}
          >
            <div className="flex flex-col h-full p-4 items-center">
              {/* Logo */}
              <div className="mb-8 mt-12 flex flex-col items-center">
                <span className="text-2xl font-extrabold text-white tracking-widest drop-shadow-lg">UrbanSpice</span>
                <p className="text-spice-orange-400 text-xs mt-1 text-center font-semibold">Premium Food Delivery</p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 w-full">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.07 }}
                    >
                      <a
                        href={`#${link.id}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-spice-orange-500/20 transition-all duration-200 font-medium text-base group"
                        onClick={onToggle}
                      >
                        <span className="text-spice-orange-500">{link.icon}</span>
                        <span>{link.label}</span>
                        <ChevronRight size={16} className="ml-auto text-white/30 group-hover:text-spice-orange-400 transition" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* User Profile */}
              <div className="border-t border-white/10 pt-8 w-full mt-8 flex flex-col items-center ">
                <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 shadow-inner w-full">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-spice-orange-400 to-spice-orange-600 flex items-center justify-center shadow-lg mb-2">
                    <User size={28} className="text-white" />
                  </div>
                  <div className="text-white font-bold text-base text-center">
                    {user ? user : 'Welcome, Guest'}
                  </div>
                  <div className="text-white/70 text-xs text-center mb-2">
                    {user ? 'UrbanSpice Member' : 'Please login to enjoy full features'}
                  </div>
                  {user ? (
                    <button
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-spice-orange-500 to-spice-orange-600 text-white font-semibold shadow hover:scale-105 transition"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-spice-orange-500 to-spice-orange-600 text-white font-semibold shadow hover:scale-105 transition"
                      onClick={() => setAuthOpen(true)}
                    >
                      Login / Sign Up
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}