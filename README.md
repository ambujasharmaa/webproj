# Yantra - Static HTML/CSS/JS Version

A complete conversion of the Yantra Next.js project to **pure HTML/CSS/JavaScript** with no build tools, frameworks, or dependencies (except Chart.js for graphs).

## 🚀 Quick Start

### Option 1: Open Directly in Browser
Simply open `index.html` in your web browser. That's it!

```bash
cd static/
# Then open index.html in any modern web browser
```

### Option 2: Use a Local Server (Recommended)
For better experience and to avoid CORS issues:

```bash
# Using Python 3
cd static/
python3 -m http.server 8000
# Then open http://localhost:8000

# Or using Node.js
npx http-server static/

# Or using PHP
cd static/
php -S localhost:8000
```

## 📁 Project Structure

```
static/
├── index.html              # Main HTML file (entry point)
├── css/
│   ├── global.css         # Core styles and utilities
│   └── components.css     # Component styles
├── js/
│   ├── router.js          # Simple router (hash-based)
│   ├── storage.js         # LocalStorage wrapper
│   ├── api.js             # API & mock data
│   ├── components.js      # Reusable components
│   ├── app.js             # App initialization
│   └── pages/
│       ├── login.js       # Login page
│       ├── signup.js      # Signup page
│       ├── home.js        # Home/Feed page
│       └── profile.js     # Profile page
└── README.md              # This file
```

## ✨ Features

- ✅ **No build step** - Open and run immediately
- ✅ **No external dependencies** - Only Chart.js for graphs (CDN)
- ✅ **Vanilla JavaScript** - No React, Vue, or frameworks
- ✅ **Hash-based routing** - Works on any static server
- ✅ **localStorage persistence** - User data saved locally
- ✅ **Responsive design** - Works on desktop and mobile
- ✅ **Toast notifications** - User feedback system
- ✅ **Form validation** - Input validation on signup/login
- ✅ **Interactive charts** - Activity graph on profile page
- ✅ **Mock API** - Pre-configured sample data

## 🔐 Authentication

### Demo Credentials

Login page allows any username/password combination. For demo:

- **Username:** `ambuja`
- **Password:** (anything)

Or try:
- **Username:** `demo`
- **Password:** (anything)

All data is stored in browser's LocalStorage and is session-based.

## 📖 Usage Guide

### Navigation

- **Home** (`/`) - Community feed with posts and activity
- **Profile** (`/profile`) - User profile with stats and charts
- **Login** (`/login`) - Authentication page
- **Signup** (`/signup`) - Create new account

Use the header navigation or direct URLs with hash:
```
http://localhost:8000/#/login
http://localhost:8000/#/profile
http://localhost:8000/#/home
http://localhost:8000/#/signup
```

### Creating Components

To create a reusable component:

```javascript
function MyComponent(props) {
  const container = createElement('div', 'my-class');
  
  const title = createElement('h1', 'text-2xl font-bold', 'Hello World');
  container.appendChild(title);
  
  return container;
}
```

### Creating Pages

To create a new page:

```javascript
function MyPage() {
  const container = createElement('div', 'flex flex-col');
  
  // Build your page
  container.appendChild(Header());
  container.appendChild(createElement('h1', 'text-3xl', 'My Page'));
  
  return container;
}

// Register the route
Router.register('/mypage', MyPage);
```

### Using Storage

```javascript
// Save data
Storage.setItem('myKey', { some: 'data' });

// Get data
const data = Storage.getItem('myKey');

// User management
Storage.setUser(userData);
Storage.setToken(authToken);
Storage.isLoggedIn(); // true/false
Storage.logout();
```

### Using API

```javascript
// Login
API.login(username, password).then(response => {
  console.log(response.user);
});

// Get user
API.getUser(userId).then(response => {
  console.log(response.user);
});

// Create post
API.createPost(content).then(response => {
  console.log(response.post);
});

// Show notifications
API.showToast('Success!', 'success');
API.showToast('Error occurred', 'error');
```

## 🎨 Styling

This project uses a utility-first CSS approach similar to Tailwind, but as plain CSS classes:

```html
<div class="flex gap-4 p-6 rounded-lg shadow">
  <div class="w-32 h-32 rounded-full"></div>
  <div class="flex-1">
    <h1 class="text-2xl font-bold">Title</h1>
    <p class="text-gray-600">Subtitle</p>
  </div>
</div>
```

### Common Classes

**Flexbox:**
- `flex` `flex-col` `gap-1` through `gap-6`
- `items-center` `items-start` `justify-center` `justify-between`

**Spacing:**
- `p-4` `px-6` `py-8` `pt-4` `mt-4` `mb-4`

**Typography:**
- `text-base` `text-sm` `text-lg` `text-2xl` `text-3xl`
- `font-medium` `font-semibold` `font-bold`
- `text-gray-400` `text-gray-600`

**Components:**
- `btn btn-primary` `btn btn-secondary` `btn btn-danger`
- `card` `badge badge-primary`
- `avatar` `avatar-sm` `avatar-lg`
- `form-input` `form-textarea` `form-checkbox`

**Display:**
- `hidden` `block` `inline-block` `grid grid-cols-2`

See `css/global.css` and `css/components.css` for all available classes.

## 🔄 Routing

The router is hash-based, meaning URLs work like:
- `http://localhost:8000/#/home`
- `http://localhost:8000/#/profile`
- `http://localhost:8000/#/login`

Navigate programmatically:
```javascript
Router.navigate('/home');
Router.go('/profile');
```

## 💾 Data Persistence

All user data is stored in browser's LocalStorage:
- User profile
- Authentication token
- Custom data

Data persists between page refreshes but is cleared on browser cache clear.

## 🔌 Extending the App

### Add a New Page

1. Create `js/pages/mypage.js`:
```javascript
function MyPage() {
  const container = createElement('div');
  // Build your page
  return container;
}
Router.register('/mypage', MyPage);
```

2. Add script reference in `index.html`:
```html
<script src="js/pages/mypage.js"></script>
```

### Add New CSS

Add classes to `css/components.css` or `css/global.css`.

### Add API Endpoints

Add mock methods to `API` class in `js/api.js`:
```javascript
static async getMyData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: [] });
    }, 500);
  });
}
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires ES6 JavaScript support.

## 🚀 Performance

- **Zero build time** - Open instantly
- **No transpilation** - Native JavaScript
- **Minimal dependencies** - Only Chart.js from CDN
- **Small bundle size** - ~30KB of custom code
- **Fast loading** - No framework overhead

## ⚠️ Limitations

- No backend integration (all data is mock/local)
- No real-time sync across tabs
- Limited to browser's localStorage capacity (~5MB)
- Hash routing (not traditional URLs)

## 🎓 Learning Resources

This project demonstrates:
- Vanilla JavaScript DOM manipulation
- Component architecture without frameworks
- Client-side routing
- Form handling and validation
- localStorage API usage
- Chart.js integration
- CSS utility-first design
- Mock API patterns

Perfect for learning web development fundamentals!

## 📝 License

This is a demonstration project.

## 🤝 Contributing

Want to extend this? Just edit the files and refresh your browser!

---

**Made with ❤️ - Pure HTML, CSS, and JavaScript**
