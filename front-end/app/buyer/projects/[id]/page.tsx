'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from '../../../../utils/axiosInstance'

interface Bid {
  id: string
  sellerName: string
  amount: number
  estimatedTime: string
  message: string
  sellerId: string
}

interface Project {
  id: string
  title: string
  description: string
  budgetMin: number
  budgetMax: number
  deadline: string
  status: string
  deliverableUrl?: string
  bids: Bid[]
}

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/project/projects/${id}`, {
          withCredentials: true,
        })
        setProject(res.data.project)
      } catch (err) {
        console.error('Error fetching project:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [id])

  const markAsCompleted = async () => {
    setCompleting(true)
    try {
      await axios.put(
        `http://localhost:5000/api/project/projects/${id}/status`,
        { status: 'COMPLETED' },
        { withCredentials: true }
      )
      router.refresh()
    } catch (err) {
      console.error('Failed to mark as completed:', err)
      alert('Failed to mark as completed')
    }
    setCompleting(false)
  }

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center text-white">Loading...</div>
  }

  if (!project) {
    return <div className="min-h-screen flex justify-center items-center text-white">Project not found.</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-600 via-purple-500 to-pink-400 p-6 flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 text-white">
          <h1 className="text-3xl font-bold mb-4">Project: {project.title}</h1>
          <p className="text-white/70 mb-4">{project.description}</p>
          <p className="text-white/60 mb-2">
            💰 Budget: ${project.budgetMin.toLocaleString()} - ${project.budgetMax.toLocaleString()}
          </p>
          <p className="text-white/60 mb-6">
            📅 Deadline: {new Date(project.deadline).toLocaleDateString()}
          </p>

          {project.deliverableUrl && (
            <div className="bg-white/20 p-6 rounded-xl border border-white/20 mb-6">
              <h2 className="text-xl font-semibold mb-3">📁 Project Deliverable</h2>

              {project.deliverableUrl.endsWith('.pdf') ? (
                <iframe
                  src={project.deliverableUrl}
                  className="w-full h-96 rounded-md border border-white/30"
                ></iframe>
              ) : (
                <a
                  href={project.deliverableUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 underline hover:text-blue-400"
                >
                  Download Deliverable
                </a>
              )}
            </div>
          )}

          {project.status !== 'Completed' ? (
            <button
              onClick={markAsCompleted}
              disabled={completing}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all"
            >
              {completing ? 'Completing...' : 'Mark as Completed'}
            </button>
          ) : (
            <p className="text-green-300 font-semibold mt-4">
              ✅ Project already marked as Completed.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
