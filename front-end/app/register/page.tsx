'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from '../../utils/axiosInstance'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'BUYER',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await axios.post(`${process.env.BACK_END}/api/auth/register`, formData)
      router.push('/login')
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Registration failed'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-500 to-red-400 px-4">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
      >
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center drop-shadow">
          Create an Account
        </h2>

        {error && <p className="text-red-300 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-white font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            disabled={loading}
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder:text-white/70"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            disabled={loading}
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder:text-white/70"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            disabled={loading}
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder:text-white/70"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-6">
          <label className="block text-white font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            disabled={loading}
            onChange={handleChange}
            className="w-full bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="BUYER">Buyer</option>
            <option value="SELLER">Seller</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-pink-600 font-semibold py-2 rounded-lg hover:bg-pink-100 transition-all duration-300 shadow-lg"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-center text-white/80 mt-4 text-sm">
          Already registered?{' '}
          <a href="/login" className="underline hover:text-white">
            Login here
          </a>
        </p>
      </form>
    </div>
  )
}
