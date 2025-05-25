"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "../../../utils/axiosInstance";

interface Project {
  id: number;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
}

export default function SellerDashboardPage() {
  const [openProjects, setOpenProjects] = useState<Project[]>([]);
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res1 = await axios.get(
          `${process.env.BACK_END}/api/project/projects/open`,
          {
            withCredentials: true,
          }
        );
        const res2 = await axios.get(
          `${process.env.BACK_END}/api/project/projects/my`,
          {
            withCredentials: true,
          }
        );

        setOpenProjects(res1.data);
        setMyProjects(res2.data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleLogout = () => {
    router.push("/logout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 p-6 text-white">
      <div className="max-w-5xl mx-auto space-y-12 relative">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold mb-6">📋 Seller Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Link
              href="/seller/bids"
              className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full font-semibold shadow-lg"
            >
              View All Your Bids
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition text-white font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading projects...</div>
        ) : (
          <>
            {/* Open Projects Section */}
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-semibold mb-4">
                🟢 Open Projects to Bid
              </h2>
              {openProjects.length === 0 ? (
                <p>No open projects at the moment.</p>
              ) : (
                <ul className="space-y-4">
                  {openProjects.map((project) => (
                    <li
                      key={project.id}
                      className="bg-white/10 border border-white/20 rounded-xl p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <div>
                          <h3 className="text-xl font-bold">{project.title}</h3>
                          <p className="text-white/70">
                            Budget: ${project.budgetMin} - ${project.budgetMax}
                          </p>
                          <p className="text-white/50 text-sm">
                            Deadline:{" "}
                            {new Date(project.deadline).toLocaleDateString()}
                          </p>
                          <p className="text-white/50 text-sm">
                            Status: {project.status}
                          </p>
                        </div>
                        <div className="flex space-x-4">
                          <Link
                            href={`/seller/projects/${project.id}`}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full font-semibold"
                          >
                            View & Place Bid
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Seller's Own Projects */}
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-semibold mb-4">
                🚧 Your Ongoing Projects
              </h2>
              {myProjects.length === 0 ? (
                <p>You have no active projects.</p>
              ) : (
                <ul className="space-y-4">
                  {myProjects.map((project) => (
                    <li
                      key={project.id}
                      className="bg-white/10 border border-white/20 rounded-xl p-4"
                    >
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <div>
                          <h3 className="text-xl font-bold">{project.title}</h3>
                          <p className="text-white/70">
                            Deadline:{" "}
                            {new Date(project.deadline).toLocaleDateString()}
                          </p>
                          <p className="text-white/50 text-sm">
                            Status: {project.status}
                          </p>
                        </div>
                        <div className="flex space-x-4">
                          <Link
                            href={`/seller/projects/${project.id}`}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold"
                          >
                            View Details
                          </Link>
                          <Link
                            href={`/seller/projects/${project.id}/deliverable`}
                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-full font-semibold"
                          >
                            Deliverable
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
