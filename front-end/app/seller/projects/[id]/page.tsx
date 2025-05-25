'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from '../../../../utils/axiosInstance'

interface Project {
  id: string
  title: string
  description: string
  budget: string
  deadline: string
  status: string
}

export default function ProjectDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id: string }

  const [project, setProject] = useState<Project | null>(null)
  const [hasBid, setHasBid] = useState(false)
  const [loading, setLoading] = useState(true)

  const [amount, setAmount] = useState('')
  const [time, setTime] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fix: Use the correct endpoint for project details
        const projectRes = await axios.get(`${process.env.NEXT_PUBLIC_BACK_END}/api/bid/projects/${id}/details`, {
          withCredentials: true
        })
        setProject(projectRes.data)

        // Fix: Use the correct endpoint for bid status
        const bidStatusRes = await axios.get(`${process.env.NEXT_PUBLIC_BACK_END}/api/bid/projects/${id}/hasBid`, {
          withCredentials: true
        })
        setHasBid(bidStatusRes.data.hasBid)

        setLoading(false)
      } catch (err) {
        console.error('Error fetching project details:', err)
        setLoading(false)
      }
    }

    if (id) {
      fetchDetails()
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Fix: Include projectId in the request body
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_END}/api/bid/bids`, {
        projectId: id, // Add this line
        amount,
        estimatedTime: time, // Fix: use estimatedTime to match backend
        message,
      }, {
        withCredentials: true // Add credentials
      })

      if (res.status === 200 || res.status === 201) {
        alert('Bid submitted successfully!')
        setHasBid(true)
        // Clear form
        setAmount('')
        setTime('')
        setMessage('')
      } else {
        alert('Failed to submit bid.')
      }
    } catch (err: any) {
      console.error('Error submitting bid:', err)
      const errorMessage = err.response?.data?.message || 'Something went wrong.'
      alert(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const goToMyBids = () => {
    router.push('/seller/bids') 
  }

  const goToDashboard = () => {
    router.push(`/seller/dashboard`)
  }

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>
  if (!project) return <div className="text-red-500 text-center mt-10">Project not found.</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 p-6 text-white">
      <div className="flex justify-between items-center max-w-3xl mx-auto mb-4">
        <button
          onClick={goToMyBids}
          className="bg-yellow-400 text-black font-semibold px-4 cursor-pointer py-2 rounded-xl hover:bg-yellow-500 transition"
        >
          🧾 My Bids
        </button>

        <button
          onClick={goToDashboard}
          className="bg-green-400 text-black font-semibold px-4 py-2  cursor-pointer rounded-xl hover:bg-green-500 transition"
        >
          🧾 Go to dashboard
        </button>
      </div>

      <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/10 rounded-3xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <p className="text-white/80 mb-4">{project.description}</p>

        <div className="mb-6">
          <p className="text-white/70">💰 Budget: {project.budget}</p>
          <p className="text-white/70">📅 Deadline: {project.deadline}</p>
          <p className="text-white/70">📌 Status: {project.status}</p>
        </div>

        {hasBid ? (
          <div className="p-4 bg-green-500/20 border border-green-300/30 rounded-xl">
            <p className="text-green-200 font-semibold">✅ You've already placed a bid on this project.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10"
          >
            <h2 className="text-2xl font-semibold mb-2">📝 Place Your Bid</h2>

            <div>
              <label className="block mb-1 text-white/80">Bid Amount (in USD)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="1"
                step="0.01"
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-purple-400"
                placeholder="Enter your bid amount"
              />
            </div>

            <div>
              <label className="block mb-1 text-white/80">Estimated Completion Time (in days)</label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                min="1"
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-purple-400"
                placeholder="Enter estimated days"
              />
            </div>

            <div>
              <label className="block mb-1 text-white/80">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-purple-400"
                placeholder="Describe your approach and why you're the best fit for this project..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 rounded-xl font-bold bg-purple-500 hover:bg-purple-600 disabled:bg-purple-700 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? 'Submitting...' : 'Submit Bid'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}