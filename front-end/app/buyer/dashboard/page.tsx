'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from '../../../utils/axiosInstance';

interface Project {
  id: number
  title: string
  description: string
  budgetMin: number
  budgetMax: number
  deadline: string
}

export default function BuyerDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_END}/api/project/projects`, { withCredentials: true })
        setProjects(res.data.project)
      } catch (err) {
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleLogout = () => {
    router.push('/logout')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading projects...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-600 via-purple-500 to-pink-400 p-10 text-white">
      <div className="max-w-4xl mx-auto relative">
        <h1 className="text-4xl font-bold mb-6">👤 Buyer Dashboard</h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-0 right-0 mt-4 mr-4 bg-white/20 px-4 py-2 cursor-pointer rounded-lg hover:bg-white/30 transition text-white font-medium"
        >
          Logout
        </button>

        <div className="mb-8">
          <Link
            href="/buyer/projects/new"
            className="inline-block bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition text-white font-medium"
          >
            ➕ Create a New Project
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="text-white/70">You haven’t created any projects yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg space-y-2"
              >
                <h2 className="text-2xl font-semibold">{project.title}</h2>
                <p className="text-white/80">{project.description}</p>
                <p className="text-white/70">
                  💰 Budget: ${project.budgetMin} - ${project.budgetMax}
                </p>
                <p className="text-white/70">
                  ⏳ Deadline: {new Date(project.deadline).toLocaleDateString()}
                </p>

                <div className="space-y-1 pt-2">
                  <Link
                    href={`/buyer/projects/${project.id}`}
                    className="block underline text-white hover:text-blue-300"
                  >
                    📄 View Project Details
                  </Link>
                  <Link
                    href={`/buyer/projects/${project.id}/bids`}
                    className="block underline text-white hover:text-blue-300"
                  >
                    📨 View Bids
                  </Link>
                  <Link
                    href={`/buyer/projects/${project.id}/deliverable`}
                    className="block underline text-white hover:text-blue-300"
                  >
                    📦 View Deliverables
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
