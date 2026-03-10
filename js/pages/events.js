// Events Page
function EventsPage() {
  const user = Storage.getUser();
  if (!user) { Router.navigate('/login'); return Loader(); }

  const container = createElement('div', 'page-wrapper');
  container.appendChild(Header());

  const body = createElement('div', 'page-body');

  // Page hero — title left, illustration right
  const pageHero = createElement('div', 'page-hero');

  const titleRow = createElement('div', 'page-title');
  titleRow.appendChild(createElement('span', '', 'Events'));
  pageHero.appendChild(titleRow);

  const heroIllustration = createElement('img', 'page-hero__illustration', '', {
    src: '../public/threePeople.svg',
    alt: 'Three people illustration'
  });
  pageHero.appendChild(heroIllustration);

  body.appendChild(pageHero);

  const mockEvents = [
    {
      id: 1,
      title: 'Mindfulness Workshop',
      description: 'Join us to learn calming techniques and breathing exercises.',
      date: new Date(Date.now() + 86400000),
      time: '10:00 AM',
      endTime: '11:30 AM',
      location: 'Zoom',
      attendees: 24,
      organizer: 'Epione Team',
      image: '../public/SharingPeople.svg'
    },
    {
      id: 2,
      title: 'Group Therapy Session',
      description: 'Safe space to share experiences and support each other.',
      date: new Date(Date.now() + 172800000),
      time: '6:00 PM',
      endTime: '7:30 PM',
      location: 'Room A-102',
      attendees: 15,
      organizer: 'Dr. Ananya',
      image: '../public/singlePerson.svg'
    },
    {
      id: 3,
      title: 'Yoga for Anxiety',
      description: 'Breathing and movement session to ease anxiety.',
      date: new Date(Date.now() + 259200000),
      time: '5:00 PM',
      endTime: '6:00 PM',
      location: 'Wellness Hall',
      attendees: 32,
      organizer: 'Wellness Coach',
      image: '../public/threePeople.svg'
    },
    {
      id: 4,
      title: 'Sleep & Rest Webinar',
      description: 'Tips and tricks for better sleep quality.',
      date: new Date(Date.now() + 345600000),
      time: '8:00 PM',
      endTime: '9:00 PM',
      location: 'Zoom',
      attendees: 42,
      organizer: 'Health Expert',
      image: '../public/singlePersonFlipped.svg'
    }
  ];

  const grid = createElement('div', 'events-grid');

  mockEvents.forEach(event => {
    // Derive month/day from event.date so they're never undefined
    event.month = event.date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    event.day   = event.date.getDate();

    const card = createElement('div', 'event-card');
    card.onclick = () => showEventDetail(event);

    const imageArea = createElement('div', 'event-card__image');
    const img = createElement('img', 'event-image', '', {
      src: event.image,
      alt: event.title
    });
    imageArea.appendChild(img);

    const bookmarkBtn = createElement('button', 'event-card__bookmark', '🔖');
    bookmarkBtn.onclick = (e) => { e.stopPropagation(); API.showToast('Event saved!', 'success'); };
    imageArea.appendChild(bookmarkBtn);

    const cardBody = createElement('div', 'event-card__body');

    const dateRow = createElement('div', 'event-card__date');
    const monthEl = createElement('span', 'event-card__month', event.month);
    const dayEl = createElement('span', 'event-card__day', event.day);
    dateRow.appendChild(monthEl);
    dateRow.appendChild(dayEl);

    const titleEl = createElement('div', 'event-card__title', event.title);

    cardBody.appendChild(dateRow);
    cardBody.appendChild(titleEl);

    card.appendChild(imageArea);
    card.appendChild(cardBody);
    grid.appendChild(card);
  });

  body.appendChild(grid);
  container.appendChild(body);
  return container;
}

