"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabaseClient";

export default function Bookmarks() {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [mounted, setMounted] = useState(false);
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) location.href = "/";
      setUser(data.user);
      fetchBookmarks(data.user.id);
    });

    const channel = supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => fetchBookmarks(user?.id),
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user]);

  const fetchBookmarks = async (uid) => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", uid)
      .order("id", { ascending: false });
    setBookmarks(data || []);
  };

  const addBookmark = async () => {
    if (!url) return;
    setIsAddingBookmark(true);
    await supabase.from("bookmarks").insert({ url, user_id: user.id });
    setUrl("");
    setIsAddingBookmark(false);
  };

  const del = async (id) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // Extract domain from URL for display
  const getDomain = (url) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return domain;
    } catch {
      return url;
    }
  };

  // Get favicon from URL
  const getFavicon = (url) => {
    try {
      const domain = new URL(url).origin;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  // Filter bookmarks based on search
  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.url.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Get stats
  const stats = {
    total: bookmarks.length,
    today: bookmarks.filter((b) => {
      const today = new Date().toDateString();
      const bookmarkDate = new Date(b.created_at).toDateString();
      return today === bookmarkDate;
    }).length,
  };

  return (
    <div className="bookmarks-container">
      {/* Animated Background */}
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <div className="grid-pattern"></div>

      {/* Main Content */}
      <div className={`content ${mounted ? "mounted" : ""}`}>
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <div className="logo-container">
              <svg
                className="logo-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <span className="logo-text">SmartMark</span>
            </div>
          </div>

          <div className="header-right">
            <div className="user-info">
              <img
                src={
                  user?.user_metadata?.avatar_url ||
                  `https://ui-avatars.com/api/?name=${user?.email}&background=667eea&color=fff`
                }
                alt="User"
                className="user-avatar"
              />
              <span className="user-email">{user?.email}</span>
            </div>
            <button onClick={logout} className="logout-button">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </div>
            <div>
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Bookmarks</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <div className="stat-value">{stats.today}</div>
              <div className="stat-label">Added Today</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <div className="stat-value">100%</div>
              <div className="stat-label">Organized</div>
            </div>
          </div>
        </div>

        {/* Add Bookmark Section */}
        <div className="add-bookmark-section">
          <h2 className="section-title">Add New Bookmark</h2>
          <div className="add-bookmark-card">
            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                className="bookmark-input"
                placeholder="Paste your URL here... (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addBookmark()}
              />
              <button
                onClick={addBookmark}
                disabled={isAddingBookmark || !url}
                className="add-button"
              >
                {isAddingBookmark ? (
                  <>
                    <div className="spinner"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Bookmark
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="controls-section">
          <div className="search-box">
            <svg
              className="search-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery("")}
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="view-toggle">
            <button
              className={`view-button ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grid
            </button>
            <button
              className={`view-button ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              List
            </button>
          </div>
        </div>

        {/* Bookmarks Grid/List */}
        <div className="bookmarks-section">
          <div className="section-header">
            <h2 className="section-title">
              {searchQuery
                ? `Search Results (${filteredBookmarks.length})`
                : "Your Bookmarks"}
            </h2>
          </div>

          {filteredBookmarks.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <h3>{searchQuery ? "No bookmarks found" : "No bookmarks yet"}</h3>
              <p>
                {searchQuery
                  ? "Try a different search term"
                  : "Add your first bookmark to get started"}
              </p>
            </div>
          ) : (
            <div className={`bookmarks-${viewMode}`}>
              {filteredBookmarks.map((bookmark, index) => (
                <div
                  key={bookmark.id}
                  className="bookmark-card"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="bookmark-content">
                    <div className="bookmark-icon">
                      {getFavicon(bookmark.url) ? (
                        <img src={getFavicon(bookmark.url)} alt="" />
                      ) : (
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="bookmark-info">
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bookmark-title"
                      >
                        {getDomain(bookmark.url)}
                      </a>
                      <div className="bookmark-url">{bookmark.url}</div>
                      {bookmark.created_at && (
                        <div className="bookmark-date">
                          Added{" "}
                          {new Date(bookmark.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bookmark-actions">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-button visit"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                    <button
                      onClick={() => del(bookmark.id)}
                      className="action-button delete"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .bookmarks-container {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #0a0e27 0%,
            #1a1f3a 50%,
            #0f1729 100%
          );
          color: #ffffff;
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .background-orbs {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: float 20s infinite ease-in-out;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          top: -10%;
          left: -10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          bottom: -10%;
          right: -10%;
          animation-delay: -7s;
        }

        .orb-3 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -14s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(100px, -100px) scale(1.1);
          }
          66% {
            transform: translate(-100px, 100px) scale(0.9);
          }
        }

        .grid-pattern {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
          mask-image: radial-gradient(
            ellipse at center,
            black 0%,
            transparent 80%
          );
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .content.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          margin-bottom: 2rem;
          animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          color: #ffffff;
          filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.5));
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff 0%, #a8b3ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          backdrop-filter: blur(10px);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid rgba(102, 126, 234, 0.5);
        }

        .user-email {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .logout-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background: rgba(245, 87, 108, 0.1);
          border: 1px solid rgba(245, 87, 108, 0.3);
          border-radius: 8px;
          color: #f5576c;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-button:hover {
          background: rgba(245, 87, 108, 0.2);
          border-color: rgba(245, 87, 108, 0.5);
          transform: translateY(-2px);
        }

        .logout-button svg {
          width: 18px;
          height: 18px;
        }

        /* Stats Bar */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(102, 126, 234, 0.4);
          transform: translateY(-4px);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.2),
            rgba(118, 75, 162, 0.2)
          );
          border-radius: 12px;
        }

        .stat-icon svg {
          width: 24px;
          height: 24px;
          color: #a8b3ff;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 0.25rem;
        }

        /* Add Bookmark Section */
        .add-bookmark-section {
          margin-bottom: 2.5rem;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .add-bookmark-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(20px);
        }

        .input-group {
          display: flex;
          gap: 1rem;
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.4);
          pointer-events: none;
        }

        .input-icon svg {
          width: 20px;
          height: 20px;
        }

        .bookmark-input {
          flex: 1;
          padding: 1rem 1rem 1rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .bookmark-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(102, 126, 234, 0.5);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .bookmark-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .add-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          white-space: nowrap;
        }

        .add-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }

        .add-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .add-button svg {
          width: 20px;
          height: 20px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Controls Section */
        .controls-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
        }

        .search-box {
          flex: 1;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: rgba(255, 255, 255, 0.4);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.875rem 3rem 0.875rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #ffffff;
          font-size: 0.9375rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(102, 126, 234, 0.5);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .clear-search {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .clear-search:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }

        .clear-search svg {
          width: 20px;
          height: 20px;
        }

        .view-toggle {
          display: flex;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.375rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .view-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-button:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .view-button.active {
          color: #ffffff;
          background: rgba(102, 126, 234, 0.2);
        }

        .view-button svg {
          width: 18px;
          height: 18px;
        }

        /* Bookmarks Section */
        .bookmarks-section {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
        }

        .section-header {
          margin-bottom: 1.5rem;
        }

        .bookmarks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.25rem;
        }

        .bookmarks-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .bookmark-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeInCard 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInCard {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bookmark-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(102, 126, 234, 0.4);
          transform: translateY(-4px);
        }

        .bookmark-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }

        .bookmark-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.2),
            rgba(118, 75, 162, 0.2)
          );
          border-radius: 12px;
          flex-shrink: 0;
        }

        .bookmark-icon img {
          width: 24px;
          height: 24px;
        }

        .bookmark-icon svg {
          width: 24px;
          height: 24px;
          color: #a8b3ff;
        }

        .bookmark-info {
          flex: 1;
          min-width: 0;
        }

        .bookmark-title {
          display: block;
          font-size: 1.125rem;
          font-weight: 600;
          color: #ffffff;
          text-decoration: none;
          margin-bottom: 0.25rem;
          transition: color 0.3s ease;
        }

        .bookmark-title:hover {
          color: #a8b3ff;
        }

        .bookmark-url {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .bookmark-date {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 0.25rem;
        }

        .bookmark-actions {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .action-button {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .action-button svg {
          width: 18px;
          height: 18px;
        }

        .action-button.visit {
          color: #4ade80;
        }

        .action-button.visit:hover {
          background: rgba(74, 222, 128, 0.1);
          border-color: rgba(74, 222, 128, 0.3);
        }

        .action-button.delete {
          color: #f5576c;
        }

        .action-button.delete:hover {
          background: rgba(245, 87, 108, 0.1);
          border-color: rgba(245, 87, 108, 0.3);
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
        }

        .empty-state svg {
          width: 64px;
          height: 64px;
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 1.5rem;
          stroke-width: 1.5;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .empty-state p {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .bookmarks-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .content {
            padding: 1rem;
          }

          .header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .header-right {
            width: 100%;
            justify-content: space-between;
          }

          .stats-bar {
            grid-template-columns: 1fr;
          }

          .controls-section {
            flex-direction: column;
          }

          .input-group {
            flex-direction: column;
          }

          .add-button {
            width: 100%;
            justify-content: center;
          }

          .bookmarks-grid {
            grid-template-columns: 1fr;
          }

          .user-email {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .bookmark-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .bookmark-actions {
            width: 100%;
            justify-content: flex-end;
          }

          .stat-value {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
