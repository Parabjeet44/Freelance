'use client'

import { useEffect, useState } from 'react'
import axios from '../../utils/axiosInstance'

type User = {
  name: string
  email: string
  role: 'buyer' | 'seller'
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${process.env.BACK_END}/api/auth/me`, {
          withCredentials: true, 
        })

        setUser(res.data.user)
      } catch (err) {
        console.error('Failed to fetch user:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-blue-500 text-white">
        Loading profile...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-blue-500 text-white">
        User not found.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 p-6 text-white">
      <div className="max-w-xl mx-auto backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/10">
        <h1 className="text-3xl font-bold mb-6">👤 Your Profile</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-white/70 mb-1">Email</label>
            <p className="bg-white/20 p-3 rounded-lg">{user.email}</p>
          </div>

          <div>
            <label className="block text-white/70 mb-1">Role</label>
            <p className="bg-white/20 p-3 rounded-lg capitalize">{user.role}</p>
          </div>

          <div>
            <label className="block text-white/70 mb-1">Name</label>
            <p className="bg-white/20 p-3 rounded-lg">{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
