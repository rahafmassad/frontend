# Makeup Muse Frontend (React)

This is the **frontend** for Makeup Muse — a creative and interactive makeup-sharing platform built with *React + Vite*.

## Description

Makeup Muse is a beauty-focused web app that allows users to explore, share, and save makeup content. It supports two main types of users:

- **Regular Users**:
  - Create and browse makeup posts
  - Like content
  - Save favorite content to their profile
  - Chat with other users

- **Admins**:
  - View all users and content
  - Delete inappropriate content
  - Remove users when needed

Authentication is powered by **Auth0**, enabling secure login and role-based authorization. All user actions are persisted via a PostgreSQL-backed Express API.

## User Requirements

1. **Login or Sign Up** using Auth0
2. On sign-up, choose your role: `user` or predefined `admin`
3. **Regular Users** can:
   - Create content (image + title + description)
   - Search for content and users
   - Save/unsave content
   - Update their profile
   - Start conversations with others
4. **Admin Users** can:
   - View all users and posts
   - Delete content or users directly from admin panels
5. The app supports real-time chat and saves sessions using `localStorage`

## Technologies

- React 18
- Vite
- React Router DOM
- React-Bootstrap (for responsive design)
- Auth0 (authentication/authorization)
- Fetch API
- LocalStorage (session persistence)

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Make sure the backend server is running at `http://localhost:5000`.

## Folder Structure

```
/src
├── assets/              # Images and logos
├── components/          # Reusable UI components
│   ├── Sidebar.jsx
│   ├── Content.jsx
│   ├── AdminSidebar.jsx
│   ├── UserSearch.jsx
│   ├── AdminSearch.jsx
│   └── Users.jsx
├── pages/               # Pages like Home, Profile, Create, Chat
│   ├── Home.jsx
│   ├── Profile.jsx
│   ├── Create.jsx
│   ├── Chat.jsx
│   ├── EditProfile.jsx
│   ├── AdminUsers.jsx
│   ├── AdminContent.jsx
│   ├── Signin.jsx
│   ├── Signup.jsx
│   └── Welcome.jsx
├── style/               # CSS styling files
├── App.jsx
└── main.jsx
```

> Additional UI components like `EditProfile`, `AdminSidebar`, `UserSearch`, and styling files (`*.css`) are used to enhance usability, layout responsiveness, and support admin/user workflows.

## API Integration

- Internal API: Express-based backend (e.g., `/api/users`, `/api/content`)
- Third-party API: [Makeup API](http://makeup-api.herokuapp.com/api/v1/products.json) used to fetch real product data

## Authentication

- Auth0 is used to:
  - Manage user login/signup
  - Issue secure access tokens (JWT)
  - Authorize based on user role (`user`, `admin`)

## Deployment

This app is intended to be deployed separately from the backend:
- Frontend: [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/)
- Backend: [Render](https://render.com/) or [Railway](https://railway.app/)

Ensure to configure the `.env` for both projects appropriately and link frontend calls to the deployed backend API base URL.

## Notes

- Designed with accessibility and responsiveness in mind
- Clean UI with warm pink-white theme matching beauty branding
- GitHub Repository:
  - [Frontend](https://github.com/rahafmassad/frontend.git)
