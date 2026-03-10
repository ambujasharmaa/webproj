// Home / Feed Page
function HomePage() {
  const user = Storage.getUser();

  if (!user) {
    Router.navigate('/login');
    return Loader();
  }

  const container = createElement('div', 'page-wrapper');
  container.appendChild(Header());

  const body = createElement('div', 'page-body');

  // Title row
  const titleRow = createElement('div', 'page-title');
  const titleText = createElement('span', '', 'Feed');
  const titleActions = createElement('div', 'page-title-actions');

  const postBtn = createElement('button', 'btn btn-ghost', '');
  postBtn.style.fontSize = '0.9rem';
  postBtn.style.fontWeight = '500';
  postBtn.style.color = 'var(--text-secondary)';
  postBtn.innerHTML = 'Post <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border:1.5px solid var(--border-strong);border-radius:50%;font-size:0.75rem;margin-left:0.35rem;vertical-align:middle;">ℹ</span>';
  postBtn.onclick = () => showNewPostModal();

  titleActions.appendChild(postBtn);
  titleRow.appendChild(titleText);
  titleRow.appendChild(titleActions);
  body.appendChild(titleRow);

  // 2-column feed grid
  const feedGrid = createElement('div', 'feed-grid');
  feedGrid.id = 'posts-container';

  body.appendChild(feedGrid);
  container.appendChild(body);

  // Load posts
  setTimeout(async () => {
    const response = await API.getFeed();
    feedGrid.innerHTML = '';
    response.feed.forEach(post => {
      feedGrid.appendChild(createPostCard(post));
    });
  }, 0);

  return container;
}

function createPostCard(post) {
  const card = createElement('div', 'post-card');

  // Header: avatar + name/handle + timestamp
  const header = createElement('div', 'post-header');

  const avatarEl = createElement('div', 'post-avatar');
  avatarEl.textContent = (post.user.name || 'U')[0].toUpperCase();

  const meta = createElement('div', 'post-meta');
  const metaTop = createElement('div', 'post-meta-top');

  const name = createElement('span', 'post-author-name', post.user.name);
  const handle = createElement('span', 'post-author-handle', `@${post.user.username}`);
  const timestamp = createElement('span', 'post-timestamp', formatDate(post.postedAt));

  metaTop.appendChild(name);
  metaTop.appendChild(handle);
  metaTop.appendChild(timestamp);

  // Only show menu dots if it's the user's post
  const isOwn = post.userID === Storage.getUser()?.id;
  if (isOwn) {
    const menuBtn = createElement('button', 'post-menu-btn', '···');
    metaTop.appendChild(menuBtn);
  }

  meta.appendChild(metaTop);
  header.appendChild(avatarEl);
  header.appendChild(meta);

  // Content
  const content = createElement('p', 'post-content', post.content);

  // Actions
  const actions = createElement('div', 'post-actions');

  const likeBtn = createElement('button', 'post-action', `👍 ${post.likes || 0}`);
  likeBtn.onclick = () => {
    post.likes = (post.likes || 0) + 1;
    likeBtn.textContent = `👍 ${post.likes}`;
  };

  const commentBtn = createElement('button', 'post-action', `💬 ${post.comments || 0}`);
  const shareBtn = createElement('button', 'post-action', '🔗 Share');

  actions.appendChild(likeBtn);
  actions.appendChild(commentBtn);
  actions.appendChild(shareBtn);

  card.appendChild(header);
  card.appendChild(content);
  card.appendChild(actions);

  return card;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'a few seconds ago';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

function showNewPostModal() {
  const overlay = createElement('div', 'modal-overlay');

  const modal = createElement('div', 'modal');

  // Modal header
  const modalHeader = createElement('div', 'modal-header');
  const userHandle = createElement('span', 'modal-header-user', `@${Storage.getUser()?.username || 'user'}`);
  const postBtn = createElement('button', 'modal-post-btn', 'Post');
  modalHeader.appendChild(userHandle);
  modalHeader.appendChild(postBtn);

  const divider = createElement('hr', '');
  divider.style.cssText = 'border: none; border-top: 1px solid var(--border); margin: 0 1.5rem;';

  // Icon row
  const iconRow = createElement('div', '');
  iconRow.style.cssText = 'padding: 0.75rem 1.5rem 0.25rem; display: flex; align-items: center;';
  const imgIcon = createElement('span', '', '🖼');
  imgIcon.style.fontSize = '1.25rem';
  iconRow.appendChild(imgIcon);

  // Textarea
  const textarea = createElement('textarea', 'form-textarea', '');
  textarea.placeholder = 'Start a conversation...';
  textarea.style.cssText = 'border: none; border-radius: 0; box-shadow: none; padding: 0.5rem 1.5rem 1.5rem; resize: none; font-size: 0.95rem; min-height: 200px;';
  textarea.setAttribute('rows', '6');

  modal.appendChild(modalHeader);
  modal.appendChild(divider);
  modal.appendChild(iconRow);
  modal.appendChild(textarea);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close on overlay click
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.remove();
  };

  postBtn.onclick = () => {
    const text = textarea.value.trim();
    if (!text) { API.showToast('Write something first!', 'error'); return; }

    postBtn.disabled = true;
    postBtn.textContent = '...';

    API.createPost(text).then(() => {
      API.showToast('Posted!', 'success');
      overlay.remove();
      API.getFeed().then(r => {
        const grid = document.getElementById('posts-container');
        if (grid) {
          grid.innerHTML = '';
          r.feed.forEach(p => grid.appendChild(createPostCard(p)));
        }
      });
    });
  };

  textarea.focus();
}

Router.register('/', HomePage);
Router.register('/home', HomePage);
