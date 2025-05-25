'use client'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-600 via-pink-500 to-red-400 flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/10 p-10 rounded-3xl shadow-2xl max-w-3xl w-full border border-white/20 text-center text-white">
        <h1 className="text-4xl font-bold drop-shadow mb-6">
          Welcome to Project BidHub 🚀
        </h1>
        <p className="text-lg text-white/80 mb-8">
          Connect Buyers and Sellers through project bidding, collaboration, and delivery.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
            <h2 className="text-2xl font-semibold mb-4">I am a Buyer 👤</h2>
            <p className="mb-4 text-sm text-white/70">
              Post new projects, review bids, and manage delivery.
            </p>
            <button
              onClick={() => router.push('/register')}
              className="bg-white text-purple-600 font-semibold cursor-pointer py-2 px-4 rounded-full hover:bg-purple-100 transition-all shadow"
            >
              Post a Project
            </button>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
            <h2 className="text-2xl font-semibold mb-4">I am a Seller 💼</h2>
            <p className="mb-4 text-sm text-white/70">
              Browse projects, submit bids, and upload deliverables.
            </p>
            <button
              onClick={() => router.push('/register')}
              className="bg-white text-pink-600 font-semibold cursor-pointer py-2 px-4 rounded-full hover:bg-pink-100 transition-all shadow"
            >
              View Projects
            </button>
          </div>
        </div>

        <button onClick={()=>router.push('/login')} className="bg-white text-blue-600 font-semibold cursor-pointer py-2 px-4 rounded-full hover:bg-blue-100 transition-all shadow mt-6">Log in</button>
      </div>
    </div>
  )
}
