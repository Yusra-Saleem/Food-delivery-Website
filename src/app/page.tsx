'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'

// Components
import Sidebar from '@/components/Navigation/Sidebar'
import HeroSection from '@/components/Hero/HeroSection'
import FeaturesSection from '@/components/Features/FeaturesSection'

import MenuSection, { menuItems } from '@/components/Menu/MenuSection'
import TestimonialGrid from '@/components/Testimonials/TestimonialGrid'
import ReservationModal from '@/components/Reservation/ReservationModal'
import CartSidebar from '@/components/Cart/CartSidebar'
import Footer from '@/components/Footer/Footer'
import PromotionsSection from '@/components/Promotions/PromotionsSection'

// Hooks
import { useCustomCursor } from '@/hooks/useCustomCursor'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useAuth } from '@/context/authContext'
import AuthModal from '@/context/authModal'

// Types
import type { CartItem } from '@/types'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [reservationModalOpen, setReservationModalOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', [
    {
      id: 1,
      name: 'Spice Fusion Bowl',
      category: 'Spicy Mains',
      price: 24.99,
      rating: 4.9,
      reviews: 234,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'Fiery noodles with premium vegetables',
      spiceLevel: 4,
      cookTime: '15-20 min',
      isVegetarian: true,
      badges: ['Popular'],
      quantity: 2,
    },
    {
      id: 2,
      name: 'Dragon Fire Curry',
      category: 'Spicy Mains',
      price: 22.50,
      rating: 4.8,
      reviews: 189,
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'Rich coconut curry with exotic spices',
      spiceLevel: 5,
      cookTime: '20-25 min',
      isVegetarian: false,
      badges: ['Chef Special'],
      quantity: 1,
    }
  ])
  const { user } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)

  // Initialize custom cursor
  useCustomCursor()

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === id)
      if (exists) {
        if (quantity === 0) {
          // Remove item if quantity is 0
          return prev.filter(item => item.id !== id)
        }
        // Update quantity
        return prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      } else {
        // Add new item from menuItems
        const menuItem = menuItems.find(item => item.id === id)
        if (!menuItem) return prev
        return [...prev, { ...menuItem, quantity }]
      }
    })
  }

  const handleRemoveItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // FAQ data
  const faqData = [
    {
      question: "How do I place an order?",
      answer: "Simply browse our menu, add your favorite dishes to the cart, and proceed to checkout. You’ll need to log in or sign up to complete your order.",
      icon: (
        <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v.01"/><path d="M12 13a4 4 0 1 0-4-4"/><circle cx="12" cy="12" r="10"/></svg>
      ),
    },
    {
      question: "Can I reserve a table online?",
      answer: "Yes! Use the “Reserve Table” button at the bottom right. You must be logged in to make a reservation.",
      icon: (
        <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 17v-2a4 4 0 0 1 8 0v2"/><circle cx="12" cy="7" r="4"/><circle cx="12" cy="12" r="10"/></svg>
      ),
    },
    {
      question: "How fast is the delivery?",
      answer: "Most orders are delivered within 30-40 minutes, depending on your location and order size.",
      icon: (
        <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      ),
    },
    {
      question: "Can I customize my order?",
      answer: "Absolutely! You can mention your preferences and spice level while adding items to your cart.",
      icon: (
        <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
      ),
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, and cash on delivery.",
      icon: (
        <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
      ),
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="bg-smoke-900 min-h-screen relative overflow-x-hidden">
      {/* Fixed Cart Button */}
      <motion.button
        onClick={() => {
          if (!user) setAuthModalOpen(true)
          else setCartOpen(true)
        }}
        className="fixed top-4 right-4 z-30 magnetic-btn glass-morphism p-3 sm:p-4 rounded-2xl shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open shopping cart"
      >
        <div className="relative">
          <ShoppingBag size={24} className="text-white" />
          {totalItems > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-spice-orange-500 text-white text-xs w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-bold"
            >
              {totalItems}
            </motion.div>
          )}
        </div>
      </motion.button>

      {/* Fixed Reservation Button */}
      <motion.button
        onClick={() => {
          if (!user) setAuthModalOpen(true)
          else setReservationModalOpen(true)
        }}
        className="fixed bottom-4 right-4 z-30 magnetic-btn bg-gradient-to-r from-spice-orange-500 to-spice-orange-600 text-white px-4 sm:px-6 py-3 rounded-2xl font-semibold shadow-lg text-sm sm:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Reserve Table
      </motion.button>

      {/* Sidebar & Layout */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <motion.main
        className="transition-transform duration-300 max-w-7xl mx-auto px-4 w-full"
        style={{ minHeight: '100vh' }}
      >
        <section id="hero"><HeroSection /></section>
        <section id="features"><FeaturesSection /></section>
        <section id="menu">
          <MenuSection
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </section>
        <section id="testimonials"><TestimonialGrid /></section>
          {/* Promotions Section */}

           <section id="promotions"><PromotionsSection /></section>

        {/* FAQ Section - Accordion Style */}
        <section id="faq" className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-white/70 text-base sm:text-lg font-medium">
                Everything you need to know about UrbanSpice food delivery and reservations.
              </p>
            </div>
            <div className="space-y-4">
              {faqData.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl shadow-xl border border-white/10 transition-transform hover:scale-[1.02]"
                >
                  <button
                    className="w-full flex items-center gap-4 p-6 focus:outline-none"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    aria-expanded={openIndex === idx}
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-spice-orange-500 to-spice-orange-700 flex items-center justify-center shadow">
                      {faq.icon}
                    </span>
                    <span className="flex-1 text-left font-semibold text-white text-lg">{faq.question}</span>
                    <span className="ml-2 transition-transform" style={{ transform: openIndex === idx ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                      <svg width="22" height="22" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openIndex === idx && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-white/90 text-base">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>


      
        {/* End FAQ Section */}

        <section id="footer"><Footer /></section>
      </motion.main>

      {/* Modals & Sidebars */}
      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
      />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  )
}

// Add this animation to your global CSS (optional for fade-in effect)
// .animate-fadeIn { animation: fadeIn 0.3s; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: none; } }