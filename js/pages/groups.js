// Groups Page
function GroupsPage() {
  const user = Storage.getUser();

  if (!user) {
    Router.navigate('/login');
    return Loader();
  }

  const container = createElement('div', 'flex flex-col min-h-screen');

  // Header
  container.appendChild(Header());

  // Main Content
  const main = createElement('main', 'flex-1');
  main.style.paddingTop = '4rem';
  main.style.padding = '2rem';

  // Tabs
  const tabs = createElement('div', 'tabs mb-8');
  const myGroupsTab = createElement('button', 'tab active', '👥 My Groups');
  const discoverTab = createElement('button', 'tab', '🔍 Discover');

  const myGroupsContent = createElement('div', 'tab-content active', 'my-groups');
  const discoverContent = createElement('div', 'tab-content', 'discover');

  myGroupsTab.onclick = () => {
    myGroupsTab.classList.add('active');
    discoverTab.classList.remove('active');
    myGroupsContent.classList.add('active');
    discoverContent.classList.remove('active');
  };

  discoverTab.onclick = () => {
    discoverTab.classList.add('active');
    myGroupsTab.classList.remove('active');
    discoverContent.classList.add('active');
    myGroupsContent.classList.remove('active');
  };

  tabs.appendChild(myGroupsTab);
  tabs.appendChild(discoverTab);

  main.appendChild(tabs);

  // My Groups Section
  const myGroupsSection = createElement('div', '');
  myGroupsSection.id = 'my-groups';

  const myGroupsHeader = createElement('div', 'flex justify-between items-center mb-6');
  const myGroupsTitle = createElement('h2', 'text-2xl font-bold', 'My Groups');
  const createGroupBtn = PrimaryButton('➕ Create Group', () => {
    API.showToast('Group creation coming soon', 'info');
  });
  myGroupsHeader.appendChild(myGroupsTitle);
  myGroupsHeader.appendChild(createGroupBtn);

  myGroupsSection.appendChild(myGroupsHeader);

  const myGroupsGrid = createElement('div', 'grid gap-4');
  myGroupsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';

  const myGroups = [
    {
      id: 1,
      name: 'Mindfulness Circle',
      description: 'Daily meditation and mindfulness practices',
      members: 156,
      icon: '🧘',
      joined: true
    },
    {
      id: 2,
      name: 'Mental Health Advocates',
      description: 'Supporting mental wellness in our community',
      members: 342,
      icon: '💙',
      joined: true
    },
    {
      id: 3,
      name: 'Book Club for Wellness',
      description: 'Reading and discussing wellness topics',
      members: 89,
      icon: '📚',
      joined: true
    }
  ];

  myGroups.forEach(group => {
    const card = Card('', 'card');
    card.style.cursor = 'pointer';

    const header = createElement('div', 'flex items-center gap-3 mb-4');
    const icon = createElement('div', 'text-4xl', group.icon);
    const name = createElement('h3', 'text-lg font-bold', group.name);
    header.appendChild(icon);
    header.appendChild(name);

    const desc = createElement('p', 'text-gray-600 text-sm mb-4', group.description);
    const members = createElement('div', 'text-sm text-gray-500 mb-4', `👥 ${group.members} members`);

    const viewBtn = PrimaryButton('View Group', () => {
      API.showToast(`Opening: ${group.name}`, 'info');
    });

    card.appendChild(header);
    card.appendChild(desc);
    card.appendChild(members);
    card.appendChild(viewBtn);

    myGroupsGrid.appendChild(card);
  });

  myGroupsSection.appendChild(myGroupsGrid);
  myGroupsContent.appendChild(myGroupsSection);

  // Discover Section
  const discoverSection = createElement('div', '');
  discoverSection.id = 'discover';

  const discoverHeader = createElement('div', 'mb-6');
  const discoverTitle = createElement('h2', 'text-2xl font-bold mb-4', 'Discover Communities');

  const searchBox = FormInput('', 'text', 'Search groups...', 'search-groups');
  searchBox.input.style.width = '100%';
  searchBox.input.style.maxWidth = '400px';

  discoverHeader.appendChild(discoverTitle);
  discoverHeader.appendChild(searchBox.container);

  discoverSection.appendChild(discoverHeader);

  const recommendedGrid = createElement('div', 'grid gap-4');
  recommendedGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';

  const recommendedGroups = [
    {
      id: 4,
      name: 'Anxiety Support Group',
      description: 'A safe space for discussing anxiety concerns',
      members: 523,
      icon: '😌',
      joined: false
    },
    {
      id: 5,
      name: 'Sleep & Rest Community',
      description: 'Tips and techniques for better sleep',
      members: 267,
      icon: '😴',
      joined: false
    },
    {
      id: 6,
      name: 'Fitness & Wellness',
      description: 'Exercise routines for mental and physical health',
      members: 891,
      icon: '💪',
      joined: false
    },
    {
      id: 7,
      name: 'Creative Expression',
      description: 'Art, music, and writing for emotional expression',
      members: 445,
      icon: '🎨',
      joined: false
    },
    {
      id: 8,
      name: 'Nutrition & Health',
      description: 'Healthy eating habits and nutrition tips',
      members: 612,
      icon: '🥗',
      joined: false
    },
    {
      id: 9,
      name: 'Work-Life Balance',
      description: 'Strategies for managing work and personal life',
      members: 734,
      icon: '⚖️',
      joined: false
    }
  ];

  recommendedGroups.forEach(group => {
    const card = Card('', 'card');
    card.style.cursor = 'pointer';

    const header = createElement('div', 'flex items-center gap-3 mb-4');
    const icon = createElement('div', 'text-4xl', group.icon);
    const name = createElement('h3', 'text-lg font-bold', group.name);
    header.appendChild(icon);
    header.appendChild(name);

    const desc = createElement('p', 'text-gray-600 text-sm mb-4', group.description);
    const members = createElement('div', 'text-sm text-gray-500 mb-4', `👥 ${group.members} members`);

    const joinBtn = PrimaryButton('Join Group', () => {
      API.showToast(`Joined: ${group.name}`, 'success');
    });

    card.appendChild(header);
    card.appendChild(desc);
    card.appendChild(members);
    card.appendChild(joinBtn);

    recommendedGrid.appendChild(card);
  });

  discoverSection.appendChild(recommendedGrid);
  discoverContent.appendChild(discoverSection);

  main.appendChild(myGroupsContent);
  main.appendChild(discoverContent);

  container.appendChild(main);
  return container;
}

// Register the page
Router.register('/groups', GroupsPage);
