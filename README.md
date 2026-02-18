<h2 align="center">SmartMark – Intelligent Bookmark Management</h2>

<div align="center">

![SmartMark Banner](https://img.shields.io/badge/SmartMark-Bookmark%20Manager-667eea?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge\&logo=next.js)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge\&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e?style=for-the-badge\&logo=supabase)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Your Digital Sanctuary for Knowledge

A modern AI-enhanced bookmark manager built with Next.js, Supabase, and React.
Organize, search, and manage bookmarks with a professional interface, secure authentication, and real-time synchronization.

</div>

---

## Overview

SmartMark is a full-stack bookmark management application designed for productivity, knowledge organization, and seamless access across devices. It integrates secure Google authentication, cloud database storage, responsive UI design, and real-time updates.

The project focuses on simplicity, performance, security, and modern UI experience.

---

## Screenshots

<div align="center">

### Login Page
<img src="images/dashboard.png" width="800"/>

<br><br>

### Dashboard Page
<img src="images/login.png" width="800"/>

</div>

---

## Features

### Core Features

* Secure Google OAuth authentication via Supabase
* Real-time bookmark synchronization
* Fast bookmark search functionality
* Bookmark add, delete, and management system
* Responsive UI supporting desktop and mobile devices
* Clean modern landing page and dashboard

### Advanced Features

* AI-powered tag suggestions (planned enhancement)
* Bookmark analytics dashboard
* Grid and list viewing modes
* Automatic favicon extraction
* Backup/export capability
* Privacy-focused secure storage

### UI/UX Features

* Gradient modern interface
* Glassmorphism design components
* Smooth animations and transitions
* Modal popup information panels
* Responsive layout system
* Micro-interactions and hover effects

---

## 🔴 Live Demo

👉 [![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=flat-square)](https://smart-bookmark-theta-nine.vercel.app)

---

## Local Setup

Clone the repository:

```bash
git clone https://github.com/yourusername/smartmark.git
cd smartmark
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Access locally:

```
http://localhost:3000
```

---

## Tech Stack

### Frontend

* Next.js 15 (App Router)
* React 18
* Styled JSX and modern CSS
* Responsive UI design

### Backend

* Supabase Backend as a Service
* PostgreSQL database
* Real-time subscriptions
* Row Level Security policies

### Authentication

* Google OAuth 2.0 integration
* Secure session management
* Automatic token refresh

### Deployment

* Vercel (recommended platform)
* Netlify optional deployment

---

# Architecture Diagrams

## System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser] -->|HTTPS| B[Next.js App]
        B --> C[Landing Page]
        B --> D[Dashboard]
        B --> E[Auth Pages]
    end
    
    subgraph "Application Layer"
        C -->|Google OAuth| F[Supabase Auth]
        D -->|API Calls| G[Supabase Client]
        E -->|Session Check| F
    end
    
    subgraph "Backend Services - Supabase"
        F -->|JWT Tokens| H[Authentication]
        G -->|REST API| I[PostgreSQL Database]
        H -->|User Sessions| I
        I -->|Real-time| J[Realtime Engine]
        J -->|WebSocket| D
    end
    
    subgraph "External Services"
        F -->|OAuth 2.0| K[Google Identity]
        D -->|Favicon API| L[Google Favicon Service]
    end
    
    style A fill:#667eea,stroke:#764ba2,color:#fff
    style B fill:#61dafb,stroke:#000,color:#000
    style I fill:#3ecf8e,stroke:#000,color:#fff
    style K fill:#4285f4,stroke:#000,color:#fff
```

##  Data Flow Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser
    participant N as Next.js
    participant S as Supabase
    participant G as Google OAuth
    participant D as Database

    U->>B: Visit SmartMark
    B->>N: Load Landing Page
    N->>B: Display Login UI
    
    U->>B: Click "Continue with Google"
    B->>N: Initiate OAuth
    N->>S: Request OAuth URL
    S->>G: Redirect to Google
    G->>U: Google Login Page
    U->>G: Enter Credentials
    G->>S: OAuth Callback
    S->>D: Create/Update User
    S->>N: Return Session Token
    N->>B: Redirect to Dashboard
    
    U->>B: Add Bookmark
    B->>N: Submit URL
    N->>S: Insert Bookmark
    S->>D: Save to Database
    D->>S: Confirm Save
    S-->>N: Real-time Update
    N->>B: Display New Bookmark
```

## Database Schema

```mermaid
erDiagram
    users ||--o{ bookmarks : owns
    
    users {
        uuid id PK
        string email
        string name
        string avatar_url
        timestamp created_at
        timestamp last_sign_in
    }
    
    bookmarks {
        bigint id PK
        uuid user_id FK
        text url
        text title
        text description
        text[] tags
        timestamp created_at
        timestamp updated_at
    }
```

## Component Architecture

```mermaid
graph LR
    subgraph "Pages"
        A[page.js<br/>Landing] 
        B[bookmarks/page.js<br/>Dashboard]
    end
    
    subgraph "Shared Components"
        C[Modal Component]
        D[Navigation]
        E[Footer]
    end
    
    subgraph "Features"
        F[Auth Flow]
        G[Bookmark CRUD]
        H[Search & Filter]
        I[View Toggle]
    end
    
    subgraph "Services"
        J[Supabase Client]
        K[Auth Service]
        L[Database Service]
    end
    
    A --> C
    A --> D
    A --> E
    A --> F
    
    B --> D
    B --> G
    B --> H
    B --> I
    
    F --> K
    G --> L
    H --> L
    I --> B
    
    K --> J
    L --> J
    
    style A fill:#667eea,stroke:#764ba2,color:#fff
    style B fill:#667eea,stroke:#764ba2,color:#fff
    style J fill:#3ecf8e,stroke:#000,color:#fff
```

## Authentication Flow

```mermaid
flowchart TD
    A[User Visits Site] --> B{Authenticated?}
    B -->|No| C[Show Landing Page]
    B -->|Yes| D[Redirect to Dashboard]
    
    C --> E[Click 'Continue with Google']
    E --> F[Redirect to Google OAuth]
    F --> G[User Grants Permission]
    G --> H[Google Returns to Callback]
    H --> I[Supabase Creates Session]
    I --> J[Store JWT Token]
    J --> D
    
    D --> K[Load User Bookmarks]
    K --> L[Subscribe to Realtime]
    L --> M[Display Dashboard]
    
    M --> N{User Action}
    N -->|Add Bookmark| O[Insert to DB]
    N -->|Delete Bookmark| P[Remove from DB]
    N -->|Search| Q[Filter Locally]
    N -->|Logout| R[Clear Session]
    
    O --> L
    P --> L
    R --> C
    
    style C fill:#667eea,stroke:#764ba2,color:#fff
    style D fill:#4ade80,stroke:#000,color:#000
    style I fill:#3ecf8e,stroke:#000,color:#fff
```

## Application State Flow

```mermaid
stateDiagram-v2
    [*] --> Unauthenticated
    
    Unauthenticated --> Authenticating: Click Login
    Authenticating --> Authenticated: Success
    Authenticating --> Unauthenticated: Failed
    
    Authenticated --> LoadingBookmarks: Fetch Data
    LoadingBookmarks --> DisplayingBookmarks: Data Loaded
    
    DisplayingBookmarks --> Searching: User Types
    DisplayingBookmarks --> AddingBookmark: Click Add
    DisplayingBookmarks --> DeletingBookmark: Click Delete
    DisplayingBookmarks --> TogglingView: Change View
    
    Searching --> DisplayingBookmarks: Clear Search
    AddingBookmark --> DisplayingBookmarks: Bookmark Added
    DeletingBookmark --> DisplayingBookmarks: Bookmark Deleted
    TogglingView --> DisplayingBookmarks: View Changed
    
    DisplayingBookmarks --> Unauthenticated: Logout
    Unauthenticated --> [*]
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "User Devices"
        A1[Desktop Browser]
        A2[Mobile Browser]
        A3[Tablet Browser]
    end
    
    subgraph "CDN Layer"
        B[Vercel Edge Network]
    end
    
    subgraph "Application Layer"
        C[Next.js Server<br/>SSR/SSG]
        D[Static Assets]
    end
    
    subgraph "Backend - Supabase Cloud"
        E[Auth Service]
        F[Database<br/>PostgreSQL]
        G[Realtime Service]
        H[Storage]
    end
    
    subgraph "External APIs"
        I[Google OAuth]
        J[Google Favicon API]
    end
    
    A1 --> B
    A2 --> B
    A3 --> B
    
    B --> C
    B --> D
    
    C --> E
    C --> F
    C --> G
    C --> H
    
    E --> I
    C --> J
    
    style B fill:#000,stroke:#fff,color:#fff
    style C fill:#61dafb,stroke:#000,color:#000
    style F fill:#3ecf8e,stroke:#000,color:#fff
    style I fill:#4285f4,stroke:#000,color:#fff
```

## Real-time Synchronization

```mermaid
sequenceDiagram
    participant U1 as User 1 Browser
    participant U2 as User 2 Browser
    participant S as Supabase Server
    participant D as PostgreSQL DB
    participant R as Realtime Engine

    U1->>S: Subscribe to 'bookmarks' channel
    U2->>S: Subscribe to 'bookmarks' channel
    S->>R: Register subscriptions
    
    U1->>S: Add new bookmark
    S->>D: INSERT bookmark
    D->>S: Confirm insertion
    D->>R: Trigger change event
    
    R->>U1: Broadcast: New bookmark
    R->>U2: Broadcast: New bookmark
    
    U1->>U1: Update UI (own device)
    U2->>U2: Update UI (other device)
    
    Note over U1,U2: All devices stay in sync!
```

## Feature Integration Map

```mermaid
mindmap
  root((SmartMark))
    Authentication
      Google OAuth
      Session Management
      Auto Redirect
    Bookmarks
      Add URL
      Delete
      Real-time Sync
      Favicon Display
    Search & Filter
      Live Search
      URL Matching
      Results Count
    UI Features
      Grid View
      List View
      Modals
      Animations
    Analytics
      Total Count
      Today's Count
      Usage Stats
```

## Security Architecture

```mermaid
graph TB
    subgraph "Security Layers"
        A[HTTPS Encryption]
        B[OAuth 2.0]
        C[JWT Tokens]
        D[Row Level Security]
        E[Environment Variables]
    end
    
    subgraph "Client Side"
        F[Browser] --> A
        A --> G[Next.js App]
        G --> B
    end
    
    subgraph "Authentication"
        B --> H[Google Identity]
        B --> C
        C --> I[Supabase Auth]
    end
    
    subgraph "Database"
        I --> D
        D --> J[PostgreSQL]
        J --> K[User's Data Only]
    end
    
    subgraph "Configuration"
        E --> G
        E --> I
    end
    
    style A fill:#4ade80,stroke:#000,color:#000
    style D fill:#f5576c,stroke:#000,color:#fff
    style C fill:#667eea,stroke:#000,color:#fff
```

## Performance Optimization

```mermaid
graph LR
    subgraph "Optimization Strategies"
        A[Next.js SSG] --> B[Fast Initial Load]
        C[CDN Delivery] --> D[Global Distribution]
        E[Lazy Loading] --> F[Reduced Bundle]
        G[Real-time WS] --> H[Instant Updates]
        I[Client Cache] --> J[Fewer API Calls]
    end
    
    style B fill:#4ade80,stroke:#000,color:#000
    style D fill:#4ade80,stroke:#000,color:#000
    style F fill:#4ade80,stroke:#000,color:#000
    style H fill:#4ade80,stroke:#000,color:#000
    style J fill:#4ade80,stroke:#000,color:#000
```

---


## Database Setup (Supabase)

Run the following SQL in Supabase SQL Editor:

```sql
CREATE TABLE bookmarks (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks"
  ON bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookmarks"
  ON bookmarks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX bookmarks_user_id_idx ON bookmarks(user_id);
CREATE INDEX bookmarks_created_at_idx ON bookmarks(created_at DESC);
```

---

## Environment Variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These values are available in:

Supabase Dashboard → Settings → API

---

## Google OAuth Setup

1. Enable Google provider in Supabase Authentication.
2. Configure OAuth credentials in Google Cloud Console.
3. Add redirect URLs:

Local:

```
http://localhost:3000/bookmarks
```

Production:

```
https://smart-bookmark-theta-nine.vercel.app/bookmarks
```

---

## Deployment Guide (Vercel)

1. Push project to GitHub:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to Vercel dashboard.
3. Import GitHub repository.
4. Add environment variables:

   * NEXT_PUBLIC_SUPABASE_URL
   * NEXT_PUBLIC_SUPABASE_ANON_KEY
5. Deploy project.

After deployment:

* Update Supabase redirect URLs with production domain.
* Ensure OAuth callback configuration is correct.

---

## Project Structure

```
smartmark/
│
├── app/
│   ├── page.js
│   ├── bookmarks/
│   │   └── page.js
│   ├── layout.js
│   └── globals.css
│
├── lib/
│   └── supabaseClient.js
│
├── public/
│   ├── favicon.ico
│   └── images/
│
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
└── README.md
```
## Challenges Faced & Solutions

During the development of SmartMark, several technical challenges were encountered. Below are the key issues and how they were addressed:

### 1. Google OAuth Authentication Setup
**Challenge:**  
Configuring Google OAuth with Supabase required correct redirect URLs for both local development and production deployment.

**Solution:**  
Configured Supabase Auth settings properly, added authorized redirect URIs in Google Cloud Console, and ensured environment variables were correctly set for both development and Vercel deployment.

---

### 2. Row Level Security (RLS) Implementation
**Challenge:**  
Ensuring that each user could only access their own bookmarks while maintaining database security.

**Solution:**  
Enabled Row Level Security (RLS) in Supabase and implemented policies based on `auth.uid()` so users can only view, insert, update, or delete their own data.

---

### 3. Deployment Issues on Vercel
**Challenge:**  
Handling environment variables, OAuth redirects, and production configuration during deployment.

**Solution:**  
Configured environment variables in Vercel dashboard, updated redirect URLs, and verified Supabase API integration for production use.

---

### 4. Real-time Bookmark Updates
**Challenge:**  
Ensuring bookmark updates reflect instantly without page refresh.

**Solution:**  
Used Supabase real-time subscriptions to listen for database changes and update the UI dynamically.

---

### 5. UI/UX Improvements
**Challenge:**  
Creating a modern, responsive interface while maintaining performance.

**Solution:**  
Implemented gradient backgrounds, animations, responsive layout, and optimized component styling using modern CSS practices.

---

These challenges provided valuable experience in authentication systems, secure database handling, real-time application design, and deployment workflows.

---

## Security Features

Authentication:

* Google OAuth 2.0 login
* Secure session handling
* Token auto-refresh
* Protected API routes

Database Security:

* Row Level Security enabled
* User-specific data isolation
* SQL injection protection
* Secure backend APIs

Privacy:

* HTTPS encryption
* Minimal data collection
* No data selling
* Secure cookie handling

---

## Troubleshooting

Invalid API Key:

* Verify `.env.local` file exists.
* Confirm Supabase URL and key.
* Restart development server.

OAuth Login Issues:

* Verify redirect URLs in Supabase.
* Confirm Google OAuth credentials.
* Check environment variables.

Bookmarks Not Saving:

* Ensure authentication active.
* Confirm RLS policies enabled.
* Check Supabase database logs.

Realtime Sync Issues:

* Enable Supabase realtime.
* Verify subscription code.
* Check browser console errors.

---

## Contributing

Steps to contribute:

1. Fork repository.
2. Create new branch:

```bash
git checkout -b feature-name
```

3. Make changes.
4. Commit updates:

```bash
git commit -m "Feature added"
```

5. Push branch.
6. Open Pull Request.

Code guidelines:

* Follow existing project structure.
* Maintain readable code.
* Write clear commit messages.

---

## Roadmap

Phase 1 (Completed)

* Authentication system
* Bookmark CRUD functionality
* Real-time sync
* Search system
* Responsive UI

Phase 2 (Planned)

* AI auto-tagging
* Collections/folders
* Bookmark analytics improvements
* Browser extension

Phase 3 (Future)

* Collaboration features
* Social sharing
* Mobile application
* Advanced analytics

Phase 4 (Long-term)

* Team workspace support
* API integrations
* Enterprise deployment options

---

## License

MIT License

Copyright (c) 2026 SmartMark

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to deal in the software without restriction.

The software is provided "as is", without warranty of any kind.

---

## Contact

<div align="center">

### **Kowshik BH**

[![Email](https://img.shields.io/badge/Email-kowshikbh18%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:kowshikbh18@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Kowshik%20BH-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/kowshikbh)
[![GitHub](https://img.shields.io/badge/GitHub-Kowshik--bh18-black?style=for-the-badge&logo=github)](https://github.com/Kowshik-bh18)

</div>


---

Version: 1.0.0
Status: Active Development
