// Storage Management
class Storage {
  static setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key) {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch {
      return item;
    }
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }

  // User data
  static getUser() {
    return this.getItem('user');
  }

  static setUser(user) {
    this.setItem('user', user);
  }

  static getToken() {
    return this.getItem('token');
  }

  static setToken(token) {
    this.setItem('token', token);
  }

  static isLoggedIn() {
    return !!this.getToken();
  }

  static logout() {
    this.removeItem('user');
    this.removeItem('token');
    this.removeItem('id');
  }
}
