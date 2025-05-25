"use client";

import axios from "../../../../../utils/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Bid {
  id: string;
  sellerId: string;
  sellerName?: string;
  amount: number;
  estimatedTime: string;
  message: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  sellerId?: number;
}

export default function ProjectBidsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, bidsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACK_END}/api/project/projects/${id}`, {
            withCredentials: true,
          }),
          axios.get(`${process.env.NEXT_PUBLIC_BACK_END}/api/bid/projects/${id}/bids`, {
            withCredentials: true,
          }),
        ]);

        setProject(projectRes.data.project);
        setBids(bidsRes.data.bids || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleSelectSeller = async (sellerId: string) => {
    setSelecting(true);
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACK_END}/api/project/projects/${id}`,
        { sellerId },
        {withCredentials:true}
      );
      if (res.status === 200) {
        setProject(res.data.project); // Update project with new seller
        router.refresh();
      } else {
        alert("Error selecting seller");
      }
    } catch (error) {
      console.error("Select error:", error);
      alert("Error selecting seller");
    } finally {
      setSelecting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Project not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-600 via-purple-500 to-pink-400 p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 text-white">
          <h1 className="text-3xl font-bold mb-2">Bids for: {project.title}</h1>
          <p className="text-white/70 mb-6">
            Project Budget: ${project.budgetMin} - ${project.budgetMax} |
            Deadline: {new Date(project.deadline).toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mb-4">All Seller Bids</h2>

          {bids.length === 0 ? (
            <p className="text-white/70">No bids placed yet.</p>
          ) : (
            <div className="space-y-4">
              {bids.map((bid) => (
                <div
                  key={bid.id}
                  className="bg-white/20 p-5 rounded-xl border border-white/20 flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>👤 Seller:</strong>{" "}
                      {bid.sellerName || bid.sellerId}
                    </p>
                    <p>
                      <strong>💵 Bid Amount:</strong> ${bid.amount}
                    </p>
                    <p>
                      <strong>⏱ Estimated Time:</strong> {bid.estimatedTime} days
                    </p>
                    <p>
                      <strong>📝 Message:</strong> {bid.message}
                    </p>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    {project.sellerId === parseInt(bid.sellerId) ? (
                      <div className="text-green-300 font-bold">✅ Selected</div>
                    ) : project.status === "PENDING" ? (
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              `Are you sure you want to select ${
                                bid.sellerName || bid.sellerId
                              }?`
                            )
                          ) {
                            handleSelectSeller(bid.sellerId);
                          }
                        }}
                        disabled={selecting}
                        className="bg-white text-purple-700 px-4 py-2 rounded-full font-semibold hover:bg-purple-200 transition-all whitespace-nowrap"
                      >
                        {selecting ? "Selecting..." : "Select Seller"}
                      </button>
                    ) : (
                      <div className="text-gray-400">❌ Selection Closed</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
