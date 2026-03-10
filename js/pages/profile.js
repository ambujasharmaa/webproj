// Profile Page
function ProfilePage() {
  const container = createElement('div', 'page-wrapper');

  const user = Storage.getUser();

  if (!user) {
    Router.navigate('/login');
    return Loader();
  }

  // Header
  container.appendChild(Header());

  // Main Content
  const main = createElement('main', 'page-body');
  main.style.maxWidth = '1200px';
  main.style.margin = '0 auto';
  main.style.paddingTop = '2rem';
  main.style.paddingBottom = '4rem';
  
  // Profile Header Section
  const profileHeader = createElement('div', 'profile-header');
  profileHeader.style.display = 'grid';
  profileHeader.style.gridTemplateColumns = '150px 1fr';
  profileHeader.style.gap = '2rem';
  profileHeader.style.alignItems = 'start';
  profileHeader.style.marginBottom = '3rem';
  profileHeader.style.paddingBottom = '2rem';
  profileHeader.style.borderBottom = '1px solid var(--border)';

  // Avatar
  const avatarDiv = createElement('div');
  const avatar = Avatar('../public/default.jpg', 'Profile Picture', 'avatar avatar-lg');
  avatar.style.width = '150px';
  avatar.style.height = '150px';
  avatar.style.borderRadius = '12px';
  avatarDiv.appendChild(avatar);

  // Profile Info
  const infoDiv = createElement('div');
  infoDiv.style.display = 'flex';
  infoDiv.style.flexDirection = 'column';
  infoDiv.style.gap = '1rem';

  const nameH = createElement('div', 'profile-name', user.name || 'User');
  nameH.style.fontSize = '2rem';
  nameH.style.fontWeight = '600';
  nameH.style.color = 'var(--text-primary)';

  const usernameP = createElement('div', 'profile-username', `@${user.username}`);
  usernameP.style.fontSize = '1rem';
  usernameP.style.color = 'var(--text-secondary)';

  // Use the requested bio for demo user; otherwise fall back to stored bio
  const bioText = (user.username === 'demo') ?
    'Mental wellness project made by ambuja nikhil devansh' : (user.bio || 'No bio yet.');
  const bioP = createElement('div', 'profile-bio', bioText);
  bioP.style.fontSize = '1rem';
  bioP.style.color = 'var(--text-primary)';
  bioP.style.lineHeight = '1.6';
  bioP.style.marginTop = '0.5rem';

  // Tags — ensure demo user shows Community and Health
  const tagsDiv = createElement('div');
  tagsDiv.style.display = 'flex';
  tagsDiv.style.gap = '0.5rem';
  tagsDiv.style.flexWrap = 'wrap';
  tagsDiv.style.marginTop = '1rem';
  const userTags = (user.username === 'demo') ? ['Community', 'Health'] : (user.tags || []);
  userTags.forEach(tag => {
    tagsDiv.appendChild(Tag(tag));
  });

  // Stats Row
  const statsDiv = createElement('div', 'profile-stats');
  statsDiv.style.display = 'flex';
  statsDiv.style.gap = '3rem';
  statsDiv.style.marginTop = '1.5rem';
  
  const followers = createElement('div');
  followers.style.textAlign = 'left';
  followers.innerHTML = `<div class="font-bold text-2xl" style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">${user.followers || 0}</div><div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.25rem;">Followers</div>`;
  
  const following = createElement('div');
  following.style.textAlign = 'left';
  following.innerHTML = `<div class="font-bold text-2xl" style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">${user.following || 0}</div><div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.25rem;">Following</div>`;
  
  statsDiv.appendChild(followers);
  statsDiv.appendChild(following);

  infoDiv.appendChild(nameH);
  infoDiv.appendChild(usernameP);
  infoDiv.appendChild(bioP);
  infoDiv.appendChild(tagsDiv);
  infoDiv.appendChild(statsDiv);

  profileHeader.appendChild(avatarDiv);
  profileHeader.appendChild(infoDiv);

  main.appendChild(profileHeader);

  // Charts and Stats Section
  const chartSection = createElement('div', 'profile-charts');
  chartSection.style.display = 'grid';
  chartSection.style.gridTemplateColumns = '1fr 260px';
  chartSection.style.gap = '1.5rem';
  chartSection.style.marginTop = '2rem';

  // Activity Chart Card (main column under the profile text)
  const chartCard = Card('', 'card');
  chartCard.style.padding = '1.5rem';
  chartCard.style.width = '100%';
  const chartTitle = createElement('h3', 'text-lg font-semibold mb-4', 'Activity (Last 7 months)');
  chartTitle.style.fontSize = '1.05rem';
  chartTitle.style.fontWeight = '600';
  chartTitle.style.marginBottom = '1rem';
  chartTitle.style.color = 'var(--text-primary)';

  const chartContainer = createElement('div');
  chartContainer.style.position = 'relative';
  chartContainer.style.height = '300px';
  chartContainer.style.width = '100%';
  const canvas = createElement('canvas', '', '', { 'id': 'activityChart' });
  chartContainer.appendChild(canvas);
  chartCard.appendChild(chartTitle);
  chartCard.appendChild(chartContainer);

  // Quick Stats Card (narrow column)
  const statCard = Card('', 'card');
  statCard.style.padding = '1.5rem';
  statCard.style.width = '260px';
  statCard.style.flex = 'none';
  const statTitle = createElement('h3', 'text-lg font-semibold', 'Quick Stats');
  statTitle.style.fontSize = '1.05rem';
  statTitle.style.fontWeight = '600';
  statTitle.style.marginBottom = '1rem';
  statTitle.style.color = 'var(--text-primary)';

  const statContent = createElement('div');
  statContent.style.display = 'flex';
  statContent.style.flexDirection = 'column';
  statContent.style.gap = '1rem';
  
  const statsData = [
    { label: 'Posts', value: '24' },
    { label: 'Total Likes', value: '342' },
    { label: 'Comments Received', value: '89' }
  ];
  
  statsData.forEach(stat => {
    const statRow = createElement('div');
    statRow.style.display = 'flex';
    statRow.style.justifyContent = 'space-between';
    statRow.style.alignItems = 'center';
    statRow.innerHTML = `
      <span style="color: var(--text-secondary); font-size: 0.95rem;">${stat.label}</span>
      <span style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">${stat.value}</span>
    `;
    statContent.appendChild(statRow);
  });

  statCard.appendChild(statTitle);
  statCard.appendChild(statContent);

  chartSection.appendChild(chartCard);
  chartSection.appendChild(statCard);

  // Place the chart section inside the right/info column so the chart sits under the text
  infoDiv.appendChild(chartSection);

  container.appendChild(main);

  // Initialize chart after DOM is ready
  setTimeout(() => {
    const ctx = document.getElementById('activityChart');
    if (ctx && window.Chart) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Posts',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            tension: 0.3,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: '#667eea'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
  }, 100);

  return container;
}

// Register the page
Router.register('/profile', ProfilePage);
