
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/card";

const BACKEND_URL = "http://localhost:5000";

function Dashboard() {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", message: "", unlockAt: "" });
  const [creating, setCreating] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [showCardModal, setShowCardModal] = useState(false);

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
      console.error("Error fetching content:", error);
      setLoading(false);
    }
  }

  function handleCardClick(card) {
    if (new Date(card.unlockAt) > new Date()) return;
    setActiveCard(card);
    setShowCardModal(true);
  }

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${BACKEND_URL}/api/v1/content`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      <div className="min-h-screen bg-[wheat] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
          <p className="text-black font-medium">Loading your cards...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[wheat] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
              Your Secret Cards
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Messages from your past self, unlocked when the time is right
            </p>
          </div>
          <button
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
            onClick={() => setShowForm(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            Create New Card
          </button>
        </div>

        {contentList.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">No cards yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first secret card to send a message to your future self
            </p>
            <button
              className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div 
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-black">Create New Card</h2>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
                  onClick={() => setShowForm(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreate} className="px-6 py-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleInput}
                    required
                    placeholder="Give your card a meaningful title..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleInput}
                    required
                    placeholder="Write a message to your future self..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-colors resize-none"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unlock Date & Time
                  </label>
                  <CalendarInput
                    name="unlockAt"
                    value={form.unlockAt}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={creating}
                    className="w-full px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
                  >
                    {creating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating Card...
                      </>
                    ) : (
                      "Create Card"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showCardModal && activeCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div 
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
                  <h3 className="text-lg font-bold text-black">{activeCard.title}</h3>
                </div>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
                  onClick={() => setShowCardModal(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <div className="px-6 py-6">
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    <span className="text-sm text-gray-500 font-medium">Message from Past Self</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {activeCard.message}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-gray-400 mb-6 text-center">
                  Unlocked on {new Date(activeCard.unlockAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                <button 
                  className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                  onClick={() => alert('Chat with your past self (Gemini integration coming soon!)')}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
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