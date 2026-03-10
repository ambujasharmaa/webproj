// Login Page
function LoginPage() {
  const container = createElement('div', 'auth-page');

  const decorTR = createElement('div', 'auth-decoration-tr');
  const decorBL = createElement('div', 'auth-decoration-bl');
  container.appendChild(decorTR);
  container.appendChild(decorBL);

  const card = createElement('div', 'auth-card');

  // Logo
  const logoRow = createElement('div', '');
  logoRow.style.cssText = 'display:flex;align-items:center;gap:0.5rem;margin-bottom:1.5rem;';
  const logoText = createElement('span', 'header__brand-text', 'EPIONE');
  logoRow.appendChild(logoText);

  const heading = createElement('h1', '', 'Welcome Back!');
  const subtitle = createElement('p', 'auth-subtitle', 'Sign in to continue to Epione');

  const usernameField = FormInput('Username', 'text', 'Enter your username', 'username');
  const passwordField = FormInput('Password', 'password', 'Enter your password', 'password');

  // Toggle visibility
  const toggleBtn = createElement('button', 'btn btn-ghost btn-small', '👁 Show Password');
  toggleBtn.type = 'button';
  toggleBtn.style.marginBottom = '0.75rem';
  toggleBtn.onclick = () => {
    const input = passwordField.input;
    if (input.type === 'password') {
      input.type = 'text';
      toggleBtn.textContent = '👁 Hide Password';
    } else {
      input.type = 'password';
      toggleBtn.textContent = '👁 Show Password';
    }
  };

  const submitBtn = createElement('button', 'btn btn-primary w-full', 'Sign In');
  submitBtn.style.justifyContent = 'center';
  submitBtn.style.padding = '0.65rem';
  submitBtn.onclick = () => {
    const username = usernameField.input.value.trim();
    const password = passwordField.input.value.trim();

    if (!username || !password) { API.showToast('Please fill in all fields', 'error'); return; }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loader" style="width:1rem;height:1rem;border-width:2px;margin-right:0.5rem;"></div> Signing in...';

    API.login(username, password).then(response => {
      Storage.setUser(response.user);
      Storage.setToken(response.token);
      API.showToast('Welcome back!', 'success');
      setTimeout(() => Router.navigate('/home'), 400);
    }).catch(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign In';
      API.showToast('Login failed', 'error');
    });
  };

  const signupLink = createElement('p', 'text-center mt-4');
  signupLink.style.fontSize = '0.875rem';
  signupLink.style.color = 'var(--text-secondary)';
  signupLink.innerHTML = `Don't have an account? <a href="#/signup" style="color:var(--primary);font-weight:600;">Sign Up</a>`;

  card.appendChild(logoRow);
  card.appendChild(heading);
  card.appendChild(subtitle);
  card.appendChild(usernameField.container);
  card.appendChild(passwordField.container);
  card.appendChild(toggleBtn);
  card.appendChild(submitBtn);
  card.appendChild(signupLink);

  container.appendChild(card);
  return container;
}

Router.register('/login', LoginPage);
