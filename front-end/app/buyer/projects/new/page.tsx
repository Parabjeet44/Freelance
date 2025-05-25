"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../../utils/axiosInstance";

export default function NewProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    budgetMin: "",
    budgetMax: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/project/projects",
        {
          title: form.title,
          description: form.description,
          budgetMin: parseFloat(form.budgetMin),
          budgetMax: parseFloat(form.budgetMax),
          deadline: form.deadline,
        },
        {
          withCredentials: true,
        }
      );

      router.push("/buyer/dashboard");
    } catch (error: any) {
      console.error("Error posting project:", error);
      alert(
        error.response?.data?.message || error.message || JSON.stringify(error)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-600 via-pink-500 to-red-400 px-4 py-10 flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 text-white">
          <h1 className="text-3xl font-bold mb-6 drop-shadow">
            📝 Post a New Project
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-1">Project Title</label>
              <input
                type="text"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea
                name="description"
                required
                rows={4}
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm mb-1">Budget Min ($)</label>
                <input
                  type="number"
                  name="budgetMin"
                  required
                  value={form.budgetMin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm mb-1">Budget Max ($)</label>
                <input
                  type="number"
                  name="budgetMax"
                  required
                  value={form.budgetMax}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Project Deadline</label>
              <input
                type="datetime-local"
                name="deadline"
                required
                value={form.deadline}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-purple-700 font-semibold py-3 rounded-full hover:bg-purple-100 transition-all shadow"
            >
              {loading ? "Posting..." : "Submit Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
