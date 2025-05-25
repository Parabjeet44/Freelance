"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "../../../../../utils/axiosInstance";
export default function UploadDeliverablePage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [externalLink, setExternalLink] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `${process.env.BACK_END}/api/project/projects/${projectId}`,
          { withCredentials: true }
        );
        setProject(res.data.project);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file && !externalLink) {
      setMessage("Please provide a file or a link.");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("file", file);
    if (externalLink) formData.append("link", externalLink);

    try {
      const res = await axios.post(
        `${process.env.BACK_END}/api/deliverable/projects/${projectId}/deliverables`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200 || res.status === 201) {
        router.push("/seller/bids");
      } else {
        setMessage(res.data?.message || "Failed to upload.");
      }
    } catch (err: any) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Upload failed.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-blue-500 text-white">
        Loading project...
      </div>
    );
  }

  if (!project || project.status !== "IN_PROGRESS") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-blue-500 text-white">
        Project not found or not in progress.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 p-6 text-white">
      <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/10">
        <h1 className="text-3xl font-bold mb-4">📤 Upload Deliverable</h1>
        <p className="text-white/70 mb-6">
          Project: <strong>{project.title}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Upload File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-2 bg-white/20 text-white rounded-lg file:bg-white/30 file:text-white file:border-none"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Or provide a link</label>
            <input
              type="url"
              placeholder="https://yourdeliverylink.com"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/20 focus:outline-none"
            />
          </div>

          {message && <p className="text-red-300 font-semibold">{message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg p-3 font-bold shadow-md"
          >
            Submit Deliverable
          </button>
        </form>
      </div>
    </div>
  );
}
