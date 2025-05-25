'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from '../../../utils/axiosInstance'

interface Bid {
  id: string | number
  amount: number
  time?: number | string
  message: string
  project: {
    id: string | number
    title: string
    description: string
    deadline: string
    budgetMin: number
    budgetMax: number
    status: string
  }
}

export default function SellerBidsPage() {
  const [bids, setBids] = useState<Bid[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await axios.get(`${process.env.BACK_END}0/api/bid/bids/mine`, {
          withCredentials: true,
        })
        setBids(res.data.Bids)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBids()
  }, [])

  const statusColor = {
    pending: 'bg-yellow-500/20 text-yellow-300',
    selected: 'bg-green-500/20 text-green-300',
    rejected: 'bg-red-500/20 text-red-300',
    completed: 'bg-blue-500/20 text-blue-300',
    cancelled: 'bg-gray-500/20 text-gray-300',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 p-6 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">📄 My Bids</h1>

        {loading ? (
          <p className="text-white/80 text-center">Loading...</p>
        ) : bids.length === 0 ? (
          <p className="text-white/80 text-center">No bids found.</p>
        ) : (
          <div className="space-y-6">
            {bids.map((bid) => {
              const status = bid.project.status?.toLowerCase() || 'pending'
              return (
                <div
                  key={bid.id}
                  className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg border border-white/10"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-2xl font-semibold">{bid.project.title}</h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor[status as keyof typeof statusColor]}`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                  <p className="text-white/70 mb-2">
                    💰 Budget: ${bid.project.budgetMin} - ${bid.project.budgetMax} | 🗓 Deadline:{' '}
                    {new Date(bid.project.deadline).toLocaleDateString()}
                  </p>
                  <p className="mb-3 text-white/80">{bid.project.description.slice(0, 120)}...</p>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-3">
                    <p className="text-white/80">
                      💸 <strong>Your Bid:</strong> ${bid.amount} | ⏱ {bid.time || 'N/A'} days
                    </p>
                    <p className="text-white/70 mt-2 italic">“{bid.message}”</p>
                  </div>

                  <Link
                    href={`/seller/projects/${bid.project.id}`}
                    className="inline-block mt-2 text-sm font-bold text-blue-300 hover:underline"
                  >
                    🔗 View Project Details
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
