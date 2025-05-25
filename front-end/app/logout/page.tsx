'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import axios from '../../utils/axiosInstance'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_BACK_END}/api/auth/logout`) // Make sure this route exists and is connected to your Express backend
        router.push('/')
      } catch (error) {
        console.error('Logout failed:', error)
      }
    }

    logout()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-600 via-pink-500 to-purple-500 flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/10 p-10 rounded-3xl shadow-2xl max-w-xl w-full border border-white/20 text-center text-white">
        <h1 className="text-4xl font-bold drop-shadow mb-6">Logging you out...</h1>
        <p className="text-lg text-white/80 mb-4">We hope to see you again soon! 👋</p>
        <div className="loader mx-auto my-4 border-t-4 border-white rounded-full w-12 h-12 animate-spin"></div>
      </div>
    </div>
  )
}
