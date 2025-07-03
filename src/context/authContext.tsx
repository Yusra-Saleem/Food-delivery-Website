"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'

interface UserData {
  password: string
  email: string
  contact: string
  address: string
}

interface AuthContextType {
  user: string | null
  userInfo: UserData | null
  login: (username: string, password: string) => boolean
  signup: (username: string, password: string, email: string, contact: string, address: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<UserData | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      setUser(storedUser)
      const users = JSON.parse(localStorage.getItem('users') || '{}')
      if (users[storedUser]) setUserInfo(users[storedUser])
    }
  }, [])

  const login = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    if (users[username] && users[username].password === password) {
      setUser(username)
      setUserInfo(users[username])
      localStorage.setItem('auth_user', username)
      return true
    }
    return false
  }

  const signup = (
    username: string,
    password: string,
    email: string,
    contact: string,
    address: string
  ) => {
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    if (users[username]) return false
    users[username] = { password, email, contact, address }
    localStorage.setItem('users', JSON.stringify(users))
    setUser(username)
    setUserInfo(users[username])
    localStorage.setItem('auth_user', username)
    return true
  }

  const logout = () => {
    setUser(null)
    setUserInfo(null)
    localStorage.removeItem('auth_user')
  }

  return (
    <AuthContext.Provider value={{ user, userInfo, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}