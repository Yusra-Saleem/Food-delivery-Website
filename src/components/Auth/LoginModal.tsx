import React from 'react'

export default function LoginModal({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: () => void }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-lg font-bold mb-2">Login Required</h2>
        <p className="mb-4">Please login or sign up to continue.</p>
        <button className="bg-spice-orange-500 text-white px-4 py-2 rounded mr-2" onClick={onLogin}>Login</button>
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}