function showEventDetail(event) {
  const container = document.querySelector('#app');
  container.innerHTML = '';

  // Ensure month/day are always available
  const month = event.date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day   = event.date.getDate();
  const weekday = event.date.toLocaleDateString('en-US', { weekday: 'long' });
  const monthLong = event.date.toLocaleDateString('en-US', { month: 'long' });

  const page = createElement('div', 'page-wrapper');
  page.appendChild(Header());

  // ← Back button row
  const backBar = createElement('div', 'event-detail-back');
  const backBtn = createElement('button', 'event-back-btn', '← Back to Events');
  backBtn.onclick = () => {
    // Force re-render of EventsPage since the hash hasn't changed
    const appEl = document.querySelector('#app');
    appEl.innerHTML = '';
    appEl.appendChild(EventsPage());
  };
  backBar.appendChild(backBtn);
  page.appendChild(backBar);

  const detail = createElement('div', 'event-detail');

  // Left col
  const left = createElement('div', 'event-detail__left');

  const illustration = createElement('div', 'event-detail__illustration');
  const illImg = createElement('img', '', '', { src: event.image, alt: event.title });
  illustration.appendChild(illImg);

  const hostedLabel = createElement('div', 'event-detail__hosted-label', 'HOSTED BY');

  const hostRow = createElement('div', 'event-detail__host');
  const hostAvatar = createElement('div', 'avatar avatar-sm');
  hostAvatar.textContent = event.organizer[0];
  const hostName = createElement('span', '', event.organizer);
  hostRow.appendChild(hostAvatar);
  hostRow.appendChild(hostName);

  const reportLink = createElement('div', 'event-detail__report', 'Report Event');

  const joinBtn = createElement('button', 'btn-join', 'Join the Event');
  joinBtn.onclick = () => API.showToast(`Registered for: ${event.title}`, 'success');

  left.appendChild(illustration);
  left.appendChild(hostedLabel);
  left.appendChild(hostRow);
  left.appendChild(reportLink);
  left.appendChild(joinBtn);

  // Right col
  const right = createElement('div', 'event-detail__right');

  const title = createElement('h1', 'event-detail__title', event.title);

  const dates = createElement('div', 'event-detail__dates');

  // FROM
  const fromCol = createElement('div', 'event-detail__date-col');
  const fromLabel = createElement('div', 'event-detail__date-label', 'FROM');
  const fromBadge = createElement('div', 'event-detail__date-badge');
  const fromBlock = createElement('div', 'event-detail__date-block');
  fromBlock.innerHTML = `<span class="month">${month}</span><span class="day">${day}</span>`;
  const fromInfo = createElement('div', 'event-detail__date-info');
  fromInfo.innerHTML = `<strong>${weekday}</strong><span>${event.time}, ${day} ${monthLong}</span>`;
  fromBadge.appendChild(fromBlock);
  fromBadge.appendChild(fromInfo);
  fromCol.appendChild(fromLabel);
  fromCol.appendChild(fromBadge);

  // TO
  const toCol = createElement('div', 'event-detail__date-col');
  const toLabel = createElement('div', 'event-detail__date-label', 'TO');
  const toBadge = createElement('div', 'event-detail__date-badge');
  const toBlock = createElement('div', 'event-detail__date-block');
  toBlock.innerHTML = `<span class="month">${month}</span><span class="day">${day}</span>`;
  const toInfo = createElement('div', 'event-detail__date-info');
  toInfo.innerHTML = `<strong>${weekday}</strong><span>${event.endTime}, ${day} ${monthLong}</span>`;
  toBadge.appendChild(toBlock);
  toBadge.appendChild(toInfo);
  toCol.appendChild(toLabel);
  toCol.appendChild(toBadge);

  dates.appendChild(fromCol);
  dates.appendChild(toCol);

  const locationLabel = createElement('div', 'event-detail__section-label', 'LOCATION');
  const locationVal = createElement('div', 'event-detail__location', `📍 ${event.location}`);

  const aboutLabel = createElement('div', 'event-detail__section-label', 'ABOUT THE EVENT');
  const aboutVal = createElement('div', 'event-detail__about', event.description);

  right.appendChild(title);
  right.appendChild(dates);
  right.appendChild(locationLabel);
  right.appendChild(locationVal);
  right.appendChild(aboutLabel);
  right.appendChild(aboutVal);

  detail.appendChild(left);
  detail.appendChild(right);
  page.appendChild(detail);
  container.appendChild(page);
}

Router.register('/events', EventsPage);
