// Reusable Components

// Helper to create elements
function createElement(tag, className = '', innerHTML = '', attributes = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  Object.keys(attributes).forEach(key => {
    el.setAttribute(key, attributes[key]);
  });
  return el;
}

// Header Component
function Header() {
  const header = createElement('header', 'header');

  // inner wrapper to center header content
  const inner = createElement('div', 'header__inner');
  
  // Left: Logo (image + brand text)
  const logoLink = createElement('a', 'header__logo', '');
  const logoImg = createElement('img', 'header__logo-img', '', {
    'src': '../public/Logo.svg',
    'alt': 'Epione'
  });
  const logoText = createElement('span', 'header__brand-text', 'EPIONE');
  logoLink.appendChild(logoImg);
  logoLink.appendChild(logoText);

  // Center: Navigation (kept minimal and centered like the screenshot)
  const nav = createElement('div', 'header__nav');

  const feedLink = createElement('a', 'header__link', 'Feed');
  feedLink.onclick = () => Router.navigate('/home');
  const eventsLink = createElement('a', 'header__link', 'Events');
  eventsLink.onclick = () => Router.navigate('/events');
  const resourcesLink = createElement('a', 'header__link', 'Resources');
  resourcesLink.onclick = () => Router.navigate('/resources');

  nav.appendChild(feedLink);
  nav.appendChild(eventsLink);
  nav.appendChild(resourcesLink);

  // Right: Journal link + Profile link + hamburger/menu button (matches screenshot)
  const right = createElement('div', 'header__right');
  
  const journalLink = createElement('a', 'header__journal-link', '');
  journalLink.onclick = () => Router.navigate('/journal');
  const journalIcon = createElement('img', '', '', {
    'src': '../public/LogoBlack.svg',
    'alt': 'Journal',
    'style': 'width: 20px; height: 20px;'
  });
  const journalText = createElement('span', '', 'My Journal');
  // journalLink.appendChild(journalIcon);
  journalLink.appendChild(journalText);

  const profileLink = createElement('a', 'header__profile-link', 'My Profile');
  profileLink.onclick = () => Router.navigate('/profile');

  const hamburger = createElement('button', 'header__hamburger', '');
  hamburger.setAttribute('aria-label', 'Open menu');
  hamburger.innerHTML = '<span class="hamburger-icon">☰</span>';

  right.appendChild(journalLink);
  right.appendChild(profileLink);
  right.appendChild(hamburger);

  // assemble
  inner.appendChild(logoLink);
  inner.appendChild(nav);
  inner.appendChild(right);

  header.appendChild(inner);
  
  return header;
}

// Toast Component
let toastContainer = null;

function initToasts() {
  if (!toastContainer) {
    toastContainer = createElement('div', 'toast-container');
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '2rem';
    toastContainer.style.right = '2rem';
    toastContainer.style.zIndex = '3000';
    toastContainer.style.maxWidth = '400px';
    document.body.appendChild(toastContainer);
  }

  window.addEventListener('showToast', (e) => {
    const { message, type = 'info' } = e.detail;
    showToast(message, type);
  });
}

function showToast(message, type = 'info') {
  if (!toastContainer) initToasts();
  
  const toast = createElement('div', `toast toast-${type}`, message);
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Button Components
function Button(text, onClick = null, className = 'btn btn-primary') {
  const btn = createElement('button', className, text);
  if (onClick) btn.onclick = onClick;
  return btn;
}

function PrimaryButton(text, onClick = null) {
  return Button(text, onClick, 'btn btn-primary');
}

function SecondaryButton(text, onClick = null) {
  return Button(text, onClick, 'btn btn-secondary');
}

function DangerButton(text, onClick = null) {
  return Button(text, onClick, 'btn btn-danger');
}

// Form Input
function FormInput(label, type = 'text', placeholder = '', id = '') {
  const group = createElement('div', 'form-group');
  
  if (label) {
    const labelEl = createElement('label', 'form-label', label);
    if (id) labelEl.setAttribute('for', id);
    group.appendChild(labelEl);
  }
  
  const input = createElement('input', 'form-input', '', {
    'type': type,
    'placeholder': placeholder
  });
  if (id) input.id = id;
  
  group.appendChild(input);
  return { container: group, input };
}

// Card Component
function Card(content, className = 'card') {
  const card = createElement('div', className);
  if (typeof content === 'string') {
    card.innerHTML = content;
  } else {
    card.appendChild(content);
  }
  return card;
}

// Loading Spinner
function Loader() {
  const container = createElement('div', 'page-loader');
  const loader = createElement('div', 'loader');
  container.appendChild(loader);
  return container;
}

// Avatar
function Avatar(src, alt = '', className = 'avatar') {
  return createElement('img', className, '', {
    'src': src,
    'alt': alt
  });
}

// Badge
function Badge(text, type = 'primary') {
  return createElement('span', `badge badge-${type}`, text);
}

// Tag
function Tag(text) {
  return createElement('span', 'tag', text);
}

// Initialize toasts on load
initToasts();
