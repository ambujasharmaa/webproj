// Router
class Router {
  static routes = {};
  static currentRoute = null;
  static appContainer = null;

  static register(path, component) {
    this.routes[path] = component;
  }

  static init(containerSelector) {
    this.appContainer = document.querySelector(containerSelector);
    window.addEventListener('hashchange', () => this.navigate());
    this.navigate();
  }

  static navigate(path = null) {
    if (path) {
      window.location.hash = path;
      return;
    }

    let hash = window.location.hash.slice(1) || '/';
    if (!hash.startsWith('/')) hash = '/' + hash;

    const component = this.routes[hash];

    if (component) {
      this.currentRoute = hash;
      this.render(component);
    } else {
      this.navigate('/');
    }
  }

  static render(component) {
    this.appContainer.innerHTML = '';
    if (typeof component === 'function') {
      const element = component();
      if (element) {
        this.appContainer.appendChild(element);
      }
    } else {
      this.appContainer.innerHTML = component;
    }
  }

  static go(path) {
    this.navigate(path);
  }

  static current() {
    return this.currentRoute;
  }
}
