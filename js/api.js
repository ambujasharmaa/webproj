// API Handler
class API {
  static baseURL = '';

  // Mock data for development
  static mockUsers = {
    ambuja: {
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
    },
    demo: {
      id: '2',
      name: 'Demo User',
      username: 'demo',
      bio: 'Welcome to the project made by Ambuja, Nikhil, and Devansh',
      profilePic: 'default.jpg',
      coverPic: 'default.jpg',
      tags: ['Community', 'Health'],
      email: 'demo@example.com',
      followers: 50,
      following: 30,
      isVerified: false
    }
  };

  static mockFeed = [
    {
      id: 1,
      content: 'Welcome to Epione 💙 A safe space where you can share, heal, and grow together.',
      postedAt: new Date().toISOString(),
      userID: '1',
      edited: false,
      images: [],
      user: {
        name: 'Epione Team',
        username: 'epione',
        profilePic: 'default.jpg'
      },
      likes: 42,
      comments: 8
    },
    {
      id: 2,
      content: '🌿 Reminder: You don\'t have to be perfect to be worthy. Progress > perfection.',
      postedAt: new Date(Date.now() - 3600000).toISOString(),
      userID: '2',
      edited: false,
      images: [],
      user: {
        name: 'Dr. Ananya',
        username: 'dr.ananya',
        profilePic: 'default.jpg'
      },
      likes: 125,
      comments: 23
    },
    {
      id: 3,
      content: '💬 Question: What\'s one thing that helped you feel better this week?',
      postedAt: new Date(Date.now() - 7200000).toISOString(),
      userID: '3',
      edited: false,
      images: [],
      user: {
        name: 'Peer Circle',
        username: 'peer.circle',
        profilePic: 'default.jpg'
      },
      likes: 89,
      comments: 34
    },
    {
      id: 4,
      content: '🧠 Tip: Try the 4-7-8 breathing technique when feeling anxious.',
      postedAt: new Date(Date.now() - 10800000).toISOString(),
      userID: '4',
      edited: false,
      images: [],
      user: {
        name: 'Wellness Coach',
        username: 'coach',
        profilePic: 'default.jpg'
      },
      likes: 234,
      comments: 45
    }
  ];

  static async login(username, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.mockUsers[username] || this.mockUsers['demo'];
        resolve({
          success: true,
          user: user,
          token: 'fake-token-' + Date.now()
        });
      }, 500);
    });
  }

  static async getUser(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = Object.values(this.mockUsers)[0];
        resolve({
          success: true,
          user: user
        });
      }, 300);
    });
  }

  static async getFeed() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          feed: this.mockFeed
        });
      }, 500);
    });
  }

  static async updateProfile(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        Storage.setUser({...Storage.getUser(), ...data});
        resolve({
          success: true,
          message: 'Profile updated successfully'
        });
      }, 500);
    });
  }

  static async createPost(content) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = {
          id: this.mockFeed.length + 1,
          content: content,
          postedAt: new Date().toISOString(),
          userID: Storage.getUser()?.id || '1',
          edited: false,
          images: [],
          user: Storage.getUser(),
          likes: 0,
          comments: 0
        };
        this.mockFeed.unshift(post);
        resolve({
          success: true,
          post: post,
          message: 'Post created successfully'
        });
      }, 300);
    });
  }

  static showToast(message, type = 'info') {
    // Will be implemented in components.js
    const event = new CustomEvent('showToast', {
      detail: { message, type }
    });
    window.dispatchEvent(event);
  }
}
