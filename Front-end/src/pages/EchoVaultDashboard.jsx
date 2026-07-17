import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/EchoCard";
import CalendarInput from "../components/EchoCalanderInput";
import { BACKEND_URL } from "../components/config";

function Dashboard() {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", message: "", unlockAt: "" });
  const [creating, setCreating] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Not logged in!");
        window.location.href = "/login";
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContentList(response.data.content || []);
      setLoading(false);
    } catch (error) {
      setError("Failed to load content");
      setLoading(false);
    }
  }

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    try {
      const token = localStorage.getItem("token");
      const local = new Date(form.unlockAt);
      const utc = new Date(form.unlockAt).toISOString();

      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          ...form,
          unlockAt: utc,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setForm({ title: "", message: "", unlockAt: "" });
      setShowForm(false);
      fetchContent();
    } catch (err) {
      alert("Error creating card");
    }
    setCreating(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-magical-gold border-t-vintage-ink rounded-full animate-spin mb-4"></div>
          <p className="text-vintage-ink font-serif italic text-lg">Unlocking the vault...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-transparent p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 border-b-2 border-magical-gold/30 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-vintage-ink mb-2 drop-shadow-sm">
              Your Secret Vault
            </h1>
            <p className="text-vintage-ink/80 italic text-sm sm:text-base font-serif">
              Messages from your past self, sealed until the time is right...
            </p>
          </div>
          <button
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-vintage-ink text-[#f5deb3] font-serif hover:bg-[#5a252b] border border-magical-gold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            onClick={() => setShowForm(true)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Card
          </button>
        </div>

        {contentList.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-vintage-ink mb-2">
              The Vault is Empty
            </h3>
            <p className="text-vintage-ink/70 italic mb-6 max-w-md mx-auto font-serif">
              Pen your first secret letter to send a message to your future self.
            </p>
            <button
              className="px-6 py-3 rounded-md bg-vintage-ink text-[#f5deb3] font-serif hover:bg-[#5a252b] border border-magical-gold transition-all duration-300 shadow-md"
              onClick={() => setShowForm(true)}
            >
              Create Your First Card
            </button>
          </div>
        )}

        {contentList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {contentList.map((c) => (
              <div key={c._id} className="w-full max-w-[300px]">
                <Card
                  title={c.title}
                  description={c.message}
                  unlockTime={c.unlockAt}
                />
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div
              className="w-full max-w-md bg-[#fdf8e7] rounded-sm shadow-2xl border-4 border-double border-magical-gold/50 max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-5 border-b-2 border-magical-gold/30 flex justify-between items-center bg-[#f4ecd8]">
                <h2 className="text-2xl font-serif text-vintage-ink">
                  Seal a New Letter
                </h2>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
                  onClick={() => setShowForm(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreate} className="px-6 py-6 space-y-6">
                <div>
                  <label className="block text-sm font-serif font-bold text-vintage-ink mb-2">
                    Letter Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleInput}
                    required
                    placeholder="E.g., To my future self..."
                    className="w-full px-4 py-3 bg-[#fdf8e7] rounded-sm border border-magical-gold/50 focus:border-vintage-ink focus:ring-1 focus:ring-vintage-ink focus:outline-none transition-colors font-serif"
                  />
                </div>

                <div>
                  <label className="block text-sm font-serif font-bold text-vintage-ink mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleInput}
                    required
                    placeholder="Write a message to your future self in ink..."
                    className="w-full px-4 py-3 bg-[#fdf8e7] rounded-sm border border-magical-gold/50 focus:border-vintage-ink focus:ring-1 focus:ring-vintage-ink focus:outline-none transition-colors resize-none font-serif leading-relaxed"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"></label>
                  <CalendarInput
                    name="unlockAt"
                    value={form.unlockAt}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="pt-4 border-t-2 border-magical-gold/30">
                  <button
                    type="submit"
                    disabled={creating}
                    className="w-full px-6 py-3 rounded-md bg-vintage-ink text-[#f5deb3] font-serif hover:bg-[#5a252b] border border-magical-gold disabled:bg-[#a67b80] disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-md"
                  >
                    {creating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#f5deb3] border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sealing...
                      </>
                    ) : (
                      "Apply Wax Seal"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showCardModal && activeCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div
              className="w-full max-w-md bg-[#fdf8e7] rounded-sm shadow-2xl border-4 border-double border-magical-gold/50 max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-5 border-b-2 border-magical-gold/30 flex justify-between items-center bg-[#f4ecd8]">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-700/80 mr-3 border border-green-900 shadow-[0_0_8px_rgba(22,101,52,0.5)]"></div>
                  <h3 className="text-xl font-serif font-bold text-vintage-ink">
                    {activeCard.title}
                  </h3>
                </div>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
                  onClick={() => setShowCardModal(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="px-6 py-6">
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <span className="text-sm text-vintage-ink/70 font-serif italic">
                      Message from the past:
                    </span>
                  </div>
                  <div className="bg-[#f4ecd8] rounded-sm p-5 border border-magical-gold/40 shadow-inner">
                    <p className="text-gray-900 font-serif leading-relaxed text-lg">
                      {activeCard.message}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-vintage-ink/60 mb-6 text-center font-mono tracking-widest uppercase">
                  Seal broken on{" "}
                  {new Date(activeCard.unlockAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className="px-6 py-5 border-t-2 border-magical-gold/30 bg-[#f4ecd8]">
                <button
                  className="w-full bg-vintage-ink text-[#f5deb3] py-3 px-4 rounded-md font-serif hover:bg-[#5a252b] border border-magical-gold transition-all duration-300 flex items-center justify-center shadow-md"
                  onClick={() =>
                    alert(
                      "Chat with your past self (Gemini integration coming soon!)"
                    )
                  }
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Chat with Past Self
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
