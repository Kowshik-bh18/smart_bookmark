"use client";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabaseClient";

export default function Home() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // null, 'features', 'about', 'privacy', 'terms', 'contact'

  useEffect(() => {
    setMounted(true);
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = "/bookmarks";
    });
  }, []);

  const openModal = (modalType) => {
    setActiveModal(modalType);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = "unset";
  };

  const login = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/bookmarks` },
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      {/* Animated Background */}
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="grid-pattern"></div>

      {/* Main Content */}
      <div className={`content-wrapper ${mounted ? "mounted" : ""}`}>
        {/* Navigation */}
        <nav className="nav">
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
          <div className="nav-links">
            <button onClick={() => openModal("features")} className="nav-link">
              Features
            </button>
            <button onClick={() => openModal("about")} className="nav-link">
              About
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="hero">
          <div className="hero-content">
            <div className="badge">
              <span className="badge-dot"></span>
              Intelligence Meets Organization
            </div>

            <h1 className="hero-title">
              Your Digital
              <span className="gradient-text"> Sanctuary</span>
              <br />
              for Knowledge
            </h1>

            <p className="hero-description">
              Experience the next generation of bookmark management. Organize,
              discover, and curate your digital library with unparalleled
              intelligence and elegance.
            </p>

            {/* Feature Pills */}
            <div className="feature-pills">
              <div className="pill">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure Authentication
              </div>
              <div className="pill">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 7H7v6h6V7z" />
                  <path
                    fillRule="evenodd"
                    d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                    clipRule="evenodd"
                  />
                </svg>
                AI-Powered Search
              </div>
              <div className="pill">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                Lightning Fast
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={login}
              disabled={isLoading}
              className={`cta-button ${isLoading ? "loading" : ""}`}
            >
              <div className="button-content">
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="google-icon" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                    <svg
                      className="arrow"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                )}
              </div>
            </button>

            <p className="privacy-note">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Secure authentication with Google. Your privacy is our priority.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="feature-cards">
            <div className="feature-card card-1">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <h3>Smart Tags</h3>
              <p>Auto-categorize with AI</p>
            </div>

            <div className="feature-card card-2">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3>Analytics</h3>
              <p>Track your reading habits</p>
            </div>

            <div className="feature-card card-3">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3>Privacy First</h3>
              <p>End-to-end encrypted</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>
              © 2024 SmartMark. Crafted for the future of knowledge management.
            </p>
            <div className="footer-links">
              <button onClick={() => openModal("privacy")}>
                Privacy Policy
              </button>
              <button onClick={() => openModal("terms")}>
                Terms of Service
              </button>
              <button onClick={() => openModal("contact")}>Contact</button>
            </div>
          </div>
        </footer>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="modal-header">
              <h2>
                {activeModal === "features" && "Features"}
                {activeModal === "about" && "About SmartMark"}
                {activeModal === "privacy" && "Privacy Policy"}
                {activeModal === "terms" && "Terms of Service"}
                {activeModal === "contact" && "Contact Us"}
              </h2>
            </div>

            <div className="modal-body">
              {activeModal === "features" && (
                <>
                  <div className="modal-feature">
                    <div className="modal-feature-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                    <h3>Smart Tags</h3>
                    <p>
                      Automatically categorize your bookmarks with AI-powered
                      tagging. Our intelligent system analyzes the content and
                      context to organize your library efficiently.
                    </p>
                  </div>

                  <div className="modal-feature">
                    <div className="modal-feature-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3>Analytics Dashboard</h3>
                    <p>
                      Track your reading habits, most visited bookmarks, and
                      discover patterns in your browsing behavior with
                      comprehensive analytics.
                    </p>
                  </div>

                  <div className="modal-feature">
                    <div className="modal-feature-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <h3>Privacy First</h3>
                    <p>
                      End-to-end encryption ensures your bookmarks remain
                      private. We never sell your data and follow
                      industry-leading security practices.
                    </p>
                  </div>

                  <div className="modal-feature">
                    <div className="modal-feature-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <h3>Powerful Search</h3>
                    <p>
                      Find any bookmark instantly with our lightning-fast search
                      engine that understands context and searches across
                      titles, URLs, and tags.
                    </p>
                  </div>

                  <div className="modal-feature">
                    <div className="modal-feature-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                      </svg>
                    </div>
                    <h3>Export & Backup</h3>
                    <p>
                      Download your bookmarks anytime in multiple formats.
                      Automatic backups ensure you never lose your valuable
                      collection.
                    </p>
                  </div>

                  <div className="modal-feature">
                    <div className="modal-feature-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3>Cross-Device Sync</h3>
                    <p>
                      Access your bookmarks anywhere, on any device. Real-time
                      synchronization keeps everything up-to-date across all
                      your devices.
                    </p>
                  </div>
                </>
              )}

              {activeModal === "about" && (
                <>
                  <p className="modal-text">
                    <strong>SmartMark</strong> is a next-generation bookmark
                    management platform designed for modern knowledge workers.
                    We believe that managing your digital resources should be as
                    intelligent and effortless as possible.
                  </p>

                  <h3 className="modal-subtitle">Our Mission</h3>
                  <p className="modal-text">
                    To revolutionize how people organize, discover, and interact
                    with their digital knowledge. We're building tools that
                    understand your needs and adapt to your workflow.
                  </p>

                  <h3 className="modal-subtitle">Why SmartMark?</h3>
                  <ul className="modal-list">
                    <li>
                      Built by developers who understand the pain of managing
                      hundreds of bookmarks
                    </li>
                    <li>
                      Powered by cutting-edge AI technology for intelligent
                      organization
                    </li>
                    <li>
                      Privacy-focused architecture that keeps your data secure
                    </li>
                    <li>
                      Clean, intuitive interface that gets out of your way
                    </li>
                    <li>
                      Constantly evolving with new features based on user
                      feedback
                    </li>
                  </ul>

                  <h3 className="modal-subtitle">The Team</h3>
                  <p className="modal-text">
                    SmartMark is developed by a passionate team dedicated to
                    creating the best bookmark management experience. We're
                    always listening to our users and iterating to build
                    something truly exceptional.
                  </p>
                </>
              )}

              {activeModal === "privacy" && (
                <>
                  <p className="modal-text">
                    Your privacy is our top priority. This policy outlines how
                    we collect, use, and protect your information.
                  </p>

                  <h3 className="modal-subtitle">Information We Collect</h3>
                  <ul className="modal-list">
                    <li>
                      <strong>Account Information:</strong> Email address and
                      profile from Google OAuth
                    </li>
                    <li>
                      <strong>Bookmark Data:</strong> URLs, titles, and tags you
                      save
                    </li>
                    <li>
                      <strong>Usage Data:</strong> How you interact with our
                      service to improve features
                    </li>
                  </ul>

                  <h3 className="modal-subtitle">How We Use Your Data</h3>
                  <ul className="modal-list">
                    <li>
                      Provide and maintain our bookmark management service
                    </li>
                    <li>
                      Personalize your experience with smart recommendations
                    </li>
                    <li>Improve our service and develop new features</li>
                    <li>Communicate important updates and security alerts</li>
                  </ul>

                  <h3 className="modal-subtitle">Data Security</h3>
                  <p className="modal-text">
                    We implement industry-standard security measures including
                    encryption, secure authentication, and regular security
                    audits. Your bookmarks are stored securely and never sold to
                    third parties.
                  </p>

                  <h3 className="modal-subtitle">Your Rights</h3>
                  <ul className="modal-list">
                    <li>Access and download your data at any time</li>
                    <li>Delete your account and all associated data</li>
                    <li>Opt-out of analytics and tracking</li>
                    <li>Request corrections to your information</li>
                  </ul>

                  <div className="modal-contact-box">
                    <p>
                      Questions about privacy? Contact us at{" "}
                      <a href="mailto:kowshikbh18@gmail.com">
                        kowshikbh18@gmail.com
                      </a>
                    </p>
                  </div>
                </>
              )}

              {activeModal === "terms" && (
                <>
                  <p className="modal-text">
                    By using SmartMark, you agree to these terms of service.
                    Please read them carefully.
                  </p>

                  <h3 className="modal-subtitle">1. Service Usage</h3>
                  <p className="modal-text">
                    SmartMark provides bookmark management services. You may use
                    our service for personal, non-commercial purposes. We
                    reserve the right to modify or discontinue features with
                    reasonable notice.
                  </p>

                  <h3 className="modal-subtitle">
                    2. Account Responsibilities
                  </h3>
                  <ul className="modal-list">
                    <li>You must be at least 13 years old to use SmartMark</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>
                      You are responsible for all activity under your account
                    </li>
                    <li>Do not share your account with others</li>
                  </ul>

                  <h3 className="modal-subtitle">3. Acceptable Use</h3>
                  <p className="modal-text">
                    You agree not to use SmartMark for any illegal purposes, to
                    distribute malware, spam, or engage in activities that could
                    harm other users or our service.
                  </p>

                  <h3 className="modal-subtitle">4. Intellectual Property</h3>
                  <p className="modal-text">
                    SmartMark and its original content remain the property of
                    the service. Your bookmarks and data belong to you, and you
                    retain all rights to your content.
                  </p>

                  <h3 className="modal-subtitle">5. Disclaimer</h3>
                  <p className="modal-text">
                    SmartMark is provided "as is" without warranties. We strive
                    for reliable service but cannot guarantee uninterrupted
                    access or error-free operation.
                  </p>

                  <h3 className="modal-subtitle">6. Changes to Terms</h3>
                  <p className="modal-text">
                    We may update these terms periodically. Continued use of the
                    service after changes constitutes acceptance of the new
                    terms.
                  </p>
                </>
              )}

              {activeModal === "contact" && (
                <>
                  <p className="modal-text">
                    We'd love to hear from you! Whether you have questions,
                    feedback, or need support, we're here to help.
                  </p>

                  <div className="contact-methods">
                    <div className="contact-method">
                      <div className="contact-icon">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <h3>Email Support</h3>
                      <p>Get in touch via email for any inquiries</p>
                      <a
                        href="mailto:kowshikbh18@gmail.com"
                        className="contact-link"
                      >
                        kowshikbh18@gmail.com
                      </a>
                    </div>

                    <div className="contact-method">
                      <div className="contact-icon">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3>Response Time</h3>
                      <p>We aim to respond within</p>
                      <div className="response-badge">48 Hours</div>
                    </div>

                    <div className="contact-method">
                      <div className="contact-icon">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3>Support Hours</h3>
                      <p>Monday - Friday</p>
                      <div className="hours-text">9:00 AM - 6:00 PM IST</div>
                    </div>
                  </div>

                  <div className="modal-info-box">
                    <h3>Before You Reach Out</h3>
                    <p>
                      Check out our documentation and FAQs for quick answers to
                      common questions about getting started, security, and
                      features.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-container {
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

        /* Animated Background */
        .background-orbs {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 0;
          overflow: hidden;
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

        /* Grid Pattern */
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
        }

        /* Content */
        .content-wrapper {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .content-wrapper.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        /* Navigation */
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
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

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-family: inherit;
        }

        .nav-link:hover {
          color: #ffffff;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Hero Section */
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-top: 4rem;
          align-items: center;
        }

        .hero-content {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
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

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(102, 126, 234, 0.1);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #a8b3ff;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #667eea;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          background: linear-gradient(
            135deg,
            #667eea 0%,
            #764ba2 50%,
            #f093fb 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: gradientShift 4s ease infinite;
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .hero-description {
          font-size: 1.125rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
          max-width: 500px;
        }

        /* Feature Pills */
        .feature-pills {
          display: flex;
          gap: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .pill:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
        }

        .pill svg {
          width: 16px;
          height: 16px;
        }

        /* CTA Button */
        .cta-button {
          position: relative;
          width: 100%;
          max-width: 400px;
          padding: 0;
          border: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow:
            0 10px 40px rgba(102, 126, 234, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }

        .cta-button:hover:not(.loading) {
          transform: translateY(-2px);
          box-shadow:
            0 15px 50px rgba(102, 126, 234, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.2) inset;
        }

        .cta-button:active:not(.loading) {
          transform: translateY(0);
        }

        .cta-button.loading {
          cursor: not-allowed;
          opacity: 0.8;
        }

        .cta-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s ease;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          position: relative;
          z-index: 1;
        }

        .google-icon {
          width: 24px;
          height: 24px;
        }

        .arrow {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .cta-button:hover .arrow {
          transform: translateX(4px);
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

        /* Privacy Note */
        .privacy-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .privacy-note svg {
          width: 16px;
          height: 16px;
          color: #4ade80;
        }

        /* Feature Cards */
        .feature-cards {
          display: grid;
          gap: 1.5rem;
          animation: fadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .feature-card {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .feature-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(102, 126, 234, 0.4);
          transform: translateY(-4px);
        }

        .card-1 {
          animation-delay: 0.7s;
        }
        .card-2 {
          animation-delay: 0.8s;
        }
        .card-3 {
          animation-delay: 0.9s;
        }

        .card-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.2),
            rgba(118, 75, 162, 0.2)
          );
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-icon svg {
          width: 100%;
          height: 100%;
          color: #a8b3ff;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }

        .feature-card p {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }

        /* Footer */
        .footer {
          margin-top: 6rem;
          padding: 2rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          animation: fadeIn 1s ease 1s both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
        }

        .footer-links button {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: color 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          font-family: inherit;
        }

        .footer-links button:hover {
          color: rgba(255, 255, 255, 0.9);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 14, 39, 0.9);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          background: linear-gradient(135deg, #1a1f3a 0%, #0f1729 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          max-width: 700px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: rgba(255, 255, 255, 0.6);
          z-index: 10;
        }

        .modal-close:hover {
          background: rgba(245, 87, 108, 0.1);
          border-color: rgba(245, 87, 108, 0.3);
          color: #f5576c;
        }

        .modal-close svg {
          width: 20px;
          height: 20px;
        }

        .modal-header {
          padding: 2.5rem 2.5rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-header h2 {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff 0%, #a8b3ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .modal-body {
          padding: 2.5rem;
        }

        .modal-feature {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .modal-feature:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(102, 126, 234, 0.3);
        }

        .modal-feature:last-child {
          margin-bottom: 0;
        }

        .modal-feature-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.2),
            rgba(118, 75, 162, 0.2)
          );
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .modal-feature-icon svg {
          width: 24px;
          height: 24px;
          color: #a8b3ff;
        }

        .modal-feature h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }

        .modal-feature p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin: 0;
        }

        .modal-text {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .modal-subtitle {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .modal-list {
          list-style: none;
          padding: 0;
          margin-bottom: 1.5rem;
        }

        .modal-list li {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
          margin-bottom: 0.75rem;
          padding-left: 1.5rem;
          position: relative;
        }

        .modal-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.65rem;
          width: 6px;
          height: 6px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
        }

        .modal-list li strong {
          color: rgba(255, 255, 255, 0.9);
        }

        .modal-contact-box {
          margin-top: 2rem;
          padding: 1.25rem;
          background: rgba(102, 126, 234, 0.1);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 12px;
        }

        .modal-contact-box p {
          margin: 0;
          color: rgba(255, 255, 255, 0.8);
        }

        .modal-contact-box a {
          color: #a8b3ff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .modal-contact-box a:hover {
          color: #ffffff;
        }

        .contact-methods {
          display: grid;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .contact-method {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          text-align: center;
        }

        .contact-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.2),
            rgba(118, 75, 162, 0.2)
          );
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .contact-icon svg {
          width: 24px;
          height: 24px;
          color: #a8b3ff;
        }

        .contact-method h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .contact-method p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9375rem;
          margin-bottom: 0.75rem;
        }

        .contact-link {
          display: inline-block;
          color: #a8b3ff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .contact-link:hover {
          color: #ffffff;
        }

        .response-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.2),
            rgba(118, 75, 162, 0.2)
          );
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 50px;
          color: #a8b3ff;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .hours-text {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          margin-top: 0.5rem;
        }

        .modal-info-box {
          margin-top: 2rem;
          padding: 1.5rem;
          background: rgba(102, 126, 234, 0.05);
          border: 1px solid rgba(102, 126, 234, 0.2);
          border-radius: 12px;
        }

        .modal-info-box h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .modal-info-box p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin: 0;
        }

        /* Modal Scrollbar */
        .modal-content::-webkit-scrollbar {
          width: 8px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: rgba(102, 126, 234, 0.3);
          border-radius: 10px;
        }

        .modal-content::-webkit-scrollbar-thumb:hover {
          background: rgba(102, 126, 234, 0.5);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .hero-title {
            font-size: 3rem;
          }

          .feature-cards {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .footer-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .feature-pills {
            flex-direction: column;
          }

          .pill {
            width: 100%;
            justify-content: center;
          }

          .cta-button {
            max-width: 100%;
          }

          .modal-overlay {
            padding: 1rem;
          }

          .modal-content {
            max-height: 90vh;
          }

          .modal-header {
            padding: 2rem 1.5rem 1rem;
          }

          .modal-header h2 {
            font-size: 1.5rem;
          }

          .modal-body {
            padding: 1.5rem;
          }

          .modal-close {
            top: 1rem;
            right: 1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .content-wrapper {
            padding: 1rem;
          }

          .footer-links {
            flex-direction: column;
            gap: 0.5rem;
          }

          .modal-header {
            padding: 1.5rem 1rem 1rem;
          }

          .modal-body {
            padding: 1rem;
          }

          .modal-feature {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
