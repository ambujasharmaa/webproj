# Web Dev Project

> A fully client-side web application built without frameworks or build tools.
> Developed by **Ambuja Sharma**, **Nikhil**, and **Devansh**.

---

## 📌 Overview

This project recreates the functionality of the original application using only **HTML, CSS, and vanilla JavaScript** — no React, no Next.js, no bundlers. Everything runs in the browser and persists using **localStorage**.

The only external dependency is **[Chart.js](https://www.chartjs.org/)**, loaded via CDN for rendering graphs.

---

## 🚀 Getting Started

No installation or build steps required.

### Option 1 — Open Directly in a Browser

```bash
cd static
```

Then open `index.html` in any modern browser.

---

### Option 2 — Run with a Local Server *(Recommended)*

A local server avoids browser security restrictions (e.g. CORS issues with file URLs).

**Using Python:**

```bash
cd static
python3 -m http.server 8000
```

**Using Node.js:**

```bash
npx http-server static
```

**Using PHP:**

```bash
cd static
php -S localhost:8000
```

Then visit: **http://localhost:8000**

---

## 🗂️ Project Structure

```
static/
│
├── index.html
│
├── css/
│   ├── global.css          # Base styles and utility classes
│   └── components.css      # Component-specific styles
│
├── js/
│   ├── app.js              # App entry point
│   ├── router.js           # Hash-based routing
│   ├── storage.js          # localStorage wrapper
│   ├── api.js              # Mock API layer
│   ├── components.js       # Reusable UI components
│   │
│   └── pages/
│       ├── login.js
│       ├── signup.js
│       ├── home.js
│       ├── profile.js
│       ├── events.js
│       ├── groups.js
│       ├── journal.js
│       └── resources.js
│
├── public/                 # Static assets (images, icons, SVGs)
└── README.md
```

---

## ✨ Features

- ✅ Runs entirely in the browser — no server needed
- ✅ Zero frameworks or build tools
- ✅ Hash-based client-side routing
- ✅ Data persistence via localStorage
- ✅ Login and signup with form validation
- ✅ Toast notifications for user feedback
- ✅ Interactive charts powered by Chart.js
- ✅ Responsive layout that works on mobile

---

## 🔐 Authentication

Authentication is simulated using localStorage — no real backend is involved.

Any username with any password will work for testing:

```
Username: ambuja      Password: anything
Username: demo        Password: anything
```

User session data is stored in the browser's localStorage.

---

## 🧭 Navigation

The app uses **hash-based routing**, so all URLs look like:

| Page    | URL                          |
|---------|------------------------------|
| Home    | `http://localhost:8000/#/home`    |
| Profile | `http://localhost:8000/#/profile` |
| Login   | `http://localhost:8000/#/login`   |
| Signup  | `http://localhost:8000/#/signup`  |

Programmatic navigation:

```javascript
Router.navigate('/home')
Router.go('/profile')
```

---

## 💾 Storage API

A thin wrapper around localStorage is provided via `storage.js`:

```javascript
// Store and retrieve data
Storage.setItem('key', data)
const value = Storage.getItem('key')

// User session helpers
Storage.setUser(userData)
Storage.setToken(token)
Storage.isLoggedIn()   // returns true/false
Storage.logout()
```

---

## 🔌 Mock API

`api.js` simulates async backend requests using Promises:

```javascript
// Authentication
API.login(username, password).then(response => {
  console.log(response.user)
})

// Create content
API.createPost(content).then(response => {
  console.log(response.post)
})

// Show toast notifications
API.showToast("Saved successfully!", "success")
API.showToast("Something went wrong.", "error")
```

---

## 🎨 Styling

The CSS follows a **utility-first approach** inspired by Tailwind, written from scratch:

```html
<div class="flex gap-4 p-6 rounded-lg shadow">
  <div class="w-32 h-32 rounded-full"></div>
  <div class="flex-1">
    <h1 class="text-2xl font-bold">Title</h1>
    <p class="text-gray-600">Subtitle</p>
  </div>
</div>
```

Stylesheets are located in:

| File | Purpose |
|------|---------|
| `css/global.css` | Base resets, typography, utility classes |
| `css/components.css` | Buttons, cards, modals, forms |

---

## 🌍 Browser Support

Works on all modern browsers that support ES6+:

- Chrome
- Firefox
- Edge
- Safari
- Mobile browsers (iOS & Android)

---

## ⚠️ Limitations

Since this is a fully static implementation:

- No backend — all logic runs in the browser
- Data is stored only in localStorage (not synced across devices or sessions)
- Clearing browser data will reset all stored information
- Routing relies on hash URLs (`#/page`)

---

## 👥 Authors

Built with ❤️ by:

| Name | GitHub |
|------|--------|
| Ambuja Sharma | [@ambujasharmaa](https://github.com/ambujasharmaa) |
| Nikhil | — |
| Devansh | — |
