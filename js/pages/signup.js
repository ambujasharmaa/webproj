// Signup Page
function SignupPage() {
  const container = createElement('div', 'auth-page');

  const decorTR = createElement('div', 'auth-decoration-tr');
  const decorBL = createElement('div', 'auth-decoration-bl');
  container.appendChild(decorTR);
  container.appendChild(decorBL);

  const card = createElement('div', 'auth-card');

  const logoRow = createElement('div', '');
  logoRow.style.cssText = 'display:flex;align-items:center;gap:0.5rem;margin-bottom:1.5rem;';
  logoRow.appendChild(createElement('span', 'header__brand-text', 'EPIONE'));

  const heading = createElement('h1', '', 'Create Account');
  const subtitle = createElement('p', 'auth-subtitle', 'Join our wellness community today');

  const nameField = FormInput('Full Name', 'text', 'Enter your full name', 'name');
  const emailField = FormInput('Email', 'email', 'Enter your email', 'email');
  const usernameField = FormInput('Username', 'text', 'Choose a username', 'signup-username');
  const passwordField = FormInput('Password', 'password', 'Create a strong password', 'signup-password');
  const confirmField = FormInput('Confirm Password', 'password', 'Confirm your password', 'confirm-password');

  const termsCheck = createElement('div', 'flex items-center gap-2 mb-4');
  termsCheck.style.marginBottom = '1rem';
  const checkbox = createElement('input', 'form-checkbox', '', { type: 'checkbox', id: 'terms' });
  const termsLabel = createElement('label', '', 'I agree to the Terms of Service');
  termsLabel.setAttribute('for', 'terms');
  termsLabel.style.cssText = 'font-size:0.875rem;color:var(--text-secondary);cursor:pointer;';
  termsCheck.appendChild(checkbox);
  termsCheck.appendChild(termsLabel);

  const submitBtn = createElement('button', 'btn btn-primary w-full', 'Create Account');
  submitBtn.style.cssText = 'justify-content:center;padding:0.65rem;';
  submitBtn.onclick = () => {
    const name = nameField.input.value.trim();
    const email = emailField.input.value.trim();
    const username = usernameField.input.value.trim();
    const password = passwordField.input.value.trim();
    const confirm = confirmField.input.value.trim();

    if (!name || !email || !username || !password || !confirm) { API.showToast('Please fill in all fields', 'error'); return; }
    if (password !== confirm) { API.showToast('Passwords do not match', 'error'); return; }
    if (password.length < 6) { API.showToast('Password must be at least 6 characters', 'error'); return; }
    if (!checkbox.checked) { API.showToast('Please accept the Terms of Service', 'error'); return; }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loader" style="width:1rem;height:1rem;border-width:2px;margin-right:0.5rem;"></div> Creating account...';

    setTimeout(() => {
      const newUser = { id: Date.now().toString(), name, email, username, bio: 'Welcome to Epione!', profilePic: 'default.jpg', tags: [], followers: 0, following: 0, isVerified: false };
      Storage.setUser(newUser);
      Storage.setToken('fake-token-' + Date.now());
      API.showToast('Account created!', 'success');
      setTimeout(() => Router.navigate('/home'), 400);
    }, 900);
  };

  const loginLink = createElement('p', 'text-center mt-4');
  loginLink.style.cssText = 'font-size:0.875rem;color:var(--text-secondary);';
  loginLink.innerHTML = `Already have an account? <a href="#/login" style="color:var(--primary);font-weight:600;">Sign In</a>`;

  card.appendChild(logoRow);
  card.appendChild(heading);
  card.appendChild(subtitle);
  card.appendChild(nameField.container);
  card.appendChild(emailField.container);
  card.appendChild(usernameField.container);
  card.appendChild(passwordField.container);
  card.appendChild(confirmField.container);
  card.appendChild(termsCheck);
  card.appendChild(submitBtn);
  card.appendChild(loginLink);

  container.appendChild(card);
  return container;
}

Router.register('/signup', SignupPage);
