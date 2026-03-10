// Main App Entry Point

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  const isLoggedIn = Storage.isLoggedIn();

  // Initialize router with all registered pages
  Router.init('#app');

  // Handle initial routing
  if (isLoggedIn) {
    // Redirect to home if already logged in and on login page
    if (window.location.hash === '#/login' || window.location.hash === '') {
      Router.navigate('/');
    }
  } else {
    // Redirect to login if not logged in
    const currentHash = window.location.hash.slice(1) || '/';
    if (currentHash !== '/login' && currentHash !== '/signup') {
      Router.navigate('/login');
    }
  }

  // For demo purposes, set mock user
  if (!Storage.getUser()) {
    const mockUser = {
      id: '1',
      name: 'Ambuja Sharma',
      username: 'ambuja',
      bio: 'Exploring mental wellness, design, and technology 🌿',
      profilePic: 'default.jpg',
      coverPic: 'default.jpg',
      tags: ['Mindfulness', 'Self-Care', 'Growth'],
      email: 'ambuja@example.com',
      followers: 150,
      following: 85,
      isVerified: true
    };
    // Uncomment to auto-login for demo
    // Storage.setUser(mockUser);
    // Storage.setToken('fake-token-demo');
  }

  console.log('🚀 Yantra App Started');
  console.log('Demo credentials:');
  console.log('Username: ambuja');
  console.log('Or use any username for demo');
});
